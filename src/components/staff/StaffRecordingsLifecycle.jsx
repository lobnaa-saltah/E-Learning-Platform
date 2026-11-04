import React, { useState, useMemo } from 'react';
import {
  Video,
  Play,
  Eye,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  Search,
  Sparkles,
  ExternalLink,
  HardDrive,
  X,
} from 'lucide-react';

const STAGES = {
  LIVE: 'live',
  UPLOADING: 'uploading',
  READY: 'ready',
  EXPIRED: 'expired',
};

export const StaffRecordingsLifecycle = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [videoModal, setVideoModal] = useState({ isOpen: false, recording: null });
  const [notification, setNotification] = useState(null);

  const [recordings, setRecordings] = useState([
    {
      id: 'rec-1',
      title: 'محاضرة 4: بناء المكونات التفاعلية وإدارة الحالة بـ React',
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      batch: 'شعبة 101 و شعبة 105',
      trainer: 'د. فيصل إبراهيم الشهري',
      date: '2026-10-28',
      time: '05:00 م - 06:30 م',
      duration: '90 دقيقة',
      stage: 'live',
      viewsCount: 42,
      uploadProgress: 0,
      daysRemaining: 30,
      fileSize: '-',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 'rec-2',
      title: 'محاضرة 3: استعلامات الربط المتقدمة وتطبيع الجداول 3NF',
      courseCode: 'DB-204',
      courseName: 'قواعد البيانات العلائقية والمتقدمة',
      batch: 'شعبة 103',
      trainer: 'أ. مها عبد العزيز المطيري',
      date: '2026-10-28',
      time: '03:00 م - 04:30 م',
      duration: '90 دقيقة',
      stage: 'uploading',
      viewsCount: 0,
      uploadProgress: 68,
      daysRemaining: 30,
      fileSize: '480 MB',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      id: 'rec-3',
      title: 'محاضرة 2: جدران الحماية وتحليل منافذ الاتصال والتشفير',
      courseCode: 'SEC-305',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      batch: 'شعبة 104',
      trainer: 'م. راكان طلال السلمي',
      date: '2026-10-25',
      time: '07:00 م - 08:30 م',
      duration: '88 دقيقة',
      stage: 'ready',
      viewsCount: 142,
      uploadProgress: 100,
      daysRemaining: 27,
      fileSize: '620 MB',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      id: 'rec-4',
      title: 'محاضرة 1: مدخل إلى بنية البرمجيات وهندسة المتطلبات',
      courseCode: 'SYS-202',
      courseName: 'تحليل النظم وهندسة البرمجيات',
      batch: 'شعبة 102',
      trainer: 'د. سارة خالد القرني',
      date: '2026-10-18',
      time: '06:00 م - 07:30 م',
      duration: '92 دقيقة',
      stage: 'ready',
      viewsCount: 198,
      uploadProgress: 100,
      daysRemaining: 20,
      fileSize: '550 MB',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
    {
      id: 'rec-5',
      title: 'محاضرة تعريفية: أساسيات لغة C++ وهياكل البيانات',
      courseCode: 'PRG-102',
      courseName: 'البرمجة الشيئية وتراكيب البيانات',
      batch: 'شعبة 101',
      trainer: 'د. فيصل إبراهيم الشهري',
      date: '2026-09-20',
      time: '05:00 م - 06:30 م',
      duration: '85 دقيقة',
      stage: 'expired',
      viewsCount: 312,
      uploadProgress: 100,
      daysRemaining: 0,
      fileSize: '510 MB (مؤرشف)',
      videoUrl: '',
    },
  ]);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleAdvanceStage = (recordingId) => {
    setRecordings((prev) =>
      prev.map((rec) => {
        if (rec.id === recordingId) {
          let nextStage = STAGES.LIVE;
          let progress = rec.uploadProgress;
          let days = rec.daysRemaining;

          if (rec.stage === STAGES.LIVE) {
            nextStage = STAGES.UPLOADING;
            progress = 75;
          } else if (rec.stage === STAGES.UPLOADING) {
            nextStage = STAGES.READY;
            progress = 100;
            days = 30;
          } else if (rec.stage === STAGES.READY) {
            nextStage = STAGES.EXPIRED;
            days = 0;
          } else if (rec.stage === STAGES.EXPIRED) {
            nextStage = STAGES.READY;
            days = 15;
          }

          return {
            ...rec,
            stage: nextStage,
            uploadProgress: progress,
            daysRemaining: days,
          };
        }
        return rec;
      })
    );

    showToast('تم تحديث مرحلة دورة حياة التسجيل تفاعلياً بنجاح.');
  };

  const handleExtendRetention = (recordingId) => {
    setRecordings((prev) =>
      prev.map((rec) =>
        rec.id === recordingId
          ? { ...rec, stage: STAGES.READY, daysRemaining: 15 }
          : rec
      )
    );
    showToast('تم تمديد صلاحية التسجيل لمدة 15 يوماً إضافية بناءً على طلب استثنائي.');
  };

  const filteredRecordings = useMemo(() => {
    return recordings.filter((rec) => {
      const matchSearch =
        rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.batch.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStage = stageFilter === 'all' || rec.stage === stageFilter;

      return matchSearch && matchStage;
    });
  }, [recordings, searchQuery, stageFilter]);

  return (
    <div className="space-y-6">
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold shadow-lg animate-in fade-in slide-in-from-top-3 duration-300 ${
            notification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border border-rose-200'
              : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="p-1 hover:bg-black/5 rounded-lg text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-gradient-to-r from-brand-purpleDark via-[#352f7f] to-brand-primary text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-gold border border-brand-secondary/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
              المعالجة السحابية والتخزين
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              دورة حياة المحاضرة المسجلة
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              تتبع مسار التسجيل عبر 4 مراحل تفاعلية: (بث مباشر ← جاري الرفع ← جاهز للمشاهدة ← منتهي الصلاحية)، مع رصد عدد المشاهدين وتطبيق سياسة الاحتفاظ.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('lectures')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>متابعة البث الحي</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-emerald-400 font-mono">
              {recordings.filter((r) => r.stage === 'live').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">1. بث مباشر</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-amber-300 font-mono">
              {recordings.filter((r) => r.stage === 'uploading').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">2. جاري الرفع والمعالجة</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-brand-gold font-mono">
              {recordings.filter((r) => r.stage === 'ready').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">3. جاهز للمشاهدة</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-rose-300 font-mono">
              {recordings.filter((r) => r.stage === 'expired').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">4. منتهي الصلاحية</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-brand-purpleDark" />
            <h3 className="text-base font-black text-brand-purpleDark">
              سجل التسجيلات ومؤشر المراحل التفاعلي
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالمقرر أو الشعبة..."
                className="pl-3 pr-9 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20 w-56"
              />
            </div>

            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">كافة المراحل الأربعة</option>
              <option value="live">1. بث مباشر</option>
              <option value="uploading">2. جاري الرفع والمعالجة</option>
              <option value="ready">3. جاهز للمشاهدة</option>
              <option value="expired">4. منتهي الصلاحية</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">المقرر التدريبي</th>
                <th className="py-3.5 px-4">عنوان المحاضرة</th>
                <th className="py-3.5 px-4">الشعبة والمدرب</th>
                <th className="py-3.5 px-4 text-center">المرحلة الحالية للدورة</th>
                <th className="py-3.5 px-4 text-center">عدد المشاهدين</th>
                <th className="py-3.5 px-4 text-center">مدة الصلاحية</th>
                <th className="py-3.5 px-4 text-center">الإجراء والتبديل التفاعلي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecordings.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-brand-purpleDark">{rec.courseName}</div>
                    <div className="text-[11px] font-mono text-slate-500">{rec.courseCode}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800 line-clamp-1">{rec.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {rec.date} • {rec.duration}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{rec.trainer}</div>
                    <div className="text-[11px] text-slate-500">{rec.batch}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="space-y-1.5 inline-block">
                      {rec.stage === 'live' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-black text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span>1. بث مباشر</span>
                        </span>
                      )}
                      {rec.stage === 'uploading' && (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-black text-[11px]">
                            <RotateCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                            <span>2. جاري الرفع ({rec.uploadProgress}%)</span>
                          </span>
                          <div className="w-24 bg-slate-100 h-1 rounded-full overflow-hidden mx-auto">
                            <div className="bg-amber-500 h-full" style={{ width: `${rec.uploadProgress}%` }} />
                          </div>
                        </div>
                      )}
                      {rec.stage === 'ready' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 font-black text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-purpleDark" />
                          <span>3. جاهز للمشاهدة</span>
                        </span>
                      )}
                      {rec.stage === 'expired' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-bold text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>4. منتهي الصلاحية</span>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-mono font-black text-xs">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>{rec.viewsCount} مشاهد</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {rec.stage === 'ready' ? (
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        متبقي {rec.daysRemaining} يوماً
                      </span>
                    ) : rec.stage === 'expired' ? (
                      <span className="text-[11px] font-bold text-rose-600">انتهت المدة (أرشفة)</span>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      {rec.stage === 'ready' && (
                        <button
                          type="button"
                          onClick={() => setVideoModal({ isOpen: true, recording: rec })}
                          title="معاينة الفيديو"
                          className="p-1.5 bg-brand-purpleDark text-white hover:bg-[#1f1a50] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                          <span>مشاهدة</span>
                        </button>
                      )}

                      {rec.stage === 'expired' && (
                        <button
                          type="button"
                          onClick={() => handleExtendRetention(rec.id)}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-[11px] font-bold transition-all cursor-pointer"
                        >
                          تمديد استثنائي (15 يوم)
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(rec.id)}
                        title="تبديل المرحلة التالية تجريبياً"
                        className="p-1.5 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer text-[10px] font-bold"
                      >
                        نقل للمرحلة التالية ←
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {videoModal.isOpen && videoModal.recording && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-white/10 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5 text-brand-gold" />
                <div>
                  <h3 className="text-base font-black truncate">{videoModal.recording.title}</h3>
                  <p className="text-xs text-slate-400">
                    {videoModal.recording.courseName} • المدرب: {videoModal.recording.trainer}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVideoModal({ isOpen: false, recording: null })}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative flex items-center justify-center border border-white/10">
              <video
                src={videoModal.recording.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-3">
                <span>تاريخ البث: {videoModal.recording.date}</span>
                <span>•</span>
                <span>إجمالي المشاهدات: {videoModal.recording.viewsCount} مشاهدة</span>
              </div>
              <button
                type="button"
                onClick={() => setVideoModal({ isOpen: false, recording: null })}
                className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold cursor-pointer transition-colors"
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
