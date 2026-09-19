export type Priority = 'emergency' | 'urgent' | 'routine'

export type IntakeStatus = 'in-progress' | 'ready' | 'seen'

export type RedFlag = {
  label: string
  reason: string
  severity: 'emergency' | 'urgent'
}

export type SummarySection = {
  heading: string
  lines: string[]
}

export type TimelineEntry = {
  date: string
  kind: string
  source: string
  detail: string
  abnormal?: boolean
}

export type QueuePatient = {
  id: string
  token: string
  name: string
  age: number
  sex: 'M' | 'F'
  abha: string
  department: 'Medicine OPD' | 'Ayurveda OPD' | 'Surgery OPD' | 'Orthopaedics OPD' | 'Chest OPD'
  stream: 'allopathy' | 'ayurveda'
  complaint: string
  language: string
  kiosk: string
  intakeMinutes: number
  waitMinutes: number
  status: IntakeStatus
  priority: Priority
  completeness: number
  docs: number
  flags: RedFlag[]
  summary: SummarySection[]
  timeline: TimelineEntry[]
  vitals?: { label: string; value: string; abnormal?: boolean }[]
}

export const QUEUE: QueuePatient[] = [
  {
    id: 'p-1',
    token: 'M-042',
    name: 'Ramesh Yadav',
    age: 58,
    sex: 'M',
    abha: '91-4423-8871-2019',
    department: 'Medicine OPD',
    stream: 'allopathy',
    complaint: 'Chest pain on exertion, 6 hours',
    language: 'Hindi',
    kiosk: 'K-03 · Block B',
    intakeMinutes: 7,
    waitMinutes: 4,
    status: 'ready',
    priority: 'emergency',
    completeness: 96,
    docs: 4,
    flags: [
      {
        label: 'Possible acute coronary syndrome',
        reason: 'Exertional retrosternal pressure radiating to left arm and jaw, with cold sweating and breathlessness, onset today',
        severity: 'emergency',
      },
      {
        label: 'Uncontrolled diabetes',
        reason: 'HbA1c 8.9% on scanned report dated 02 Aug 2026',
        severity: 'urgent',
      },
    ],
    vitals: [
      { label: 'BP', value: '158 / 96 mmHg', abnormal: true },
      { label: 'Pulse', value: '104 / min', abnormal: true },
      { label: 'SpO₂', value: '95 %' },
      { label: 'Temp', value: '98.4 °F' },
    ],
    summary: [
      {
        heading: 'Chief complaint',
        lines: ['Chest pain × 6 hours', 'Breathlessness on exertion × 3 days'],
      },
      {
        heading: 'History of present illness',
        lines: [
          '58-year-old male, known diabetic and hypertensive, presents with retrosternal chest pain that began this morning while walking to the bus stop.',
          'Pain described as heaviness / pressure, severity 8 of 10, radiating to the left arm and jaw.',
          'Aggravated by exertion, partially relieved by rest. Associated with cold sweating and breathlessness. No vomiting.',
          'Reports two similar but milder episodes over the past two weeks, each lasting under 10 minutes.',
        ],
      },
      {
        heading: 'Past medical & surgical history',
        lines: [
          'Type 2 diabetes mellitus × 10 years, on oral agents.',
          'Hypertension × 6 years.',
          'Laparoscopic cholecystectomy (Nov 2024) — uneventful.',
          'No prior admission for cardiac cause.',
        ],
      },
      {
        heading: 'Drug & allergy history',
        lines: [
          'Tab Metformin 500 mg BD; Tab Telmisartan 40 mg OD (verified against scanned prescription, 14 Jun 2026).',
          'Occasional NSAID for knee pain.',
          'Allergy: generalised rash after an injection (agent unidentified) — flagged for confirmation.',
        ],
      },
      {
        heading: 'Family history',
        lines: ['Father — diabetes mellitus.', 'Elder brother — hypertension.', 'No premature cardiac death reported.'],
      },
      {
        heading: 'Personal history',
        lines: [
          'Bidi smoking 10–12 per day × 30 years. No alcohol.',
          'Mixed diet. Sleep disturbed for the last week; appetite reduced.',
          'Occupation: shop assistant, moderate physical activity.',
        ],
      },
      {
        heading: 'Review of systems',
        lines: [
          'Constitutional: unintentional weight loss noted over 3 months.',
          'Respiratory: exertional dyspnoea, no haemoptysis.',
          'GI, GU, CNS: no complaints elicited.',
        ],
      },
      {
        heading: 'Prior investigations (digitised)',
        lines: [
          'HbA1c 8.9 % — high (02 Aug 2026).',
          'Fasting glucose 184 mg/dL — high.',
          'Creatinine 1.4 mg/dL — mildly high.',
          'Haemoglobin 11.2 g/dL — low.',
          'Chest X-ray (21 Jul 2026): mild cardiomegaly, clear lung fields.',
        ],
      },
    ],
    timeline: [
      { date: '2024-11-09', kind: 'Discharge summary', source: 'GSVM Medical College', detail: 'Laparoscopic cholecystectomy; chronic cholecystitis on histopathology' },
      { date: '2026-06-14', kind: 'Prescription', source: 'District Hospital, Kanpur', detail: 'T2DM + HTN — Metformin 500 BD, Telmisartan 40 OD' },
      { date: '2026-07-21', kind: 'Imaging', source: 'District Hospital, Kanpur', detail: 'Chest X-ray: mild cardiomegaly, clear lung fields' },
      { date: '2026-08-02', kind: 'Lab report', source: 'Pathkind Labs', detail: 'HbA1c 8.9%, FBS 184, Creatinine 1.4, Hb 11.2', abnormal: true },
      { date: '2026-08-25', kind: 'Kiosk intake', source: 'MediKiosk K-03', detail: 'Structured history captured in Hindi, 7 min; 4 documents digitised' },
    ],
  },
  {
    id: 'p-2',
    token: 'A-017',
    name: 'Sunita Devi',
    age: 44,
    sex: 'F',
    abha: '91-7781-2290-4477',
    department: 'Ayurveda OPD',
    stream: 'ayurveda',
    complaint: 'Chronic abdominal bloating, 8 months',
    language: 'Hindi',
    kiosk: 'K-01 · Ayush Block',
    intakeMinutes: 11,
    waitMinutes: 12,
    status: 'ready',
    priority: 'routine',
    completeness: 92,
    docs: 2,
    flags: [],
    vitals: [
      { label: 'BP', value: '124 / 78 mmHg' },
      { label: 'Pulse', value: '82 / min' },
      { label: 'Weight', value: '68 kg' },
      { label: 'Temp', value: '98.2 °F' },
    ],
    summary: [
      {
        heading: 'Chief complaint',
        lines: ['Abdominal bloating and heaviness after meals × 8 months', 'Irregular bowel habit × 8 months'],
      },
      {
        heading: 'History of present illness',
        lines: [
          '44-year-old female homemaker reports fullness and gaseous distension beginning 30–60 minutes after meals, worse with oily and fried food.',
          'Associated belching and reduced appetite. No vomiting, no weight loss, no melena.',
          'Symptoms fluctuate with meal timing and stress; partial relief with home remedies (ajwain, hing).',
        ],
      },
      {
        heading: 'Dashavidha Pariksha',
        lines: [
          'Prakriti: Vata-predominant — thin build, dry skin, light sleep.',
          'Agni: Manda — heaviness and gas formation after meals.',
          'Koshtha: Krura — hard stool, passes once in two days, occasional laxative use.',
          'Sara / Samhanana / Bala: Madhyama — tires by evening.',
          'Sattva: Avara — becomes anxious quickly.',
          'Ahara-Vihara: vegetarian, irregular meal timings, afternoon sleep, minimal physical activity.',
          'Nidana: dietary irregularity (viruddha ahara) and mental stress.',
        ],
      },
      {
        heading: 'Past medical & surgical history',
        lines: ['Hypothyroidism × 3 years, on replacement.', 'Two normal vaginal deliveries. No surgery.'],
      },
      {
        heading: 'Drug & allergy history',
        lines: ['Tab Thyroxine 50 mcg OD (verified against scanned prescription).', 'No known drug allergy.'],
      },
      {
        heading: 'Family history',
        lines: ['Mother — hypothyroidism.', 'No malignancy or inflammatory bowel disease reported.'],
      },
      {
        heading: 'Personal history',
        lines: ['No tobacco or alcohol. Vegetarian diet, high in fried snacks.', 'Sleep adequate at night, sleeps 1 hour in the afternoon.'],
      },
      {
        heading: 'Prior investigations (digitised)',
        lines: ['TSH 3.1 µIU/mL — normal (12 May 2026).', 'Ultrasound abdomen (10 Feb 2026): no organomegaly, normal gallbladder.'],
      },
    ],
    timeline: [
      { date: '2026-02-10', kind: 'Imaging', source: 'Sanjivani Diagnostics', detail: 'USG abdomen — no organomegaly, normal gallbladder' },
      { date: '2026-05-12', kind: 'Lab report', source: 'Sanjivani Diagnostics', detail: 'TSH 3.1 µIU/mL (normal on replacement)' },
      { date: '2026-08-25', kind: 'Kiosk intake', source: 'MediKiosk K-01', detail: 'Allopathic + Dashavidha Pariksha intake in Hindi, 11 min' },
    ],
  },
  {
    id: 'p-3',
    token: 'C-008',
    name: 'Abdul Salam',
    age: 63,
    sex: 'M',
    abha: '91-3390-1145-6602',
    department: 'Chest OPD',
    stream: 'allopathy',
    complaint: 'Cough with blood-stained sputum, 4 weeks',
    language: 'Bengali',
    kiosk: 'K-05 · Block A',
    intakeMinutes: 9,
    waitMinutes: 6,
    status: 'ready',
    priority: 'urgent',
    completeness: 89,
    docs: 1,
    flags: [
      {
        label: 'Presumptive pulmonary tuberculosis',
        reason: 'Cough > 3 weeks with haemoptysis, evening fever, weight loss and household TB contact — notify DOTS',
        severity: 'urgent',
      },
    ],
    vitals: [
      { label: 'BP', value: '118 / 74 mmHg' },
      { label: 'Pulse', value: '96 / min' },
      { label: 'SpO₂', value: '93 %', abnormal: true },
      { label: 'Temp', value: '100.2 °F', abnormal: true },
    ],
    summary: [
      {
        heading: 'Chief complaint',
        lines: ['Cough with expectoration × 4 weeks', 'Blood-streaked sputum × 5 days', 'Evening fever × 3 weeks'],
      },
      {
        heading: 'History of present illness',
        lines: [
          '63-year-old male reports productive cough for 4 weeks with yellow sputum, blood-streaking for the last 5 days.',
          'Low-grade evening fever with night sweats. Appetite reduced; clothes noticeably loose.',
          'Exertional breathlessness limits walking to a few hundred metres.',
          'Cooks on a wood chulha; daughter-in-law was treated for pulmonary TB last year.',
        ],
      },
      {
        heading: 'Past medical & surgical history',
        lines: ['No known diabetes or hypertension.', 'No prior anti-tubercular treatment reported.'],
      },
      {
        heading: 'Drug & allergy history',
        lines: ['Only over-the-counter cough syrup for 2 weeks.', 'No known drug allergy.'],
      },
      { heading: 'Family history', lines: ['Household contact with treated pulmonary tuberculosis (2025).'] },
      {
        heading: 'Personal history',
        lines: ['Bidi 15 per day × 40 years, continuing.', 'No alcohol. Biomass fuel exposure at home.'],
      },
      {
        heading: 'Review of systems',
        lines: ['Constitutional: weight loss, night sweats.', 'Respiratory: haemoptysis, exertional dyspnoea.'],
      },
      { heading: 'Prior investigations (digitised)', lines: ['No prior chest imaging available.'] },
    ],
    timeline: [
      { date: '2026-08-11', kind: 'Prescription', source: 'Local clinic, Howrah', detail: 'Syp Ascoril, Tab Azithromycin 500 × 3 days' },
      { date: '2026-08-25', kind: 'Kiosk intake', source: 'MediKiosk K-05', detail: 'Structured history captured in Bengali, 9 min; 1 document digitised' },
    ],
  },
  {
    id: 'p-4',
    token: 'O-023',
    name: 'Lakshmi Narayanan',
    age: 51,
    sex: 'F',
    abha: '91-5567-9902-3318',
    department: 'Orthopaedics OPD',
    stream: 'allopathy',
    complaint: 'Bilateral knee pain, 2 years',
    language: 'Tamil',
    kiosk: 'K-02 · Block B',
    intakeMinutes: 6,
    waitMinutes: 21,
    status: 'ready',
    priority: 'routine',
    completeness: 94,
    docs: 2,
    flags: [],
    summary: [
      {
        heading: 'Chief complaint',
        lines: ['Pain in both knees × 2 years, worse for 3 months'],
      },
      {
        heading: 'History of present illness',
        lines: [
          '51-year-old female with bilateral knee pain, worse on climbing stairs and squatting, severity 6 of 10.',
          'Morning stiffness under 30 minutes. Swelling of the right knee with crepitus on movement.',
          'No redness, no fever, no small joint involvement, no early morning gelling beyond an hour.',
        ],
      },
      { heading: 'Past medical & surgical history', lines: ['Hypertension × 4 years.', 'No prior joint surgery.'] },
      { heading: 'Drug & allergy history', lines: ['Tab Amlodipine 5 mg OD.', 'Frequent OTC NSAID use — counsel on gastric risk.'] },
      { heading: 'Family history', lines: ['Mother — knee osteoarthritis, underwent replacement.'] },
      { heading: 'Personal history', lines: ['No tobacco or alcohol. Sedentary. BMI 29.4.'] },
      { heading: 'Prior investigations (digitised)', lines: ['X-ray both knees (04 Mar 2026): medial joint space narrowing, Kellgren-Lawrence grade 2–3.'] },
    ],
    timeline: [
      { date: '2026-03-04', kind: 'Imaging', source: 'City Scan Centre, Madurai', detail: 'X-ray knees — medial joint space narrowing, KL grade 2–3' },
      { date: '2026-08-25', kind: 'Kiosk intake', source: 'MediKiosk K-02', detail: 'Structured history captured in Tamil, 6 min' },
    ],
  },
  {
    id: 'p-5',
    token: 'M-043',
    name: 'Pooja Kumari',
    age: 26,
    sex: 'F',
    abha: '91-2214-7756-8890',
    department: 'Medicine OPD',
    stream: 'allopathy',
    complaint: 'Fever with chills, 5 days',
    language: 'Hindi',
    kiosk: 'K-03 · Block B',
    intakeMinutes: 3,
    waitMinutes: 2,
    status: 'in-progress',
    priority: 'urgent',
    completeness: 41,
    docs: 0,
    flags: [
      {
        label: 'Possible dengue — bleeding reported',
        reason: 'Fever 5 days with gum bleeding and local dengue outbreak; prioritise platelet count',
        severity: 'urgent',
      },
    ],
    summary: [
      { heading: 'Chief complaint', lines: ['Fever with chills × 5 days', 'Bleeding from gums × 1 day'] },
      {
        heading: 'History of present illness',
        lines: [
          '26-year-old female with intermittent fever for 5 days, rising in the evening with shaking chills.',
          'Severe headache and body ache. Gum bleeding noticed today.',
          'Dengue reported in the neighbourhood; a neighbour was admitted last week.',
          'Interview in progress — remaining sections pending.',
        ],
      },
    ],
    timeline: [
      { date: '2026-08-25', kind: 'Kiosk intake', source: 'MediKiosk K-03', detail: 'Interview in progress — 41% complete' },
    ],
  },
  {
    id: 'p-6',
    token: 'A-018',
    name: 'Mahesh Patil',
    age: 37,
    sex: 'M',
    abha: '91-8890-3341-7725',
    department: 'Ayurveda OPD',
    stream: 'ayurveda',
    complaint: 'Low back pain and stiffness, 1 year',
    language: 'Marathi',
    kiosk: 'K-01 · Ayush Block',
    intakeMinutes: 10,
    waitMinutes: 33,
    status: 'seen',
    priority: 'routine',
    completeness: 97,
    docs: 3,
    flags: [],
    summary: [
      { heading: 'Chief complaint', lines: ['Low back pain with stiffness × 1 year'] },
      {
        heading: 'History of present illness',
        lines: [
          '37-year-old male driver with mechanical low back pain, worse after long driving shifts, no radiation below the knee.',
          'No bladder or bowel involvement, no night pain, no weight loss.',
        ],
      },
      {
        heading: 'Dashavidha Pariksha',
        lines: [
          'Prakriti: Vata-Kapha.',
          'Agni: Vishama — irregular hunger.',
          'Koshtha: Madhyama.',
          'Bala: Madhyama; Vyayama Shakti reduced.',
          'Nidana: Ativyayama and prolonged sitting (asana) during driving shifts.',
        ],
      },
      { heading: 'Prior investigations (digitised)', lines: ['MRI lumbar spine (18 Jan 2026): L4-L5 mild disc bulge, no neural compression.'] },
    ],
    timeline: [
      { date: '2026-01-18', kind: 'Imaging', source: 'Aditya MRI Centre, Pune', detail: 'MRI LS spine — L4-L5 mild disc bulge' },
      { date: '2026-08-25', kind: 'Kiosk intake', source: 'MediKiosk K-01', detail: 'Structured history captured in Marathi, 10 min' },
    ],
  },
]

export const KIOSK_STATIONS = [
  { id: 'K-01', location: 'Ayush Block', status: 'busy', sessionsToday: 118, language: 'Marathi' },
  { id: 'K-02', location: 'Block B — Ortho', status: 'busy', sessionsToday: 143, language: 'Tamil' },
  { id: 'K-03', location: 'Block B — Medicine', status: 'busy', sessionsToday: 201, language: 'Hindi' },
  { id: 'K-04', location: 'Registration hall', status: 'idle', sessionsToday: 176, language: '—' },
  { id: 'K-05', location: 'Block A — Chest', status: 'busy', sessionsToday: 94, language: 'Bengali' },
  { id: 'K-06', location: 'Block A — Surgery', status: 'offline', sessionsToday: 0, language: '—' },
] as const

export const TRIAGE_STATS = [
  { label: 'Intakes completed today', value: '732', delta: 'of 1,180 registered' },
  { label: 'Median intake duration', value: '6:48', delta: 'minutes per patient' },
  { label: 'Consultation time returned', value: '81 hrs', delta: 'saved across OPD today' },
  { label: 'Red flags escalated', value: '14', delta: '3 emergency · 11 urgent' },
]
