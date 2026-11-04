import React from 'react';
import { Video, Calendar, Clock, Check, X, Play, User } from 'lucide-react';
import { MOCK_LECTURES } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';

export const TraineeLectures = ({ onJoinLecture }) => {
  const sortedLectures = [...MOCK_LECTURES].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="مرتبة تلقائياً من الأحدث إلى الأقدم"
        title="سجل المحاضرات التدريبية"
        subtitle="جدول شامل لكافة المحاضرات المباشرة ومواعيدها بنظام 12 ساعة وحالات الحضور والغياب المعتمدة"
        icon={Video}
      />

      <div className="space-y-4">
        {sortedLectures.map((lecture) => (
            <div
              key={lecture.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all ${
                lecture.status === 'live'
                  ? 'border-emerald-300 shadow-md ring-2 ring-emerald-500/10 bg-gradient-to-l from-white via-white to-emerald-50/20'
                  : 'border-slate-200/90 shadow-sm hover:shadow-card hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${
                      lecture.status === 'live'
                        ? 'bg-amber-400 text-white shadow-amber-400/30'
                        : lecture.attendance === 'present'
                        ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                        : lecture.attendance === 'absent'
                        ? 'bg-[#FB5F5F] text-white shadow-[#FB5F5F]/30'
                        : 'bg-brand-purpleDark text-brand-gold'
                    }`}
                  >
                    <Video className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-brand-purpleDark text-base">
                        {lecture.courseName}
                      </h3>
                      <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-lg bg-brand-background text-brand-purpleDark border border-slate-200 shrink-0">
                        المحاضرة #{lecture.lectureNumber}
                      </span>
                      {lecture.status === 'live' && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-lg border border-emerald-300 animate-pulse shrink-0">
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          بث مباشر الآن
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      شعبة 101 - الترم الحالي
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                      <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span className="font-bold text-slate-800">{lecture.trainerName}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 font-mono shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span>{lecture.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 font-mono shrink-0">
                      <Clock className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                      <span className="font-bold text-brand-purpleDark">{lecture.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                      <span className="text-slate-400">المدة:</span>
                      <span className="font-bold text-brand-purpleDark font-mono">
                        {lecture.status === 'ended' ? lecture.duration : '90 دقيقة'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {lecture.status === 'live' ? (
                    <button
                      onClick={() => onJoinLecture(lecture)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer group hover:scale-[1.02]"
                    >
                      <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                      <span>دخول المحاضرة الآن</span>
                    </button>
                  ) : lecture.attendance === 'present' ? (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold text-xs">
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>تم الحضور</span>
                    </div>
                  ) : lecture.attendance === 'absent' ? (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 font-bold text-xs">
                      <div className="w-4 h-4 rounded-full bg-[#FB5F5F] text-white flex items-center justify-center">
                        <X className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>غائب</span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200">
                      لم تبدأ بعد
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};
