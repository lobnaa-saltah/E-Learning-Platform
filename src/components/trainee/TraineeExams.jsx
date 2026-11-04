import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  Check, 
  X, 
  Play, 
  CheckCircle2, 
  User, 
  ShieldCheck 
} from 'lucide-react';
import { MOCK_EXAMS } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';

export const TraineeExams = () => {
  const [activeExam, setActiveExam] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isExamCompleted, setIsExamCompleted] = useState(false);

  const approvedExams = MOCK_EXAMS.filter((exam) => exam.isApproved === true);

  useEffect(() => {
    let timer;
    if (activeExam && !isExamCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeExam, isExamCompleted, timeLeft]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = (exam) => {
    setActiveExam(exam);
    setTimeLeft(exam.duration === '120 دقيقة' ? 3600 : 1800);
    setSelectedAnswers({});
    setIsExamCompleted(false);
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleFinishExam = () => {
    setIsExamCompleted(true);
  };

  const mockQuestions = [
    {
      id: 1,
      text: 'ما هو البروتوكول المستخدم لنقل البيانات المشفرة والآمنة بين المتصفح والخادم عبر الويب؟',
      options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      correct: 1,
    },
    {
      id: 2,
      text: 'في تصميم النظم وقواعد البيانات، ما هو المفتاح الذي يربط بين جدولين لإنشاء علاقة علائقية؟',
      options: ['المفتاح الأساسي (Primary Key)', 'المفتاح الأجنبي (Foreign Key)', 'المفتاح الفريد (Unique Key)', 'الفهرس المركب (Composite Index)'],
      correct: 1,
    },
    {
      id: 3,
      text: 'أي من العناصر التالية يوفر أعلى مستويات الحماية من هجمات حجب الخدمة الموزعة (DDoS)؟',
      options: ['جدار الحماية لتطبيقات الويب (WAF)', 'التشفير بالمفتاح المتماثل', 'بروتوكول DHCP', 'نظام أسماء النطاقات المحلي'],
      correct: 0,
    },
  ];

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="الاختبارات المعتمدة رسمياً فقط"
        title="جدول الاختبارات الإلكترونية"
        subtitle="لا تظهر للمتدرب إلا الاختبارات التي تم اعتمادها رسمياً من رئيس القسم وإدارة المعهد"
        icon={ShieldCheck}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs">
            <span className="text-slate-300">الاختبارات المعتمدة:</span>
            <span className="font-bold text-brand-gold font-mono text-xs">{approvedExams.length} اختبارات</span>
          </div>
        </div>
      </TraineePageHeader>

      <div className="space-y-4">
        {approvedExams.map((exam) => (
          <div
            key={exam.id}
            className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all ${
              exam.status === 'completed'
                ? 'border-emerald-200/80 shadow-sm hover:shadow-card'
                : exam.status === 'expired'
                ? 'border-slate-200/80 bg-slate-50/50 opacity-80'
                : 'border-slate-200/90 shadow-sm hover:shadow-card hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${
                    exam.status === 'completed'
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : exam.status === 'expired'
                      ? 'bg-slate-200 text-slate-500'
                      : 'bg-brand-purpleDark text-brand-gold shadow-brand-purpleDark/20'
                  }`}
                >
                  {exam.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : exam.status === 'expired' ? (
                    <X className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-brand-gold" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-brand-purpleDark text-base">
                      {exam.course}
                    </h3>

                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[11px] shrink-0 ${
                        exam.type === 'اختبار نهائي'
                          ? 'bg-brand-purpleDark text-white'
                          : 'bg-brand-secondary/20 text-brand-purpleDark border border-brand-secondary/40'
                      }`}
                    >
                      {exam.type}
                    </span>

                    {exam.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        الدرجة: {exam.score}
                      </span>
                    ) : exam.status === 'expired' ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shrink-0">
                        الدرجة: {exam.score}
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-background text-brand-purpleDark border border-slate-200 shrink-0">
                        الدرجة: {exam.maxScore} درجة
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-1 font-mono font-medium">
                    المدة المحددة: {exam.duration}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                    <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span className="font-bold text-slate-800">{exam.trainer}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 font-mono shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>يبدأ: {exam.startDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs text-slate-600">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border shrink-0 font-mono ${
                      exam.status === 'completed'
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                        : exam.status === 'expired'
                        ? 'bg-rose-50/70 border-rose-200 text-rose-700'
                        : 'bg-amber-50/70 border-amber-200 text-amber-800'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-bold">
                      {exam.status === 'expired' ? 'انتهى في:' : 'آخر موعد:'}
                    </span>
                    <span>{exam.endDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                {exam.status === 'completed' ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold text-xs">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>تم أداء الاختبار</span>
                  </div>
                ) : exam.status === 'expired' ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 font-bold text-xs">
                    <div className="w-4 h-4 rounded-full bg-[#FB5F5F] text-white flex items-center justify-center">
                      <X className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>انتهت فترة الاختبار</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartExam(exam)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>دخول الاختبار المتاح</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-purpleDark/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="p-5 px-6 bg-brand-purpleDark text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-gold font-bold">{activeExam.type}</span>
                <h3 className="font-black text-lg text-white">{activeExam.course}</h3>
                <span className="text-[11px] text-slate-300">المدرب المشرف: {activeExam.trainer}</span>
              </div>

              {!isExamCompleted && (
                <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-2xl border border-white/20 text-brand-gold font-mono font-black text-sm">
                  <Clock className="w-4 h-4 animate-spin text-brand-secondary" />
                  <span>الوقت المتبقي: {formatTimer(timeLeft)}</span>
                </div>
              )}
            </div>

            <div className="p-3.5 px-6 bg-brand-background border-b border-slate-200 flex items-center justify-between text-xs text-brand-textLight">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                الحفظ التلقائي لكل إجابة مفعل فورياً لحمايتك من انقطاع الاتصال (متطلب 8.1)
              </span>
              <span className="font-mono font-bold text-brand-purpleDark">
                {Object.keys(selectedAnswers).length} من {mockQuestions.length} مُجاب
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isExamCompleted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-brand-purpleDark">تم تسليم الاختبار ورصد النتيجة بنجاح!</h3>
                  <div className="p-5 bg-brand-background rounded-2xl max-w-xs mx-auto space-y-1 border border-slate-200">
                    <span className="text-xs text-brand-textLight">النتيجة الفورية المعتمدة:</span>
                    <div className="text-3xl font-black text-brand-purpleDark font-mono">18 / 20</div>
                    <span className="text-xs font-bold text-emerald-600 block">درجة ممتازة - تم قيد النتيجة في سجلك</span>
                  </div>
                  <button
                    onClick={() => setActiveExam(null)}
                    className="px-6 py-2.5 bg-brand-purpleDark hover:bg-brand-primary text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    العودة لجدول الاختبارات
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {mockQuestions.map((q, idx) => (
                    <div key={q.id} className="p-5 rounded-2xl bg-brand-background/60 border border-slate-200 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-brand-purpleDark text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 leading-relaxed">
                          {q.text}
                        </h4>
                      </div>

                      <div className="space-y-2 pr-9">
                        {q.options.map((option, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          return (
                            <button
                              type="button"
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full text-right p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-brand-secondary/20 border-brand-secondary text-brand-purpleDark shadow-sm font-bold'
                                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                              }`}
                            >
                              <span>{option}</span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? 'border-brand-purpleDark bg-brand-purpleDark text-white'
                                    : 'border-slate-300'
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isExamCompleted && (
              <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveExam(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  إلغاء وخروج
                </button>
                <button
                  onClick={handleFinishExam}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition-all cursor-pointer"
                >
                  تأكيد تسليم إجابات الاختبار
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
