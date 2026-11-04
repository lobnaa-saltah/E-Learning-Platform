const STORAGE_KEY_SETTINGS = 'uq_admin_virtual_room_settings';
const STORAGE_KEY_VIDEOS = 'uq_admin_support_videos';

export const DEFAULT_SETTINGS = {
  activePlatform: 'BigBlueButton',
  apiEndpoint: 'https://bbb.uq-institute.edu.sa/bigbluebutton/api',
  hideAttendeeCountTrainees: true,
  hideAttendeeCountTrainers: false,
  disableChat: false,
  muteMicsOnJoin: true,
  disableCamerasOnJoin: true,
  autoRecordLectures: true,
  retentionDays: 30,
  assignmentMinScore: 1,
  assignmentMaxScore: 10,
  midtermMinScore: 5,
  midtermMaxScore: 30,
  finalExamMinScore: 10,
  finalExamMaxScore: 50,
};

export const INITIAL_SUPPORT_VIDEOS = [
  {
    id: 1,
    title: 'دليل المتدرب: كيفية الانضمام للقاعة الافتراضية والتفاعل بالمايك والشات',
    target: 'trainee',
    duration: '04:15',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'القاعات الافتراضية',
    views: 1240,
    status: 'active',
    updatedAt: '2026-10-20',
    description: 'شرح متكامل لخطوات الدخول إلى منصة البث المباشر، وضبط إعدادات الصوت والصورة واستخدام أداة رفع اليد.'
  },
  {
    id: 2,
    title: 'دليل المتدرب: طريقة تسليم الواجبات وحل الاختبارات الإلكترونية المؤقتة',
    target: 'trainee',
    duration: '06:30',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'التقييمات والاختبارات',
    views: 980,
    status: 'active',
    updatedAt: '2026-10-22',
    description: 'خطوات رفع ملفات الواجبات والتأكد من إرسالها ومتابعة العداد التنازلي للاختبارات النصفية والنهائية.'
  },
  {
    id: 3,
    title: 'دليل المدرب: إدارة القاعة الافتراضية BigBlueButton والتحكم بالحضور والسبورة',
    target: 'trainer',
    duration: '08:45',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'إدارة المحاضرات',
    views: 520,
    status: 'active',
    updatedAt: '2026-10-18',
    description: 'شرح مفصل لأدوات المدرب: كتم صوت الجميع، تفعيل الشاشات التشاركية، إدارة التصويت، والتحكم في صلاحيات الشات.'
  },
  {
    id: 4,
    title: 'دليل المدرب: إنشاء وتكرار الواجبات والاختبارات وربطها بالحدود النظامية',
    target: 'trainer',
    duration: '07:10',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'التقييمات والاختبارات',
    views: 410,
    status: 'active',
    updatedAt: '2026-10-25',
    description: 'كيفية إنشاء اختبار جديد، استنساخ واجب لشعبة أخرى، والالتزام بالحدود الدنيا والقصوى المعتمدة من الإدارة.'
  },
  {
    id: 5,
    title: 'دليل المتدرب: تقديم طلبات استثناء المقررات والإلحاق بالشعب المستضيفة',
    target: 'trainee',
    duration: '05:20',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'الشؤون التدريبية',
    views: 750,
    status: 'active',
    updatedAt: '2026-10-24',
    description: 'شرح إجراءات الاستثناء من دراسة مقرر والإلحاق في شعبة تقدم مقرر التعثر بما لا يتعارض مع الجدول الأساسي.'
  },
  {
    id: 6,
    title: 'دليل المدرب: متابعة الحضور التلقائي وتصدير تقارير دقائق الحضور للمتدربين',
    target: 'trainer',
    duration: '05:50',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'التقارير والمتابعة',
    views: 330,
    status: 'active',
    updatedAt: '2026-10-26',
    description: 'طريقة استخراج كشف الحضور الدقيق، مع تفاصيل حضور المتدربين الأساسيين والملحقين بالدقائق.'
  }
];

export const loadAdminSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
};

export const saveAdminSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch {}
};

export const loadSupportVideos = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VIDEOS);
    if (!raw) return INITIAL_SUPPORT_VIDEOS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_SUPPORT_VIDEOS;
  }
};

export const saveSupportVideos = (videos) => {
  try {
    localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(videos));
  } catch {}
};
