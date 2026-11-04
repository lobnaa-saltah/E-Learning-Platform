import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  User, 
  Download, 
  GraduationCap, 
  Terminal, 
  MessagesSquare, 
  Library, 
  Video, 
  CheckCircle2, 
  Sparkles,
  X
} from 'lucide-react';
import { MOCK_COURSES } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';
import { downloadSyllabusPdf } from '../../utils/pdfGenerator';

export const TraineeCourses = () => {
  const [downloadModalCourse, setDownloadModalCourse] = useState(null);
  const [downloadSuccessCode, setDownloadSuccessCode] = useState(null);

  const confirmDownloadSyllabus = () => {
    if (!downloadModalCourse) return;
    downloadSyllabusPdf(downloadModalCourse.code, downloadModalCourse.name);
    const code = downloadModalCourse.code;
    setDownloadModalCourse(null);
    setDownloadSuccessCode(code);
    setTimeout(() => setDownloadSuccessCode(null), 3000);
  };

  const getToolIcon = (toolId) => {
    switch (toolId) {
      case 'lab':
        return <Terminal className="w-3.5 h-3.5 text-brand-primary" />;
      case 'forum':
        return <MessagesSquare className="w-3.5 h-3.5 text-brand-secondary" />;
      case 'library':
        return <Library className="w-3.5 h-3.5 text-brand-gold" />;
      case 'recordings':
        return <Video className="w-3.5 h-3.5 text-brand-purpleDark" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-brand-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="الفصل التدريبي الحالي"
        title="المقررات التدريبية المعتمدة"
        subtitle="بطاقات المقررات المسجلة في خطتك مع الأدوات التفاعلية وتوصيف كل مقرر"
        icon={BookOpen}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs">
            <span className="text-slate-300">إجمالي الساعات:</span>
            <span className="font-bold text-brand-gold font-mono text-xs">13 ساعة معتمدة</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs">
            <span className="text-slate-300">عدد المقررات:</span>
            <span className="font-bold text-white font-mono text-xs">4 مقررات</span>
          </div>
        </div>
      </TraineePageHeader>

      <div className="space-y-6">
        {MOCK_COURSES.map((course) => (
          <div
            key={course.code}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-7 flex flex-col justify-between hover:border-brand-primary/40 transition-all hover:shadow-elevated group relative overflow-hidden"
          >
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                    <BookOpen className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-brand-purpleDark text-base">
                        {course.name}
                      </h3>
                      <span className="text-xs font-mono font-bold bg-brand-purpleDark text-white px-2 py-0.5 rounded-lg shrink-0">
                        {course.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-brand-primary" />
                        <strong className="text-slate-800 font-bold">{course.trainer}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-secondary" />
                        <strong className="font-mono text-slate-800 font-bold">{course.creditHours}</strong> ساعات
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-brand-primary bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {course.program}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-brand-textLight">
                  <span>نسبة الإنجاز التدريبي بالمقرر:</span>
                  <span className="font-mono font-black text-brand-purpleDark">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-brand-secondary via-brand-orange to-brand-primary rounded-full transition-all duration-700"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-brand-purpleDark block">
                  أدوات الاستخدام والبيئة التدريبية التفاعلية:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {course.tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="p-2.5 rounded-xl bg-brand-background border border-slate-200/80 flex items-center justify-between hover:border-brand-primary/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {getToolIcon(tool.id)}
                        <span className="text-xs font-semibold text-slate-800 truncate">{tool.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-brand-primary bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0 mr-1">
                        {tool.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-brand-textLight font-medium">
                ملف توصيف المقرر والخطة الفصلية (PDF)
              </span>

              <button
                onClick={() => setDownloadModalCourse(course)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-purpleDark hover:bg-[#352F7F] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                title="تحميل ملف المقرر التدريبي"
              >
                {downloadSuccessCode === course.code ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>تم تحميل الخطة بنجاح</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-brand-gold" />
                    <span>تحميل ملف المقرر (PDF)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {downloadModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purpleDark/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setDownloadModalCourse(null)}
              className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-brand-purpleDark border border-purple-200 flex items-center justify-center mx-auto shadow-sm mb-4">
              <Download className="w-7 h-7 text-brand-purpleDark" />
            </div>

            <h3 className="text-lg font-bold text-brand-purpleDark">تأكيد تحميل الخطة التدريبية</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              هل ترغب في بدء تحميل ملف PDF المعتمد لتوصيف مقرر ({downloadModalCourse.name}) إلى جهازك؟
            </p>

            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-right space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span>رمز المقرر:</span>
                <strong className="font-mono text-brand-purpleDark font-bold">{downloadModalCourse.code}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>اسم المقرر:</span>
                <strong className="text-slate-800">{downloadModalCourse.name}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>الصيغة:</span>
                <span className="font-bold text-slate-700">مستند PDF رسمي معتمد</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={confirmDownloadSyllabus}
                className="flex-1 py-3 px-4 bg-brand-purpleDark hover:bg-[#352F7F] text-white font-bold text-xs rounded-xl shadow-md shadow-brand-purpleDark/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-brand-gold" />
                <span>نعم، تحميل الملف الآن</span>
              </button>
              <button
                onClick={() => setDownloadModalCourse(null)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
