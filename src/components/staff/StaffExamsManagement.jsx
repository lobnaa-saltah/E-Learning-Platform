import React, { useState, useMemo } from 'react';
import {
  Award,
  FileText,
  CheckCircle2,
  RotateCcw,
  FileSpreadsheet,
  Search,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const StaffExamsManagement = () => {
  const [activeTab, setActiveTab] = useState('pending_approval');
  const [selectedTerm, setSelectedTerm] = useState('الفصل التدريبي الأول 1448 هـ');
  const [toastMessage, setToastMessage] = useState(null);

  const [selectedMissingExamsIds, setSelectedMissingExamsIds] = useState([]);
  const [selectedMissingAssignIds, setSelectedMissingAssignIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('all');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('all');

  const TERMS_LIST = [
    'الفصل التدريبي الأول 1448 هـ',
    'الفصل التدريبي الثاني 1448 هـ',
    'الفصل التدريبي الصيفي 1448 هـ',
  ];

  const [pendingAssessments, setPendingAssessments] = useState([
    {
      id: 'p-1',
      title: 'الاختبار النصفي - تطوير تطبيقات الويب الحديثة',
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      type: 'اختبار نصفي',
      score: 30,
      sections: ['شعبة 101', 'شعبة 105'],
      trainer: 'د. فيصل إبراهيم الشهري',
      startDate: '2026-11-05 07:00 م',
      endDate: '2026-11-05 08:30 م',
      status: 'pending',
    },
    {
      id: 'p-2',
      title: 'اختبار قصير 1 - استعلامات وقواعد البيانات',
      courseCode: 'DB-204',
      courseName: 'قواعد البيانات العلائقية والمتقدمة',
      type: 'اختبار قصير',
      score: 15,
      sections: ['شعبة 103'],
      trainer: 'أ. مها عبد العزيز المطيري',
      startDate: '2026-11-08 04:00 م',
      endDate: '2026-11-08 04:45 م',
      status: 'pending',
    },
    {
      id: 'p-3',
      title: 'الاختبار النصفي - أمن الشبكات وفحص الثغرات',
      courseCode: 'SEC-305',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      type: 'اختبار نصفي',
      score: 30,
      sections: ['شعبة 104'],
      trainer: 'م. راكان طلال السلمي',
      startDate: '2026-11-12 06:00 م',
      endDate: '2026-11-12 07:30 م',
      status: 'pending',
    },
    {
      id: 'p-4',
      title: 'الواجب الثاني: فحص المنافذ وتحليل التقارير الأمنية',
      courseCode: 'SEC-305',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      type: 'واجب تدريبي',
      score: 10,
      sections: ['شعبة 104'],
      trainer: 'م. راكان طلال السلمي',
      startDate: '2026-11-01 10:00 ص',
      endDate: '2026-11-09 11:59 م',
      status: 'pending',
    },
  ]);

  const [unattendedTrainees, setUnattendedTrainees] = useState([
    {
      id: 'ut-1',
      traineeId: '44501892',
      name: 'فهد ناصر الدوسري',
      nationalId: '1054321098',
      batch: 'شعبة 101',
      term: 'الفصل التدريبي الأول 1448 هـ',
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      examTitle: 'الاختبار النصفي - تطوير الويب',
      scheduledDate: '2026-10-25',
      reopenCount: 0,
    },
    {
      id: 'ut-2',
      traineeId: '44502190',
      name: 'ريان خالد البقمي',
      nationalId: '1087654321',
      batch: 'شعبة 105',
      term: 'الفصل التدريبي الأول 1448 هـ',
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      examTitle: 'الاختبار النصفي - تطوير الويب',
      scheduledDate: '2026-10-25',
      reopenCount: 1,
    },
    {
      id: 'ut-3',
      traineeId: '44501908',
      name: 'زياد عمر الحربي',
      nationalId: '1021098765',
      batch: 'شعبة 103',
      term: 'الفصل التدريبي الأول 1448 هـ',
      courseCode: 'DB-204',
      courseName: 'قواعد البيانات العلائقية والمتقدمة',
      examTitle: 'اختبار قصير 1 - استعلامات SQL',
      scheduledDate: '2026-10-22',
      reopenCount: 2,
    },
    {
      id: 'ut-4',
      traineeId: '44501999',
      name: 'بدر ناصر العوفي',
      nationalId: '1088776655',
      batch: 'شعبة 104',
      term: 'الفصل التدريبي الأول 1448 هـ',
      courseCode: 'SEC-305',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      examTitle: 'الاختبار النصفي - أمن الشبكات',
      scheduledDate: '2026-10-20',
      reopenCount: 0,
    },
  ]);

  const [unsubmittedAssignments, setUnsubmittedAssignments] = useState([
    {
      id: 'ua-1',
      traineeId: '44501892',
      name: 'فهد ناصر الدوسري',
      nationalId: '1054321098',
      batch: 'شعبة 101',
      term: 'الفصل التدريبي الأول 1448 هـ',
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      assignmentTitle: 'الواجب الأول: تصميم واجهات تفاعلية',
      dueDate: '2026-10-28',
      reopenCount: 1,
    },
    {
      id: 'ua-2',
      traineeId: '44501344',
      name: 'تركي سالم الزهراني',
      nationalId: '1076543210',
      batch: 'شعبة 101',
      term: 'الفصل التدريبي الأول 1448 هـ',
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      assignmentTitle: 'الواجب الثالث: بناء RESTful API',
      dueDate: '2026-10-26',
      reopenCount: 0,
    },
    {
      id: 'ua-3',
      traineeId: '44502311',
      name: 'مشاري سعيد العتيبي',
      nationalId: '1065432109',
      batch: 'شعبة 105',
      term: 'الفصل التدريبي الأول 1448 هـ',
      courseCode: 'SEC-305',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      assignmentTitle: 'الواجب الأول: فحص المنافذ والثغرات',
      dueDate: '2026-10-24',
      reopenCount: 2,
    },
  ]);

  const gradeSheetRoster = [
    { id: '44501289', name: 'عبدالله محمد القرشي', nationalId: '1098765432', batch: 'شعبة 101', course: 'تطوير تطبيقات الويب (WEB-301)', midterm: 28, assignments: 18, finalExam: 44, total: 90, grade: 'ممتاز مرتفع (A+)' },
    { id: '44502190', name: 'ريان خالد البقمي', nationalId: '1087654321', batch: 'شعبة 105 (ملحق)', course: 'تطوير تطبيقات الويب (WEB-301)', midterm: 26, assignments: 17, finalExam: 42, total: 85, grade: 'ممتاز (A)' },
    { id: '44501344', name: 'تركي سالم الزهراني', nationalId: '1076543210', batch: 'شعبة 101', course: 'تطوير تطبيقات الويب (WEB-301)', midterm: 24, assignments: 19, finalExam: 39, total: 82, grade: 'جيد جداً مرتفع (B+)' },
    { id: '44502311', name: 'مشاري سعيد العتيبي', nationalId: '1065432109', batch: 'شعبة 105 (ملحق)', course: 'تطوير تطبيقات الويب (WEB-301)', midterm: 27, assignments: 18, finalExam: 43, total: 88, grade: 'ممتاز (A)' },
    { id: '44501552', name: 'ماجد أحمد الشريف', nationalId: '1034567890', batch: 'شعبة 103', course: 'قواعد البيانات العلائقية (DB-204)', midterm: 25, assignments: 16, finalExam: 41, total: 82, grade: 'جيد جداً مرتفع (B+)' },
    { id: '44502550', name: 'نواف منصور السلمي', nationalId: '1023456789', batch: 'شعبة 103 (ملحق)', course: 'قواعد البيانات العلائقية (DB-204)', midterm: 29, assignments: 19, finalExam: 46, total: 94, grade: 'ممتاز مرتفع (A+)' },
  ];

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleApproveAssessment = (id) => {
    const item = pendingAssessments.find((a) => a.id === id);
    setPendingAssessments((prev) => prev.filter((a) => a.id !== id));
    showToast(`تم اعتماد [${item ? item.title : 'التقييم'}] رسمياً وأصبح متاحاً للمتدربين بالمنصة.`);
  };

  const handleApproveAllAssessments = () => {
    if (pendingAssessments.length === 0) return;
    const count = pendingAssessments.length;
    setPendingAssessments([]);
    showToast(`تم اعتماد كافة التقييمات المعلقة بنجاح لعدد (${count}) اختبارات وواجبات.`);
  };

  const handleReopenSingleExam = (item) => {
    setUnattendedTrainees((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, reopenCount: t.reopenCount + 1 } : t))
    );
    showToast(`تمت إعادة فتح الاختبار للمتدرب [${item.name}] بنجاح (المرة رقم ${item.reopenCount + 1}).`);
  };

  const handleBulkReopenExams = () => {
    if (selectedMissingExamsIds.length === 0) {
      showToast('يرجى تحديد متدرب واحد على الأقل لإعادة الفتح الجماعي', 'error');
      return;
    }

    setUnattendedTrainees((prev) =>
      prev.map((t) =>
        selectedMissingExamsIds.includes(t.id) ? { ...t, reopenCount: t.reopenCount + 1 } : t
      )
    );

    showToast(`تمت إعادة فتح الاختبار جماعياً لعدد (${selectedMissingExamsIds.length}) متدربين بنجاح.`);
    setSelectedMissingExamsIds([]);
  };

  const handleSimulateExamCompletion = (item) => {
    setUnattendedTrainees((prev) => prev.filter((t) => t.id !== item.id));
    showToast(`أتم المتدرب [${item.name}] الاختبار بنجاح، وتم حذفه تلقائياً من قائمة من لم يختبروا ورصد درجته بالسجل.`);
  };

  const handleReopenSingleAssignment = (item) => {
    setUnsubmittedAssignments((prev) =>
      prev.map((a) => (a.id === item.id ? { ...a, reopenCount: a.reopenCount + 1 } : a))
    );
    showToast(`تم تمديد وإعادة فتح الواجب للمتدرب [${item.name}] بنجاح.`);
  };

  const handleBulkReopenAssignments = () => {
    if (selectedMissingAssignIds.length === 0) {
      showToast('يرجى تحديد متدرب واحد على الأقل للتمديد الجماعي', 'error');
      return;
    }

    setUnsubmittedAssignments((prev) =>
      prev.map((a) =>
        selectedMissingAssignIds.includes(a.id) ? { ...a, reopenCount: a.reopenCount + 1 } : a
      )
    );

    showToast(`تم تمديد وإعادة فتح الواجب جماعياً لعدد (${selectedMissingAssignIds.length}) متدربين.`);
    setSelectedMissingAssignIds([]);
  };

  const handleSimulateAssignmentSubmit = (item) => {
    setUnsubmittedAssignments((prev) => prev.filter((a) => a.id !== item.id));
    showToast(`قام المتدرب [${item.name}] بتسليم الواجب، واختفى تلقائياً من القائمة.`);
  };

  const handleExportGradesExcel = () => {
    const headers = 'الرقم التدريبي,اسم المتدرب,رقم الهوية,الشعبة,المقرر التدريبي,الاختبار النصفي (30),الواجبات (20),الاختبار النهائي (50),المجموع الكلي (100),التقدير الأكاديمي\n';
    const rows = gradeSheetRoster.map((g) => {
      return `"${g.id}","${g.name}","${g.nationalId}","${g.batch}","${g.course}","${g.midterm}","${g.assignments}","${g.finalExam}","${g.total}","${g.grade}"`;
    }).join('\n');

    const csvContent = '\uFEFF' + headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `كشف_درجات_ونتائج_المتدربين_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('تم تصدير كشف الدرجات والنتائج الأكاديمية إلى ملف Excel (.csv) بنجاح.');
  };

  const filteredUnattendedExams = useMemo(() => {
    return unattendedTrainees.filter((t) => {
      const matchTerm = t.term === selectedTerm;
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.traineeId.includes(searchQuery) ||
        t.nationalId.includes(searchQuery) ||
        t.courseName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCourse = selectedCourseFilter === 'all' || t.courseCode === selectedCourseFilter;
      const matchSection = selectedSectionFilter === 'all' || t.batch.includes(selectedSectionFilter);
      return matchTerm && matchSearch && matchCourse && matchSection;
    });
  }, [unattendedTrainees, selectedTerm, searchQuery, selectedCourseFilter, selectedSectionFilter]);

  const filteredUnsubmittedAssignments = useMemo(() => {
    return unsubmittedAssignments.filter((a) => {
      const matchTerm = a.term === selectedTerm;
      const matchSearch =
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.traineeId.includes(searchQuery) ||
        a.nationalId.includes(searchQuery) ||
        a.courseName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCourse = selectedCourseFilter === 'all' || a.courseCode === selectedCourseFilter;
      const matchSection = selectedSectionFilter === 'all' || a.batch.includes(selectedSectionFilter);
      return matchTerm && matchSearch && matchCourse && matchSection;
    });
  }, [unsubmittedAssignments, selectedTerm, searchQuery, selectedCourseFilter, selectedSectionFilter]);

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold shadow-lg animate-in fade-in slide-in-from-top-3 duration-300 ${
            toastMessage.type === 'error'
              ? 'bg-rose-50 text-rose-800 border border-rose-200'
              : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toastMessage.message}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-black/5 rounded-lg text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-gradient-to-r from-brand-purpleDark via-[#352f7f] to-brand-primary text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-gold border border-brand-secondary/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
              الاعتماد الأكاديمي والتحصيل
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              اعتماد الاختبارات ومتابعة غير المختبرين
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              اعتماد الاختبارات والواجبات المضافة من المدربين، متابعة وإعادة فتح الاختبارات لمن لم يختبروا فردياً وجماعياً مع الاختفاء التلقائي بعد الحل، وتصدير النتائج إلى Excel.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/15">
            <button
              onClick={handleExportGradesExcel}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>تصدير النتائج إلى Excel</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-amber-300 font-mono">
              {pendingAssessments.length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">بانتظار الاعتماد</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-rose-300 font-mono">
              {unattendedTrainees.length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">متدربين لم يختبروا</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-brand-gold font-mono">
              {unsubmittedAssignments.length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">لم يحلوا الواجبات</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-white font-mono">
              {gradeSheetRoster.length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">نتائج مرصودة بالسجل</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('pending_approval')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'pending_approval'
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>اعتماد الاختبارات ({pendingAssessments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('unattended_exams')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'unattended_exams'
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark'
              }`}
            >
              <Award className="w-4 h-4 text-rose-400" />
              <span>متدربين لم يختبروا ({unattendedTrainees.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('unsubmitted_assignments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'unsubmitted_assignments'
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>متدربين لم يحلوا الواجبات ({unsubmittedAssignments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('grade_sheet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'grade_sheet'
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>كشف الدرجات والنتائج</span>
            </button>
          </div>

          {(activeTab === 'unattended_exams' || activeTab === 'unsubmitted_assignments') && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">الترم:</span>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-brand-purpleDark focus:outline-none"
              >
                {TERMS_LIST.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {activeTab === 'pending_approval' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-brand-purpleDark">
                  طلبات اعتماد الاختبارات والواجبات المضافة من قبل المدربين
                </h4>
                <p className="text-[11px] text-slate-500">
                  يتطلب التحقق من مطابقة المعايير قبل ظهورها في حسابات المتدربين
                </p>
              </div>

              {pendingAssessments.length > 0 && (
                <button
                  type="button"
                  onClick={handleApproveAllAssessments}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary hover:bg-brand-gold text-brand-purpleDark text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>اعتماد كافة التقييمات المعلقة ({pendingAssessments.length})</span>
                </button>
              )}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">المقرر التدريبي</th>
                    <th className="py-3.5 px-4">عنوان التقييم</th>
                    <th className="py-3.5 px-4">النوع</th>
                    <th className="py-3.5 px-4">الدرجة</th>
                    <th className="py-3.5 px-4">الشعب المستهدفة</th>
                    <th className="py-3.5 px-4">المدرب صاحب الطلب</th>
                    <th className="py-3.5 px-4">مواعيد الإتاحة</th>
                    <th className="py-3.5 px-4 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingAssessments.length > 0 ? (
                    pendingAssessments.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-brand-purpleDark">{item.courseName}</div>
                          <div className="text-[11px] font-mono text-slate-500">{item.courseCode}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">{item.title}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-black text-slate-800">
                          {item.score} <span className="text-[11px] font-sans font-normal text-slate-500">درجة</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {item.sections.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-bold">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">{item.trainer}</td>
                        <td className="py-3.5 px-4 text-[11px]">
                          <div>من: {item.startDate}</div>
                          <div className="text-slate-500">إلى: {item.endDate}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleApproveAssessment(item.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>اعتماد رسمي</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        لا توجد اختبارات أو واجبات بانتظار الاعتماد حالياً. جميع التقييمات معتمدة.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'unattended_exams' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-black text-brand-purpleDark">
                  قائمة المتدربين الذين لم يؤدوا الاختبارات المقررة في موعدها ({filteredUnattendedExams.length})
                </h4>
                <p className="text-[11px] text-slate-500">
                  يمكن إعادة الفتح الفردي أو الجماعي، ويختفي المتدرب تلقائياً فور إتمامه الاختبار
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkReopenExams}
                  disabled={selectedMissingExamsIds.length === 0}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedMissingExamsIds.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-brand-purpleDark hover:bg-[#1f1a52] text-white shadow-md cursor-pointer'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
                  <span>إعادة فتح الاختبار للمحددين ({selectedMissingExamsIds.length})</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 text-center w-10">
                      <input
                        type="checkbox"
                        checked={
                          filteredUnattendedExams.length > 0 &&
                          selectedMissingExamsIds.length === filteredUnattendedExams.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMissingExamsIds(filteredUnattendedExams.map((t) => t.id));
                          } else {
                            setSelectedMissingExamsIds([]);
                          }
                        }}
                        className="rounded text-brand-purpleDark"
                      />
                    </th>
                    <th className="py-3 px-3">الرقم التدريبي</th>
                    <th className="py-3 px-3">اسم المتدرب</th>
                    <th className="py-3 px-3">الهوية الوطنية</th>
                    <th className="py-3 px-3">الشعبة</th>
                    <th className="py-3 px-3">المقرر والاختبار</th>
                    <th className="py-3 px-3 text-center">مرات إعادة الفتح</th>
                    <th className="py-3 px-3 text-center">الإجراءات التفاعلية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUnattendedExams.length > 0 ? (
                    filteredUnattendedExams.map((item) => {
                      const isChecked = selectedMissingExamsIds.includes(item.id);
                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isChecked ? 'bg-brand-purpleDark/5' : ''
                          }`}
                        >
                          <td className="py-3 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setSelectedMissingExamsIds((prev) =>
                                  prev.includes(item.id)
                                    ? prev.filter((id) => id !== item.id)
                                    : [...prev, item.id]
                                );
                              }}
                              className="rounded text-brand-purpleDark"
                            />
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-brand-purpleDark">{item.traineeId}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">{item.name}</td>
                          <td className="py-3 px-3 font-mono text-slate-600">{item.nationalId}</td>
                          <td className="py-3 px-3 font-semibold text-slate-700">{item.batch}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-800">{item.examTitle}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {item.courseName} ({item.courseCode})
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            {item.reopenCount === 0 ? (
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                                لم يُعد فتحه (0)
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-black text-[10px]">
                                أُعيد فتحه ({item.reopenCount} مرات)
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleReopenSingleExam(item)}
                                className="px-3 py-1 bg-brand-secondary hover:bg-brand-gold text-brand-purpleDark text-[11px] font-black rounded-lg transition-all cursor-pointer flex items-center gap-1"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>إعادة فتح</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSimulateExamCompletion(item)}
                                title="محاكاة إتمام الاختبار من قبل المتدرب"
                                className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                              >
                                <UserCheck className="w-3 h-3 text-emerald-600" />
                                <span>تم الاختبار (إخفاء تلقائي)</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        لا يوجد متدربون لم يختبروا في هذا الترم! جميع المتدربين أتموا اختباراتهم بنجاح.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'unsubmitted_assignments' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-black text-brand-purpleDark">
                  قائمة المتدربين الذين لم يسلموا الواجبات في موعدها ({filteredUnsubmittedAssignments.length})
                </h4>
                <p className="text-[11px] text-slate-500">
                  إعادة فتح مهلة التسليم فردياً وجماعياً مع الاختفاء التلقائي فور التسليم
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkReopenAssignments}
                  disabled={selectedMissingAssignIds.length === 0}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedMissingAssignIds.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-brand-purpleDark hover:bg-[#1f1a52] text-white shadow-md cursor-pointer'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
                  <span>تمديد المهلة للمحددين ({selectedMissingAssignIds.length})</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 text-center w-10">
                      <input
                        type="checkbox"
                        checked={
                          filteredUnsubmittedAssignments.length > 0 &&
                          selectedMissingAssignIds.length === filteredUnsubmittedAssignments.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMissingAssignIds(filteredUnsubmittedAssignments.map((t) => t.id));
                          } else {
                            setSelectedMissingAssignIds([]);
                          }
                        }}
                        className="rounded text-brand-purpleDark"
                      />
                    </th>
                    <th className="py-3 px-3">الرقم التدريبي</th>
                    <th className="py-3 px-3">اسم المتدرب</th>
                    <th className="py-3 px-3">الشعبة</th>
                    <th className="py-3 px-3">الواجب المتأخر</th>
                    <th className="py-3 px-3">تاريخ انتهاء التسليم</th>
                    <th className="py-3 px-3 text-center">مرات التمديد</th>
                    <th className="py-3 px-3 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUnsubmittedAssignments.length > 0 ? (
                    filteredUnsubmittedAssignments.map((item) => {
                      const isChecked = selectedMissingAssignIds.includes(item.id);
                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isChecked ? 'bg-brand-purpleDark/5' : ''
                          }`}
                        >
                          <td className="py-3 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setSelectedMissingAssignIds((prev) =>
                                  prev.includes(item.id)
                                    ? prev.filter((id) => id !== item.id)
                                    : [...prev, item.id]
                                );
                              }}
                              className="rounded text-brand-purpleDark"
                            />
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-brand-purpleDark">{item.traineeId}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">{item.name}</td>
                          <td className="py-3 px-3 font-semibold text-slate-700">{item.batch}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-800">{item.assignmentTitle}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {item.courseName} ({item.courseCode})
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono text-rose-600 font-bold">{item.dueDate}</td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-[10px]">
                              {item.reopenCount} مرات
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleReopenSingleAssignment(item)}
                                className="px-3 py-1 bg-brand-secondary hover:bg-brand-gold text-brand-purpleDark text-[11px] font-black rounded-lg transition-all cursor-pointer flex items-center gap-1"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>تمديد المهلة</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSimulateAssignmentSubmit(item)}
                                className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>تم التسليم (إخفاء)</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        لا يوجد متدربون متأخرون في تسليم الواجبات لهذا الترم!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'grade_sheet' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-black text-brand-purpleDark">
                  كشف الدرجات والنتائج الأكاديمية العام للمتدربين
                </h4>
                <p className="text-[11px] text-slate-500">
                  يتضمن درجات النصفي والواجبات والنهائي مع التقدير الأكاديمي المعتمد
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportGradesExcel}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>تصدير كشف الدرجات كاملاً إلى Excel (.csv)</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">الرقم التدريبي</th>
                    <th className="py-3 px-3">اسم المتدرب</th>
                    <th className="py-3 px-3">الهوية الوطنية</th>
                    <th className="py-3 px-3">الشعبة التدريبية</th>
                    <th className="py-3 px-3">المقرر</th>
                    <th className="py-3 px-3 text-center">النصفي (30)</th>
                    <th className="py-3 px-3 text-center">الواجبات (20)</th>
                    <th className="py-3 px-3 text-center">النهائي (50)</th>
                    <th className="py-3 px-3 text-center">المجموع (100)</th>
                    <th className="py-3 px-3 text-center">التقدير</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gradeSheetRoster.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-brand-purpleDark">{item.id}</td>
                      <td className="py-3 px-3 font-bold text-slate-800">{item.name}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{item.nationalId}</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">{item.batch}</td>
                      <td className="py-3 px-3 text-[11px] text-slate-800 font-medium">{item.course}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">{item.midterm}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">{item.assignments}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">{item.finalExam}</td>
                      <td className="py-3 px-3 text-center font-mono font-black text-brand-purpleDark text-sm">
                        {item.total}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-black text-[11px]">
                          {item.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
