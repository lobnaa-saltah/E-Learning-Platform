import React, { useState, useMemo } from 'react';
import {
  Video,
  Clock,
  Users,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  Sparkles,
  ExternalLink,
  X,
  Check,
  Tag,
} from 'lucide-react';

export const StaffLecturesMonitoring = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [attendanceModal, setAttendanceModal] = useState({ isOpen: false, lecture: null });
  const [toastMessage, setToastMessage] = useState(null);

  const [lectures] = useState([
    {
      id: 'lec-live-1',
      title: 'محاضرة 4: بناء المكونات التفاعلية وإدارة الحالة بـ React',
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      batch: 'شعبة 101 و شعبة 105 (حضور مشترك)',
      trainer: 'د. فيصل إبراهيم الشهري',
      roomName: 'قاعة البث الافتراضي المباشر 1',
      roomCode: 'VR-8801',
      date: 'اليوم (الأربعاء)',
      time: '05:00 م - 06:30 م',
      durationMinutes: 90,
      status: 'live',
      statusText: 'بدأت الآن (بث مباشر)',
      attendeesCount: 38,
      totalExpected: 42,
      attendees: [
        {
          id: '44501289',
          name: 'عبدالله محمد القرشي',
          nationalId: '1098765432',
          batch: 'شعبة 101',
          attendedMinutes: 78,
          status: 'present',
          statusText: 'حاضر (متصل)',
          joinTime: '05:02 م',
          leaveTime: 'مستمر حتى الآن',
          isAttached: false,
          attachmentReason: '',
        },
        {
          id: '44502190',
          name: 'ريان خالد البقمي',
          nationalId: '1087654321',
          batch: 'شعبة 105',
          attendedMinutes: 75,
          status: 'present',
          statusText: 'حاضر (متصل)',
          joinTime: '05:05 م',
          leaveTime: 'مستمر حتى الآن',
          isAttached: true,
          attachmentReason: 'ملحق بقرار لجنة المعادلات الأكاديمية (شعبة مستضيفة)',
        },
        {
          id: '44501344',
          name: 'تركي سالم الزهراني',
          nationalId: '1076543210',
          batch: 'شعبة 101',
          attendedMinutes: 62,
          status: 'late',
          statusText: 'متأخر (انضم لاحقاً)',
          joinTime: '05:22 م',
          leaveTime: 'مستمر حتى الآن',
          isAttached: false,
          attachmentReason: '',
        },
        {
          id: '44502311',
          name: 'مشاري سعيد العتيبي',
          nationalId: '1065432109',
          batch: 'شعبة 105',
          attendedMinutes: 80,
          status: 'present',
          statusText: 'حاضر (متصل)',
          joinTime: '05:01 م',
          leaveTime: 'مستمر حتى الآن',
          isAttached: true,
          attachmentReason: 'ملحق (استثناء تحويلي لمعالجة التعثر)',
        },
        {
          id: '44501892',
          name: 'فهد ناصر الدوسري',
          nationalId: '1054321098',
          batch: 'شعبة 101',
          attendedMinutes: 0,
          status: 'absent',
          statusText: 'غائب (لم يدخل البث)',
          joinTime: '-',
          leaveTime: '-',
          isAttached: false,
          attachmentReason: '',
        },
        {
          id: '44502401',
          name: 'سلطان فايز العبدلي',
          nationalId: '1043210987',
          batch: 'شعبة 105',
          attendedMinutes: 70,
          status: 'present',
          statusText: 'حاضر (متصل)',
          joinTime: '05:10 م',
          leaveTime: 'مستمر حتى الآن',
          isAttached: false,
          attachmentReason: '',
        },
      ],
    },
    {
      id: 'lec-live-2',
      title: 'محاضرة 3: استعلامات الربط المتقدمة والـ Subqueries',
      courseCode: 'DB-204',
      courseName: 'قواعد البيانات العلائقية والمتقدمة',
      batch: 'شعبة 103',
      trainer: 'أ. مها عبد العزيز المطيري',
      roomName: 'قاعة البث الافتراضي المباشر 2',
      roomCode: 'VR-8802',
      date: 'اليوم (الأربعاء)',
      time: '06:30 م - 08:00 م',
      durationMinutes: 90,
      status: 'upcoming',
      statusText: 'لم تبدأ بعد (مجدولة)',
      attendeesCount: 0,
      totalExpected: 35,
      attendees: [
        {
          id: '44501552',
          name: 'ماجد أحمد الشريف',
          nationalId: '1034567890',
          batch: 'شعبة 103',
          attendedMinutes: 0,
          status: 'upcoming',
          statusText: 'في انتظار بدء الجلسة',
          joinTime: '-',
          leaveTime: '-',
          isAttached: false,
          attachmentReason: '',
        },
        {
          id: '44502550',
          name: 'نواف منصور السلمي',
          nationalId: '1023456789',
          batch: 'شعبة 103',
          attendedMinutes: 0,
          status: 'upcoming',
          statusText: 'في انتظار بدء الجلسة',
          joinTime: '-',
          leaveTime: '-',
          isAttached: true,
          attachmentReason: 'ملحق (معادلة مسبقة لمقرر التعثر)',
        },
      ],
    },
    {
      id: 'lec-live-3',
      title: 'محاضرة 2: فحص المنافذ وبروتوكولات التشفير والـ Firewalls',
      courseCode: 'SEC-305',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      batch: 'شعبة 104',
      trainer: 'م. راكان طلال السلمي',
      roomName: 'قاعة البث الافتراضي المباشر 3',
      roomCode: 'VR-8803',
      date: 'أمس (الثلاثاء)',
      time: '07:00 م - 08:30 م',
      durationMinutes: 90,
      status: 'ended',
      statusText: 'انتهت المحاضرة',
      attendeesCount: 29,
      totalExpected: 31,
      attendees: [
        {
          id: '44501720',
          name: 'عبدالعزيز خالد الغامدي',
          nationalId: '1012345678',
          batch: 'شعبة 104',
          attendedMinutes: 88,
          status: 'present',
          statusText: 'حاضر',
          joinTime: '07:01 م',
          leaveTime: '08:29 م',
          isAttached: false,
          attachmentReason: '',
        },
        {
          id: '44501664',
          name: 'حمد صالح المري',
          nationalId: '1091234567',
          batch: 'شعبة 104',
          attendedMinutes: 90,
          status: 'present',
          statusText: 'حاضر',
          joinTime: '07:00 م',
          leaveTime: '08:30 م',
          isAttached: false,
          attachmentReason: '',
        },
        {
          id: '44501908',
          name: 'زياد عمر الحربي',
          nationalId: '1021098765',
          batch: 'شعبة 104',
          attendedMinutes: 84,
          status: 'present',
          statusText: 'حاضر',
          joinTime: '07:04 م',
          leaveTime: '08:28 م',
          isAttached: true,
          attachmentReason: 'ملحق من شعبة 103 لحضور المقرر التعويضي',
        },
        {
          id: '44501999',
          name: 'بدر ناصر العوفي',
          nationalId: '1088776655',
          batch: 'شعبة 104',
          attendedMinutes: 0,
          status: 'absent',
          statusText: 'غائب',
          joinTime: '-',
          leaveTime: '-',
          isAttached: false,
          attachmentReason: '',
        },
      ],
    },
  ]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleExportAttendanceCsv = (lecture) => {
    if (!lecture || !lecture.attendees) return;

    const headers = 'الرقم التدريبي,اسم المتدرب,رقم الهوية,الشعبة,حالة الحضور,دقائق الحضور,وقت الدخول,وقت الخروج,نوع القيد,ملاحظات الإلحاق\n';
    const rows = lecture.attendees.map((a) => {
      const isAttText = a.isAttached ? 'ملحق أكاديمياً' : 'شعبة أساسية';
      return `"${a.id}","${a.name}","${a.nationalId}","${a.batch}","${a.statusText}","${a.attendedMinutes} دقيقة","${a.joinTime}","${a.leaveTime}","${isAttText}","${a.attachmentReason || '-'}"`;
    }).join('\n');

    const csvContent = '\uFEFF' + headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `كشف_حضور_${lecture.courseCode}_${lecture.date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`تم تصدير كشف الحضور لمقرر [${lecture.courseName}] إلى ملف Excel (.csv) بنجاح.`);
  };

  const filteredLectures = useMemo(() => {
    return lectures.filter((lec) => {
      const matchSearch =
        lec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lec.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lec.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lec.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lec.batch.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || lec.status === statusFilter;
      const matchCourse = courseFilter === 'all' || lec.courseCode === courseFilter;

      return matchSearch && matchStatus && matchCourse;
    });
  }, [lectures, searchQuery, statusFilter, courseFilter]);

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
              متابعة البث الحي والفصول الافتراضية
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              شاشة متابعة المحاضرات والحضور اللحظي
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              مراقبة بث المحاضرات على الهواء مباشرة، رصد أعداد الحضور اللحظي، وفتح كشوف الحضور التفصيلية بالدقائق مع تمييز المتدربين الملحقين.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('recorded')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>دورة حياة التسجيلات</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('exams_management')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-secondary hover:bg-brand-gold text-brand-purpleDark text-xs font-black transition-all shadow-md cursor-pointer"
            >
              <span>اعتماد الاختبارات</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-white font-mono">
              {lectures.length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">إجمالي محاضرات اليوم</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-emerald-400 font-mono animate-pulse">
              {lectures.filter((l) => l.status === 'live').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">تبث الآن مباشرة</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-brand-gold font-mono">
              {lectures.reduce((acc, l) => acc + l.attendeesCount, 0)}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">حضور لحظي متصل</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-purple-300 font-mono">
              {lectures.filter((l) => l.status === 'ended').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">محاضرات منتهية</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-brand-purpleDark" />
            <h3 className="text-base font-black text-brand-purpleDark">
              جدول المحاضرات ورصد الحضور اللحظي
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالمقرر، الشعبة، أو المدرب..."
                className="pl-3 pr-9 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20 w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">كافة الحالات</option>
              <option value="live">بدأت الآن (بث مباشر)</option>
              <option value="upcoming">لم تبدأ بعد</option>
              <option value="ended">انتهت</option>
            </select>

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">كافة المقررات</option>
              <option value="WEB-301">تطوير تطبيقات الويب (WEB-301)</option>
              <option value="DB-204">قواعد البيانات (DB-204)</option>
              <option value="SEC-305">الأمن السيبراني (SEC-305)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">المقرر التدريبي</th>
                <th className="py-3.5 px-4">عنوان المحاضرة</th>
                <th className="py-3.5 px-4">الشعبة المستهدفة</th>
                <th className="py-3.5 px-4">المدرب المحاضر</th>
                <th className="py-3.5 px-4">التوقيت واليوم</th>
                <th className="py-3.5 px-4 text-center">حالة المحاضرة</th>
                <th className="py-3.5 px-4 text-center">الحضور اللحظي</th>
                <th className="py-3.5 px-4 text-center">كشف الحضور</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLectures.map((lec) => {
                const attendancePercentage =
                  lec.totalExpected > 0 ? Math.round((lec.attendeesCount / lec.totalExpected) * 100) : 0;

                return (
                  <tr key={lec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-purpleDark">{lec.courseName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{lec.courseCode}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 line-clamp-1">{lec.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lec.roomCode}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {lec.batch}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{lec.trainer}</td>
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-slate-800">{lec.time}</div>
                      <div className="text-[11px] text-slate-500">{lec.date}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {lec.status === 'live' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-black text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span>بدأت (بث مباشر)</span>
                        </span>
                      )}
                      {lec.status === 'upcoming' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>لم تبدأ بعد</span>
                        </span>
                      )}
                      {lec.status === 'ended' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>انتهت</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="space-y-1">
                        <div className="font-mono font-bold text-xs text-brand-purpleDark">
                          {lec.attendeesCount} / {lec.totalExpected} متدرب
                        </div>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mx-auto">
                          <div
                            className={`h-full rounded-full ${
                              attendancePercentage >= 80 ? 'bg-emerald-500' : 'bg-brand-secondary'
                            }`}
                            style={{ width: `${attendancePercentage}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">({attendancePercentage}%)</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => setAttendanceModal({ isOpen: true, lecture: lec })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-purpleDark hover:bg-[#1e1a50] text-white rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5 text-brand-gold" />
                        <span>كشف الحضور التفصيلي</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {attendanceModal.isOpen && attendanceModal.lecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-purpleDark/10 text-brand-purpleDark flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-brand-purpleDark" />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-purpleDark">
                    كشف الحضور والغياب التفصيلي للمحاضرة
                  </h3>
                  <p className="text-xs text-slate-500">
                    {attendanceModal.lecture.courseName} ({attendanceModal.lecture.courseCode}) • المدرب:{' '}
                    {attendanceModal.lecture.trainer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExportAttendanceCsv(attendanceModal.lecture)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>تصدير إلى Excel (.csv)</span>
                </button>
                <button
                  onClick={() => setAttendanceModal({ isOpen: false, lecture: null })}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <div>
                <span className="text-[11px] text-slate-500 block">إجمالي المتدربين:</span>
                <span className="text-base font-black text-brand-purpleDark font-mono">
                  {attendanceModal.lecture.totalExpected}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">حاضرون حالياً:</span>
                <span className="text-base font-black text-emerald-600 font-mono">
                  {attendanceModal.lecture.attendeesCount}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">المتغيبون:</span>
                <span className="text-base font-black text-rose-600 font-mono">
                  {attendanceModal.lecture.totalExpected - attendanceModal.lecture.attendeesCount}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">المدة الإجمالية:</span>
                <span className="text-base font-black text-brand-secondary font-mono">
                  {attendanceModal.lecture.durationMinutes} دقيقة
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">الرقم التدريبي</th>
                    <th className="py-3 px-3">اسم المتدرب</th>
                    <th className="py-3 px-3">الهوية الوطنية</th>
                    <th className="py-3 px-3">الشعبة</th>
                    <th className="py-3 px-3 text-center">حالة الحضور</th>
                    <th className="py-3 px-3 text-center">دقائق الحضور</th>
                    <th className="py-3 px-3">وقت الدخول والخروج</th>
                    <th className="py-3 px-3">نوع القيد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceModal.lecture.attendees.map((att) => (
                    <tr
                      key={att.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        att.isAttached ? 'bg-purple-50/30' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-brand-purpleDark">{att.id}</td>
                      <td className="py-3 px-3 font-bold text-slate-800">{att.name}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{att.nationalId}</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">{att.batch}</td>
                      <td className="py-3 px-3 text-center">
                        {att.status === 'present' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>حاضر</span>
                          </span>
                        )}
                        {att.status === 'late' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold text-[10px] border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>متأخر</span>
                          </span>
                        )}
                        {att.status === 'absent' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 font-bold text-[10px] border border-rose-300">
                            <X className="w-3 h-3 text-rose-600" />
                            <span>غائب</span>
                          </span>
                        )}
                        {att.status === 'upcoming' && (
                          <span className="text-slate-400 font-medium text-[10px]">في الانتظار</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-black text-slate-800">
                        {att.attendedMinutes}
                        <span className="text-[10px] font-sans font-normal text-slate-500 mr-1">
                          من {attendanceModal.lecture.durationMinutes} د
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[11px] font-mono text-slate-600">
                        <div>دخول: {att.joinTime}</div>
                        <div>خروج: {att.leaveTime}</div>
                      </td>
                      <td className="py-3 px-3">
                        {att.isAttached ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300 font-black text-[10px]">
                              <Tag className="w-3 h-3 text-purple-700" />
                              <span>مُلحق أكاديمياً</span>
                            </span>
                            <div className="text-[9px] text-purple-800 line-clamp-1" title={att.attachmentReason}>
                              {att.attachmentReason}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">شعبة أساسية</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAttendanceModal({ isOpen: false, lecture: null })}
                className="px-6 py-2.5 bg-brand-purpleDark hover:bg-[#1f1a50] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                إغلاق الكشف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
