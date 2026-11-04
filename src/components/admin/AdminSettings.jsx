import React, { useState, useEffect } from 'react';
import {
  Settings,
  Shield,
  Server,
  Video,
  Clock,
  Save,
  ToggleLeft,
  ToggleRight,
  Play,
  Plus,
  Edit2,
  Trash2,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Monitor,
  X,
  CheckCircle2
} from 'lucide-react';
import {
  DEFAULT_SETTINGS,
  loadAdminSettings,
  saveAdminSettings,
  loadSupportVideos,
  saveSupportVideos
} from './adminSettingsData';
import { VirtualClassroomMockup } from './VirtualClassroomMockup';

export const AdminSettings = ({ activeTab, onNavigateTab }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [supportVideos, setSupportVideos] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [videoFilter, setVideoFilter] = useState('all');
  const [validationError, setValidationError] = useState('');
  
  const [currentSection, setCurrentSection] = useState(activeTab || 'all');

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoForm, setVideoForm] = useState({
    title: '',
    target: 'trainee',
    duration: '05:00',
    url: '',
    category: 'القاعات الافتراضية',
    description: '',
    status: 'active'
  });

  const [previewVideo, setPreviewVideo] = useState(null);

  useEffect(() => {
    setSettings(loadAdminSettings());
    setSupportVideos(loadSupportVideos());
  }, []);

  useEffect(() => {
    if (activeTab) {
      setCurrentSection(activeTab);
    }
  }, [activeTab]);

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key, val) => {
    setSettings((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const validateGrades = () => {
    if (Number(settings.assignmentMinScore) >= Number(settings.assignmentMaxScore)) {
      return 'الحد الأدنى لدرجة الواجب يجب أن يكون أقل من الحد الأقصى.';
    }
    if (Number(settings.midtermMinScore) >= Number(settings.midtermMaxScore)) {
      return 'الحد الأدنى للاختبار النصفي يجب أن يكون أقل من الحد الأقصى.';
    }
    if (Number(settings.finalExamMinScore) >= Number(settings.finalExamMaxScore)) {
      return 'الحد الأدنى للاختبار النهائي يجب أن يكون أقل من الحد الأقصى.';
    }
    return '';
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const err = validateGrades();
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError('');
    saveAdminSettings(settings);
    saveSupportVideos(supportVideos);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('هل أنت متأكد من استعادة كافة الإعدادات الافتراضية للنظام؟')) {
      setSettings(DEFAULT_SETTINGS);
      saveAdminSettings(DEFAULT_SETTINGS);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleOpenAddVideo = () => {
    setEditingVideo(null);
    setVideoForm({
      title: '',
      target: 'trainee',
      duration: '05:00',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'القاعات الافتراضية',
      description: '',
      status: 'active'
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenEditVideo = (vid) => {
    setEditingVideo(vid);
    setVideoForm({
      title: vid.title,
      target: vid.target,
      duration: vid.duration,
      url: vid.url,
      category: vid.category || 'القاعات الافتراضية',
      description: vid.description || '',
      status: vid.status || 'active'
    });
    setIsVideoModalOpen(true);
  };

  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!videoForm.title.trim()) return;

    let updated;
    if (editingVideo) {
      updated = supportVideos.map((v) =>
        v.id === editingVideo.id
          ? { ...v, ...videoForm, updatedAt: new Date().toISOString().split('T')[0] }
          : v
      );
    } else {
      const newEntry = {
        id: Date.now(),
        ...videoForm,
        views: 0,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      updated = [newEntry, ...supportVideos];
    }

    setSupportVideos(updated);
    saveSupportVideos(updated);
    setIsVideoModalOpen(false);
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الفيديو الإرشادي؟')) {
      const updated = supportVideos.filter((v) => v.id !== id);
      setSupportVideos(updated);
      saveSupportVideos(updated);
    }
  };

  const filteredVideos = supportVideos.filter((v) => {
    if (videoFilter === 'all') return true;
    return v.target === videoFilter;
  });

  const totalMaxGrades =
    Number(settings.assignmentMaxScore || 0) +
    Number(settings.midtermMaxScore || 0) +
    Number(settings.finalExamMaxScore || 0);

  const navTabs = [
    { id: 'all', label: 'كافة الإعدادات' },
    { id: 'virtual_room', label: 'القاعة الافتراضية' },
    { id: 'room_features', label: 'خصائص وسياسات القاعة' },
    { id: 'recording_policy', label: 'تسجيل المحاضرات' },
    { id: 'grade_limits', label: 'حدود الدرجات' },
    { id: 'support_content', label: 'محتوى الدعم والمساعدة' },
  ];

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#262262] text-[#EFB144] flex items-center justify-center shadow-md">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-navy-900">إعدادات الآدمن والسياسات العامة للتعليم عن بعد</h1>
                <span className="text-[11px] font-bold bg-[#EFB144]/20 text-[#262262] border border-[#EFB144]/40 px-2.5 py-0.5 rounded-full">
                  لوحة التحكم المركزية
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                ضبط خوادم البث المباشر، سياسات الخصوصية، حدود التقييمات، ومحتوى الدعم الفني
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setIsSimulatorOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#262262] to-[#342e82] hover:from-[#1d1a4d] hover:to-[#262262] text-[#EFB144] border border-[#EFB144]/40 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer group"
          >
            <Monitor className="w-4 h-4 text-[#EFB144] group-hover:scale-110 transition-transform" />
            <span>محاكاة القاعة الافتراضية (Live Preview)</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 cursor-pointer"
            title="استعادة الإعدادات الأصلية"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">افتراضي</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ كافة التغييرات</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-subtle flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {navTabs.map((t) => {
          const isAct = currentSection === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setCurrentSection(t.id);
                if (onNavigateTab && t.id !== 'all') onNavigateTab(t.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isAct
                  ? 'bg-[#262262] text-[#EFB144] shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>تم حفظ الإعدادات وتحديث السياسات فورياً لكافة شاشات المتدربين والمدربين والقاعات الافتراضية.</span>
        </div>
      )}

      {validationError && (
        <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {(currentSection === 'all' || currentSection === 'virtual_room') && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-navy-900 text-sm">
                  1. منصة القاعة الافتراضية المعتمدة (متطلب 7.1)
                </h2>
                <p className="text-[11px] text-slate-500">
                  تحديد مزود خدمة الفصول الافتراضية النشط وخادم البث المباشر
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>الخادم نشط ومتصل</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleInputChange('activePlatform', 'BigBlueButton')}
              className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                settings.activePlatform === 'BigBlueButton'
                  ? 'bg-[#262262] text-white border-[#262262] shadow-md'
                  : 'bg-surface-base text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">BigBlueButton (BBB)</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  settings.activePlatform === 'BigBlueButton'
                    ? 'bg-[#EFB144] text-[#262262]'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  موصى به
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${settings.activePlatform === 'BigBlueButton' ? 'text-slate-200' : 'text-slate-500'}`}>
                المنصة الأكاديمية الأكثر استقراراً، تدعم السبورة التفاعلية، كتم الجميع، وتكامل نظام LTI.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleInputChange('activePlatform', 'plugNmeet')}
              className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                settings.activePlatform === 'plugNmeet'
                  ? 'bg-[#262262] text-white border-[#262262] shadow-md'
                  : 'bg-surface-base text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">plugNmeet WebRTC</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  settings.activePlatform === 'plugNmeet'
                    ? 'bg-[#EFB144] text-[#262262]'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  سريع وخفيف
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${settings.activePlatform === 'plugNmeet' ? 'text-slate-200' : 'text-slate-500'}`}>
                خادم بث مبني بتقنية WebRTC الحديثة، استهلاك منخفض للنطاق الترددي مع مشاركة سريعة للشاشة.
              </p>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                رابط خادم البث المباشر (API Endpoint URL):
              </label>
              <input
                type="text"
                value={settings.apiEndpoint}
                onChange={(e) => handleInputChange('apiEndpoint', e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#262262]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                المفتاح السري للخادم (Security Salt / API Key):
              </label>
              <input
                type="password"
                defaultValue="uq_secret_salt_2026_x89a"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#262262]"
              />
            </div>
          </div>
        </div>
      )}

      {(currentSection === 'all' || currentSection === 'room_features') && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-navy-900 text-sm">
                2. خصائص وسياسات القاعة التفاعلية (متطلب 7.2)
              </h2>
              <p className="text-[11px] text-slate-500">
                مفاتيح التحكم الإلزامية التي تُطبّق على المتدربين والمدربين داخل القاعة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-900">إخفاء عدد الحضور عن المتدربين</span>
                  {settings.hideAttendeeCountTrainees && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.2 rounded-full">
                      مفعل
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  لا يرى المتدربون إجمالي عدد الحاضرين في القاعة لتجنب التشتت ومراعاة الخصوصية، ويظهر لهم تنبيه "العدد مخفي بموجب سياسة الإدارة".
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('hideAttendeeCountTrainees')}
                className={`text-2xl transition-colors shrink-0 cursor-pointer ${
                  settings.hideAttendeeCountTrainees ? 'text-[#262262]' : 'text-slate-300'
                }`}
              >
                {settings.hideAttendeeCountTrainees ? (
                  <ToggleRight className="w-8 h-8 text-[#262262]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-900">إخفاء عدد الحضور عن المدربين</span>
                  {settings.hideAttendeeCountTrainers && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.2 rounded-full">
                      مفعل
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  إخفاء مؤشر إجمالي الحضور عن شاشات المدربين والتركيز فقط على إدارة الجلسة والمشاركات الصوتية.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('hideAttendeeCountTrainers')}
                className={`text-2xl transition-colors shrink-0 cursor-pointer ${
                  settings.hideAttendeeCountTrainers ? 'text-[#262262]' : 'text-slate-300'
                }`}
              >
                {settings.hideAttendeeCountTrainers ? (
                  <ToggleRight className="w-8 h-8 text-[#262262]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-900">إيقاف الشات العام تلقائياً</span>
                  {settings.disableChat && (
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.2 rounded-full">
                      معطل
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  إغلاق صندوق الدردشة النصية الافتراضي ومنع المتدربين من التراسل إلا في حال فتحه المدرب يدوياً.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('disableChat')}
                className={`text-2xl transition-colors shrink-0 cursor-pointer ${
                  settings.disableChat ? 'text-[#262262]' : 'text-slate-300'
                }`}
              >
                {settings.disableChat ? (
                  <ToggleRight className="w-8 h-8 text-[#262262]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-900">كتم المايكات تلقائياً عند الدخول</span>
                  {settings.muteMicsOnJoin && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full">
                      مفعل
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  يدخل جميع المتدربين في وضع الاستماع المكتوم لمنع التداخل والضوضاء، ويطلب الكلمة عبر زر رفع اليد.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('muteMicsOnJoin')}
                className={`text-2xl transition-colors shrink-0 cursor-pointer ${
                  settings.muteMicsOnJoin ? 'text-[#262262]' : 'text-slate-300'
                }`}
              >
                {settings.muteMicsOnJoin ? (
                  <ToggleRight className="w-8 h-8 text-[#262262]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 md:col-span-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-900">إيقاف الكاميرات تلقائياً عند الدخول</span>
                  {settings.disableCamerasOnJoin && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full">
                      مفعل
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  تعطيل بث الفيديو وكاميرات الويب لكافة المتدربين عند الانضمام للجلسة لضمان الخصوصية وتقليل استهلاك النطاق الترددي.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('disableCamerasOnJoin')}
                className={`text-2xl transition-colors shrink-0 cursor-pointer ${
                  settings.disableCamerasOnJoin ? 'text-[#262262]' : 'text-slate-300'
                }`}
              >
                {settings.disableCamerasOnJoin ? (
                  <ToggleRight className="w-8 h-8 text-[#262262]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {(currentSection === 'all' || currentSection === 'recording_policy') && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-navy-900 text-sm">
                3. تسجيل المحاضرات ومدة الاحتفاظ (متطلب 7.3 & 7.4)
              </h2>
              <p className="text-[11px] text-slate-500">
                سياسات الأرشفة الآلية، وبدء التسجيل الإلزامي وفترة صلاحية المشاهدة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-900">تسجيل المحاضرات تلقائياً فور البدء</span>
                  {settings.autoRecordLectures && (
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.2 rounded-full">
                      إلزامي
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  إذا تم التفعيل، يبدأ التسجيل آلياً من أول ثانية في المحاضرة ولا يملك المدرب خيار إيقافه لمنع نسيان التوثيق.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('autoRecordLectures')}
                className={`text-2xl transition-colors shrink-0 cursor-pointer ${
                  settings.autoRecordLectures ? 'text-[#262262]' : 'text-slate-300'
                }`}
              >
                {settings.autoRecordLectures ? (
                  <ToggleRight className="w-8 h-8 text-[#262262]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  مدة الاحتفاظ بالتسجيلات بالأيام (الافتراضي 30 يوماً):
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  بعد انقضاء هذه المدة، تتحول حالة التسجيل تلقائياً إلى «منتهي» في شاشات المتدربين ويتم أرشفته.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={settings.retentionDays}
                  onChange={(e) => handleInputChange('retentionDays', Number(e.target.value))}
                  className="w-28 text-center font-mono font-bold text-sm p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#262262] focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-700">يوماً من تاريخ البث</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {(currentSection === 'all' || currentSection === 'grade_limits') && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold-50 text-[#EFB144] bg-[#262262] flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-navy-900 text-sm">
                  4. حدود الدرجات والتقييمات (متطلب 7.5)
                </h2>
                <p className="text-[11px] text-slate-500">
                  تحديد الحد الأدنى والأقصى للدرجات التي يلتزم بها المدرب عند إنشاء أو تعديل أي اختبار أو واجب
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">مجموع الحدود القصوى للتقييمات:</span>
              <span className="font-mono font-black text-sm bg-slate-100 text-navy-900 px-3 py-1 rounded-xl border border-slate-200">
                {totalMaxGrades} / 90 درجة
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">(+ 10 درجات حضور ومشاركة = 100)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900">درجات الواجب</span>
                <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-full">
                  الواجبات الدورية
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">الحد الأدنى</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={settings.assignmentMinScore}
                    onChange={(e) => handleInputChange('assignmentMinScore', Number(e.target.value))}
                    className="w-full text-center font-mono font-bold text-sm p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#262262]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">الحد الأقصى</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={settings.assignmentMaxScore}
                    onChange={(e) => handleInputChange('assignmentMaxScore', Number(e.target.value))}
                    className="w-full text-center font-mono font-bold text-sm p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#262262]"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center">
                الافتراضي: حد أدنى {DEFAULT_SETTINGS.assignmentMinScore} ، حد أقصى {DEFAULT_SETTINGS.assignmentMaxScore}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900">الاختبار النصفي</span>
                <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-full">
                  منتصف الترم
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">الحد الأدنى</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.midtermMinScore}
                    onChange={(e) => handleInputChange('midtermMinScore', Number(e.target.value))}
                    className="w-full text-center font-mono font-bold text-sm p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#262262]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">الحد الأقصى</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.midtermMaxScore}
                    onChange={(e) => handleInputChange('midtermMaxScore', Number(e.target.value))}
                    className="w-full text-center font-mono font-bold text-sm p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#262262]"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center">
                الافتراضي: حد أدنى {DEFAULT_SETTINGS.midtermMinScore} ، حد أقصى {DEFAULT_SETTINGS.midtermMaxScore}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900">الاختبار النهائي</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  نهاية الترم
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">الحد الأدنى</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.finalExamMinScore}
                    onChange={(e) => handleInputChange('finalExamMinScore', Number(e.target.value))}
                    className="w-full text-center font-mono font-bold text-sm p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#262262]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">الحد الأقصى</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.finalExamMaxScore}
                    onChange={(e) => handleInputChange('finalExamMaxScore', Number(e.target.value))}
                    className="w-full text-center font-mono font-bold text-sm p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#262262]"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center">
                الافتراضي: حد أدنى {DEFAULT_SETTINGS.finalExamMinScore} ، حد أقصى {DEFAULT_SETTINGS.finalExamMaxScore}
              </p>
            </div>

          </div>
        </div>
      )}

      {(currentSection === 'all' || currentSection === 'support_content') && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-navy-900 text-sm">
                  5. إدارة محتوى الدعم والمساعدة (متطلب 7.6)
                </h2>
                <p className="text-[11px] text-slate-500">
                  إضافة وتعديل الفيديوهات التعليمية الإرشادية للمتدربين والمدربين
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setVideoFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    videoFilter === 'all' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                  }`}
                >
                  الكل ({supportVideos.length})
                </button>
                <button
                  type="button"
                  onClick={() => setVideoFilter('trainee')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    videoFilter === 'trainee' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                  }`}
                >
                  للمتدربين ({supportVideos.filter((v) => v.target === 'trainee').length})
                </button>
                <button
                  type="button"
                  onClick={() => setVideoFilter('trainer')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    videoFilter === 'trainer' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                  }`}
                >
                  للمدربين ({supportVideos.filter((v) => v.target === 'trainer').length})
                </button>
              </div>

              <button
                type="button"
                onClick={handleOpenAddVideo}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#262262] hover:bg-[#322c7a] text-[#EFB144] rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة فيديو إرشادي</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                      video.target === 'trainee'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {video.target === 'trainee' ? 'دليل المتدرب' : 'دليل المدرب'}
                    </span>
                    <span className="font-mono text-slate-500 text-[10px]">
                      {video.duration} دقيقة
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-navy-900 line-clamp-2 leading-snug">
                    {video.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewVideo(video)}
                    className="flex items-center gap-1.5 text-royalBlue-600 hover:text-royalBlue-800 font-bold cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>تشغيل العرض</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditVideo(video)}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                      title="تعديل الفيديو"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteVideo(video.id)}
                      className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 transition-colors"
                      title="حذف الفيديو"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSimulatorOpen && (
        <VirtualClassroomMockup
          settings={settings}
          onClose={() => setIsSimulatorOpen(false)}
          initialRole="trainer"
        />
      )}

      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#262262] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#EFB144] flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>{editingVideo ? 'تعديل الفيديو الإرشادي' : 'إضافة فيديو تعليمي جديد'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  عنوان الفيديو التعليمي:
                </label>
                <input
                  type="text"
                  required
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="مثال: شرح خطوات حل الاختبارات الإلكترونية والواجبات..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#262262] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    الفئة المستهدفة:
                  </label>
                  <select
                    value={videoForm.target}
                    onChange={(e) => setVideoForm({ ...videoForm, target: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="trainee">دليل المتدربين</option>
                    <option value="trainer">دليل المدربين</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    مدة الفيديو (دقيقة:ثانية):
                  </label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="05:30"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono text-center focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  رابط الفيديو (YouTube / Vimeo / MP4):
                </label>
                <input
                  type="url"
                  required
                  value={videoForm.url}
                  onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  وصف مختصر ومحاور الفيديو:
                </label>
                <textarea
                  rows={3}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="نبذة عن المهارات والمعارف الإرشادية التي يتضمنها الفيديو..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#262262] text-[#EFB144] hover:bg-[#342e82]"
                >
                  {editingVideo ? 'حفظ التعديلات' : 'إضافة ونشر'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-navy-900 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-2xl overflow-hidden text-white">
            <div className="px-5 py-3.5 bg-navy-950 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-[#EFB144] truncate">{previewVideo.title}</span>
              <button
                type="button"
                onClick={() => setPreviewVideo(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center justify-center bg-black/60 min-h-[260px] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFB144]/20 border-2 border-[#EFB144] flex items-center justify-center text-[#EFB144] animate-pulse">
                <Play className="w-8 h-8 fill-current" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">مشغل الفيديو الإرشادي المعتمد</p>
                <p className="text-xs text-slate-400 mt-1">{previewVideo.description}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-2">{previewVideo.url}</p>
              </div>
            </div>
            <div className="p-3 bg-navy-950 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewVideo(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                إغلاق المشغل
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
