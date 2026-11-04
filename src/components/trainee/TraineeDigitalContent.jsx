import React, { useState } from 'react';
import { Layers, BookOpen, ArrowLeft, Video, FileText, User, X } from 'lucide-react';
import { MOCK_COURSES } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';

export const TraineeDigitalContent = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="المصادر والوحدات التفاعلية"
        title="المحتوى الرقمي التفاعلي"
        subtitle="وحدات تعليمية، شرائح تفاعلية ومصادر تعليمية مساندة لكل مقرر تدريبي"
        icon={Layers}
      />

      <div className="space-y-4">
        {MOCK_COURSES.map((course) => (
          <div
            key={course.code}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-card hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                  <Layers className="w-5 h-5 text-brand-gold" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-brand-purpleDark text-base">
                      {course.name}
                    </h3>
                    <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-background text-brand-purpleDark border border-slate-200 shrink-0">
                      {course.code}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-brand-background px-2.5 py-0.5 rounded-full border border-slate-200 shrink-0">
                      {course.creditHours} ساعات معتمدة
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {course.program} • وحدات تعليمية ومصادر تدريبية تفاعلية
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                    <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span className="font-bold text-slate-800">{course.trainer}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                    <BookOpen className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                    <span className="font-mono font-bold text-brand-purpleDark">4 وحدات تدريبية</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-purpleDark hover:bg-brand-primary text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-purpleDark/20 cursor-pointer group hover:scale-[1.02]"
                >
                  <span>تصفح المحتوى الرقمي</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-brand-gold group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purpleDark/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-2xl overflow-hidden">
            <div className="p-4 px-6 bg-brand-purpleDark text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-brand-gold">{selectedCourse.code}</span>
                <h3 className="font-bold text-base text-white">المحتوى الرقمي: {selectedCourse.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">المدرب: {selectedCourse.trainer}</p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="p-4 rounded-2xl border border-slate-200 bg-brand-background flex items-center justify-between hover:border-brand-primary/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-xs shrink-0">
                    <Video className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-brand-purpleDark">الوحدة الأولى: المفاهيم الأساسية وهيكلة العمل</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">فيديو توضيحي تفاعلي عالي الدقة (25 دقيقة)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  مكتمل 100%
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-brand-background flex items-center justify-between hover:border-brand-primary/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-xs shrink-0">
                    <FileText className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-brand-purpleDark">الوحدة الثانية: التطبيقات العملية وحل المسائل</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">شرائح تدريبية تفاعلية وملف تدريبات برمجية</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-brand-purpleDark bg-brand-secondary/20 px-2.5 py-1 rounded-full border border-brand-secondary/40 shrink-0">
                  قيد التصفح
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
