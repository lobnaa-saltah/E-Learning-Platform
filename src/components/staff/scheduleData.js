export const INITIAL_PROGRAM_TYPES = {
  DIPLOMA: 'diploma',
  SHORT_COURSE: 'short_course',
};

export const INITIAL_TERMS = [
  'الفصل التدريبي الأول 1448 هـ',
  'الفصل التدريبي الثاني 1448 هـ',
  'الفصل التدريبي الصيفي 1448 هـ',
];

export const DIPLOMA_SECTIONS = [
  'شعبة 101',
  'شعبة 105',
  'شعبة 103',
  'شعبة 102',
  'شعبة 104',
];

export const SHORT_COURSE_SECTIONS = [
  'شعبة دورة مسائية A',
  'شعبة دورة مسائية B',
  'شعبة مكثفة عطلة نهاية الأسبوع',
];

export const DIPLOMA_COURSES = [
  {
    id: 'c-web',
    code: 'WEB-301',
    name: 'تطوير تطبيقات الويب الحديثة',
    creditHours: 4,
    color: '#262262',
    accentColor: '#EFB144',
    bgClass: 'bg-[#262262] text-white',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-200',
  },
  {
    id: 'c-db',
    code: 'DB-204',
    name: 'قواعد البيانات العلائقية والمتقدمة',
    creditHours: 3,
    color: '#0D9488',
    accentColor: '#5EEAD4',
    bgClass: 'bg-[#0D9488] text-white',
    badgeClass: 'bg-teal-100 text-teal-900 border-teal-200',
  },
  {
    id: 'c-sec',
    code: 'SEC-305',
    name: 'الأمن السيبراني وحماية الشبكات',
    creditHours: 3,
    color: '#B91C1C',
    accentColor: '#FCA5A5',
    bgClass: 'bg-[#B91C1C] text-white',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-200',
  },
  {
    id: 'c-prg',
    code: 'PRG-102',
    name: 'البرمجة الشيئية وتراكيب البيانات',
    creditHours: 4,
    color: '#4338CA',
    accentColor: '#A5B4FC',
    bgClass: 'bg-[#4338CA] text-white',
    badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-200',
  },
  {
    id: 'c-sys',
    code: 'SYS-201',
    name: 'تحليل وتصميم النظم البرمجية',
    creditHours: 3,
    color: '#C2410C',
    accentColor: '#FDBA74',
    bgClass: 'bg-[#C2410C] text-white',
    badgeClass: 'bg-orange-100 text-orange-900 border-orange-200',
  },
];

export const SHORT_COURSES = [
  {
    id: 'sc-ai',
    code: 'AI-100',
    name: 'دورة تطبيقات الذكاء الاصطناعي التوليدي',
    creditHours: 30,
    color: '#1E1B4B',
    accentColor: '#EFB144',
    bgClass: 'bg-[#1E1B4B] text-white',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-200',
  },
  {
    id: 'sc-cloud',
    code: 'CLOUD-200',
    name: 'معسكر الحوسبة السحابية وأمن البنية التحتية',
    creditHours: 40,
    color: '#0F766E',
    accentColor: '#2DD4BF',
    bgClass: 'bg-[#0F766E] text-white',
    badgeClass: 'bg-teal-100 text-teal-900 border-teal-200',
  },
  {
    id: 'sc-pmp',
    code: 'PMP-300',
    name: 'دورة إدارة المشاريع الاحترافية PMP',
    creditHours: 35,
    color: '#0369A1',
    accentColor: '#38BDF8',
    bgClass: 'bg-[#0369A1] text-white',
    badgeClass: 'bg-sky-100 text-sky-900 border-sky-200',
  },
];

export const TRAINERS_LIST = [
  { id: 'tr-1', name: 'د. فيصل إبراهيم الشهري', specialization: 'تقنية الويب وهندسة البرمجيات' },
  { id: 'tr-2', name: 'د. سارة خالد القرني', specialization: 'قواعد البيانات ونظم المعلومات' },
  { id: 'tr-3', name: 'م. راكان طلال السلمي', specialization: 'الأمن السيبراني وشبكات الحاسب' },
  { id: 'tr-4', name: 'أ. مها عبد العزيز المطيري', specialization: 'البرمجة والخوارزميات' },
  { id: 'tr-5', name: 'د. وليد أحمد السبيعي', specialization: 'الذكاء الاصطناعي وتحليل البيانات' },
];

export const INITIAL_SCHEDULED_LECTURES = [
  {
    id: 'lec-101',
    lectureNumber: 1,
    courseCode: 'WEB-301',
    courseName: 'تطوير تطبيقات الويب الحديثة',
    date: '2026-11-01',
    startTime: '05:00 م',
    endTime: '06:00 م',
    startMinutes: 1020,
    endMinutes: 1080,
    trainerName: 'د. فيصل إبراهيم الشهري',
    section: 'شعبة 101',
    isCombined: false,
    combinedSection: '',
    programType: 'diploma',
    term: 'الفصل التدريبي الأول 1448 هـ',
    status: 'confirmed',
    virtualRoomUrl: 'https://lms.uqt.edu.sa/v-room/WEB301-101-L1',
    roomCode: 'VR-8801',
  },
  {
    id: 'lec-102',
    lectureNumber: 2,
    courseCode: 'DB-204',
    courseName: 'قواعد البيانات العلائقية والمتقدمة',
    date: '2026-11-03',
    startTime: '06:30 م',
    endTime: '08:00 م',
    startMinutes: 1110,
    endMinutes: 1200,
    trainerName: 'أ. مها عبد العزيز المطيري',
    section: 'شعبة 103',
    isCombined: false,
    combinedSection: '',
    programType: 'diploma',
    term: 'الفصل التدريبي الأول 1448 هـ',
    status: 'confirmed',
    virtualRoomUrl: 'https://lms.uqt.edu.sa/v-room/DB204-103-L2',
    roomCode: 'VR-8802',
  },
  {
    id: 'lec-103',
    lectureNumber: 3,
    courseCode: 'SEC-305',
    courseName: 'الأمن السيبراني وحماية الشبكات',
    date: '2026-11-05',
    startTime: '07:00 م',
    endTime: '08:30 م',
    startMinutes: 1140,
    endMinutes: 1230,
    trainerName: 'م. راكان طلال السلمي',
    section: 'شعبة 104',
    isCombined: true,
    combinedSection: 'شعبة 106',
    programType: 'diploma',
    term: 'الفصل التدريبي الأول 1448 هـ',
    status: 'confirmed',
    virtualRoomUrl: 'https://lms.uqt.edu.sa/v-room/SEC305-104-106',
    roomCode: 'VR-8803',
  },
];

export const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const isPM = timeStr.includes('م') || timeStr.toUpperCase().includes('PM');
  const isAM = timeStr.includes('ص') || timeStr.toUpperCase().includes('AM');
  const cleaned = timeStr.replace(/[^\d:]/g, '').trim();
  const parts = cleaned.split(':');
  let h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;
  return h * 60 + m;
};

export const formatMinutesTo12h = (minutes) => {
  let h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h >= 12 ? 'م' : 'ص';
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  const mStr = m < 10 ? `0${m}` : `${m}`;
  const hStr = h < 10 ? `0${h}` : `${h}`;
  return `${hStr}:${mStr} ${period}`;
};

export const checkLectureConflict = ({
  lecturesList,
  newLectureDate,
  newStartMinutes,
  newEndMinutes,
  trainerName,
  section,
  isCombined,
  combinedSection,
  excludeId = null,
}) => {
  const targetSections = [section];
  if (isCombined && combinedSection) {
    targetSections.push(combinedSection);
  }

  const sameDayLectures = lecturesList.filter(
    (lec) => lec.date === newLectureDate && lec.id !== excludeId
  );

  for (const existing of sameDayLectures) {
    const isOverlapping =
      newStartMinutes < existing.endMinutes && existing.startMinutes < newEndMinutes;

    if (!isOverlapping) {
      continue;
    }

    if (existing.trainerName === trainerName) {
      return {
        hasConflict: true,
        type: 'trainer',
        message: `تعارض في جدول المدرب (${trainerName}): لديه محاضرة مسبقة لمقرر [${existing.courseName}] مع [${existing.section}] في نفس اليوم من ${existing.startTime} إلى ${existing.endTime}.`,
        conflictingLecture: existing,
      };
    }

    const existingSections = [existing.section];
    if (existing.isCombined && existing.combinedSection) {
      existingSections.push(existing.combinedSection);
    }

    const matchedSection = targetSections.find((sec) =>
      existingSections.includes(sec)
    );

    if (matchedSection) {
      return {
        hasConflict: true,
        type: 'section',
        message: `تعارض في جدول [${matchedSection}]: الشعبة لديها محاضرة مسبقة لمقرر [${existing.courseName}] يقدمها (${existing.trainerName}) في نفس اليوم من ${existing.startTime} إلى ${existing.endTime}.`,
        conflictingLecture: existing,
      };
    }
  }

  return { hasConflict: false };
};

export const addWeeksToDate = (baseDateStr, weeksCount) => {
  const dateObj = new Date(baseDateStr);
  dateObj.setDate(dateObj.getDate() + weeksCount * 7);
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const formatArabicDate = (dateStr) => {
  if (!dateStr) return '';
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const dayName = days[d.getDay()];
  const dayNum = d.getDate();
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();
  return `${dayName}، ${dayNum} ${monthName} ${year}`;
};

const STORAGE_KEY = 'lms_staff_scheduled_lectures';

export const loadScheduledLectures = () => {
  if (typeof window === 'undefined') return INITIAL_SCHEDULED_LECTURES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_SCHEDULED_LECTURES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SCHEDULED_LECTURES;
  } catch {
    return INITIAL_SCHEDULED_LECTURES;
  }
};

export const saveScheduledLectures = (lectures) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lectures));
  } catch {}
};
