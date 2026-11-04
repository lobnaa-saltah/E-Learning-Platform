import React, { useState } from 'react';
import { BookOpen, Download, PlusCircle, Users, FileText, Award, CheckCircle2, Search, Filter, X, ShieldAlert, Sparkles, ChevronDown } from 'lucide-react';

export const TrainerCourses = ({ onNavigateTab }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: 'WEB-301',
      name: 'تطوير تطبيقات الويب الحديثة',
      program: 'دبلوم تقنية المعلومات التطبيقي',
      creditHours: 4,
      sections: ['شعبة 101 (24 متدرب)', 'شعبة 105 (18 متدرب)'],
      syllabusFile: 'خطة_مقرر_تطوير_الويب_WEB301.pdf',
      activeAssignments: 2,
      activeExams: 1,
      trainees: [
        { id: '44501289', name: 'عبدالله محمد القرشي', section: 'شعبة 101', status: 'منتظم', isAttached: false },
        { id: '44502190', name: 'ريان خالد البقمي', section: 'شعبة 105', status: 'ملحق بقرار أكاديمي', isAttached: true },
        { id: '44501344', name: 'تركي سالم الزهراني', section: 'شعبة 101', status: 'منتظم', isAttached: false },
        { id: '44502311', name: 'مشاري سعيد العتيبي', section: 'شعبة 105', status: 'ملحق (استثناء تحويلي)', isAttached: true },
        { id: '44501892', name: 'فهد ناصر الدوسري', section: 'شعبة 101', status: 'منتظم', isAttached: false },
      ],
    },
    {
      id: 2,
      code: 'DB-204',
      name: 'قواعد البيانات العلائقية والمتقدمة',
      program: 'دبلوم تقنية المعلومات التطبيقي',
      creditHours: 3,
      sections: ['شعبة 103 (35 متدرب)'],
      syllabusFile: 'خطة_مقرر_قواعد_البيانات_DB204.pdf',
      activeAssignments: 1,
      activeExams: 1,
      trainees: [
        { id: '44501552', name: 'ماجد أحمد الشريف', section: 'شعبة 103', status: 'منتظم', isAttached: false },
        { id: '44502401', name: 'سلطان فايز العبدلي', section: 'شعبة 103', status: 'ملحق (معادلة مسبقة)', isAttached: true },
        { id: '44501908', name: 'زياد عمر الحربي', section: 'شعبة 103', status: 'منتظم', isAttached: false },
      ],
    },
    {
      id: 3,
      code: 'SEC-305',
      name: 'الأمن السيبراني وحماية الشبكات',
      program: 'دبلوم تقنية المعلومات التطبيقي',
      creditHours: 3,
      sections: ['شعبة 104 (30 متدرب)'],
      syllabusFile: 'خطة_مقرر_الأمن_السيبراني_SEC305.pdf',
      activeAssignments: 1,
      activeExams: 1,
      trainees: [
        { id: '44501720', name: 'عبدالعزيز خالد الغامدي', section: 'شعبة 104', status: 'منتظم', isAttached: false },
        { id: '44502550', name: 'نواف منصور السلمي', section: 'شعبة 104', status: 'ملحق بقرار لجنة المعادلات', isAttached: true },
        { id: '44501664', name: 'حمد صالح المري', section: 'شعبة 104', status: 'منتظم', isAttached: false },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [downloadNotice, setDownloadNotice] = useState(null);
  const [activeRosterCourse, setActiveRosterCourse] = useState(null);
  const [newAssignmentModal, setNewAssignmentModal] = useState(null);
  const [newExamModal, setNewExamModal] = useState(null);

  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    section: '',
    maxScore: '10',
    dueDate: '2026-11-05',
  });

  const [examForm, setExamForm] = useState({
    title: '',
    type: 'اختبار نصفي',
    section: '',
    maxScore: '20',
    date: '2026-11-10',
    time: '06:00 م',
  });

  const handleDownloadSyllabus = (fileName) => {
    setDownloadNotice(`جاري تنزيل ملف المقرر: ${fileName}`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 2800);
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    setDownloadNotice(`تمت إضافة الواجب "${assignmentForm.title}" بنجاح.`);
    setNewAssignmentModal(null);
    setAssignmentForm({ title: '', section: '', maxScore: '10', dueDate: '2026-11-05' });
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    setDownloadNotice(`تمت جدولة الاختبار "${examForm.title}" وإرساله للاعتماد.`);
    setNewExamModal(null);
    setExamForm({ title: '', type: 'اختبار نصفي', section: '', maxScore: '20', date: '2026-11-10', time: '06:00 م' });
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const filteredCourses = courses.filter((c) =>
    c.name.includes(searchQuery) || c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-brand-purpleDark">
              المقررات المسندة في الفصل التدريبي الحالي
            </h2>
            <span className="text-xs font-bold bg-brand-secondary/20 text-brand-purpleDark px-2.5 py-1 rounded-full border border-brand-secondary/30">
              الفصل التدريبي الأول 1448 هـ
            </span>
          </div>
          <p className="text-xs text-brand-textLight mt-1">
            إدارة المقررات، تنزيل الخطة الدراسية، إضافة الواجبات والاختبارات، ومتابعة كشوف المتدربين الأساسيين والملحقين
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="بحث باسم المقرر أو الرمز..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-brand-background text-xs font-bold text-brand-purpleDark pr-9 pl-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-secondary w-56 sm:w-64"
            />
          </div>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{downloadNotice}</span>
          </div>
          <button onClick={() => setDownloadNotice(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-brand-purpleDark text-white font-bold border-b border-navy-950">
                <th className="py-4 px-6">المقرر التدريبي</th>
                <th className="py-4 px-4">الرمز الأكاديمي</th>
                <th className="py-4 px-4">الساعات</th>
                <th className="py-4 px-4">الشعب التدريبية المسندة</th>
                <th className="py-4 px-4 text-center">خطة المقرر</th>
                <th className="py-4 px-6 text-center">اختصارات سريعة للمدرب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <span className="font-bold text-brand-purpleDark text-sm block">
                        {course.name}
                      </span>
                      <span className="text-[11px] text-brand-textLight block">
                        {course.program}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-brand-primary">
                    <span className="bg-brand-background px-2.5 py-1 rounded-lg border border-slate-200">
                      {course.code}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-bold text-slate-700">
                    {course.creditHours} ساعات
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {course.sections.map((sec, idx) => (
                        <span
                          key={idx}
                          className="bg-brand-secondary/15 text-brand-purpleDark text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-brand-secondary/30"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleDownloadSyllabus(course.syllabusFile)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-background hover:bg-slate-100 text-brand-purpleDark border border-slate-200 font-bold text-xs transition-all cursor-pointer shadow-subtle"
                      title="تحميل ملف الخطة الدراسية للمقرر"
                    >
                      <Download className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>تنزيل الملف</span>
                    </button>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setNewAssignmentModal(course);
                          setAssignmentForm({ title: '', section: course.sections[0], maxScore: '10', dueDate: '2026-11-05' });
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-purpleDark hover:bg-brand-primary text-white text-xs font-bold transition-all shadow-subtle cursor-pointer"
                        title="إضافة واجب جديد لهذا المقرر"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-brand-gold" />
                        <span>إضافة واجب</span>
                      </button>

                      <button
                        onClick={() => {
                          setNewExamModal(course);
                          setExamForm({ title: '', type: 'اختبار نصفي', section: course.sections[0], maxScore: '20', date: '2026-11-10', time: '06:00 م' });
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-secondary hover:bg-brand-orange text-brand-purpleDark text-xs font-black transition-all shadow-subtle cursor-pointer"
                        title="إضافة وجدولة اختبار جديد"
                      >
                        <Award className="w-3.5 h-3.5 text-brand-purpleDark" />
                        <span>إضافة اختبار</span>
                      </button>

                      <button
                        onClick={() => setActiveRosterCourse(course)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-background hover:bg-brand-purpleDark hover:text-white text-brand-purpleDark text-xs font-bold transition-all border border-slate-200 cursor-pointer shadow-subtle"
                        title="عرض كشف المتدربين والملحقين"
                      >
                        <Users className="w-3.5 h-3.5 text-brand-primary" />
                        <span>كشف المتدربين</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeRosterCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-2xl overflow-hidden">
            <div className="p-5 bg-brand-purpleDark text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-secondary/20 flex items-center justify-center text-brand-gold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">
                    كشف المتدربين - {activeRosterCourse.name} ({activeRosterCourse.code})
                  </h3>
                  <p className="text-xs text-slate-300 font-light">
                    يتضمن المتدربين المسجلين بصورة أساسية والمتدربين الملحقين بقرارات أكاديمية
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveRosterCourse(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-brand-background rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                <span className="font-bold text-brand-purpleDark">إجمالي المسجلين في هذا النموذج: {activeRosterCourse.trainees.length} متدرب</span>
                <span className="text-slate-500 font-medium">محدث تلقائياً مع نظام القبول والتسجيل</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-100 text-brand-purpleDark font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">الرقم التدريبي</th>
                      <th className="py-3 px-4">اسم المتدرب</th>
                      <th className="py-3 px-4">الشعبة</th>
                      <th className="py-3 px-4">حالة التسجيل</th>
                      <th className="py-3 px-4 text-center">تمييز القيد</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeRosterCourse.trainees.map((t) => (
                      <tr key={t.id} className={t.isAttached ? 'bg-amber-50/50' : 'hover:bg-slate-50'}>
                        <td className="py-3 px-4 font-mono font-bold text-brand-primary">{t.id}</td>
                        <td className="py-3 px-4 font-bold text-brand-purpleDark">{t.name}</td>
                        <td className="py-3 px-4 text-slate-600 font-medium">{t.section}</td>
                        <td className="py-3 px-4 text-xs font-semibold text-slate-700">{t.status}</td>
                        <td className="py-3 px-4 text-center">
                          {t.isAttached ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-brand-secondary to-brand-gold text-brand-purpleDark font-black text-[11px] shadow-sm border border-brand-secondary/40">
                              <Sparkles className="w-3 h-3 text-brand-purpleDark" />
                              <span>ملحق</span>
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                              أساسي
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveRosterCourse(null)}
                  className="px-5 py-2.5 rounded-xl bg-brand-purpleDark hover:bg-brand-primary text-white text-xs font-bold transition-all cursor-pointer"
                >
                  إغلاق الكشف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {newAssignmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-brand-purpleDark text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-brand-gold" />
                <h3 className="font-bold text-sm sm:text-base">
                  إضافة واجب جديد - {newAssignmentModal.name}
                </h3>
              </div>
              <button
                onClick={() => setNewAssignmentModal(null)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-purpleDark">عنوان الواجب:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الواجب الثالث - بناء الاستعلامات المتداخلة"
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none focus:border-brand-secondary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-purpleDark">الشعبة المستهدفة:</label>
                  <select
                    value={assignmentForm.section}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, section: e.target.value })}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none"
                  >
                    {newAssignmentModal.sections.map((sec, idx) => (
                      <option key={idx} value={sec}>{sec}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-purpleDark">الدرجة الكاملة:</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={assignmentForm.maxScore}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, maxScore: e.target.value })}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-purpleDark">موعد التسليم النهائي:</label>
                <input
                  type="date"
                  required
                  value={assignmentForm.dueDate}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewAssignmentModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-purpleDark hover:bg-brand-primary text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  حفظ ونشر الواجب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {newExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-brand-purpleDark text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-gold" />
                <h3 className="font-bold text-sm sm:text-base">
                  إضافة اختبار - {newExamModal.name}
                </h3>
              </div>
              <button
                onClick={() => setNewExamModal(null)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-purpleDark">عنوان الاختبار:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الاختبار النصفي للفصل الأول"
                  value={examForm.title}
                  onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none focus:border-brand-secondary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-purpleDark">نوع الاختبار:</label>
                  <select
                    value={examForm.type}
                    onChange={(e) => setExamForm({ ...examForm, type: e.target.value })}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none"
                  >
                    <option value="اختبار نصفي">اختبار نصفي</option>
                    <option value="اختبار نهائي">اختبار نهائي</option>
                    <option value="اختبار قصير 1">اختبار قصير 1</option>
                    <option value="اختبار قصير 2">اختبار قصير 2</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-purpleDark">الدرجة الكاملة:</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={examForm.maxScore}
                    onChange={(e) => setExamForm({ ...examForm, maxScore: e.target.value })}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-purpleDark">تاريخ الانعقاد:</label>
                  <input
                    type="date"
                    required
                    value={examForm.date}
                    onChange={(e) => setExamForm({ ...examForm, date: e.target.value })}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-purpleDark">وقت البدء (12 ساعة):</label>
                  <input
                    type="text"
                    required
                    value={examForm.time}
                    onChange={(e) => setExamForm({ ...examForm, time: e.target.value })}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-brand-background focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewExamModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-secondary hover:bg-brand-orange text-brand-purpleDark text-xs font-black shadow-md cursor-pointer"
                >
                  جدولة الاختبار
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
