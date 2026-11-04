import React, { useState } from 'react';
import { PlayCircle, Calendar, Clock, Lock, User, X, Eye } from 'lucide-react';
import { MOCK_RECORDED_LECTURES } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';

export const TraineeRecorded = () => {
  const [activePlayback, setActivePlayback] = useState(null);

  const sortedRecordings = [...MOCK_RECORDED_LECTURES].sort((a, b) => {
    return new Date(b.actualDate).getTime() - new Date(a.actualDate).getTime();
  });

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="فترة الإتاحة السحابية: 30 يوماً من البث"
        title="أرشيف المحاضرات المسجلة"
        subtitle="وفق السياسة التعليمية لمعهد أم القرى، تتاح التسجيلات السحابية لمدة 30 يوماً من تاريخ البث المباشر ثم تؤرشف آلياً."
        icon={PlayCircle}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-bold">
            <Clock className="w-4 h-4 text-brand-gold" />
            <span>صلاحية التسجيلات: 30 يوماً فقط</span>
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold text-xs font-bold font-mono">
            <span>المتاح للمشاهدة الآن: 2 من {sortedRecordings.length}</span>
          </span>
        </div>
      </TraineePageHeader>

      <div className="space-y-4">
        {sortedRecordings.map((item) => {
          const isExpired = item.status === 'expired';
          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all ${
                isExpired
                  ? 'border-slate-200/80 bg-slate-50/50 opacity-80'
                  : 'border-slate-200/90 shadow-sm hover:shadow-card hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${
                      isExpired
                        ? 'bg-slate-200 text-slate-500'
                        : 'bg-brand-purpleDark text-brand-gold shadow-brand-purpleDark/20'
                    }`}
                  >
                    {isExpired ? <Lock className="w-5 h-5" /> : <PlayCircle className="w-5 h-5 text-brand-gold" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-brand-purpleDark text-base">
                        {item.courseName}
                      </h3>
                      <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-lg bg-brand-background text-brand-purpleDark border border-slate-200 shrink-0">
                        {item.lectureNumber}
                      </span>
                      {isExpired ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200 shrink-0">
                          <Lock className="w-3 h-3 text-[#FB5F5F]" />
                          انتهت الصلاحية (مؤرشف)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          متاح للمشاهدة
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>مدة الجلسة: {item.duration}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.viewsCount} مشاهدة</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                      <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span className="font-bold text-slate-800">{item.trainerName}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 font-mono shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span>{item.actualDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs text-slate-600">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border shrink-0 font-mono ${
                        isExpired
                          ? 'bg-rose-50/70 border-rose-200 text-rose-700'
                          : 'bg-amber-50/70 border-amber-200 text-amber-800'
                      }`}
                    >
                      {isExpired ? (
                        <Lock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      )}
                      <span className="font-bold">
                        {isExpired ? 'تاريخ انتهاء الصلاحية:' : 'صالح للمشاهدة حتى:'}
                      </span>
                      <span>{item.expiresAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {isExpired ? (
                    <button
                      disabled
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs border border-slate-200 cursor-not-allowed"
                      title="انتهت فترة الصلاحية المحددة بـ 30 يوماً"
                    >
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span>التسجيل غير متاح</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActivePlayback(item)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purpleDark hover:bg-brand-primary text-white font-bold text-xs shadow-md shadow-brand-purpleDark/20 transition-all cursor-pointer group hover:scale-[1.02]"
                    >
                      <PlayCircle className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
                      <span>تشغيل التسجيل</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activePlayback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purpleDark/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-3xl overflow-hidden">
            <div className="p-4 px-6 bg-brand-purpleDark text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">
                  {activePlayback.courseName} - {activePlayback.lectureNumber}
                </h3>
                <p className="text-xs text-brand-gold mt-0.5">المدرب: {activePlayback.trainerName}</p>
              </div>
              <button
                onClick={() => setActivePlayback(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-navy-950 flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EFB144_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="w-20 h-20 rounded-full bg-brand-secondary/20 border-2 border-brand-secondary flex items-center justify-center mb-4 shadow-lg">
                <PlayCircle className="w-10 h-10 text-brand-secondary animate-pulse" />
              </div>
              <p className="text-base font-bold text-white relative z-10">مشغل البث السحابي لمعهد أم القرى</p>
              <p className="text-xs text-slate-300 mt-1 relative z-10">
                تسجيل المحاضرة بجودة 1080p عالية الوضوح - المدة الإجمالية: {activePlayback.duration}
              </p>
            </div>

            <div className="p-4 px-6 bg-brand-background flex items-center justify-between text-xs text-brand-textLight border-t border-slate-200">
              <span className="font-mono">تاريخ البث الأصلي: {activePlayback.actualDate}</span>
              <span className="font-mono font-bold text-brand-purpleDark">
                صالح للمشاهدة حتى: {activePlayback.expiresAt}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
