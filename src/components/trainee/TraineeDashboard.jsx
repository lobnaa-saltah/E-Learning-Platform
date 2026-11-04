import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Calendar, 
  FileText, 
  Award, 
  Star, 
  RotateCw, 
  ArrowLeft, 
  Clock, 
  Sparkles,
  Send,
  CheckCircle2
} from 'lucide-react';
import { 
  MOCK_LECTURE_STATES, 
  MOCK_ASSIGNMENTS, 
  MOCK_EXAMS, 
  MOCK_TRAINERS_TO_EVALUATE 
} from '../../constants/mockData';

export const TraineeDashboard = ({ onNavigateTab, onJoinLecture }) => {
  const [lectureStateIndex, setLectureStateIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [selectedTrainerId, setSelectedTrainerId] = useState(MOCK_TRAINERS_TO_EVALUATE[0].id);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const currentLecture = MOCK_LECTURE_STATES[lectureStateIndex];

  const handleRefreshLecture = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLectureStateIndex((prev) => (prev + 1) % MOCK_LECTURE_STATES.length);
      setIsRefreshing(false);
    }, 450);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    setRatingSubmitted(true);
    setTimeout(() => {
      setRatingSubmitted(false);
      setRatingComment('');
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
  };

  const selectedTrainer = MOCK_TRAINERS_TO_EVALUATE.find((t) => t.id === Number(selectedTrainerId));

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={cardVariants}
        className="relative overflow-hidden rounded-3xl bg-brand-purpleDark text-white p-6 sm:p-10 shadow-elevated border border-white/10"
      >
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 95%)',
          }}
        >
          <defs>
            <pattern id="separated-squares" width="56" height="56" patternUnits="userSpaceOnUse">
              <rect x="4" y="4" width="48" height="48" rx="8" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#separated-squares)" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-35">
          <div className="w-[280px] h-[280px] rounded-full border border-white/20" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/20" />
          <div className="absolute w-[620px] h-[620px] rounded-full border border-brand-gold/30" />
          <div className="absolute w-[820px] h-[820px] rounded-full border border-white/10" />
          <div className="absolute w-[1020px] h-[1020px] rounded-full border border-brand-gold/20" />
        </div>

        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-3xl border border-white/10 rotate-12 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-3xl border border-brand-gold/15 -rotate-12 pointer-events-none" />

        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#433B8B]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-5">
          <div className="space-y-2 max-w-xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>لوحة التحكم الرئيسية للمتدرب</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              مرحباً بك، عبدالله محمد القرشي
            </h1>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              دبلوم تقنية المعلومات التطبيقي - الفصل التدريبي الأول 1448 هـ. اختصارات سريعة لأهم ما تحتاجه الآن.
            </p>
          </div>

          <div className="bg-gradient-to-b from-white/[0.09] via-white/[0.05] to-white/[0.02] border border-white/15 backdrop-blur-xl rounded-2xl p-2 sm:p-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_10px_30px_rgba(0,0,0,0.3)] flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4 w-auto max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all group flex-1 sm:flex-initial justify-center sm:justify-start">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3.5" className="text-white/10" fill="transparent" />
                  <circle cx="24" cy="24" r="18" stroke="url(#emeraldGrad)" strokeWidth="3.5" strokeDasharray="113.1" strokeDashoffset="4.5" strokeLinecap="round" fill="transparent" className="filter drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                  <defs>
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-[10px] font-bold text-emerald-300">96%</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-bold text-white group-hover:text-emerald-300 transition-colors">نسبة الحضور</span>
                <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ملتزم وممتاز
                </span>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0" />

            <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all group flex-1 sm:flex-initial justify-center sm:justify-start">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-gold/25 to-amber-500/10 border border-brand-gold/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,187,83,0.2)] group-hover:scale-105 transition-transform">
                <Award className="w-4 h-4 text-brand-gold" />
              </div>
              <div className="flex flex-col text-right">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-bold text-brand-gold">4.8</span>
                  <span className="text-[9px] text-slate-400 font-medium">/ 5.0</span>
                </div>
                <span className="text-[9px] text-slate-300 font-bold">المعدل التراكمي</span>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-1 rounded-full ${i <= 4 ? 'w-2 bg-brand-gold shadow-[0_0_4px_rgba(242,187,83,0.5)]' : 'w-1.5 bg-brand-gold/40'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0" />

            <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all group flex-1 sm:flex-initial justify-center sm:justify-start">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/10 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(251,146,60,0.2)] group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 text-[8px] font-bold text-white flex items-center justify-center border border-brand-purpleDark animate-pulse">
                  !
                </span>
              </div>
              <div className="flex flex-col text-right">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">3</span>
                  <span className="text-[9px] text-amber-300 font-bold">مهام</span>
                </div>
                <span className="text-[9px] text-slate-300 font-bold">تتطلب المتابعة</span>
                <span className="text-[8px] text-slate-400 font-medium mt-0.5">اختبارات وواجبات</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-6 w-full">
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all w-full"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm">
                  <Video className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-purpleDark text-base">المحاضرة الحالية / القادمة</h3>
                  <p className="text-xs text-slate-500 mt-0.5">أقرب موعد تدريبي مباشر بنظام 12 ساعة</p>
                </div>
              </div>
              <button
                onClick={handleRefreshLecture}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 text-xs text-brand-purpleDark hover:bg-slate-100 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200 transition-all focus:outline-none cursor-pointer font-bold"
                title="تحديث بيانات بطاقة المحاضرة فقط"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-purpleDark' : ''}`} />
                <span>تحديث البطاقة</span>
              </button>
            </div>

            <div className="mt-5">
              {currentLecture.hasLecture ? (
                <div className="p-5 rounded-2xl bg-brand-background border border-slate-200/90 shadow-xs space-y-3.5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-brand-purpleDark bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 inline-block shadow-xs">
                        {currentLecture.lectureNumber}
                      </span>
                      <h4 className="text-lg font-bold text-brand-purpleDark mt-1.5">
                        {currentLecture.courseName}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        المدرب: <span className="font-bold text-brand-purpleDark">{currentLecture.trainerName}</span>
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 ${
                        currentLecture.status === 'live'
                          ? 'bg-gold-50 text-gold-700 border border-gold-300/80 shadow-xs'
                          : 'bg-white text-brand-purpleDark border border-slate-200 shadow-xs'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          currentLecture.status === 'live' ? 'bg-brand-orange animate-pulse' : 'bg-brand-purpleDark'
                        }`}
                      />
                      {currentLecture.statusText}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 text-xs text-brand-textLight font-semibold pt-3 border-t border-slate-200/70">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-gold" />
                      {currentLecture.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      {currentLecture.time}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center space-y-2 border-2 border-dashed border-slate-200 rounded-2xl bg-brand-background">
                  <Clock className="w-10 h-10 mx-auto text-slate-400" />
                  <p className="text-sm font-bold text-brand-purpleDark">
                    لا يوجد لديك محاضرات حالياً
                  </p>
                  <p className="text-xs text-slate-500">
                    يمكنك الضغط على زر "تحديث البطاقة" للتحقق من أي مواعيد جديدة
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigateTab('lectures')}
              className="text-xs font-bold text-brand-primary hover:text-brand-purpleDark flex items-center gap-1 transition-colors"
            >
              <span>عرض جدول المحاضرات كاملاً</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            {currentLecture.hasLecture && (
              <button
                onClick={() => onJoinLecture(currentLecture)}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purpleDark hover:bg-[#352F7F] text-white text-xs font-bold shadow-md shadow-brand-purpleDark/25 transition-all cursor-pointer overflow-hidden group border border-brand-purpleDark"
              >
                <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Video className="w-4 h-4 text-brand-gold" />
                <span>دخول المحاضرة الآن</span>
              </button>
            )}
          </div>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all w-full"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-base">الاختبارات النشطة</h3>
                  <p className="text-xs text-slate-500">اختبارات الترم الحالي النشطة والمجدولة</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('exams')}
                className="text-xs font-bold text-royalBlue-600 hover:text-royalBlue-700 flex items-center gap-1 transition-colors"
              >
                <span>المزيد</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {MOCK_EXAMS.slice(0, 2).map((exam) => (
                <div
                  key={exam.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-3 bg-surface-base"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200 inline-block">
                      {exam.type}
                    </span>
                    <h4 className="font-bold text-sm text-navy-900 mt-1 truncate">{exam.course}</h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{exam.startDate}</p>
                  </div>
                  <button
                    onClick={() => onNavigateTab('exams')}
                    className="px-3.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold transition-colors whitespace-nowrap"
                  >
                    تفاصيل الاختبار
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>مدة الاختبارات تحتسب بعد بدء الجلسة مباشرة</span>
            <span className="font-bold text-navy-800 font-mono">2 اختبار نشط</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all w-full h-full"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-base">الواجبات النشطة</h3>
                    <p className="text-xs text-slate-500">واجبات الترم الحالي النشطة والتسليمات المفتوحة</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('assignments')}
                  className="text-xs font-bold text-royalBlue-600 hover:text-royalBlue-700 flex items-center gap-1 transition-colors"
                >
                  <span>المزيد</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {MOCK_ASSIGNMENTS.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-3 bg-surface-base"
                  >
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-navy-900 truncate">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.course}</p>
                      <span className="text-[11px] text-amber-600 font-mono block mt-1">
                        ينتهي في: {item.endDate}
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigateTab('assignments')}
                      className="px-3.5 py-1.5 rounded-lg bg-royalBlue-50 text-royalBlue-700 hover:bg-royalBlue-100 border border-royalBlue-200 text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      تسليم الواجب
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>احرص على تسليم الحلول قبل انتهاء الموعد</span>
              <span className="font-bold text-navy-800 font-mono">1 واجب قيد التسليم</span>
            </div>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all w-full h-full"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-gold-400 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-base">تقييم المدربين</h3>
                    <p className="text-xs text-slate-500">تقييم لمدربي الشعبة النشطين حالياً</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    اختر المدرب المراد تقييمه:
                  </label>
                  <select
                    value={selectedTrainerId}
                    onChange={(e) => setSelectedTrainerId(e.target.value)}
                    className="w-full text-xs font-bold text-navy-900 bg-surface-base border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-navy-800"
                  >
                    {MOCK_TRAINERS_TO_EVALUATE.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} - {t.course}
                      </option>
                    ))}
                  </select>
                </div>

                {ratingSubmitted ? (
                  <div className="py-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200 animate-in fade-in">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm text-navy-900">
                      تم إرسال تقييمك لـ {selectedTrainer?.name} بنجاح!
                    </h4>
                    <p className="text-xs text-slate-500">
                      التقييمات سرية ولا تظهر أسماء المتدربين للمدربين.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRatingSubmit} className="space-y-3">
                    <div className="flex items-center justify-center gap-2 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              star <= (hoverRating || rating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={ratingComment}
                      onChange={(e) => setRatingComment(e.target.value)}
                      placeholder="أضف تعليقك حول أداء المدرب وتفاعل القاعة التدريبية..."
                      rows={2}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-800 focus:outline-none resize-none bg-surface-base"
                    />

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-navy-800 hover:bg-navy-900 text-white rounded-xl text-xs font-bold shadow transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال التقييم للمدرب</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              تقييمك يسهم في تطوير جودة العملية التدريبية بالمعهد
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
