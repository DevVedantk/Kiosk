import type { LanguageCode } from '@/lib/kiosk-data'

/**
 * UI chrome translations for the kiosk shell. Clinical question text is not
 * translated here — that copy is served by the backend once it is wired up.
 */
export type UiKey =
  | 'continue'
  | 'back'
  | 'callStaff'
  | 'readAloud'
  | 'biggerText'
  | 'startOver'
  | 'stepOf'
  | 'language'
  | 'identify'
  | 'consent'
  | 'department'
  | 'complaint'
  | 'interview'
  | 'documents'
  | 'review'
  | 'token'
  | 'chooseLanguage'
  | 'whoIsVisiting'
  | 'yourPermission'
  | 'whichDepartment'
  | 'whatBringsYou'
  | 'tellUsMore'
  | 'scanDocuments'
  | 'checkAnswers'
  | 'youAreInQueue'
  | 'skip'
  | 'yes'
  | 'no'
  | 'notSure'

type Dict = Record<UiKey, string>

const en: Dict = {
  continue: 'Continue',
  back: 'Back',
  callStaff: 'Call staff',
  readAloud: 'Read aloud',
  biggerText: 'Bigger text',
  startOver: 'Start over',
  stepOf: 'Step',
  language: 'Language',
  identify: 'Identify',
  consent: 'Consent',
  department: 'Department',
  complaint: 'Complaint',
  interview: 'Interview',
  documents: 'Documents',
  review: 'Review',
  token: 'Token',
  chooseLanguage: 'Choose your language',
  whoIsVisiting: 'Who is visiting today?',
  yourPermission: 'Your permission',
  whichDepartment: 'Which department?',
  whatBringsYou: 'What brings you in today?',
  tellUsMore: 'Tell us more',
  scanDocuments: 'Scan your documents',
  checkAnswers: 'Check your answers',
  youAreInQueue: 'You are in the queue',
  skip: 'Skip',
  yes: 'Yes',
  no: 'No',
  notSure: 'Not sure',
}

const hi: Dict = {
  continue: 'आगे बढ़ें',
  back: 'पीछे',
  callStaff: 'स्टाफ़ को बुलाएँ',
  readAloud: 'पढ़कर सुनाएँ',
  biggerText: 'बड़े अक्षर',
  startOver: 'फिर से शुरू करें',
  stepOf: 'चरण',
  language: 'भाषा',
  identify: 'पहचान',
  consent: 'सहमति',
  department: 'विभाग',
  complaint: 'शिकायत',
  interview: 'बातचीत',
  documents: 'कागज़ात',
  review: 'जाँच',
  token: 'टोकन',
  chooseLanguage: 'अपनी भाषा चुनें',
  whoIsVisiting: 'आज कौन आया है?',
  yourPermission: 'आपकी अनुमति',
  whichDepartment: 'कौन सा विभाग?',
  whatBringsYou: 'आज क्या तकलीफ़ है?',
  tellUsMore: 'और बताइए',
  scanDocuments: 'अपने कागज़ात स्कैन करें',
  checkAnswers: 'अपने जवाब जाँचें',
  youAreInQueue: 'आप कतार में हैं',
  skip: 'छोड़ें',
  yes: 'हाँ',
  no: 'नहीं',
  notSure: 'पता नहीं',
}

const bn: Dict = {
  continue: 'এগিয়ে যান',
  back: 'পিছনে',
  callStaff: 'কর্মীকে ডাকুন',
  readAloud: 'পড়ে শোনান',
  biggerText: 'বড় লেখা',
  startOver: 'আবার শুরু করুন',
  stepOf: 'ধাপ',
  language: 'ভাষা',
  identify: 'পরিচয়',
  consent: 'সম্মতি',
  department: 'বিভাগ',
  complaint: 'সমস্যা',
  interview: 'কথাবার্তা',
  documents: 'কাগজপত্র',
  review: 'যাচাই',
  token: 'টোকেন',
  chooseLanguage: 'আপনার ভাষা বাছুন',
  whoIsVisiting: 'আজ কে এসেছেন?',
  yourPermission: 'আপনার অনুমতি',
  whichDepartment: 'কোন বিভাগ?',
  whatBringsYou: 'আজ কী সমস্যা?',
  tellUsMore: 'আরও বলুন',
  scanDocuments: 'কাগজপত্র স্ক্যান করুন',
  checkAnswers: 'উত্তরগুলি দেখে নিন',
  youAreInQueue: 'আপনি সারিতে আছেন',
  skip: 'বাদ দিন',
  yes: 'হ্যাঁ',
  no: 'না',
  notSure: 'জানি না',
}

const mr: Dict = {
  continue: 'पुढे जा',
  back: 'मागे',
  callStaff: 'कर्मचाऱ्याला बोलवा',
  readAloud: 'वाचून दाखवा',
  biggerText: 'मोठी अक्षरे',
  startOver: 'पुन्हा सुरू करा',
  stepOf: 'टप्पा',
  language: 'भाषा',
  identify: 'ओळख',
  consent: 'संमती',
  department: 'विभाग',
  complaint: 'तक्रार',
  interview: 'संवाद',
  documents: 'कागदपत्रे',
  review: 'तपासणी',
  token: 'टोकन',
  chooseLanguage: 'तुमची भाषा निवडा',
  whoIsVisiting: 'आज कोण आले आहे?',
  yourPermission: 'तुमची परवानगी',
  whichDepartment: 'कोणता विभाग?',
  whatBringsYou: 'आज काय त्रास होतो?',
  tellUsMore: 'अधिक सांगा',
  scanDocuments: 'तुमची कागदपत्रे स्कॅन करा',
  checkAnswers: 'तुमची उत्तरे तपासा',
  youAreInQueue: 'तुम्ही रांगेत आहात',
  skip: 'वगळा',
  yes: 'होय',
  no: 'नाही',
  notSure: 'माहित नाही',
}

const ta: Dict = {
  continue: 'தொடரவும்',
  back: 'பின்செல்',
  callStaff: 'பணியாளரை அழைக்க',
  readAloud: 'படித்துக் காட்டு',
  biggerText: 'பெரிய எழுத்து',
  startOver: 'மீண்டும் தொடங்கு',
  stepOf: 'படி',
  language: 'மொழி',
  identify: 'அடையாளம்',
  consent: 'ஒப்புதல்',
  department: 'பிரிவு',
  complaint: 'பிரச்சினை',
  interview: 'உரையாடல்',
  documents: 'ஆவணங்கள்',
  review: 'சரிபார்ப்பு',
  token: 'டோக்கன்',
  chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுங்கள்',
  whoIsVisiting: 'இன்று யார் வந்திருக்கிறார்கள்?',
  yourPermission: 'உங்கள் அனுமதி',
  whichDepartment: 'எந்தப் பிரிவு?',
  whatBringsYou: 'இன்று என்ன பிரச்சினை?',
  tellUsMore: 'மேலும் சொல்லுங்கள்',
  scanDocuments: 'ஆவணங்களை ஸ்கேன் செய்யுங்கள்',
  checkAnswers: 'பதில்களைச் சரிபார்க்கவும்',
  youAreInQueue: 'நீங்கள் வரிசையில் உள்ளீர்கள்',
  skip: 'தவிர்',
  yes: 'ஆம்',
  no: 'இல்லை',
  notSure: 'தெரியவில்லை',
}

const te: Dict = {
  continue: 'కొనసాగించు',
  back: 'వెనుకకు',
  callStaff: 'సిబ్బందిని పిలవండి',
  readAloud: 'చదివి వినిపించు',
  biggerText: 'పెద్ద అక్షరాలు',
  startOver: 'మళ్లీ మొదలుపెట్టు',
  stepOf: 'దశ',
  language: 'భాష',
  identify: 'గుర్తింపు',
  consent: 'అనుమతి',
  department: 'విభాగం',
  complaint: 'సమస్య',
  interview: 'సంభాషణ',
  documents: 'పత్రాలు',
  review: 'పరిశీలన',
  token: 'టోకెన్',
  chooseLanguage: 'మీ భాషను ఎంచుకోండి',
  whoIsVisiting: 'ఈరోజు ఎవరు వచ్చారు?',
  yourPermission: 'మీ అనుమతి',
  whichDepartment: 'ఏ విభాగం?',
  whatBringsYou: 'ఈరోజు ఏమి సమస్య?',
  tellUsMore: 'మరింత చెప్పండి',
  scanDocuments: 'మీ పత్రాలను స్కాన్ చేయండి',
  checkAnswers: 'మీ సమాధానాలను చూడండి',
  youAreInQueue: 'మీరు వరుసలో ఉన్నారు',
  skip: 'వదిలేయి',
  yes: 'అవును',
  no: 'కాదు',
  notSure: 'తెలియదు',
}

const kn: Dict = {
  continue: 'ಮುಂದುವರಿಸಿ',
  back: 'ಹಿಂದೆ',
  callStaff: 'ಸಿಬ್ಬಂದಿಯನ್ನು ಕರೆಯಿರಿ',
  readAloud: 'ಓದಿ ಹೇಳಿ',
  biggerText: 'ದೊಡ್ಡ ಅಕ್ಷರ',
  startOver: 'ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ',
  stepOf: 'ಹಂತ',
  language: 'ಭಾಷೆ',
  identify: 'ಗುರುತು',
  consent: 'ಸಮ್ಮತಿ',
  department: 'ವಿಭಾಗ',
  complaint: 'ತೊಂದರೆ',
  interview: 'ಸಂಭಾಷಣೆ',
  documents: 'ದಾಖಲೆಗಳು',
  review: 'ಪರಿಶೀಲನೆ',
  token: 'ಟೋಕನ್',
  chooseLanguage: 'ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ',
  whoIsVisiting: 'ಇಂದು ಯಾರು ಬಂದಿದ್ದಾರೆ?',
  yourPermission: 'ನಿಮ್ಮ ಅನುಮತಿ',
  whichDepartment: 'ಯಾವ ವಿಭಾಗ?',
  whatBringsYou: 'ಇಂದು ಏನು ತೊಂದರೆ?',
  tellUsMore: 'ಇನ್ನಷ್ಟು ಹೇಳಿ',
  scanDocuments: 'ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
  checkAnswers: 'ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
  youAreInQueue: 'ನೀವು ಸರತಿಯಲ್ಲಿದ್ದೀರಿ',
  skip: 'ಬಿಟ್ಟುಬಿಡಿ',
  yes: 'ಹೌದು',
  no: 'ಇಲ್ಲ',
  notSure: 'ಗೊತ್ತಿಲ್ಲ',
}

const gu: Dict = {
  continue: 'આગળ વધો',
  back: 'પાછળ',
  callStaff: 'સ્ટાફને બોલાવો',
  readAloud: 'વાંચી સંભળાવો',
  biggerText: 'મોટા અક્ષર',
  startOver: 'ફરી શરૂ કરો',
  stepOf: 'પગલું',
  language: 'ભાષા',
  identify: 'ઓળખ',
  consent: 'સંમતિ',
  department: 'વિભાગ',
  complaint: 'તકલીફ',
  interview: 'વાતચીત',
  documents: 'કાગળો',
  review: 'ચકાસણી',
  token: 'ટોકન',
  chooseLanguage: 'તમારી ભાષા પસંદ કરો',
  whoIsVisiting: 'આજે કોણ આવ્યું છે?',
  yourPermission: 'તમારી પરવાનગી',
  whichDepartment: 'કયો વિભાગ?',
  whatBringsYou: 'આજે શું તકલીફ છે?',
  tellUsMore: 'વધુ કહો',
  scanDocuments: 'તમારા કાગળો સ્કેન કરો',
  checkAnswers: 'તમારા જવાબ ચકાસો',
  youAreInQueue: 'તમે કતારમાં છો',
  skip: 'છોડી દો',
  yes: 'હા',
  no: 'ના',
  notSure: 'ખબર નથી',
}

const DICTS: Record<LanguageCode, Dict> = { en, hi, bn, mr, ta, te, kn, gu }

/** BCP-47 tags used for speech synthesis and the `lang` attribute. */
export const BCP47: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  gu: 'gu-IN',
}

/** Primary label in the patient's chosen language. */
export function t(lang: LanguageCode, key: UiKey): string {
  return DICTS[lang][key]
}

/**
 * Secondary line shown under English UI copy. Returns null for English so the
 * same string is never printed twice.
 */
export function nativeLine(lang: LanguageCode, key: UiKey): string | null {
  if (lang === 'en') return null
  return DICTS[lang][key]
}
