import {
  AVAILABLE_DOCS,
  COMPLAINTS,
  SECTION_LABELS,
  buildQuestionSet,
  type ComplaintId,
  type Department,
  type Question,
  type QuestionSection,
  type ScannedDoc,
} from '@/lib/kiosk-data'

export type AnswerSource = 'voice' | 'touch' | 'skipped'

export type Answer = {
  questionId: string
  optionIds: string[]
  scale?: number
  transcript?: string
  source: AnswerSource
}

export type Answers = Record<string, Answer>

export type RedFlag = {
  id: string
  label: string
  reason: string
  severity: 'urgent' | 'watch'
}

export type SummarySection = {
  section: QuestionSection
  label: string
  lines: { field: string; value: string; source: AnswerSource; transcript?: string }[]
}

export type IntakeSummary = {
  chiefComplaint: string
  oneLiner: string
  sections: SummarySection[]
  redFlags: RedFlag[]
  answeredCount: number
  totalCount: number
  voiceCount: number
  documents: ScannedDoc[]
}

function labelFor(question: Question, answer: Answer): string {
  if (answer.source === 'skipped') return 'Not answered'
  if (question.type === 'scale') {
    return answer.scale ? `${answer.scale} / ${question.scale?.max ?? 10}` : 'Not graded'
  }
  if (question.type === 'text') return answer.transcript?.trim() || 'No detail given'
  const picked = (question.options ?? []).filter((option) => answer.optionIds.includes(option.id))
  if (picked.length === 0) return answer.transcript?.trim() || 'Not answered'
  return picked.map((option) => option.label).join(', ')
}

const URGENT_FLAGS: Record<string, { label: string; reason: string }> = {
  'cp-onset:now': { label: 'Acute chest pain', reason: 'Onset within the last hour — rule out ACS' },
  'cp-onset:today': { label: 'Chest pain today', reason: 'Same-day onset chest pain' },
  'cp-character:pressure': { label: 'Pressure-type chest pain', reason: 'Ischaemic character' },
  'cp-character:cramp': { label: 'Squeezing chest pain', reason: 'Ischaemic character' },
  'cp-radiation:left-arm': { label: 'Radiation to left arm', reason: 'Classical anginal radiation' },
  'cp-radiation:jaw': { label: 'Radiation to jaw / neck', reason: 'Classical anginal radiation' },
  'cp-associated:dyspnoea': { label: 'Chest pain with dyspnoea', reason: 'Cardiopulmonary compromise' },
  'cp-associated:sweating': { label: 'Diaphoresis', reason: 'Autonomic response — suspect ACS' },
  'cp-exertion:exertion': { label: 'Exertional pain', reason: 'Exertion-provoked, relieved by rest' },
  'br-duration:month': { label: 'Cough > 3 weeks', reason: 'Presumptive TB — sputum NAAT indicated' },
  'br-sputum:blood': { label: 'Haemoptysis', reason: 'Requires urgent imaging and NAAT' },
  'br-effort:room': { label: 'Severe exertional limit', reason: 'Breathless within the house' },
  'br-effort:rest': { label: 'Dyspnoea at rest', reason: 'Possible decompensation' },
  'br-fever:weight': { label: 'Weight loss with cough', reason: 'Constitutional B symptom' },
  'br-exposure:tb-contact': { label: 'Household TB contact', reason: 'Contact tracing needed' },
  'fv-duration:more': { label: 'Fever > 2 weeks', reason: 'Prolonged fever workup' },
  'fv-associated:neck': { label: 'Neck stiffness / confusion', reason: 'Suspect CNS infection' },
  'fv-associated:bleeding': { label: 'Mucosal bleeding', reason: 'Suspect dengue with warning signs' },
  'ros-weight:weight-loss': { label: 'Unintentional weight loss', reason: 'Red-flag constitutional symptom' },
  'ros-weight:blood': { label: 'Bleeding per orifice', reason: 'Needs source identification' },
  'drug-allergy:penicillin': { label: 'Penicillin allergy', reason: 'Prescribing restriction' },
  'drug-allergy:painkiller': { label: 'NSAID allergy', reason: 'Prescribing restriction' },
  'drug-allergy:unknown': { label: 'Unlabelled drug allergy', reason: 'Prescribing caution' },
}

const WATCH_ONLY = new Set(['drug-allergy', 'ros-weight'])

export function buildSummary({
  complaint,
  department,
  answers,
  documents,
}: {
  complaint: ComplaintId | null
  department: Department
  answers: Answers
  documents: string[]
}): IntakeSummary {
  const questions = complaint ? buildQuestionSet(complaint, department) : []
  const complaintLabel = COMPLAINTS.find((item) => item.id === complaint)?.label ?? 'Not selected'

  const grouped = new Map<QuestionSection, SummarySection>()
  const redFlags: RedFlag[] = []
  let answeredCount = 0
  let voiceCount = 0

  for (const question of questions) {
    const answer = answers[question.id]
    if (!answer) continue
    if (answer.source !== 'skipped') answeredCount += 1
    if (answer.source === 'voice') voiceCount += 1

    const bucket = grouped.get(question.section) ?? {
      section: question.section,
      label: SECTION_LABELS[question.section],
      lines: [],
    }
    bucket.lines.push({
      field: question.field,
      value: labelFor(question, answer),
      source: answer.source,
      transcript: answer.transcript,
    })
    grouped.set(question.section, bucket)

    for (const optionId of answer.optionIds) {
      const key = `${question.id}:${optionId}`
      const flag = URGENT_FLAGS[key]
      if (!flag) continue
      redFlags.push({
        id: key,
        label: flag.label,
        reason: flag.reason,
        severity: WATCH_ONLY.has(question.id) ? 'watch' : 'urgent',
      })
    }

    if (question.type === 'scale' && (answer.scale ?? 0) >= 8) {
      redFlags.push({
        id: `${question.id}:severe`,
        label: 'Severe pain score',
        reason: `Patient graded ${answer.scale}/10 at worst`,
        severity: 'urgent',
      })
    }
  }

  const order: QuestionSection[] = ['hpi', 'past', 'drug', 'family', 'personal', 'ros', 'ayush']
  const sections = order
    .map((section) => grouped.get(section))
    .filter((value): value is SummarySection => Boolean(value))

  const docs = [
    ...AVAILABLE_DOCS.filter((doc) => documents.includes(doc.id)),
    ...documents.filter((id) => id.startsWith('upload:') || id.startsWith('account:')).map((id) => ({
      id,
      kind: 'Prescription' as const,
      title: id.replace('upload:', ''),
      source: 'Patient upload',
      date: new Date().toISOString().slice(0, 10),
      handwritten: false,
      confidence: 0,
      extracted: [{ label: 'Status', value: 'Uploaded for review', abnormal: false }],
    })),
  ]

  const hpi = grouped.get('hpi')
  const oneLiner = hpi
    ? `${complaintLabel} — ${hpi.lines
        .slice(0, 3)
        .map((line) => `${line.field.toLowerCase()}: ${line.value.toLowerCase()}`)
        .join('; ')}.`
    : `${complaintLabel}. History not yet recorded.`

  return {
    chiefComplaint: complaintLabel,
    oneLiner,
    sections,
    redFlags,
    answeredCount,
    totalCount: questions.length,
    voiceCount,
    documents: docs,
  }
}

export function triageLevel(redFlags: RedFlag[]): {
  level: 'emergency' | 'priority' | 'routine'
  label: string
  detail: string
} {
  const urgent = redFlags.filter((flag) => flag.severity === 'urgent').length
  if (urgent >= 3) {
    return {
      level: 'emergency',
      label: 'Emergency — send to casualty now',
      detail: `${urgent} urgent red flags detected. Staff have been alerted and the queue has been bypassed.`,
    }
  }
  if (urgent >= 1) {
    return {
      level: 'priority',
      label: 'Priority — see before routine queue',
      detail: `${urgent} finding${urgent > 1 ? 's' : ''} needs early review. Token moved up the queue.`,
    }
  }
  return {
    level: 'routine',
    label: 'Routine OPD',
    detail: 'No red flags detected. Normal token order applies.',
  }
}
