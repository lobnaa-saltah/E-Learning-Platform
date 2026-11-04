import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Video,
  Tag,
  Printer,
  Sparkles,
} from 'lucide-react';
import { TraineePageHeader } from './TraineePageHeader';

export const TraineeSchedule = () => {
  const [selectedDayFilter, setSelectedDayFilter] = useState('all');

  const days = [
    { id: 'الأحد', label: 'الأحد' },
    { id: 'الاثنين', label: 'الاثنين' },
    { id: 'الثلاثاء', label: 'الثلاثاء' },
    { id: 'الأربعاء', label: 'الأربعاء' },
    { id: 'الخميس', label: 'الخميس' },
  ];

  const scheduleList = [
    {
      id: 1,
      day: 'الأحد',
      code: 'WEB-301',
      course: 'تطوير تطبيقات الويب الحديثة',
      time: '06:00 م - 07:30 م',
      duration: '90 دقيقة',
      trainer: 'د. فيصل إبراهيم الشهري',
      room: 'قاعة 101 الافتراضية',
      batch: 'شعبة 101 (أساسية)',
      isHost: false,
    },
    {
      id: 2,
      day: 'الاثنين',
      code: 'DB-204',
      course: 'قواعد البيانات العلائقية والمتقدمة',
      time: '04:00 م - 05:30 م',
      duration: '90 دقيقة',
      trainer: 'أ. مها عبد العزيز المطيري',
      room: 'قاعة 103 الافتراضية',
      batch: 'شعبة 101 (أساسية)',
      isHost: false,
    },
    {
      id: 3,
      day: 'الثلاثاء',
      code: 'SEC-305',
      course: 'الأمن السيبراني ونظم الحماية',
      time: '07:00 م - 08:30 م',
      duration: '90 دقيقة',
      trainer: 'م. راكان طلال السلمي',
      room: 'قاعة 104 الافتراضية',
      batch: 'مُلحق مع شعبة [105]',
      isHost: true,
      hostBatch: '105',
    },
    {
      id: 4,
      day: 'الأربعاء',
      code: 'SYS-202',
      course: 'تحليل وتصميم النظم التطبيقية',
      time: '05:00 م - 06:30 م',
      duration: '90 دقيقة',
      trainer: 'د. سارة أحمد القرني',
      room: 'قاعة 102 الافتراضية',
      batch: 'شعبة 101 (أساسية)',
      isHost: false,
    },
    {
      id: 5,
      day: 'الخميس',
      code: 'SKL-101',
      course: 'ورشة المهارات المهنية والتقنية',
      time: '04:30 م - 06:00 م',
      duration: '90 دقيقة',
      trainer: 'أ. عادل خالد الحارثي',
      room: 'قاعة البث 2',
      batch: 'شعبة 101 (أساسية)',
      isHost: false,
    },
  ];

  const currentTermInfo = {
    termName: 'الفصل التدريبي الأول 1448 هـ',
    startDate: '01/09/2026',
    endDate: '15/01/2027',
    programType: 'دبلوم تقنية المعلومات التطبيقي',
    sectionName: 'شعبة 101 (الفترة المسائية)',
    timeSystem: 'نظام 12 ساعة',
  };

  const filteredSchedule = selectedDayFilter === 'all'
    ? scheduleList
    : scheduleList.filter((s) => s.day === selectedDayFilter);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge={`${currentTermInfo.programType} • ${currentTermInfo.timeSystem}`}
        title="جدول المحاضرات الأسبوعي"
        subtitle="مواعيد المحاضرات المباشرة والقاعات الافتراضية المعتمدة أسبوعياً من الأحد إلى الخميس"
        icon={Calendar}
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white">
          <span className="font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            {currentTermInfo.termName}
          </span>
          <span className="text-white/30">•</span>
          <span className="text-slate-200">{currentTermInfo.sectionName}</span>
          <span className="text-white/30">•</span>
          <span className="font-mono text-brand-gold font-bold flex items-center gap-1 text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-brand-gold" />
            {currentTermInfo.startDate} - {currentTermInfo.endDate}
          </span>
        </div>
      </TraineePageHeader>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setSelectedDayFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedDayFilter === 'all'
                ? 'bg-brand-purpleDark text-white shadow-sm'
                : 'text-slate-600 hover:text-brand-purpleDark hover:bg-slate-100'
            }`}
          >
            كافة أيام الأسبوع
          </button>
          {days.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDayFilter(d.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDayFilter === d.id
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark hover:bg-slate-100'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-brand-background hover:bg-slate-100 text-brand-purpleDark text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
        >
          <Printer className="w-3.5 h-3.5 text-brand-primary" />
          <span>طباعة الجدول</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredSchedule.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-card hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 sm:w-24 py-2.5 rounded-2xl bg-brand-purpleDark text-white flex flex-col items-center justify-center shrink-0 shadow-sm border border-navy-950">
                  <span className="text-[10px] font-bold text-brand-gold">يوم</span>
                  <span className="text-sm font-black text-white">{item.day}</span>
                </div>

                <div className="min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-brand-background border border-slate-200 text-brand-purpleDark shrink-0">
                      {item.code}
                    </span>
                    <h3 className="font-bold text-brand-purpleDark text-base">
                      {item.course}
                    </h3>
                    {item.isHost ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200 shrink-0">
                        <Tag className="w-3 h-3 text-amber-600" />
                        مُلحق مع شعبة [{item.hostBatch}]
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-500 bg-brand-background px-2.5 py-0.5 rounded-lg border border-slate-200 shrink-0">
                        {item.batch}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1.5 font-bold font-mono text-brand-purpleDark">
                      <Clock className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>{item.time}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <User className="w-3.5 h-3.5 text-brand-primary" />
                      <span className="font-semibold">{item.trainer}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 font-mono text-slate-600">
                      <Video className="w-3.5 h-3.5 text-brand-primary" />
                      <span>{item.room}</span>
                    </span>
                    <span>•</span>
                    <span className="text-slate-400 font-mono">
                      المدة: {item.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purpleDark hover:bg-brand-primary text-white font-bold text-xs shadow-md shadow-brand-purpleDark/20 transition-all cursor-pointer group hover:scale-[1.02]"
                >
                  <Video className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
                  <span>دخول القاعة الافتراضية</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
