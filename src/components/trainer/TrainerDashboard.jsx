import React, { useState } from 'react';
import { Video, Award, FileText, Star, Play, RotateCw, ArrowLeft, Users, Calendar, CheckCircle2, Sparkles, BookOpen, Clock } from 'lucide-react';

export const TrainerDashboard = ({ onStartLecture, onNavigateTab }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [lectureEvaluations, setLectureEvaluations] = useState({
    102: 5,
  });

  const [nextLecture, setNextLecture] = useState({
    courseName: 'تطوير تطبيقات الويب الحديثة',
    batch: 'شعبة 101 و شعبة 105 (حضور مشترك)',
    time: '06:00 م - 07:30 م',
    date: 'اليوم (الخميس)',
    traineesCount: 42,
    roomName: 'قاعة البث الافتراضي المباشر 1',
  });

  const handleRefreshNextLecture = () => {
    setIsRefreshing(true);
    setRefreshSuccess(false);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshSuccess(true);
      setNextLecture((prev) => ({
        ...prev,
        traineesCount: 42,
        time: '06:00 م - 07:30 م',
      }));
      setTimeout(() => setRefreshSuccess(false), 2000);
    }, 450);
  };

  const handleRateLecture = (id, rating) => {
    setLectureEvaluations((prev) => ({
      ...prev,
      [id]: rating,
    }));
  };

  const recentExams = [
    { id: 1, title: 'الاختبار النصفي - تطوير تطبيقات الويب الحديثة', batch: 'شعبة 101', date: '2026-10-25', time: '07:00 م', status: 'معتمد' },
    { id: 2, title: 'اختبار قصير 1 - استعلامات وقواعد البيانات', batch: 'شعبة 103', date: '2026-10-22', time: '04:00 م', status: 'معتمد' },
    { id: 3, title: 'اختبار عملي تجريبي - فحص الاختراق السيبراني', batch: 'شعبة 104', date: '2026-10-18', time: '06:00 م', status: 'معتمد' },
    { id: 4, title: 'الاختبار النصفي - هندسة البرمجيات وتحليل النظم', batch: 'شعبة 102', date: '2026-10-15', time: '05:00 م', status: 'معتمد' },
    { id: 5, title: 'اختبار مفاهيمي - أساسيات البرمجة الآمنة', batch: 'شعبة 105', date: '2026-10-12', time: '06:00 م', status: 'معتمد' },
  ];

  const recentAssignments = [
    { id: 1, title: 'الواجب الأول: تصميم واجهات تفاعلية بـ React', batch: 'شعبة 101', submitted: '38/42', status: 'نشط', dueDate: '2026-10-28' },
    { id: 2, title: 'الواجب الثاني: استعلامات SQL والـ Joins المتقدمة', batch: 'شعبة 103', submitted: '35/35', status: 'مكتمل الرصد', dueDate: '2026-10-22' },
    { id: 3, title: 'الواجب الأول: تحليل ثغرات الشبكات وفحص المنافذ', batch: 'شعبة 104', submitted: '28/30', status: 'نشط', dueDate: '2026-10-30' },
    { id: 4, title: 'الواجب الثالث: بناء RESTful API وربطه بقاعدة البيانات', batch: 'شعبة 101', submitted: '15/42', status: 'نشط', dueDate: '2026-11-02' },
    { id: 5, title: 'الواجب الأول: إعداد مصفوفة الصلاحيات والأمان', batch: 'شعبة 105', submitted: '22/25', status: 'مكتمل الرصد', dueDate: '2026-10-19' },
  ];

  const completedLecturesForRating = [
    { id: 101, title: 'قواعد البيانات - محاضرة 3: العلاقات المتقدمة وتطبيع البيانات', date: 'أمس 04:00 م', trainees: 36, batch: 'شعبة 103' },
    { id: 102, title: 'تطوير الويب - محاضرة 2: المكونات وخصائص State & Props', date: 'الأحد 06:00 م', trainees: 40, batch: 'شعبة 101' },
    { id: 103, title: 'أمن الشبكات - محاضرة 2: جدران الحماية وبروتوكولات التشفير', date: 'الثلاثاء 07:00 م', trainees: 32, batch: 'شعبة 104' },
    { id: 104, title: 'ورشة إعداد المشاريع البرمجية وتطبيقات السحاب', date: 'الخميس الماضي 05:00 م', trainees: 28, batch: 'دورة مسائية' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-purpleDark via-[#352f7f] to-brand-primary text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-gold border border-brand-secondary/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
              لوحة تحكم المدرب المحاضر
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              مرحباً د. فيصل إبراهيم الشهري
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              إدارة المحاضرات المباشرة، الاختبارات والواجبات، وتقييم الجلسات التدريبية المنتهية.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
            <div className="text-center px-3 border-l border-white/20">
              <span className="block text-xl font-black text-brand-gold font-mono">3</span>
              <span className="text-[11px] text-slate-300 font-medium">مقررات نشطة</span>
            </div>
            <div className="text-center px-3 border-l border-white/20">
              <span className="block text-xl font-black text-emerald-400 font-mono">2</span>
              <span className="text-[11px] text-slate-300 font-medium">دورات معتمدة</span>
            </div>
            <div className="text-center px-3">
              <span className="block text-xl font-black text-brand-secondary font-mono">142</span>
              <span className="text-[11px] text-slate-300 font-medium">متدرب مسجل</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-secondary/20 text-brand-purpleDark flex items-center justify-center">
                  <Video className="w-5 h-5 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-purpleDark text-base">المحاضرة القادمة</h3>
                  <p className="text-xs text-brand-textLight">الجلسة التالية في جدولك التدريبي</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {refreshSuccess && (
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 animate-in fade-in duration-200">
                    تم التحديث بنجاح
                  </span>
                )}
                <button
                  onClick={handleRefreshNextLecture}
                  className="flex items-center gap-1.5 text-xs text-brand-purpleDark hover:bg-slate-100 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200 transition-all cursor-pointer font-bold"
                  title="تحديث بطاقة المحاضرة القادمة"
                >
                  <RotateCw className={`w-3.5 h-3.5 text-brand-secondary ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>تحديث البطاقة</span>
                </button>
              </div>
            </div>

            <div className="mt-5 p-5 rounded-2xl bg-brand-background border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="inline-block text-xs font-bold text-brand-primary bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-mono">
                    {nextLecture.batch}
                  </span>
                  <h4 className="text-lg font-black text-brand-purpleDark pt-1">
                    {nextLecture.courseName}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-brand-textLight font-mono pt-1">
                    <span className="flex items-center gap-1.5 font-sans font-bold text-brand-purpleDark">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      {nextLecture.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {nextLecture.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-brand-purpleDark text-xs font-bold shadow-subtle flex-shrink-0">
                  <Users className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>{nextLecture.traineesCount} متدرب</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-brand-textLight">القاعة مهيأة بالبث السحابي وأدوات العرض</span>
            <button
              onClick={() => onStartLecture(nextLecture)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark text-xs font-black shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-brand-purpleDark text-brand-purpleDark" />
              <span>بدء المحاضرة الآن</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-purpleDark text-base">تقييم المحاضرات المنتهية</h3>
                  <p className="text-xs text-brand-textLight">تقييم كل جلسة تدريبية على حدة لضبط معايير الجودة</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {completedLecturesForRating.map((lec) => {
                const currentRate = lectureEvaluations[lec.id];
                return (
                  <div key={lec.id} className="p-3.5 rounded-2xl border border-slate-200 bg-brand-background space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate">
                        <h4 className="font-bold text-xs text-brand-purpleDark truncate">{lec.title}</h4>
                        <span className="text-[10px] text-brand-primary font-bold">{lec.batch}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">{lec.date}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="text-xs text-brand-textLight font-medium">تقييمك لمجريات الجلسة:</span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRateLecture(lec.id, star)}
                            className="p-0.5 focus:outline-none hover:scale-125 transition-transform cursor-pointer"
                            title={`${star} نجوم`}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                currentRate && star <= currentRate
                                  ? 'text-brand-gold fill-brand-gold'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                        {currentRate && (
                          <span className="text-[10px] font-bold text-emerald-600 mr-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>({currentRate}/5)</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-brand-textLight text-center">
            تُحفظ تقييمات المدرب آلياً لأغراض توكيد جودة التدريب الإلكتروني
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-purpleDark text-base">آخر 5 اختبارات مضافة حديثاً</h3>
                  <p className="text-xs text-brand-textLight">متابعة مواعيد الاختبارات والشعب التابعة لها</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('exams')}
                className="text-xs font-black text-brand-purpleDark hover:text-brand-primary flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>المزيد</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {recentExams.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => onNavigateTab('exams')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-brand-secondary/60 cursor-pointer flex items-center justify-between text-xs bg-brand-background transition-all hover:shadow-subtle"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-brand-purpleDark">{exam.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-brand-primary font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {exam.batch}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {exam.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-left font-mono text-[11px] text-slate-500">
                    <div>{exam.date}</div>
                    <div className="text-[10px] text-slate-400">{exam.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-secondary/20 text-brand-secondary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand-purpleDark" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-purpleDark text-base">آخر 5 واجبات مضافة حديثاً</h3>
                  <p className="text-xs text-brand-textLight">متابعة نسب تسليم الحلول من المتدربين</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('assignments')}
                className="text-xs font-black text-brand-purpleDark hover:text-brand-primary flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>المزيد</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {recentAssignments.map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => onNavigateTab('assignments')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-brand-secondary/60 cursor-pointer flex items-center justify-between text-xs bg-brand-background transition-all hover:shadow-subtle"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-brand-purpleDark">{asg.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-brand-primary font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {asg.batch}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        تاريخ الاستحقاق: {asg.dueDate}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 text-xs">
                    تم التسليم: {asg.submitted}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
