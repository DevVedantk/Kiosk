export type Department = 'allopathy' | 'ayurveda'

export type LanguageCode = 'hi' | 'en' | 'bn' | 'mr' | 'ta' | 'te' | 'kn' | 'gu'

export type Language = {
  code: LanguageCode
  label: string
  native: string
  speakers: string
}

export const LANGUAGES: Language[] = [
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', speakers: 'Hindi belt' },
  { code: 'en', label: 'English', native: 'English', speakers: 'All India' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', speakers: 'West Bengal' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', speakers: 'Maharashtra' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', speakers: 'Tamil Nadu' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', speakers: 'Andhra / Telangana' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', speakers: 'Karnataka' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', speakers: 'Gujarat' },
]

export type ConsentClause = {
  id: string
  title: string
  detail: string
  required: boolean
}

export const CONSENT_CLAUSES: ConsentClause[] = [
  {
    id: 'capture',
    title: 'Record my history at this kiosk',
    detail:
      'Voice and touch answers are processed to build a clinical history for today’s consultation. Audio is discarded once the text history is generated.',
    required: true,
  },
  {
    id: 'documents',
    title: 'Digitise the documents I scan',
    detail:
      'Prescriptions, lab reports and discharge summaries are read by OCR and organised into a timeline for the doctor.',
    required: true,
  },
  {
    id: 'abha',
    title: 'Link this visit to my ABHA health record',
    detail:
      'The structured history is written to my Ayushman Bharat Health Account so future doctors can see it. Revocable at any time.',
    required: false,
  },
  {
    id: 'research',
    title: 'Use anonymised data to improve the system',
    detail:
      'De-identified history text may be used to improve language and clinical models. No name, ABHA number or contact detail is included.',
    required: false,
  },
]

export type ComplaintId =
  | 'chest-pain'
  | 'fever'
  | 'breathlessness'
  | 'abdominal-pain'
  | 'headache'
  | 'joint-pain'
  | 'dizziness'
  | 'skin'

export type Complaint = {
  id: ComplaintId
  label: string
  native: string
  icon: string
  bodyRegion: string
}

export const COMPLAINTS: Complaint[] = [
  { id: 'chest-pain', label: 'Chest pain', native: 'छाती में दर्द', icon: 'heart', bodyRegion: 'Chest' },
  { id: 'breathlessness', label: 'Cough or breathlessness', native: 'खांसी / सांस फूलना', icon: 'lungs', bodyRegion: 'Chest' },
  { id: 'fever', label: 'Fever', native: 'बुखार', icon: 'thermometer', bodyRegion: 'General' },
  { id: 'abdominal-pain', label: 'Stomach pain', native: 'पेट में दर्द', icon: 'stomach', bodyRegion: 'Abdomen' },
  { id: 'headache', label: 'Headache', native: 'सिर दर्द', icon: 'brain', bodyRegion: 'Head' },
  { id: 'joint-pain', label: 'Joint or back pain', native: 'जोड़ों / कमर का दर्द', icon: 'bone', bodyRegion: 'Musculoskeletal' },
  { id: 'dizziness', label: 'Weakness or giddiness', native: 'कमज़ोरी / चक्कर', icon: 'activity', bodyRegion: 'General' },
  { id: 'skin', label: 'Skin problem', native: 'त्वचा की समस्या', icon: 'droplet', bodyRegion: 'Skin' },
]

export type QuestionSection =
  | 'hpi'
  | 'past'
  | 'drug'
  | 'family'
  | 'personal'
  | 'ros'
  | 'ayush'

export const SECTION_LABELS: Record<QuestionSection, string> = {
  hpi: 'History of present illness',
  past: 'Past medical & surgical',
  drug: 'Drugs & allergies',
  family: 'Family history',
  personal: 'Personal history',
  ros: 'Review of systems',
  ayush: 'Dashavidha Pariksha',
}

export type QuestionOption = {
  id: string
  label: string
  native?: string
  redFlag?: boolean
}

export type Question = {
  id: string
  section: QuestionSection
  field: string
  prompt: string
  native: string
  helper?: string
  type: 'single' | 'multi' | 'scale' | 'text'
  options?: QuestionOption[]
  scale?: { min: number; max: number; minLabel: string; maxLabel: string }
  /** Text the simulated Indian-language ASR returns when the patient speaks. */
  voiceSample?: string
}

const CORE_TAIL: Question[] = [
  {
    id: 'past-conditions',
    section: 'past',
    field: 'Known conditions',
    prompt: 'Has a doctor ever told you that you have any of these?',
    native: 'क्या डॉक्टर ने कभी इनमें से कोई बीमारी बताई है?',
    helper: 'Tap all that apply. Leave empty if none.',
    type: 'multi',
    options: [
      { id: 'dm', label: 'Diabetes (sugar)', native: 'शुगर' },
      { id: 'htn', label: 'High blood pressure', native: 'बी.पी.' },
      { id: 'tb', label: 'Tuberculosis', native: 'टी.बी.' },
      { id: 'asthma', label: 'Asthma', native: 'दमा' },
      { id: 'thyroid', label: 'Thyroid problem', native: 'थायरॉइड' },
      { id: 'cad', label: 'Heart disease', native: 'दिल की बीमारी' },
      { id: 'ckd', label: 'Kidney disease', native: 'गुर्दे की बीमारी' },
      { id: 'none', label: 'None of these', native: 'कोई नहीं' },
    ],
    voiceSample: 'Sugar hai dus saal se, aur BP bhi hai. Goli roz leta hoon.',
  },
  {
    id: 'past-surgery',
    section: 'past',
    field: 'Surgical history',
    prompt: 'Have you had any operation or hospital admission before?',
    native: 'क्या पहले कोई ऑपरेशन या भर्ती हुई है?',
    type: 'single',
    options: [
      { id: 'none', label: 'No operation', native: 'नहीं' },
      { id: 'minor', label: 'Yes, a small procedure', native: 'हाँ, छोटा' },
      { id: 'major', label: 'Yes, a major operation', native: 'हाँ, बड़ा' },
      { id: 'admitted', label: 'Admitted but no operation', native: 'भर्ती हुआ, ऑपरेशन नहीं' },
    ],
    voiceSample: 'Do saal pehle gall bladder ka operation hua tha, laparoscopic.',
  },
  {
    id: 'drug-current',
    section: 'drug',
    field: 'Current medication',
    prompt: 'Are you taking any medicine at present?',
    native: 'क्या आप अभी कोई दवा ले रहे हैं?',
    helper: 'You can also scan the strips in the next step.',
    type: 'single',
    options: [
      { id: 'none', label: 'No medicine', native: 'कोई दवा नहीं' },
      { id: 'regular', label: 'Yes, daily medicines', native: 'हाँ, रोज़' },
      { id: 'occasional', label: 'Only when needed', native: 'ज़रूरत पर' },
      { id: 'ayurvedic', label: 'Ayurvedic / home remedies', native: 'आयुर्वेदिक / घरेलू' },
    ],
    voiceSample: 'Metformin 500 do baar, Telmisartan 40 subah. Kabhi kabhi dard ki goli.',
  },
  {
    id: 'drug-allergy',
    section: 'drug',
    field: 'Allergy',
    prompt: 'Has any medicine ever caused a rash, swelling or breathing trouble?',
    native: 'किसी दवा से दाने, सूजन या सांस की तकलीफ हुई है?',
    type: 'single',
    options: [
      { id: 'none', label: 'Never', native: 'कभी नहीं' },
      { id: 'penicillin', label: 'Yes — a penicillin type injection', native: 'हाँ — पेनिसिलिन', redFlag: true },
      { id: 'painkiller', label: 'Yes — a painkiller', native: 'हाँ — दर्द की दवा', redFlag: true },
      { id: 'unknown', label: 'Yes, but I do not know which', native: 'हाँ, नाम नहीं पता', redFlag: true },
    ],
    voiceSample: 'Ek baar injection ke baad poore shareer par dane nikle the.',
  },
  {
    id: 'family',
    section: 'family',
    field: 'Family history',
    prompt: 'Does anyone in your close family have a long-standing illness?',
    native: 'परिवार में किसी को कोई पुरानी बीमारी है?',
    type: 'multi',
    options: [
      { id: 'dm', label: 'Diabetes', native: 'शुगर' },
      { id: 'htn', label: 'Blood pressure', native: 'बी.पी.' },
      { id: 'cardiac', label: 'Heart attack before 55', native: 'दिल का दौरा' },
      { id: 'cancer', label: 'Cancer', native: 'कैंसर' },
      { id: 'tb', label: 'Tuberculosis', native: 'टी.बी.' },
      { id: 'none', label: 'Nobody', native: 'कोई नहीं' },
    ],
    voiceSample: 'Pitaji ko sugar tha, bhai ko bhi BP hai.',
  },
  {
    id: 'personal-habits',
    section: 'personal',
    field: 'Habits',
    prompt: 'Do you use any of these?',
    native: 'क्या आप इनका सेवन करते हैं?',
    helper: 'This stays confidential and helps the doctor treat you correctly.',
    type: 'multi',
    options: [
      { id: 'tobacco', label: 'Chewing tobacco / gutkha', native: 'तंबाकू / गुटखा' },
      { id: 'smoking', label: 'Bidi / cigarette', native: 'बीड़ी / सिगरेट' },
      { id: 'alcohol', label: 'Alcohol', native: 'शराब' },
      { id: 'none', label: 'None', native: 'कुछ नहीं' },
    ],
    voiceSample: 'Bidi peeta hoon, das-baarah roz. Sharab nahi.',
  },
  {
    id: 'personal-sleep',
    section: 'personal',
    field: 'Sleep & appetite',
    prompt: 'How have your sleep and appetite been?',
    native: 'नींद और भूख कैसी है?',
    type: 'single',
    options: [
      { id: 'normal', label: 'Both normal', native: 'दोनों ठीक' },
      { id: 'sleep', label: 'Sleep disturbed', native: 'नींद खराब' },
      { id: 'appetite', label: 'Appetite reduced', native: 'भूख कम' },
      { id: 'both', label: 'Both disturbed', native: 'दोनों खराब' },
    ],
    voiceSample: 'Neend nahi aati theek se, bhookh bhi kam ho gayi hai.',
  },
  {
    id: 'ros-weight',
    section: 'ros',
    field: 'Constitutional',
    prompt: 'In the last 3 months, have you noticed any of these?',
    native: 'पिछले 3 महीनों में इनमें से कुछ हुआ?',
    type: 'multi',
    options: [
      { id: 'weight-loss', label: 'Weight loss without trying', native: 'वजन कम होना', redFlag: true },
      { id: 'night-sweats', label: 'Night sweats', native: 'रात में पसीना' },
      { id: 'blood', label: 'Blood in cough, stool or urine', native: 'खून आना', redFlag: true },
      { id: 'swelling', label: 'Swelling of feet', native: 'पैरों में सूजन' },
      { id: 'none', label: 'None of these', native: 'कोई नहीं' },
    ],
    voiceSample: 'Vajan kam ho gaya hai, kapde dheele lag rahe hain.',
  },
]

const HPI_BY_COMPLAINT: Record<ComplaintId, Question[]> = {
  'chest-pain': [
    {
      id: 'cp-onset',
      section: 'hpi',
      field: 'Onset',
      prompt: 'When did the chest pain start?',
      native: 'छाती का दर्द कब शुरू हुआ?',
      type: 'single',
      options: [
        { id: 'now', label: 'Within the last hour', native: 'एक घंटे में', redFlag: true },
        { id: 'today', label: 'Today', native: 'आज', redFlag: true },
        { id: 'week', label: 'A few days ago', native: 'कुछ दिन पहले' },
        { id: 'month', label: 'More than a month', native: 'एक महीने से ज़्यादा' },
      ],
      voiceSample: 'Aaj subah se hi dard shuru hua, chalte waqt zyada hota hai.',
    },
    {
      id: 'cp-character',
      section: 'hpi',
      field: 'Character',
      prompt: 'What does the pain feel like?',
      native: 'दर्द कैसा लगता है?',
      type: 'single',
      options: [
        { id: 'pressure', label: 'Heaviness or pressure', native: 'भारीपन / दबाव', redFlag: true },
        { id: 'burning', label: 'Burning', native: 'जलन' },
        { id: 'sharp', label: 'Sharp / pricking', native: 'चुभने वाला' },
        { id: 'cramp', label: 'Squeezing', native: 'जकड़न', redFlag: true },
      ],
      voiceSample: 'Aisa lagta hai ki seene par bhaari patthar rakha hai.',
    },
    {
      id: 'cp-radiation',
      section: 'hpi',
      field: 'Radiation',
      prompt: 'Does the pain travel anywhere else?',
      native: 'क्या दर्द कहीं और जाता है?',
      type: 'multi',
      options: [
        { id: 'left-arm', label: 'Left arm', native: 'बायाँ हाथ', redFlag: true },
        { id: 'jaw', label: 'Jaw or neck', native: 'जबड़ा / गर्दन', redFlag: true },
        { id: 'back', label: 'Back', native: 'पीठ' },
        { id: 'none', label: 'Stays in one place', native: 'एक ही जगह' },
      ],
      voiceSample: 'Dard baaye haath tak jaata hai aur jabde mein bhi hota hai.',
    },
    {
      id: 'cp-associated',
      section: 'hpi',
      field: 'Associated symptoms',
      prompt: 'Along with the pain, do you have any of these right now?',
      native: 'दर्द के साथ अभी इनमें से कुछ है?',
      type: 'multi',
      options: [
        { id: 'dyspnoea', label: 'Breathlessness', native: 'सांस फूलना', redFlag: true },
        { id: 'sweating', label: 'Cold sweating', native: 'ठंडा पसीना', redFlag: true },
        { id: 'vomiting', label: 'Vomiting or nausea', native: 'उल्टी / जी मिचलाना' },
        { id: 'palpitation', label: 'Fast heartbeat', native: 'धड़कन तेज़' },
        { id: 'none', label: 'Nothing else', native: 'कुछ नहीं' },
      ],
      voiceSample: 'Saans phool rahi hai aur thanda paseena aa raha hai.',
    },
    {
      id: 'cp-severity',
      section: 'hpi',
      field: 'Severity',
      prompt: 'How bad is the pain at its worst?',
      native: 'दर्द सबसे ज़्यादा कितना होता है?',
      type: 'scale',
      scale: { min: 1, max: 10, minLabel: 'Mild', maxLabel: 'Worst ever' },
      voiceSample: 'Bahut tez dard hai, bardaash nahi ho raha.',
    },
    {
      id: 'cp-exertion',
      section: 'hpi',
      field: 'Aggravating factors',
      prompt: 'What makes the pain worse?',
      native: 'दर्द कब बढ़ता है?',
      type: 'single',
      options: [
        { id: 'exertion', label: 'Walking or climbing stairs', native: 'चलने / सीढ़ी चढ़ने पर', redFlag: true },
        { id: 'food', label: 'After eating', native: 'खाने के बाद' },
        { id: 'lying', label: 'Lying down', native: 'लेटने पर' },
        { id: 'breathing', label: 'Deep breathing', native: 'गहरी सांस लेने पर' },
        { id: 'nothing', label: 'No clear pattern', native: 'कोई पैटर्न नहीं' },
      ],
      voiceSample: 'Sirf chalne par hota hai, baithne se aaram mil jaata hai.',
    },
  ],
  breathlessness: [
    {
      id: 'br-duration',
      section: 'hpi',
      field: 'Duration',
      prompt: 'How long have you had the cough or breathlessness?',
      native: 'खांसी / सांस की तकलीफ कब से है?',
      type: 'single',
      options: [
        { id: 'days', label: 'Less than a week', native: 'एक हफ्ते से कम' },
        { id: 'weeks', label: '2–3 weeks', native: '2–3 हफ्ते' },
        { id: 'month', label: 'More than 3 weeks', native: '3 हफ्ते से ज़्यादा', redFlag: true },
        { id: 'years', label: 'Every winter for years', native: 'हर सर्दी में' },
      ],
      voiceSample: 'Ek mahine se khansi hai, raat mein zyada badh jaati hai.',
    },
    {
      id: 'br-sputum',
      section: 'hpi',
      field: 'Sputum',
      prompt: 'Is anything coming out when you cough?',
      native: 'खांसी में कुछ निकलता है?',
      type: 'single',
      options: [
        { id: 'dry', label: 'Dry cough', native: 'सूखी खांसी' },
        { id: 'white', label: 'White phlegm', native: 'सफेद बलगम' },
        { id: 'yellow', label: 'Yellow / green phlegm', native: 'पीला बलगम' },
        { id: 'blood', label: 'Blood-stained', native: 'खून के साथ', redFlag: true },
      ],
      voiceSample: 'Peela balgam nikalta hai, kabhi khoon ki laali bhi dikhi.',
    },
    {
      id: 'br-effort',
      section: 'hpi',
      field: 'Exertional limit',
      prompt: 'How much can you walk before you must stop for breath?',
      native: 'सांस लेने के लिए रुकने से पहले कितना चल पाते हैं?',
      type: 'single',
      options: [
        { id: 'normal', label: 'No limit', native: 'कोई दिक्कत नहीं' },
        { id: 'block', label: 'A few hundred metres', native: 'कुछ सौ मीटर' },
        { id: 'room', label: 'Only inside the house', native: 'सिर्फ घर के अंदर', redFlag: true },
        { id: 'rest', label: 'Breathless even at rest', native: 'आराम में भी', redFlag: true },
      ],
      voiceSample: 'Thoda chalne par hi saans phool jaati hai, rukna padta hai.',
    },
    {
      id: 'br-fever',
      section: 'hpi',
      field: 'Associated symptoms',
      prompt: 'Do you also have any of these?',
      native: 'साथ में इनमें से कुछ है?',
      type: 'multi',
      options: [
        { id: 'fever', label: 'Evening fever', native: 'शाम को बुखार' },
        { id: 'weight', label: 'Weight loss', native: 'वजन कम', redFlag: true },
        { id: 'wheeze', label: 'Whistling sound in chest', native: 'सीने में सीटी' },
        { id: 'swelling', label: 'Swollen feet', native: 'पैरों में सूजन' },
        { id: 'none', label: 'None', native: 'कोई नहीं' },
      ],
      voiceSample: 'Shaam ko halka bukhar aata hai aur vajan bhi kam hua hai.',
    },
    {
      id: 'br-exposure',
      section: 'hpi',
      field: 'Exposure',
      prompt: 'Are you exposed to any of these at home or work?',
      native: 'घर या काम पर इनका सामना होता है?',
      type: 'multi',
      options: [
        { id: 'chulha', label: 'Wood / cow-dung chulha smoke', native: 'चूल्हे का धुआँ' },
        { id: 'dust', label: 'Dust or stone work', native: 'धूल / पत्थर का काम' },
        { id: 'tb-contact', label: 'Someone at home has TB', native: 'घर में टी.बी.', redFlag: true },
        { id: 'none', label: 'None', native: 'कुछ नहीं' },
      ],
      voiceSample: 'Ghar mein chulhe par khana banta hai, dhuan bahut hota hai.',
    },
  ],
  fever: [
    {
      id: 'fv-duration',
      section: 'hpi',
      field: 'Duration',
      prompt: 'How many days have you had fever?',
      native: 'बुखार कितने दिन से है?',
      type: 'single',
      options: [
        { id: '1-2', label: '1–2 days', native: '1–2 दिन' },
        { id: '3-7', label: '3–7 days', native: '3–7 दिन' },
        { id: '1-2w', label: '1–2 weeks', native: '1–2 हफ्ते' },
        { id: 'more', label: 'More than 2 weeks', native: '2 हफ्ते से ज़्यादा', redFlag: true },
      ],
      voiceSample: 'Paanch din se bukhar aa raha hai, shaam ko badh jaata hai.',
    },
    {
      id: 'fv-pattern',
      section: 'hpi',
      field: 'Pattern',
      prompt: 'What is the pattern of the fever?',
      native: 'बुखार का पैटर्न क्या है?',
      type: 'single',
      options: [
        { id: 'continuous', label: 'Present all day', native: 'पूरे दिन' },
        { id: 'evening', label: 'Rises in the evening', native: 'शाम को बढ़ता है' },
        { id: 'alternate', label: 'Every second day with chills', native: 'हर दूसरे दिन, ठंड के साथ' },
        { id: 'chills', label: 'With shaking chills', native: 'कंपकंपी के साथ' },
      ],
      voiceSample: 'Shaam ko thand lagti hai phir tez bukhar aata hai.',
    },
    {
      id: 'fv-associated',
      section: 'hpi',
      field: 'Associated symptoms',
      prompt: 'What else do you feel along with the fever?',
      native: 'बुखार के साथ और क्या है?',
      type: 'multi',
      options: [
        { id: 'rash', label: 'Rash', native: 'दाने' },
        { id: 'urine', label: 'Burning urine', native: 'पेशाब में जलन' },
        { id: 'loose', label: 'Loose motions', native: 'दस्त' },
        { id: 'neck', label: 'Neck stiffness or confusion', native: 'गर्दन अकड़न / भ्रम', redFlag: true },
        { id: 'bleeding', label: 'Bleeding from gums or nose', native: 'खून बहना', redFlag: true },
        { id: 'none', label: 'Only fever', native: 'सिर्फ बुखार' },
      ],
      voiceSample: 'Sir dard bahut hai aur badan mein dard bhi ho raha hai.',
    },
    {
      id: 'fv-travel',
      section: 'hpi',
      field: 'Context',
      prompt: 'Anything relevant in the last 2 weeks?',
      native: 'पिछले 2 हफ्तों में कुछ हुआ?',
      type: 'multi',
      options: [
        { id: 'travel', label: 'Travelled out of town', native: 'बाहर गया' },
        { id: 'mosquito', label: 'Mosquitoes / dengue in area', native: 'मच्छर / डेंगू' },
        { id: 'contact', label: 'Someone at home had fever', native: 'घर में किसी को बुखार' },
        { id: 'none', label: 'Nothing', native: 'कुछ नहीं' },
      ],
      voiceSample: 'Mohalle mein dengue faila hua hai, padosi ko bhi hua tha.',
    },
  ],
  'abdominal-pain': [
    {
      id: 'ab-site',
      section: 'hpi',
      field: 'Site',
      prompt: 'Point to where the pain is worst.',
      native: 'दर्द सबसे ज़्यादा कहाँ है?',
      type: 'single',
      options: [
        { id: 'upper', label: 'Upper stomach, centre', native: 'ऊपर बीच में' },
        { id: 'ruq', label: 'Right upper side', native: 'दाहिनी ऊपर' },
        { id: 'rif', label: 'Right lower side', native: 'दाहिनी नीचे', redFlag: true },
        { id: 'lower', label: 'Lower stomach', native: 'नीचे' },
        { id: 'all', label: 'All over', native: 'पूरे पेट में', redFlag: true },
      ],
      voiceSample: 'Pet ke upar beech mein dard hota hai, khaane ke baad.',
    },
    {
      id: 'ab-relation',
      section: 'hpi',
      field: 'Relation to food',
      prompt: 'How is the pain related to food?',
      native: 'दर्द खाने से कैसे जुड़ा है?',
      type: 'single',
      options: [
        { id: 'before', label: 'Worse on empty stomach', native: 'खाली पेट ज़्यादा' },
        { id: 'after', label: 'Worse after eating', native: 'खाने के बाद' },
        { id: 'fatty', label: 'After oily food', native: 'तेल वाले खाने के बाद' },
        { id: 'none', label: 'No relation', native: 'कोई संबंध नहीं' },
      ],
      voiceSample: 'Tel wala khana khane ke baad dard shuru hota hai.',
    },
    {
      id: 'ab-bowel',
      section: 'hpi',
      field: 'Bowel & vomiting',
      prompt: 'Any of these along with the pain?',
      native: 'दर्द के साथ इनमें से कुछ?',
      type: 'multi',
      options: [
        { id: 'vomiting', label: 'Vomiting', native: 'उल्टी' },
        { id: 'constipation', label: 'No stool or gas passing', native: 'कब्ज़ / गैस नहीं', redFlag: true },
        { id: 'loose', label: 'Loose motions', native: 'दस्त' },
        { id: 'blood', label: 'Black or bloody stool', native: 'काला / खूनी मल', redFlag: true },
        { id: 'jaundice', label: 'Yellow eyes', native: 'आँखें पीली', redFlag: true },
        { id: 'none', label: 'None', native: 'कोई नहीं' },
      ],
      voiceSample: 'Ulti do baar hui, do din se pet saaf nahi hua.',
    },
    {
      id: 'ab-severity',
      section: 'hpi',
      field: 'Severity',
      prompt: 'How bad is the pain at its worst?',
      native: 'दर्द सबसे ज़्यादा कितना होता है?',
      type: 'scale',
      scale: { min: 1, max: 10, minLabel: 'Mild', maxLabel: 'Worst ever' },
      voiceSample: 'Dard bahut tez hai, jhuk kar baithna padta hai.',
    },
  ],
  headache: [
    {
      id: 'hd-onset',
      section: 'hpi',
      field: 'Onset',
      prompt: 'How did the headache begin?',
      native: 'सिर दर्द कैसे शुरू हुआ?',
      type: 'single',
      options: [
        { id: 'thunderclap', label: 'Suddenly, like a blow', native: 'अचानक, जैसे वार', redFlag: true },
        { id: 'gradual', label: 'Slowly over days', native: 'धीरे-धीरे' },
        { id: 'chronic', label: 'Off and on for months', native: 'महीनों से रुक-रुक कर' },
      ],
      voiceSample: 'Achanak bahut tez sir dard shuru hua, jaise dhamaka hua.',
    },
    {
      id: 'hd-site',
      section: 'hpi',
      field: 'Site & character',
      prompt: 'Where and how does it hurt?',
      native: 'कहाँ और कैसा दर्द है?',
      type: 'single',
      options: [
        { id: 'one-side', label: 'One side, throbbing', native: 'एक तरफ, धड़कता' },
        { id: 'band', label: 'Band around the head', native: 'सिर के चारों ओर' },
        { id: 'back', label: 'Back of head and neck', native: 'पीछे और गर्दन' },
        { id: 'eye', label: 'Around one eye', native: 'एक आँख के आसपास' },
      ],
      voiceSample: 'Ek taraf sir mein dard hota hai, dhadakta hua.',
    },
    {
      id: 'hd-redflags',
      section: 'hpi',
      field: 'Neurological features',
      prompt: 'Any of these with the headache?',
      native: 'सिर दर्द के साथ इनमें से कुछ?',
      type: 'multi',
      options: [
        { id: 'vomiting', label: 'Projectile vomiting', native: 'तेज़ उल्टी', redFlag: true },
        { id: 'vision', label: 'Blurred or double vision', native: 'धुंधला दिखना', redFlag: true },
        { id: 'weakness', label: 'Weakness of arm or leg', native: 'हाथ-पैर में कमज़ोरी', redFlag: true },
        { id: 'speech', label: 'Slurred speech', native: 'बोलने में दिक्कत', redFlag: true },
        { id: 'fits', label: 'Fits / blackout', native: 'दौरा / बेहोशी', redFlag: true },
        { id: 'aura', label: 'Flashing lights before it starts', native: 'रोशनी दिखना' },
        { id: 'none', label: 'None of these', native: 'कोई नहीं' },
      ],
      voiceSample: 'Ulti ho rahi hai aur dhundhla dikh raha hai.',
    },
  ],
  'joint-pain': [
    {
      id: 'jp-site',
      section: 'hpi',
      field: 'Distribution',
      prompt: 'Which joints hurt?',
      native: 'कौन से जोड़ों में दर्द है?',
      type: 'multi',
      options: [
        { id: 'knee', label: 'Knees', native: 'घुटने' },
        { id: 'lowback', label: 'Lower back', native: 'कमर' },
        { id: 'small', label: 'Fingers and wrists', native: 'उंगलियाँ / कलाई' },
        { id: 'shoulder', label: 'Shoulders', native: 'कंधे' },
        { id: 'all', label: 'Many joints together', native: 'कई जोड़' },
      ],
      voiceSample: 'Dono ghutno mein dard hai, subah uthne mein dikkat hoti hai.',
    },
    {
      id: 'jp-stiffness',
      section: 'hpi',
      field: 'Morning stiffness',
      prompt: 'Are the joints stiff in the morning?',
      native: 'सुबह जोड़ अकड़ते हैं?',
      type: 'single',
      options: [
        { id: 'none', label: 'Not stiff', native: 'नहीं' },
        { id: 'short', label: 'Less than 30 minutes', native: '30 मिनट से कम' },
        { id: 'long', label: 'More than an hour', native: 'एक घंटे से ज़्यादा' },
      ],
      voiceSample: 'Subah ek ghante tak jodo mein akdan rehti hai.',
    },
    {
      id: 'jp-features',
      section: 'hpi',
      field: 'Local features',
      prompt: 'Any of these in the painful joints?',
      native: 'दर्द वाले जोड़ों में इनमें से कुछ?',
      type: 'multi',
      options: [
        { id: 'swelling', label: 'Swelling', native: 'सूजन' },
        { id: 'redness', label: 'Redness and heat', native: 'लाली और गर्मी', redFlag: true },
        { id: 'lock', label: 'Joint gets locked', native: 'जोड़ जाम हो जाता' },
        { id: 'numb', label: 'Numbness down the leg', native: 'पैर में सुन्नपन', redFlag: true },
        { id: 'none', label: 'Only pain', native: 'सिर्फ दर्द' },
      ],
      voiceSample: 'Ghutne mein sujan bhi hai aur chalne mein awaaz aati hai.',
    },
  ],
  dizziness: [
    {
      id: 'dz-type',
      section: 'hpi',
      field: 'Type',
      prompt: 'What exactly do you feel?',
      native: 'आपको ठीक क्या महसूस होता है?',
      type: 'single',
      options: [
        { id: 'spinning', label: 'Room spinning around', native: 'चक्कर आना' },
        { id: 'faint', label: 'About to faint', native: 'बेहोशी जैसा', redFlag: true },
        { id: 'weak', label: 'General weakness', native: 'कमज़ोरी' },
        { id: 'unsteady', label: 'Unsteady while walking', native: 'चलते समय लड़खड़ाना' },
      ],
      voiceSample: 'Uthne par sab kuch ghoomta hai, girne jaisa lagta hai.',
    },
    {
      id: 'dz-context',
      section: 'hpi',
      field: 'Trigger',
      prompt: 'When does it happen?',
      native: 'यह कब होता है?',
      type: 'single',
      options: [
        { id: 'standing', label: 'On standing up quickly', native: 'जल्दी उठने पर' },
        { id: 'head', label: 'On turning the head', native: 'सिर घुमाने पर' },
        { id: 'fasting', label: 'When I have not eaten', native: 'भूखे रहने पर' },
        { id: 'anytime', label: 'Any time', native: 'कभी भी' },
      ],
      voiceSample: 'Jab bhi tezi se uthta hoon tab chakkar aata hai.',
    },
    {
      id: 'dz-assoc',
      section: 'hpi',
      field: 'Associated symptoms',
      prompt: 'Any of these along with it?',
      native: 'साथ में इनमें से कुछ?',
      type: 'multi',
      options: [
        { id: 'pallor', label: 'Looking pale', native: 'पीलापन' },
        { id: 'palpitation', label: 'Fast heartbeat', native: 'धड़कन तेज़' },
        { id: 'blackout', label: 'Actually fainted', native: 'बेहोश हो गया', redFlag: true },
        { id: 'melena', label: 'Black stool', native: 'काला मल', redFlag: true },
        { id: 'none', label: 'None', native: 'कोई नहीं' },
      ],
      voiceSample: 'Dhadkan tez ho jaati hai aur haath-pair thande pad jaate hain.',
    },
  ],
  skin: [
    {
      id: 'sk-type',
      section: 'hpi',
      field: 'Lesion type',
      prompt: 'What does the skin problem look like?',
      native: 'त्वचा की समस्या कैसी दिखती है?',
      type: 'single',
      options: [
        { id: 'itchy-rash', label: 'Itchy red patches', native: 'खुजली वाले लाल चकत्ते' },
        { id: 'ring', label: 'Ring-shaped patches', native: 'गोल छल्ले' },
        { id: 'blister', label: 'Water-filled blisters', native: 'पानी वाले फफोले' },
        { id: 'ulcer', label: 'A wound that will not heal', native: 'न भरने वाला घाव', redFlag: true },
        { id: 'white', label: 'White patches', native: 'सफेद दाग' },
      ],
      voiceSample: 'Haath aur pair par khujli wale laal chakatte ho gaye hain.',
    },
    {
      id: 'sk-duration',
      section: 'hpi',
      field: 'Duration',
      prompt: 'Since when?',
      native: 'कब से?',
      type: 'single',
      options: [
        { id: 'days', label: 'A few days', native: 'कुछ दिन' },
        { id: 'weeks', label: 'A few weeks', native: 'कुछ हफ्ते' },
        { id: 'months', label: 'Months or years', native: 'महीनों / सालों से' },
      ],
      voiceSample: 'Do hafte se hai, dawa lagayi lekin faayda nahi hua.',
    },
    {
      id: 'sk-spread',
      section: 'hpi',
      field: 'Associated features',
      prompt: 'Any of these?',
      native: 'इनमें से कुछ?',
      type: 'multi',
      options: [
        { id: 'family', label: 'Others at home also have it', native: 'घर में और लोगों को भी' },
        { id: 'fever', label: 'Fever with it', native: 'बुखार भी', redFlag: true },
        { id: 'pus', label: 'Pus discharge', native: 'पीप निकलना' },
        { id: 'new-drug', label: 'Started after a new medicine', native: 'नई दवा के बाद', redFlag: true },
        { id: 'none', label: 'None', native: 'कोई नहीं' },
      ],
      voiceSample: 'Ghar mein bachche ko bhi aisa hi ho gaya hai.',
    },
  ],
}

export const AYUSH_QUESTIONS: Question[] = [
  {
    id: 'ay-prakriti',
    section: 'ayush',
    field: 'Prakriti',
    prompt: 'Which describes your body and nature best?',
    native: 'आपकी प्रकृति क्या है?',
    helper: 'Prakriti — constitutional assessment',
    type: 'single',
    options: [
      { id: 'vata', label: 'Thin, dry skin, quick, restless sleep', native: 'वात' },
      { id: 'pitta', label: 'Medium build, warm, sharp appetite, irritable', native: 'पित्त' },
      { id: 'kapha', label: 'Heavy build, oily skin, calm, slow digestion', native: 'कफ' },
      { id: 'mixed', label: 'A mix of these', native: 'मिश्रित' },
    ],
    voiceSample: 'Shareer patla hai, twacha rukhi rehti hai, neend halki hai.',
  },
  {
    id: 'ay-agni',
    section: 'ayush',
    field: 'Agni',
    prompt: 'How is your digestion and hunger?',
    native: 'अग्नि — पाचन कैसा है?',
    helper: 'Agni & Ahara Shakti — digestive capacity',
    type: 'single',
    options: [
      { id: 'sama', label: 'Regular hunger, food digests well', native: 'सम अग्नि' },
      { id: 'vishama', label: 'Irregular — sometimes strong, sometimes none', native: 'विषम अग्नि' },
      { id: 'tikshna', label: 'Very strong, hungry soon after eating', native: 'तीक्ष्ण अग्नि' },
      { id: 'manda', label: 'Weak, heaviness after meals', native: 'मंद अग्नि' },
    ],
    voiceSample: 'Khaane ke baad bhaari lagta hai, gas banti hai.',
  },
  {
    id: 'ay-koshtha',
    section: 'ayush',
    field: 'Koshtha',
    prompt: 'How are your bowels normally?',
    native: 'कोष्ठ — मल त्याग कैसा है?',
    helper: 'Koshtha — bowel nature',
    type: 'single',
    options: [
      { id: 'mridu', label: 'Soft, passes easily, sometimes twice a day', native: 'मृदु' },
      { id: 'madhyama', label: 'Once daily, normal', native: 'मध्यम' },
      { id: 'krura', label: 'Hard, needs effort or laxative', native: 'क्रूर' },
    ],
    voiceSample: 'Pet saaf nahi hota, do din mein ek baar jaata hoon.',
  },
  {
    id: 'ay-bala',
    section: 'ayush',
    field: 'Sara / Samhanana / Bala',
    prompt: 'How is your physical strength and stamina?',
    native: 'बल — शारीरिक क्षमता कैसी है?',
    helper: 'Sara, Samhanana, Vyayama Shakti — tissue quality, build, exercise tolerance',
    type: 'single',
    options: [
      { id: 'pravara', label: 'Strong — can do heavy work all day', native: 'प्रवर' },
      { id: 'madhyama', label: 'Moderate — tire by evening', native: 'मध्यम' },
      { id: 'avara', label: 'Weak — tire with small tasks', native: 'अवर' },
    ],
    voiceSample: 'Pehle jaisa bal nahi raha, thoda kaam karne se thak jaata hoon.',
  },
  {
    id: 'ay-satmya',
    section: 'ayush',
    field: 'Satmya & Ahara-Vihara',
    prompt: 'What is your usual diet and routine?',
    native: 'सात्म्य एवं आहार-विहार',
    helper: 'Satmya, Ahara-Vihara — habituation, diet and lifestyle',
    type: 'multi',
    options: [
      { id: 'veg', label: 'Vegetarian', native: 'शाकाहारी' },
      { id: 'spicy', label: 'Spicy and fried food often', native: 'तीखा / तला' },
      { id: 'irregular', label: 'Irregular meal timings', native: 'अनियमित समय' },
      { id: 'night', label: 'Late nights / night shift', native: 'रात्रि जागरण' },
      { id: 'sedentary', label: 'Very little physical activity', native: 'शारीरिक श्रम कम' },
      { id: 'day-sleep', label: 'Sleep in the afternoon', native: 'दिवा स्वप्न' },
    ],
    voiceSample: 'Shakahari hoon, par khaane ka samay nishchit nahi rehta.',
  },
  {
    id: 'ay-sattva',
    section: 'ayush',
    field: 'Sattva',
    prompt: 'How do you usually handle stress and pain?',
    native: 'सत्त्व — मानसिक बल',
    helper: 'Sattva — mental strength',
    type: 'single',
    options: [
      { id: 'pravara', label: 'Stay calm, bear it well', native: 'प्रवर सत्त्व' },
      { id: 'madhyama', label: 'Get disturbed but manage', native: 'मध्यम सत्त्व' },
      { id: 'avara', label: 'Get very anxious quickly', native: 'अवर सत्त्व' },
    ],
    voiceSample: 'Chinta bahut hoti hai, mann ashant rehta hai.',
  },
  {
    id: 'ay-nidana',
    section: 'ayush',
    field: 'Nidana',
    prompt: 'What do you think brought this problem on?',
    native: 'निदान — कारण क्या लगता है?',
    helper: 'Nidana — causative factors',
    type: 'multi',
    options: [
      { id: 'ahara', label: 'Wrong food', native: 'आहार' },
      { id: 'season', label: 'Change of season', native: 'ऋतु परिवर्तन' },
      { id: 'stress', label: 'Mental stress', native: 'मानसिक तनाव' },
      { id: 'exertion', label: 'Heavy physical work', native: 'अति परिश्रम' },
      { id: 'suppression', label: 'Holding back natural urges', native: 'वेग धारण' },
      { id: 'unknown', label: 'Not sure', native: 'पता नहीं' },
    ],
    voiceSample: 'Shaadi ke baad se khaan-paan bigad gaya, tanaav bhi bahut hai.',
  },
]

export function buildQuestionSet(complaint: ComplaintId, department: Department): Question[] {
  const hpi = HPI_BY_COMPLAINT[complaint] ?? []
  return department === 'ayurveda'
    ? [...hpi, ...CORE_TAIL, ...AYUSH_QUESTIONS]
    : [...hpi, ...CORE_TAIL]
}

export type ScannedDoc = {
  id: string
  kind: 'Prescription' | 'Lab report' | 'Discharge summary' | 'Imaging'
  title: string
  source: string
  date: string
  handwritten: boolean
  confidence: number
  extracted: { label: string; value: string; abnormal?: boolean }[]
}

export const AVAILABLE_DOCS: ScannedDoc[] = [
  {
    id: 'doc-1',
    kind: 'Prescription',
    title: 'OPD prescription — Medicine dept',
    source: 'District Hospital, Kanpur',
    date: '2026-06-14',
    handwritten: true,
    confidence: 0.91,
    extracted: [
      { label: 'Diagnosis', value: 'Type 2 Diabetes Mellitus, Hypertension' },
      { label: 'Tab Metformin', value: '500 mg — twice daily' },
      { label: 'Tab Telmisartan', value: '40 mg — once daily' },
      { label: 'Advice', value: 'Review after 3 months with FBS, HbA1c' },
    ],
  },
  {
    id: 'doc-2',
    kind: 'Lab report',
    title: 'Biochemistry panel',
    source: 'Pathkind Labs',
    date: '2026-08-02',
    handwritten: false,
    confidence: 0.98,
    extracted: [
      { label: 'HbA1c', value: '8.9 % (ref 4.0–5.6)', abnormal: true },
      { label: 'Fasting glucose', value: '184 mg/dL (ref 70–100)', abnormal: true },
      { label: 'Creatinine', value: '1.4 mg/dL (ref 0.7–1.3)', abnormal: true },
      { label: 'Haemoglobin', value: '11.2 g/dL (ref 13–17)', abnormal: true },
      { label: 'Total cholesterol', value: '196 mg/dL (ref <200)' },
    ],
  },
  {
    id: 'doc-3',
    kind: 'Discharge summary',
    title: 'Discharge summary — Surgery',
    source: 'GSVM Medical College',
    date: '2024-11-09',
    handwritten: false,
    confidence: 0.96,
    extracted: [
      { label: 'Procedure', value: 'Laparoscopic cholecystectomy' },
      { label: 'Post-op course', value: 'Uneventful, discharged day 2' },
      { label: 'Histopathology', value: 'Chronic cholecystitis' },
    ],
  },
  {
    id: 'doc-4',
    kind: 'Imaging',
    title: 'Chest X-ray PA view',
    source: 'District Hospital, Kanpur',
    date: '2026-07-21',
    handwritten: false,
    confidence: 0.94,
    extracted: [
      { label: 'Findings', value: 'Mild cardiomegaly, clear lung fields' },
      { label: 'Impression', value: 'No active parenchymal lesion' },
    ],
  },
]
