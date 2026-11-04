import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, AlertTriangle, Video, ChevronRight, ChevronLeft, Check, Users, Sparkles, X, Play, Info } from 'lucide-react';

export const TrainerCalendar = ({ onLaunchLecture }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const months = [
    { name: 'أكتوبر 2026', daysCount: 31, startDayOffset: 4 },
    { name: 'نوفمبر 2026', daysCount: 30, startDayOffset: 0 },
  ];

  const currentMonth = months[currentMonthIndex];

  const calendarEvents = [
    {
      id: 1,
      day: 4,
      title: 'تطوير تطبيقات الويب الحديثة - محاضرة 1',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      scheduledDate: '2026-10-04',
      scheduledTime: '06:00 م - 07:30 م',
      batch: 'شعبة 101',
      traineesCount: 42,
      isCurrentScheduledTime: false,
    },
    {
      id: 2,
      day: 8,
      title: 'قواعد البيانات - محاضرة 1: المفاهيم الأساسية',
      courseName: 'قواعد البيانات العلائقية والمتقدمة',
      scheduledDate: '2026-10-08',
      scheduledTime: '04:00 م - 05:30 م',
      batch: 'شعبة 103',
      traineesCount: 35,
      isCurrentScheduledTime: false,
    },
    {
      id: 3,
      day: 11,
      title: 'أمن الشبكات - محاضرة 2: بروتوكولات الحماية',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      scheduledDate: '2026-10-11',
      scheduledTime: '07:00 م - 08:30 م',
      batch: 'شعبة 104',
      traineesCount: 30,
      isCurrentScheduledTime: false,
    },
    {
      id: 4,
      day: 15,
      title: 'تطوير تطبيقات الويب - محاضرة 2: المكونات',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      scheduledDate: '2026-10-15',
      scheduledTime: '06:00 م - 07:30 م',
      batch: 'شعبة 101',
      traineesCount: 42,
      isCurrentScheduledTime: false,
    },
    {
      id: 5,
      day: 18,
      title: 'قواعد البيانات - محاضرة 2: الـ SQL المتقدم',
      courseName: 'قواعد البيانات العلائقية والمتقدمة',
      scheduledDate: '2026-10-18',
      scheduledTime: '04:00 م - 05:30 م',
      batch: 'شعبة 103',
      traineesCount: 35,
      isCurrentScheduledTime: false,
    },
    {
      id: 6,
      day: 22,
      title: 'تطوير تطبيقات الويب - محاضرة 3: إدارة الحالة',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      scheduledDate: '2026-10-22',
      scheduledTime: '06:00 م - 07:30 م',
      batch: 'شعبة 101',
      traineesCount: 42,
      isCurrentScheduledTime: false,
    },
    {
      id: 7,
      day: 25,
      title: 'تطوير تطبيقات الويب - محاضرة 4: جارية اليوم',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      scheduledDate: '2026-10-25',
      scheduledTime: '06:00 م - 07:30 م',
      batch: 'شعبة 101 و شعبة 105',
      traineesCount: 42,
      isCurrentScheduledTime: true,
      isToday: true,
    },
    {
      id: 8,
      day: 27,
      title: 'أمن الشبكات - محاضرة 3: فحص الثغرات',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      scheduledDate: '2026-10-27',
      scheduledTime: '07:00 م - 08:30 م',
      batch: 'شعبة 104',
      traineesCount: 30,
      isCurrentScheduledTime: false,
    },
    {
      id: 9,
      day: 29,
      title: 'ورشة المشاريع البرمجية وتطبيقات السحاب',
      courseName: 'دورة هندسة الواجهات التفاعلية',
      scheduledDate: '2026-10-29',
      scheduledTime: '05:00 م - 06:30 م',
      batch: 'دفعة المسار السريع',
      traineesCount: 35,
      isCurrentScheduledTime: false,
    },
  ];

  const handleLectureClick = (event) => {
    setSelectedLecture(event);
    setShowConfirmModal(true);
  };

  const handleConfirmStart = () => {
    const lectureToStart = {
      courseName: selectedLecture.courseName || selectedLecture.title,
      batch: selectedLecture.batch,
      time: selectedLecture.scheduledTime,
      date: selectedLecture.scheduledDate,
      traineesCount: selectedLecture.traineesCount,
      trainerName: 'د. فيصل إبراهيم الشهري',
    };
    setShowConfirmModal(false);
    onLaunchLecture(lectureToStart);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-brand-purpleDark">
              جدول المحاضرات - التقويم الشهري التفاعلي
            </h2>
            <span className="text-xs font-bold bg-brand-secondary/20 text-brand-purpleDark px-2.5 py-1 rounded-full border border-brand-secondary/30">
              تقويم تفاعلي كامل
            </span>
          </div>
          <p className="text-xs text-brand-textLight mt-1">
            استعراض مواعيد محاضرات الدبلومات والدورات بنظام 12 ساعة مع إمكانية بدء البث المباشر لأي محاضرة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-brand-background p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentMonthIndex === 0}
              className="p-2 rounded-xl hover:bg-white text-brand-purpleDark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="الشهر السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-black px-4 text-brand-purpleDark font-mono">
              {currentMonth.name}
            </span>
            <button
              onClick={() => setCurrentMonthIndex((prev) => Math.min(months.length - 1, prev + 1))}
              disabled={currentMonthIndex === months.length - 1}
              className="p-2 rounded-xl hover:bg-white text-brand-purpleDark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="الشهر التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="grid grid-cols-7 bg-brand-purpleDark text-white text-xs font-bold text-center border-b border-navy-950">
          <div className="py-3.5">الأحد</div>
          <div className="py-3.5">الاثنين</div>
          <div className="py-3.5">الثلاثاء</div>
          <div className="py-3.5">الأربعاء</div>
          <div className="py-3.5">الخميس</div>
          <div className="py-3.5 text-slate-400">الجمعة</div>
          <div className="py-3.5 text-slate-400">السبت</div>
        </div>

        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-x-reverse divide-y divide-slate-100 min-h-[560px]">
          {Array.from({ length: currentMonth.daysCount }).map((_, idx) => {
            const dayNumber = idx + 1;
            const event = currentMonthIndex === 0 ? calendarEvents.find((e) => e.day === dayNumber) : null;
            const isToday = event?.isToday;

            return (
              <div
                key={dayNumber}
                className={`p-2.5 min-h-[110px] flex flex-col justify-between transition-colors ${
                  isToday ? 'bg-amber-50/40 ring-2 ring-brand-secondary/40 inset-0' : 'hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded-md ${
                      isToday
                        ? 'bg-brand-secondary text-brand-purpleDark font-black'
                        : 'text-slate-400'
                    }`}
                  >
                    {dayNumber}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      اليوم
                    </span>
                  )}
                </div>

                {event && (
                  <div
                    onClick={() => handleLectureClick(event)}
                    className={`p-2 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] shadow-subtle text-right mt-1.5 ${
                      isToday
                        ? 'bg-brand-secondary/20 hover:bg-brand-secondary/30 border-brand-secondary/50 text-brand-purpleDark'
                        : 'bg-brand-background hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="text-[10px] font-black block truncate text-brand-purpleDark">
                      {event.title}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600 block mt-0.5">
                      {event.scheduledTime}
                    </span>
                    <div className="mt-1 flex items-center justify-between text-[9px] font-bold pt-1 border-t border-slate-200/60">
                      <span className="text-brand-primary">{event.batch}</span>
                      <Video className="w-3 h-3 text-brand-secondary" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showConfirmModal && selectedLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-brand-purpleDark text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-secondary/20 flex items-center justify-center text-brand-gold">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">
                    تأكيد بدء المحاضرة في القاعة الافتراضية
                  </h3>
                  <p className="text-xs text-slate-300 font-light">
                    التحقق من الموعد المجدول وإطلاق قاعة البث المباشر
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-brand-background border border-slate-200 space-y-3 text-xs">
                <div>
                  <span className="text-brand-textLight block text-[11px]">المقرر التدريبي والشعبة:</span>
                  <span className="font-bold text-brand-purpleDark text-sm block mt-0.5">
                    {selectedLecture.courseName || selectedLecture.title}
                  </span>
                  <span className="text-brand-primary font-bold block mt-0.5 font-mono">
                    {selectedLecture.batch}
                  </span>
                </div>

                <div className="pt-2.5 border-t border-slate-200 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-brand-textLight block text-[11px]">الموعد المجدول:</span>
                    <span className="font-mono font-bold text-brand-purpleDark">
                      {selectedLecture.scheduledDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-brand-textLight block text-[11px]">التوقيت (نظام 12 ساعة):</span>
                    <span className="font-mono font-bold text-brand-purpleDark">
                      {selectedLecture.scheduledTime}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-600">
                  <span className="text-[11px]">المتدربون المسجلون للحضور:</span>
                  <span className="font-bold text-brand-purpleDark font-mono">{selectedLecture.traineesCount} متدرب</span>
                </div>
              </div>

              {selectedLecture.isCurrentScheduledTime ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold block">موعد المحاضرة مطابق للجدول الرسمي:</span>
                    <p className="text-[11px] leading-relaxed text-emerald-800">
                      الوقت الحالي يوافق الموعد المجدول تماماً. القاعة الافتراضية مهيأة وجاهزة لاستقبال المتدربين فور الضغط على بدء المحاضرة.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 shadow-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold block">تنبيه الموعد الأصلي للمحاضرة:</span>
                    <p className="text-[11px] leading-relaxed text-amber-800">
                      الموعد الرسمي لانعقاد هذه المحاضرة هو <strong className="font-mono">{selectedLecture.scheduledDate}</strong> الساعة <strong className="font-mono">{selectedLecture.scheduledTime}</strong>. 
                      محاولة البدء الآن تعتبر في غير الموعد المجدول (بدء مبكر أو استثنائي). يتيح لك النظام تأكيد البدء وسيقوم بإرسال إشعار فوري للمتدربين بدخول القاعة.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleConfirmStart}
                  className="px-6 py-2.5 bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark text-xs font-black rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-brand-purpleDark text-brand-purpleDark" />
                  <span>تأكيد البدء والدخول للقاعة الافتراضية</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
