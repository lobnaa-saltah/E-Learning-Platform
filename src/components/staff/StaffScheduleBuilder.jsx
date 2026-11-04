import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Trash2,
  Sparkles,
  Layers,
  ArrowLeft,
  X,
  Repeat,
  ShieldCheck,
} from 'lucide-react';
import {
  INITIAL_PROGRAM_TYPES,
  INITIAL_TERMS,
  DIPLOMA_SECTIONS,
  SHORT_COURSE_SECTIONS,
  DIPLOMA_COURSES,
  SHORT_COURSES,
  TRAINERS_LIST,
  loadScheduledLectures,
  saveScheduledLectures,
  parseTimeToMinutes,
  checkLectureConflict,
  addWeeksToDate,
  formatArabicDate,
} from './scheduleData';

export const StaffScheduleBuilder = ({ onNavigateTab }) => {
  const [programType, setProgramType] = useState(INITIAL_PROGRAM_TYPES.DIPLOMA);
  const [selectedTerm, setSelectedTerm] = useState(INITIAL_TERMS[0]);
  const [selectedSection, setSelectedSection] = useState(DIPLOMA_SECTIONS[0]);
  const [isCombined, setIsCombined] = useState(false);
  const [combinedSection, setCombinedSection] = useState(DIPLOMA_SECTIONS[1]);

  const [selectedShortCourse, setSelectedShortCourse] = useState(SHORT_COURSES[0].id);
  const [selectedCourseTrainer, setSelectedCourseTrainer] = useState(TRAINERS_LIST[0].name);

  const [lectures, setLectures] = useState(() => loadScheduledLectures());
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 10, 1));
  const [dragOverDay, setDragOverDay] = useState(null);
  const [selectedCourseForClick, setSelectedCourseForClick] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [dropModal, setDropModal] = useState({
    isOpen: false,
    course: null,
    targetDate: '',
    startHour: '06',
    startMinute: '00',
    startPeriod: 'م',
    endHour: '07',
    endMinute: '30',
    endPeriod: 'م',
    trainerName: TRAINERS_LIST[0].name,
    isCombined: false,
    combinedSection: DIPLOMA_SECTIONS[1],
    isRecurring: false,
    recurrenceCount: 4,
    conflictResult: { hasConflict: false },
  });

  useEffect(() => {
    saveScheduledLectures(lectures);
  }, [lectures]);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const activeCoursesList =
    programType === INITIAL_PROGRAM_TYPES.DIPLOMA
      ? DIPLOMA_COURSES
      : SHORT_COURSES.filter((c) => c.id === selectedShortCourse);

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNamesArabic = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleDragStart = (e, course) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(course));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDayDragOver = (e, dayNum) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverDay(dayNum);
  };

  const handleDayDragLeave = () => {
    setDragOverDay(null);
  };

  const handleDayDrop = (e, dayNum) => {
    e.preventDefault();
    setDragOverDay(null);
    try {
      const courseJson = e.dataTransfer.getData('text/plain');
      if (!courseJson) return;
      const course = JSON.parse(courseJson);
      openDropModal(course, dayNum);
    } catch {}
  };

  const openDropModal = (course, dayNum) => {
    const formattedDay = String(dayNum).padStart(2, '0');
    const formattedMonth = String(month + 1).padStart(2, '0');
    const targetDate = `${year}-${formattedMonth}-${formattedDay}`;

    const defaultTrainer =
      programType === INITIAL_PROGRAM_TYPES.SHORT_COURSE
        ? selectedCourseTrainer
        : course.code === 'WEB-301'
        ? 'د. فيصل إبراهيم الشهري'
        : course.code === 'DB-204'
        ? 'د. سارة خالد القرني'
        : course.code === 'SEC-305'
        ? 'م. راكان طلال السلمي'
        : TRAINERS_LIST[0].name;

    const initialModalState = {
      isOpen: true,
      course,
      targetDate,
      startHour: '06',
      startMinute: '00',
      startPeriod: 'م',
      endHour: '07',
      endMinute: '30',
      endPeriod: 'م',
      trainerName: defaultTrainer,
      isCombined,
      combinedSection,
      isRecurring: false,
      recurrenceCount: 4,
      conflictResult: { hasConflict: false },
    };

    const conflict = evaluateModalConflict(initialModalState);
    initialModalState.conflictResult = conflict;
    setDropModal(initialModalState);
  };

  const evaluateModalConflict = (modalState) => {
    const startStr = `${modalState.startHour}:${modalState.startMinute} ${modalState.startPeriod}`;
    const endStr = `${modalState.endHour}:${modalState.endMinute} ${modalState.endPeriod}`;
    const startMins = parseTimeToMinutes(startStr);
    const endMins = parseTimeToMinutes(endStr);

    if (endMins <= startMins) {
      return {
        hasConflict: true,
        type: 'invalid_time',
        message: 'وقت الانتهاء يجب أن يكون لاحقاً لوقت البدء.',
      };
    }

    const primaryConflict = checkLectureConflict({
      lecturesList: lectures,
      newLectureDate: modalState.targetDate,
      newStartMinutes: startMins,
      newEndMinutes: endMins,
      trainerName: modalState.trainerName,
      section: selectedSection,
      isCombined: modalState.isCombined,
      combinedSection: modalState.combinedSection,
    });

    if (primaryConflict.hasConflict) {
      return primaryConflict;
    }

    if (modalState.isRecurring && modalState.recurrenceCount > 0) {
      for (let w = 1; w <= modalState.recurrenceCount; w++) {
        const recurringDate = addWeeksToDate(modalState.targetDate, w);
        const recurConflict = checkLectureConflict({
          lecturesList: lectures,
          newLectureDate: recurringDate,
          newStartMinutes: startMins,
          newEndMinutes: endMins,
          trainerName: modalState.trainerName,
          section: selectedSection,
          isCombined: modalState.isCombined,
          combinedSection: modalState.combinedSection,
        });

        if (recurConflict.hasConflict) {
          return {
            hasConflict: true,
            type: 'recurrence_conflict',
            message: `تعارض في الأسبوع رقم (${w + 1}) بتاريخ [${recurringDate}]: ${recurConflict.message}`,
          };
        }
      }
    }

    return { hasConflict: false };
  };

  const handleModalFieldChange = (field, value) => {
    setDropModal((prev) => {
      const updated = { ...prev, [field]: value };
      const conflict = evaluateModalConflict(updated);
      updated.conflictResult = conflict;
      return updated;
    });
  };

  const handleApplyPresetTime = (sH, sM, sP, eH, eM, eP) => {
    setDropModal((prev) => {
      const updated = {
        ...prev,
        startHour: sH,
        startMinute: sM,
        startPeriod: sP,
        endHour: eH,
        endMinute: eM,
        endPeriod: eP,
      };
      const conflict = evaluateModalConflict(updated);
      updated.conflictResult = conflict;
      return updated;
    });
  };

  const handleSaveScheduledLecture = (e) => {
    e.preventDefault();

    if (dropModal.conflictResult.hasConflict) {
      showToast('تعذر الحفظ لوجود تعارض في الجدول الزمني أو خطأ في الأوقات.', 'error');
      return;
    }

    const startStr = `${dropModal.startHour}:${dropModal.startMinute} ${dropModal.startPeriod}`;
    const endStr = `${dropModal.endHour}:${dropModal.endMinute} ${dropModal.endPeriod}`;
    const startMins = parseTimeToMinutes(startStr);
    const endMins = parseTimeToMinutes(endStr);

    const occurrencesCount = dropModal.isRecurring ? Number(dropModal.recurrenceCount) + 1 : 1;
    const newLectures = [];

    for (let i = 0; i < occurrencesCount; i++) {
      const lectureDate = addWeeksToDate(dropModal.targetDate, i);
      const uniqueId = `lec-${Date.now()}-${i}`;
      const virtualRoomCode = `VR-${Math.floor(1000 + Math.random() * 9000)}`;

      newLectures.push({
        id: uniqueId,
        lectureNumber: lectures.length + i + 1,
        courseCode: dropModal.course.code,
        courseName: dropModal.course.name,
        date: lectureDate,
        startTime: startStr,
        endTime: endStr,
        startMinutes: startMins,
        endMinutes: endMins,
        trainerName: dropModal.trainerName,
        section: selectedSection,
        isCombined: dropModal.isCombined,
        combinedSection: dropModal.isCombined ? dropModal.combinedSection : '',
        programType,
        term: selectedTerm,
        status: 'draft',
        virtualRoomUrl: `https://lms.uqt.edu.sa/v-room/${dropModal.course.code}-${selectedSection.replace(/\s+/g, '')}`,
        roomCode: virtualRoomCode,
      });
    }

    setLectures((prev) => [...prev, ...newLectures]);

    const successMsg = dropModal.isRecurring
      ? `تمت جدولة (${occurrencesCount}) محاضرات أسبوعية بنجاح لمقرر [${dropModal.course.name}].`
      : `تمت جدولة محاضرة [${dropModal.course.name}] بنجاح ليوم ${dropModal.targetDate}.`;

    showToast(successMsg, 'success');
    setDropModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDeleteLecture = (id, e) => {
    if (e) e.stopPropagation();
    setLectures((prev) => prev.filter((lec) => lec.id !== id));
    showToast('تم حذف المحاضرة من الجدول بنجاح.');
  };

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ type: 'empty', key: `empty-${i}` });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month + 1).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    const dayLectures = lectures.filter((lec) => {
      const matchDate = lec.date === dateStr;
      const matchSection =
        lec.section === selectedSection ||
        (lec.isCombined && lec.combinedSection === selectedSection);
      return matchDate && matchSection;
    });

    const dObj = new Date(year, month, day);
    const dayOfWeek = dObj.getDay();
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

    calendarDays.push({
      type: 'day',
      dayNum: day,
      dateStr,
      dayLectures,
      isWeekend,
      key: `day-${day}`,
    });
  }

  const lastLectureDateCalculated =
    dropModal.isOpen && dropModal.isRecurring
      ? addWeeksToDate(dropModal.targetDate, Number(dropModal.recurrenceCount))
      : '';

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-bold shadow-2xl border transition-all animate-in fade-in duration-300 max-w-lg w-[90%] ${
            toastMessage.type === 'error'
              ? 'bg-rose-50 text-rose-900 border-rose-300'
              : 'bg-emerald-50 text-emerald-900 border-emerald-300'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          )}
          <span className="flex-1">{toastMessage.text}</span>
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
              نظام الجدولة الذكية والفصول الافتراضية
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              إضافة وبناء جدول شعبة دراسية
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              قم بسحب بطاقات المقررات وإفلاتها على أيام التقويم، مع فحص التعارض اللحظي الدقيق وميزة التكرار الأسبوعي وخيار الحضور المشترك.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('batch_schedules')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <span>عرض الجداول التدريبية</span>
              <ArrowLeft className="w-4 h-4 text-brand-gold" />
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-200">نوع البرنامج:</span>
              <div className="inline-flex p-1 bg-black/20 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setProgramType(INITIAL_PROGRAM_TYPES.DIPLOMA);
                    setSelectedSection(DIPLOMA_SECTIONS[0]);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    programType === INITIAL_PROGRAM_TYPES.DIPLOMA
                      ? 'bg-brand-secondary text-brand-purpleDark shadow-sm font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  دبلوم معتمد
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProgramType(INITIAL_PROGRAM_TYPES.SHORT_COURSE);
                    setSelectedSection(SHORT_COURSE_SECTIONS[0]);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    programType === INITIAL_PROGRAM_TYPES.SHORT_COURSE
                      ? 'bg-brand-secondary text-brand-purpleDark shadow-sm font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  دورة تدريبية
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 cursor-pointer hover:bg-white/15 transition-colors">
                <input
                  type="checkbox"
                  checked={isCombined}
                  onChange={(e) => setIsCombined(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-secondary focus:ring-brand-secondary"
                />
                <span className="text-xs font-bold text-brand-gold">
                  خيار الحضور المشترك لدمج شعبتين
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {programType === INITIAL_PROGRAM_TYPES.DIPLOMA ? (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    الترم التدريبي الحالي:
                  </label>
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="w-full p-2 bg-brand-purpleDark text-white border border-white/20 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    {INITIAL_TERMS.map((term, i) => (
                      <option key={i} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    الشعبة التدريبية:
                  </label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full p-2 bg-brand-purpleDark text-white border border-white/20 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    {DIPLOMA_SECTIONS.map((sec, i) => (
                      <option key={i} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                {isCombined && (
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-brand-gold mb-1">
                      الشعبة الشريكة المدمجة:
                    </label>
                    <select
                      value={combinedSection}
                      onChange={(e) => setCombinedSection(e.target.value)}
                      className="w-full p-2 bg-brand-purpleDark text-white border border-brand-secondary rounded-xl text-xs font-bold focus:outline-none"
                    >
                      {DIPLOMA_SECTIONS.filter((s) => s !== selectedSection).map((sec, i) => (
                        <option key={i} value={sec}>
                          دمج مع: {sec}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    الدورة التدريبية:
                  </label>
                  <select
                    value={selectedShortCourse}
                    onChange={(e) => setSelectedShortCourse(e.target.value)}
                    className="w-full p-2 bg-brand-purpleDark text-white border border-white/20 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    {SHORT_COURSES.map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {sc.name} ({sc.creditHours} ساعة)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    شعبة الدورة:
                  </label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full p-2 bg-brand-purpleDark text-white border border-white/20 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    {SHORT_COURSE_SECTIONS.map((sec, i) => (
                      <option key={i} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    المدرب المعتمد للدورة:
                  </label>
                  <select
                    value={selectedCourseTrainer}
                    onChange={(e) => setSelectedCourseTrainer(e.target.value)}
                    className="w-full p-2 bg-brand-purpleDark text-white border border-white/20 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    {TRAINERS_LIST.map((tr) => (
                      <option key={tr.id} value={tr.name}>
                        {tr.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-purpleDark" />
            <div>
              <h3 className="text-sm font-black text-brand-purpleDark">
                مربعات المقررات القابلة للسحب (Draggable Cards)
              </h3>
              <p className="text-[11px] text-slate-500">
                اسحب المقرر وضعه فوق اليوم المستهدف في التقويم بالأسفل، أو انقر عليه لتحديده
              </p>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
            الشعبة الحالية: <strong className="text-brand-purpleDark">{selectedSection}</strong>
            {isCombined && (
              <span className="text-brand-secondary font-black mr-1">
                + {combinedSection} (مشترك)
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {activeCoursesList.map((course) => {
            const isSelected = selectedCourseForClick?.id === course.id;
            return (
              <div
                key={course.id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, course)}
                onClick={() => setSelectedCourseForClick(course)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md select-none relative group ${
                  isSelected
                    ? 'border-brand-secondary bg-brand-secondary/10 ring-2 ring-brand-secondary/40'
                    : 'border-slate-200 bg-white hover:border-brand-purpleDark/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {course.code}
                  </span>
                  <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-brand-purpleDark transition-colors" />
                </div>
                <h4 className="text-xs font-black text-brand-purpleDark line-clamp-2 leading-snug mb-2">
                  {course.name}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>{course.creditHours} ساعات</span>
                  <span className="text-emerald-700 font-bold group-hover:translate-x-[-2px] transition-transform">
                    اسحب للتقويم ←
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-secondary/20 text-brand-purpleDark flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-brand-secondary" />
            </div>
            <div>
              <h3 className="text-base font-black text-brand-purpleDark">
                تقويم المحاضرات الشهري (Droppable Calendar)
              </h3>
              <p className="text-xs text-slate-500">
                إسقاط المقررات على أي يوم تدريبي لفتح نافذة إعداد الموعد وفحص التعارض اللحظي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-xs sm:text-sm font-black text-brand-purpleDark px-3 py-1 bg-slate-100 rounded-xl">
              {monthNamesArabic[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs font-black text-slate-600 py-1 bg-slate-50 rounded-xl">
          <div>الأحد</div>
          <div>الاثنين</div>
          <div>الثلاثاء</div>
          <div>الأربعاء</div>
          <div>الخميس</div>
          <div className="text-slate-400">الجمعة (إجازة)</div>
          <div className="text-slate-400">السبت (إجازة)</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((cell) => {
            if (cell.type === 'empty') {
              return (
                <div
                  key={cell.key}
                  className="min-h-[105px] bg-slate-50/50 rounded-2xl border border-dashed border-slate-200/60"
                />
              );
            }

            const isHovered = dragOverDay === cell.dayNum;

            return (
              <div
                key={cell.key}
                onDragOver={(e) => handleDayDragOver(e, cell.dayNum)}
                onDragLeave={handleDayDragLeave}
                onDrop={(e) => handleDayDrop(e, cell.dayNum)}
                onClick={() => {
                  if (selectedCourseForClick) {
                    openDropModal(selectedCourseForClick, cell.dayNum);
                  }
                }}
                className={`min-h-[105px] p-2 rounded-2xl border transition-all flex flex-col justify-between ${
                  cell.isWeekend
                    ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-brand-purpleDark/50'
                } ${
                  isHovered
                    ? 'border-brand-secondary bg-brand-secondary/15 ring-2 ring-brand-secondary scale-[1.02]'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="font-mono font-bold text-xs">{cell.dayNum}</span>
                  {selectedCourseForClick && !cell.isWeekend && (
                    <button
                      type="button"
                      title="إفلات المقرر هنا"
                      className="text-[10px] text-brand-purpleDark hover:text-brand-secondary font-bold"
                    >
                      + إضافة
                    </button>
                  )}
                </div>

                <div className="space-y-1 my-auto overflow-y-auto max-h-[72px]">
                  {cell.dayLectures.map((lec) => (
                    <div
                      key={lec.id}
                      className="p-1 rounded-lg bg-brand-purpleDark/5 border border-brand-purpleDark/20 text-[10px] text-brand-purpleDark leading-tight flex items-start justify-between gap-1 group/lec"
                    >
                      <div className="truncate">
                        <span className="font-bold block truncate">{lec.courseName}</span>
                        <span className="text-[9px] text-slate-500 font-mono">
                          {lec.startTime} - {lec.endTime}
                        </span>
                        {lec.isCombined && (
                          <span className="block text-[8px] font-black text-brand-secondary">
                            مشترك: {lec.combinedSection}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteLecture(lec.id, e)}
                        title="حذف المحاضرة"
                        className="text-slate-400 hover:text-rose-600 opacity-0 group-hover/lec:opacity-100 transition-opacity p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-[9px] text-slate-400 text-left pt-0.5 font-mono">
                  {cell.dayLectures.length > 0 && `${cell.dayLectures.length} محاضرات`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {dropModal.isOpen && dropModal.course && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-secondary/20 text-brand-purpleDark flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-purpleDark">
                    إعداد موعد المحاضرة (Drop Modal)
                  </h3>
                  <p className="text-xs text-slate-500">
                    تحديد التوقيت بنظام 12 ساعة، فحص التعارض اللحظي، وإعدادات التكرار الأسبوعي
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDropModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-brand-purpleDark/5 rounded-2xl border border-brand-purpleDark/15 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-brand-purpleDark">
                  {dropModal.course.name} ({dropModal.course.code})
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  التاريخ: {formatArabicDate(dropModal.targetDate)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                <span>الشعبة: {selectedSection}</span>
                {dropModal.isCombined && (
                  <span className="text-brand-secondary font-bold">
                    • الحضور المشترك مفعّل مع: ({dropModal.combinedSection})
                  </span>
                )}
              </div>
            </div>

            <form onSubmit={handleSaveScheduledLecture} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  المدرب المحاضر <span className="text-rose-500">*</span>:
                </label>
                <select
                  value={dropModal.trainerName}
                  onChange={(e) => handleModalFieldChange('trainerName', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
                >
                  {TRAINERS_LIST.map((tr) => (
                    <option key={tr.id} value={tr.name}>
                      {tr.name} — {tr.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    تحديد وقت المحاضرة بنظام 12 ساعة (من / إلى):
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleApplyPresetTime('05', '00', 'م', '06', '00', 'م')}
                      className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                    >
                      5:00 - 6:00 م
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetTime('06', '00', 'م', '07', '30', 'م')}
                      className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                    >
                      6:00 - 7:30 م
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetTime('07', '30', 'م', '09', '00', 'م')}
                      className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                    >
                      7:30 - 9:00 م
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-600 block">وقت البدء (من):</span>
                    <div className="flex items-center gap-1.5">
                      <select
                        value={dropModal.startHour}
                        onChange={(e) => handleModalFieldChange('startHour', e.target.value)}
                        className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold w-16 text-center"
                      >
                        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                      <span className="font-bold">:</span>
                      <select
                        value={dropModal.startMinute}
                        onChange={(e) => handleModalFieldChange('startMinute', e.target.value)}
                        className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold w-16 text-center"
                      >
                        {['00', '15', '30', '45'].map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <select
                        value={dropModal.startPeriod}
                        onChange={(e) => handleModalFieldChange('startPeriod', e.target.value)}
                        className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold w-14 text-center"
                      >
                        <option value="م">م</option>
                        <option value="ص">ص</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-600 block">وقت الانتهاء (إلى):</span>
                    <div className="flex items-center gap-1.5">
                      <select
                        value={dropModal.endHour}
                        onChange={(e) => handleModalFieldChange('endHour', e.target.value)}
                        className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold w-16 text-center"
                      >
                        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                      <span className="font-bold">:</span>
                      <select
                        value={dropModal.endMinute}
                        onChange={(e) => handleModalFieldChange('endMinute', e.target.value)}
                        className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold w-16 text-center"
                      >
                        {['00', '15', '30', '45'].map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <select
                        value={dropModal.endPeriod}
                        onChange={(e) => handleModalFieldChange('endPeriod', e.target.value)}
                        className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold w-14 text-center"
                      >
                        <option value="م">م</option>
                        <option value="ص">ص</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-1.5 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    قاعدة الجدولة: المحاضرة التي تبدأ لحظة انتهاء محاضرة سابقة (مثلاً 6:00 م بعد 5:00-6:00 م) لا تعتبر تعارضاً.
                  </span>
                </div>
              </div>

              {dropModal.conflictResult.hasConflict && (
                <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-900 text-xs space-y-1 animate-in shake duration-300">
                  <div className="flex items-center gap-2 font-black text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>تنبيه تعارض في المواعيد (Conflict Detected):</span>
                  </div>
                  <p className="leading-relaxed font-semibold pr-6">
                    {dropModal.conflictResult.message}
                  </p>
                  <p className="text-[11px] text-rose-700 font-bold pr-6">
                    يرجى تغيير التوقيت أو اختيار مدرب آخر لحفظ المحاضرة.
                  </p>
                </div>
              )}

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Repeat className="w-4 h-4 text-brand-secondary" />
                    <span className="text-xs font-bold text-slate-800">
                      هل ترغب بتكرار المحاضرة أسبوعياً؟
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="recurrence_choice"
                        checked={!dropModal.isRecurring}
                        onChange={() => handleModalFieldChange('isRecurring', false)}
                        className="text-brand-purpleDark"
                      />
                      <span>لا</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="recurrence_choice"
                        checked={dropModal.isRecurring}
                        onChange={() => handleModalFieldChange('isRecurring', true)}
                        className="text-brand-purpleDark"
                      />
                      <span>نعم</span>
                    </label>
                  </div>
                </div>

                {dropModal.isRecurring && (
                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
                        عدد مرات التكرار الأسبوعي:
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={16}
                        value={dropModal.recurrenceCount}
                        onChange={(e) => handleModalFieldChange('recurrenceCount', Math.max(1, Number(e.target.value)))}
                        className="w-20 p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-center"
                      />
                      <span className="text-xs text-slate-500">مرات</span>
                    </div>

                    <div className="p-3 bg-brand-purpleDark/5 border border-brand-purpleDark/20 rounded-xl text-xs text-brand-purpleDark space-y-1">
                      <div className="font-bold flex items-center justify-between">
                        <span>إجمالي المحاضرات التي سيتم إنشاؤها:</span>
                        <span className="font-mono font-black text-sm text-brand-secondary">
                          {Number(dropModal.recurrenceCount) + 1} محاضرات أسبوعية
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        رقم وتاريخ آخر محاضرة: المحاضرة رقم ({Number(dropModal.recurrenceCount) + 1}) بتاريخ: <strong>{formatArabicDate(lastLectureDateCalculated)}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDropModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={dropModal.conflictResult.hasConflict}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                    dropModal.conflictResult.hasConflict
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-brand-purpleDark hover:bg-[#1d1950] text-white cursor-pointer'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>تثبيت المحاضرة بالجدول</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
