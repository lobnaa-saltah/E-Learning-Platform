import React, { useState } from 'react';
import { Award, Calendar, Clock, Users, Play, Download, CheckCircle2, X, Sparkles, BookOpen } from 'lucide-react';

export const TrainerShortCourses = ({ onStartLecture }) => {
  const [courses] = useState([
    {
      id: 1,
      name: 'البرنامج التخصصي في الأمن السيبراني واختبار الاختراق',
      category: 'برنامج تخصصي تأهيلي',
      hours: 60,
      weeks: 12,
      traineesCount: 28,
      nextSessionDate: 'اليوم (الخميس)',
      nextSessionTime: '07:00 م - 08:30 م',
      packageFileName: 'الحقيبة_التدريبية_للأمن_السيبراني.zip',
      status: 'نشط ومستمر',
      batch: 'دفعة المحترفين 2026',
    },
    {
      id: 2,
      name: 'دورة هندسة واجهات المستخدم التفاعلية بـ React & Vite',
      category: 'دورة تطويرية مهنية',
      hours: 32,
      weeks: 4,
      traineesCount: 35,
      nextSessionDate: 'الأحد القادم',
      nextSessionTime: '05:00 م - 06:30 م',
      packageFileName: 'حقيبة_مشروعات_الواجهات_التفاعلية.pdf',
      status: 'نشط',
      batch: 'المسار السريع - دفعة 2',
    },
  ]);

  const [downloadMsg, setDownloadMsg] = useState(null);

  const handleDownload = (fileName) => {
    setDownloadMsg(`جاري تنزيل الحقيبة التدريبية: ${fileName}`);
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-brand-purpleDark">
              الدورات التطويرية والتأهيلية المسندة
            </h2>
            <span className="text-xs font-bold bg-brand-secondary/20 text-brand-purpleDark px-2.5 py-1 rounded-full border border-brand-secondary/30">
              برامج معتمدة
            </span>
          </div>
          <p className="text-xs text-brand-textLight mt-1">
            إدارة الدورات القصيرة، بدء البث المباشر للجلسات، وتنزيل الحقائب التدريبية المعتمدة
          </p>
        </div>
      </div>

      {downloadMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{downloadMsg}</span>
          </div>
          <button onClick={() => setDownloadMsg(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 flex flex-col justify-between hover:border-brand-secondary transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-purpleDark bg-brand-secondary/20 px-3 py-1 rounded-full border border-brand-secondary/40">
                  {course.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {course.status}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-brand-purpleDark group-hover:text-brand-primary transition-colors">
                  {course.name}
                </h3>
                <span className="text-xs text-brand-primary font-bold block">{course.batch}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-brand-background">
                  <span className="block text-sm font-black text-brand-purpleDark font-mono">{course.hours}</span>
                  <span className="text-[10px] text-brand-textLight">ساعة تدريبية</span>
                </div>
                <div className="p-2 rounded-xl bg-brand-background">
                  <span className="block text-sm font-black text-brand-purpleDark font-mono">{course.weeks}</span>
                  <span className="text-[10px] text-brand-textLight">أسابيع تدريب</span>
                </div>
                <div className="p-2 rounded-xl bg-brand-background">
                  <span className="block text-sm font-black text-brand-purpleDark font-mono">{course.traineesCount}</span>
                  <span className="text-[10px] text-brand-textLight">متدرب مسجل</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-brand-background border border-slate-200 text-xs space-y-1">
                <span className="text-slate-400 block text-[11px]">الموعد القادم للجلسة المباشرة:</span>
                <div className="flex items-center justify-between font-mono font-bold text-brand-purpleDark">
                  <span className="flex items-center gap-1 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    {course.nextSessionDate}
                  </span>
                  <span>{course.nextSessionTime}</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleDownload(course.packageFileName)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-background hover:bg-slate-100 text-brand-purpleDark border border-slate-200 font-bold text-xs transition-all cursor-pointer shadow-subtle"
              >
                <Download className="w-3.5 h-3.5 text-brand-secondary" />
                <span>الحقيبة التدريبية</span>
              </button>

              <button
                onClick={() =>
                  onStartLecture({
                    courseName: course.name,
                    batch: course.batch,
                    time: course.nextSessionTime,
                    date: course.nextSessionDate,
                    traineesCount: course.traineesCount,
                  })
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark font-black text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-brand-purpleDark text-brand-purpleDark" />
                <span>بدء الجلسة الآن</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
