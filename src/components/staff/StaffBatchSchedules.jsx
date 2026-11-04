import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Printer,
  CheckCircle2,
  Users,
  Video,
  Search,
  Plus,
  Copy,
  Trash2,
  Sparkles,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  loadScheduledLectures,
  saveScheduledLectures,
  DIPLOMA_SECTIONS,
  SHORT_COURSE_SECTIONS,
  TRAINERS_LIST,
  formatArabicDate,
} from './scheduleData';

export const StaffBatchSchedules = ({ onNavigateTab }) => {
  const [lectures, setLectures] = useState(() => loadScheduledLectures());
  const [filterMode, setFilterMode] = useState('section');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedTrainer, setSelectedTrainer] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, count: 0 });

  useEffect(() => {
    saveScheduledLectures(lectures);
  }, [lectures]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmAllLectures = () => {
    const unconfirmedCount = lectures.filter((l) => l.status === 'draft').length;
    if (unconfirmedCount === 0) {
      showNotification('جميع المحاضرات الحالية مؤكدة مسبقاً وفصولها الافتراضية نشطة.', 'info');
      return;
    }

    setConfirmationModal({ isOpen: true, count: unconfirmedCount });
  };

  const executeConfirmation = () => {
    const updated = lectures.map((lec, idx) => {
      const roomNum = Math.floor(1000 + Math.random() * 9000);
      const cleanSection = lec.section.replace(/\s+/g, '-');
      return {
        ...lec,
        lectureNumber: idx + 1,
        status: 'confirmed',
        virtualRoomUrl: `https://lms.uqt.edu.sa/v-room/${lec.courseCode}-${cleanSection}-${roomNum}`,
        roomCode: `VR-${roomNum}`,
      };
    });

    setLectures(updated);
    setConfirmationModal({ isOpen: false, count: 0 });
    showNotification(
      `تم تأكيد كافة المحاضرات بنجاح، وترقيمها تسلسلياً، وإنشاء الفصول الافتراضية لها لظهورها مباشرة في جدول المدرب والمتدرب.`,
      'success'
    );
  };

  const handleDelete = (id) => {
    setLectures((prev) => prev.filter((l) => l.id !== id));
    showNotification('تم حذف المحاضرة من الجدول بنجاح.');
  };

  const handleCopyLink = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showNotification('تم نسخ رابط القاعة الافتراضية بنجاح.');
    }
  };

  const filteredLectures = useMemo(() => {
    return lectures.filter((lec) => {
      const matchSearch =
        lec.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lec.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lec.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lec.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lec.isCombined && lec.combinedSection.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchFilter = true;
      if (filterMode === 'section' && selectedSection !== 'all') {
        matchFilter =
          lec.section === selectedSection ||
          (lec.isCombined && lec.combinedSection === selectedSection);
      } else if (filterMode === 'trainer' && selectedTrainer !== 'all') {
        matchFilter = lec.trainerName === selectedTrainer;
      }

      const matchStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'confirmed' && lec.status === 'confirmed') ||
        (selectedStatus === 'draft' && lec.status === 'draft');

      return matchSearch && matchFilter && matchStatus;
    });
  }, [lectures, searchQuery, filterMode, selectedSection, selectedTrainer, selectedStatus]);

  const allSectionsList = [...DIPLOMA_SECTIONS, ...SHORT_COURSE_SECTIONS];

  return (
    <div className="space-y-6">
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold shadow-lg animate-in fade-in slide-in-from-top-3 duration-300 print:hidden ${
            notification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border border-rose-200'
              : notification.type === 'info'
              ? 'bg-blue-50 text-blue-900 border border-blue-200'
              : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="p-1 hover:bg-black/5 rounded-lg text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-gradient-to-r from-brand-purpleDark via-[#352f7f] to-brand-primary text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-white/10 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-gold border border-brand-secondary/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
              الاعتماد الأكاديمي والفصول الافتراضية
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              الجداول التدريبية وإدارة الشعب
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              استعراض كافة المحاضرات المجدولة للشعب والمدربين، طباعة الجداول الرسمية، وتأكيد المحاضرات لإنشاء الفصول الافتراضية ونشرها للمتدربين.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('schedule_builder')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-brand-gold" />
              <span>إضافة جدول شعبة</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-purpleDark hover:bg-slate-100 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4 text-brand-purpleDark" />
              <span>طباعة الجدول</span>
            </button>
            <button
              onClick={handleConfirmAllLectures}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-secondary hover:bg-brand-gold text-brand-purpleDark text-xs font-black transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-brand-purpleDark" />
              <span>تأكيد المحاضرات</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-white font-mono">
              {lectures.length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">إجمالي المحاضرات</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-emerald-400 font-mono">
              {lectures.filter((l) => l.status === 'confirmed').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">مؤكدة بفصل افتراضي</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-amber-300 font-mono">
              {lectures.filter((l) => l.status === 'draft').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">مسودة بانتظار التأكيد</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-brand-gold font-mono">
              {lectures.filter((l) => l.isCombined).length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">محاضرات حضور مشترك</span>
          </div>
        </div>
      </div>

      <div className="hidden print:block text-center border-b-2 border-slate-900 pb-4 mb-6">
        <h2 className="text-xl font-black text-slate-900">معهد أم القرى العالي للتدريب</h2>
        <p className="text-xs text-slate-600">الجدول التدريبي الرسمي المعتمد للمحاضرات المباشرة — منصة التعليم عن بعد</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 print:hidden">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setFilterMode('section')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterMode === 'section'
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark'
              }`}
            >
              <Users className="w-4 h-4 text-brand-gold" />
              <span>استعراض حسب الشعبة</span>
            </button>
            <button
              onClick={() => setFilterMode('trainer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterMode === 'trainer'
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark'
              }`}
            >
              <Calendar className="w-4 h-4 text-brand-secondary" />
              <span>استعراض حسب المدرب</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filterMode === 'section' ? (
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="all">كافة الشعب التدريبية</option>
                {allSectionsList.map((sec, i) => (
                  <option key={i} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="all">كافة المدربين</option>
                {TRAINERS_LIST.map((tr) => (
                  <option key={tr.id} value={tr.name}>
                    {tr.name}
                  </option>
                ))}
              </select>
            )}

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">كافة الحالات</option>
              <option value="confirmed">مؤكدة بفصل افتراضي</option>
              <option value="draft">مسودة بانتظار التأكيد</option>
            </select>
          </div>
        </div>

        <div className="relative print:hidden">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالمقرر، الشعبة، أو اسم المدرب..."
            className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">رقم المحاضرة</th>
                <th className="py-3.5 px-4">المقرر التدريبي</th>
                <th className="py-3.5 px-4">الشعبة المستهدفة</th>
                <th className="py-3.5 px-4">المدرب المحاضر</th>
                <th className="py-3.5 px-4">اليوم والتاريخ</th>
                <th className="py-3.5 px-4">التوقيت (12 ساعة)</th>
                <th className="py-3.5 px-4 text-center">الفصل الافتراضي</th>
                <th className="py-3.5 px-4 text-center print:hidden">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLectures.length > 0 ? (
                filteredLectures.map((lec) => (
                  <tr key={lec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-purpleDark">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-purpleDark border border-brand-primary/20">
                        #{lec.lectureNumber || 1}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-purpleDark">{lec.courseName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{lec.courseCode}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-[11px] border border-slate-200">
                          {lec.section}
                        </span>
                        {lec.isCombined && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300 font-black text-[10px]">
                            <Users className="w-3 h-3 text-amber-600" />
                            <span>حضور مشترك: {lec.combinedSection}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800">{lec.trainerName}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{formatArabicDate(lec.date)}</div>
                      <div className="text-[11px] font-mono text-slate-500">{lec.date}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      <div className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {lec.startTime} — {lec.endTime}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {lec.status === 'confirmed' ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-[11px]">
                            <Video className="w-3.5 h-3.5 text-emerald-600" />
                            <span>فصل معتمد ({lec.roomCode})</span>
                          </span>
                          <div className="flex items-center justify-center gap-1 print:hidden">
                            <button
                              onClick={() => handleCopyLink(lec.virtualRoomUrl)}
                              title="نسخ رابط القاعة"
                              className="text-[10px] text-brand-purpleDark hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-3 h-3" />
                              <span>نسخ الرابط</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-bold text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>مسودة (غير معتمدة)</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center print:hidden">
                      <button
                        onClick={() => handleDelete(lec.id)}
                        title="حذف المحاضرة"
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    لا توجد محاضرات مجدولة مطابقة لمعايير التصفية.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirmationModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary/20 text-brand-purpleDark flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-brand-secondary" />
              </div>
              <div>
                <h3 className="text-base font-black text-brand-purpleDark">
                  تأكيد واعتماد المحاضرات
                </h3>
                <p className="text-xs text-slate-500">
                  إنشاء الفصول الافتراضية وترقيم المحاضرات تلقائياً
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              سيقوم النظام الآن بإنشاء فصول افتراضية لعدد <strong>({confirmationModal.count})</strong> محاضرة، وترقيمها تسلسلياً (1، 2، 3...) وتحويلها رسمياً إلى جدول المحاضرات الفعلي للمدرب والمتدرب.
            </p>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>سيتم تفعيل روابط البث المباشر للشعب ومزامنتها فوراً.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmationModal({ isOpen: false, count: 0 })}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={executeConfirmation}
                className="px-5 py-2 rounded-xl bg-brand-purpleDark hover:bg-[#1e1a50] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                <span>تأكيد ونشر الفصول</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
