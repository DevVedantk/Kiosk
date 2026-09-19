import type { Question } from '@/lib/kiosk-data'

/**
 * What the simulated NLU extracts from each `voiceSample`.
 * Front-end only: the real system will get these from the speech + LLM pipeline.
 */
export const VOICE_PICKS: Record<string, { options?: string[]; scale?: number }> = {
  // Chest pain
  'cp-onset': { options: ['today'] },
  'cp-character': { options: ['pressure'] },
  'cp-radiation': { options: ['left-arm', 'jaw'] },
  'cp-associated': { options: ['dyspnoea', 'sweating'] },
  'cp-severity': { scale: 8 },
  'cp-exertion': { options: ['exertion'] },

  // Cough / breathlessness
  'br-duration': { options: ['month'] },
  'br-sputum': { options: ['blood'] },
  'br-effort': { options: ['block'] },
  'br-fever': { options: ['fever', 'weight'] },
  'br-exposure': { options: ['chulha'] },

  // Fever
  'fv-duration': { options: ['3-7'] },
  'fv-pattern': { options: ['chills'] },
  'fv-associated': { options: ['none'] },
  'fv-travel': { options: ['mosquito', 'contact'] },

  // Core tail
  'past-conditions': { options: ['dm', 'htn'] },
  'past-surgery': { options: ['major'] },
  'drug-current': { options: ['regular'] },
  'drug-allergy': { options: ['unknown'] },
  family: { options: ['dm', 'htn'] },
  'personal-habits': { options: ['smoking'] },
  'personal-sleep': { options: ['both'] },
  'ros-weight': { options: ['weight-loss'] },

  // Dashavidha Pariksha
  'ay-prakriti': { options: ['vata'] },
  'ay-agni': { options: ['manda'] },
  'ay-koshtha': { options: ['krura'] },
  'ay-bala': { options: ['avara'] },
  'ay-satmya': { options: ['veg', 'irregular'] },
  'ay-sattva': { options: ['avara'] },
  'ay-nidana': { options: ['ahara', 'stress'] },
}

export function resolveVoiceAnswer(question: Question): { optionIds: string[]; scale?: number } {
  const mapped = VOICE_PICKS[question.id]
  if (question.type === 'scale') {
    return { optionIds: [], scale: mapped?.scale ?? Math.ceil(((question.scale?.max ?? 10) * 2) / 3) }
  }
  if (mapped?.options?.length) {
    const valid = new Set((question.options ?? []).map((option) => option.id))
    const picks = mapped.options.filter((id) => valid.has(id))
    if (picks.length) return { optionIds: question.type === 'single' ? [picks[0]] : picks }
  }
  const first = question.options?.[0]?.id
  return { optionIds: first ? [first] : [] }
}
