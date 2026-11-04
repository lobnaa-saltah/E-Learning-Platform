import React, { useState, useMemo } from 'react';
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ArrowRightLeft,
  ShieldCheck,
  XCircle,
  X,
  Clock,
  User,
  Sparkles,
  Edit3,
  AlertCircle,
  CheckSquare,
  Square,
  Trash2,
} from 'lucide-react';

export const StaffCourseExemption = () => {
  const [activeMainTab, setActiveMainTab] = useState('customize');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTraineeIds, setSelectedTraineeIds] = useState(['44501289']);
  const [operationType, setOperationType] = useState('both');
  const [selectedExemptCourseId, setSelectedExemptCourseId] = useState('SYS-202');
  const [selectedFailedCourseId, setSelectedFailedCourseId] = useState('ACC-101');
  const [selectedHostBatchId, setSelectedHostBatchId] = useState('batch-105');
  const [notification, setNotification] = useState(null);

  const TRAINEES_DB = [
    {
      id: '44501289',
      nationalId: '1098765432',
      name: 'عبدالله محمد القرشي',
      program: 'دبلوم تقنية المعلومات التطبيقي',
      batch: 'شعبة 101',
      term: 'الفصل التدريبي الأول 1448 هـ',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      currentCourses: [
        {
          id: 'WEB-301',
          code: 'WEB-301',
          name: 'تطوير تطبيقات الويب الحديثة',
          creditHours: 4,
          schedule: 'الأحد والثلاثاء 05:00 م - 06:30 م',
          days: ['الأحد', 'الثلاثاء'],
          startTime: '05:00 م',
          endTime: '06:30 م',
          startMinutes: 1020,
          endMinutes: 1110,
        },
        {
          id: 'DB-204',
          code: 'DB-204',
          name: 'قواعد البيانات العلائقية والمتقدمة',
          creditHours: 3,
          schedule: 'الاثنين والأربعاء 06:00 م - 07:30 م',
          days: ['الاثنين', 'الأربعاء'],
          startTime: '06:00 م',
          endTime: '07:30 م',
          startMinutes: 1080,
          endMinutes: 1170,
        },
        {
          id: 'SEC-305',
          code: 'SEC-305',
          name: 'الأمن السيبراني وحماية الشبكات',
          creditHours: 3,
          schedule: 'الخميس 07:00 م - 08:30 م',
          days: ['الخميس'],
          startTime: '07:00 م',
          endTime: '08:30 م',
          startMinutes: 1140,
          endMinutes: 1230,
        },
        {
          id: 'SYS-202',
          code: 'SYS-202',
          name: 'تحليل وتصميم النظم البرمجية',
          creditHours: 3,
          schedule: 'الأحد 07:00 م - 08:30 م',
          days: ['الأحد'],
          startTime: '07:00 م',
          endTime: '08:30 م',
          startMinutes: 1140,
          endMinutes: 1230,
        },
      ],
      failedCourses: [
        {
          id: 'ACC-101',
          code: 'ACC-101',
          name: 'مبادئ المحاسبة المالية',
          creditHours: 3,
          failedScore: '48/100',
          failedTerm: 'الفصل التدريبي الثالث 1447 هـ',
        },
        {
          id: 'ENG-101',
          code: 'ENG-101',
          name: 'لغة إنجليزية تقنية 1',
          creditHours: 2,
          failedScore: '52/100',
          failedTerm: 'الفصل التدريبي الثاني 1447 هـ',
        },
      ],
    },
    {
      id: '44502190',
      nationalId: '1087654321',
      name: 'ريان خالد البقمي',
      program: 'دبلوم تقنية المعلومات التطبيقي',
      batch: 'شعبة 105',
      term: 'الفصل التدريبي الأول 1448 هـ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
      currentCourses: [
        {
          id: 'WEB-301',
          code: 'WEB-301',
          name: 'تطوير تطبيقات الويب الحديثة',
          creditHours: 4,
          schedule: 'الأحد والثلاثاء 06:00 م - 07:30 م',
          days: ['الأحد', 'الثلاثاء'],
          startTime: '06:00 م',
          endTime: '07:30 م',
          startMinutes: 1080,
          endMinutes: 1170,
        },
        {
          id: 'DB-204',
          code: 'DB-204',
          name: 'قواعد البيانات العلائقية والمتقدمة',
          creditHours: 3,
          schedule: 'الاثنين والأربعاء 04:30 م - 06:00 م',
          days: ['الاثنين', 'الأربعاء'],
          startTime: '04:30 م',
          endTime: '06:00 م',
          startMinutes: 990,
          endMinutes: 1080,
        },
        {
          id: 'SYS-202',
          code: 'SYS-202',
          name: 'تحليل وتصميم النظم البرمجية',
          creditHours: 3,
          schedule: 'الخميس 05:00 م - 06:30 م',
          days: ['الخميس'],
          startTime: '05:00 م',
          endTime: '06:30 م',
          startMinutes: 1020,
          endMinutes: 1110,
        },
      ],
      failedCourses: [
        {
          id: 'MATH-101',
          code: 'MATH-101',
          name: 'رياضيات الحوسبة والإحصاء',
          creditHours: 3,
          failedScore: '45/100',
          failedTerm: 'الفصل التدريبي الأول 1447 هـ',
        },
      ],
    },
    {
      id: '44501344',
      nationalId: '1076543210',
      name: 'تركي سالم الزهراني',
      program: 'دبلوم تقنية المعلومات التطبيقي',
      batch: 'شعبة 101',
      term: 'الفصل التدريبي الأول 1448 هـ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
      currentCourses: [
        {
          id: 'WEB-301',
          code: 'WEB-301',
          name: 'تطوير تطبيقات الويب الحديثة',
          creditHours: 4,
          schedule: 'الأحد والثلاثاء 05:00 م - 06:30 م',
          days: ['الأحد', 'الثلاثاء'],
          startTime: '05:00 م',
          endTime: '06:30 م',
          startMinutes: 1020,
          endMinutes: 1110,
        },
        {
          id: 'DB-204',
          code: 'DB-204',
          name: 'قواعد البيانات العلائقية والمتقدمة',
          creditHours: 3,
          schedule: 'الاثنين والأربعاء 06:00 م - 07:30 م',
          days: ['الاثنين', 'الأربعاء'],
          startTime: '06:00 م',
          endTime: '07:30 م',
          startMinutes: 1080,
          endMinutes: 1170,
        },
      ],
      failedCourses: [
        {
          id: 'ACC-101',
          code: 'ACC-101',
          name: 'مبادئ المحاسبة المالية',
          creditHours: 3,
          failedScore: '42/100',
          failedTerm: 'الفصل التدريبي الثالث 1447 هـ',
        },
      ],
    },
    {
      id: '44502311',
      nationalId: '1065432109',
      name: 'مشاري سعيد العتيبي',
      program: 'دبلوم تقنية المعلومات التطبيقي',
      batch: 'شعبة 105',
      term: 'الفصل التدريبي الأول 1448 هـ',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
      currentCourses: [
        {
          id: 'WEB-301',
          code: 'WEB-301',
          name: 'تطوير تطبيقات الويب الحديثة',
          creditHours: 4,
          schedule: 'الأحد والثلاثاء 06:00 م - 07:30 م',
          days: ['الأحد', 'الثلاثاء'],
          startTime: '06:00 م',
          endTime: '07:30 م',
          startMinutes: 1080,
          endMinutes: 1170,
        },
      ],
      failedCourses: [
        {
          id: 'ENG-101',
          code: 'ENG-101',
          name: 'لغة إنجليزية تقنية 1',
          creditHours: 2,
          failedScore: '51/100',
          failedTerm: 'الفصل التدريبي الثاني 1447 هـ',
        },
      ],
    },
  ];

  const HOST_SECTIONS_DB = {
    'ACC-101': [
      {
        id: 'batch-105',
        sectionName: 'شعبة 105',
        trainerName: 'د. وليد أحمد السبيعي',
        schedule: 'الأحد والثلاثاء 05:00 م - 06:30 م',
        days: ['الأحد', 'الثلاثاء'],
        startTime: '05:00 م',
        endTime: '06:30 م',
        startMinutes: 1020,
        endMinutes: 1110,
        availableSeats: 6,
      },
      {
        id: 'batch-108',
        sectionName: 'شعبة 108',
        trainerName: 'أ. طارق عبد المحسن',
        schedule: 'الاثنين والأربعاء 08:00 م - 09:30 م',
        days: ['الاثنين', 'الأربعاء'],
        startTime: '08:00 م',
        endTime: '09:30 م',
        startMinutes: 1200,
        endMinutes: 1290,
        availableSeats: 12,
      },
      {
        id: 'batch-110',
        sectionName: 'شعبة 110 (عطلة نهاية الأسبوع)',
        trainerName: 'د. سارة خالد القرني',
        schedule: 'السبت 10:00 ص - 01:00 م',
        days: ['السبت'],
        startTime: '10:00 ص',
        endTime: '01:00 م',
        startMinutes: 600,
        endMinutes: 780,
        availableSeats: 4,
      },
    ],
    'ENG-101': [
      {
        id: 'batch-103',
        sectionName: 'شعبة 103',
        trainerName: 'م. راكان طلال السلمي',
        schedule: 'الأحد 08:00 م - 09:30 م',
        days: ['الأحد'],
        startTime: '08:00 م',
        endTime: '09:30 م',
        startMinutes: 1200,
        endMinutes: 1290,
        availableSeats: 8,
      },
      {
        id: 'batch-107',
        sectionName: 'شعبة 107',
        trainerName: 'أ. سامي فهد',
        schedule: 'الثلاثاء 07:00 م - 08:30 م',
        days: ['الثلاثاء'],
        startTime: '07:00 م',
        endTime: '08:30 م',
        startMinutes: 1140,
        endMinutes: 1230,
        availableSeats: 15,
      },
    ],
    'MATH-101': [
      {
        id: 'batch-102',
        sectionName: 'شعبة 102',
        trainerName: 'د. خالد الزهراني',
        schedule: 'الثلاثاء 07:00 م - 09:00 م',
        days: ['الثلاثاء'],
        startTime: '07:00 م',
        endTime: '09:00 م',
        startMinutes: 1140,
        endMinutes: 1260,
        availableSeats: 5,
      },
    ],
  };

  const [operationsLog, setOperationsLog] = useState([
    {
      id: 'log-1',
      traineeName: 'سلطان فايز العبدلي',
      traineeId: '44502401',
      nationalId: '1043210987',
      primaryBatch: 'شعبة 103',
      term: 'الفصل التدريبي الأول 1448 هـ',
      opType: 'both',
      opTypeLabel: 'استثناء + إلحاق',
      exemptCourseName: 'تحليل وتصميم النظم (SYS-201)',
      exemptCourseId: 'SYS-201',
      attachedCourseName: 'مبادئ المحاسبة المالية (ACC-101)',
      attachedTrainer: 'د. وليد أحمد السبيعي',
      hostBatch: 'شعبة 108',
      date: '2026-10-20',
      staffName: 'أ. إبراهيم يوسف الحربي',
      status: 'active',
    },
    {
      id: 'log-2',
      traineeName: 'نواف منصور السلمي',
      traineeId: '44502550',
      nationalId: '1032109876',
      primaryBatch: 'شعبة 104',
      term: 'الفصل التدريبي الأول 1448 هـ',
      opType: 'attach',
      opTypeLabel: 'إلحاق',
      exemptCourseName: '-',
      exemptCourseId: '',
      attachedCourseName: 'لغة إنجليزية تقنية 1 (ENG-101)',
      attachedTrainer: 'م. راكان طلال السلمي',
      hostBatch: 'شعبة 103',
      date: '2026-10-22',
      staffName: 'أ. إبراهيم يوسف الحربي',
      status: 'active',
    },
    {
      id: 'log-3',
      traineeName: 'زياد عمر الحربي',
      traineeId: '44501908',
      nationalId: '1021098765',
      primaryBatch: 'شعبة 103',
      term: 'الفصل التدريبي الأول 1448 هـ',
      opType: 'exempt',
      opTypeLabel: 'استثناء',
      exemptCourseName: 'الأمن السيبراني وحماية الشبكات (SEC-305)',
      exemptCourseId: 'SEC-305',
      attachedCourseName: '-',
      attachedTrainer: '-',
      hostBatch: '-',
      date: '2026-10-24',
      staffName: 'أ. إبراهيم يوسف الحربي',
      status: 'active',
    },
  ]);

  const showNotificationToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return TRAINEES_DB;
    const q = searchQuery.toLowerCase().trim();
    return TRAINEES_DB.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.nationalId.includes(q) ||
        t.batch.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const selectedTraineesList = useMemo(() => {
    return TRAINEES_DB.filter((t) => selectedTraineeIds.includes(t.id));
  }, [selectedTraineeIds]);

  const primarySelectedTrainee = selectedTraineesList[0] || TRAINEES_DB[0];

  const availableHostSections = HOST_SECTIONS_DB[selectedFailedCourseId] || [];

  const selectedHostSectionObj = useMemo(() => {
    return (
      availableHostSections.find((s) => s.id === selectedHostBatchId) ||
      availableHostSections[0] ||
      null
    );
  }, [availableHostSections, selectedHostBatchId]);

  const conflictEvaluation = useMemo(() => {
    if (operationType === 'exempt') {
      return { hasConflict: false };
    }

    if (!selectedHostSectionObj) {
      return { hasConflict: false };
    }

    const hostDays = selectedHostSectionObj.days || [];
    const hostStartMins = selectedHostSectionObj.startMinutes;
    const hostEndMins = selectedHostSectionObj.endMinutes;

    for (const trainee of selectedTraineesList) {
      const remainingCourses = trainee.currentCourses.filter((course) => {
        if (operationType === 'both' && course.id === selectedExemptCourseId) {
          return false;
        }
        return true;
      });

      for (const course of remainingCourses) {
        const daysOverlap = course.days.some((d) => hostDays.includes(d));
        if (!daysOverlap) continue;

        const isTimeOverlap =
          hostStartMins < course.endMinutes && course.startMinutes < hostEndMins;

        if (isTimeOverlap) {
          return {
            hasConflict: true,
            traineeName: trainee.name,
            conflictingCourseName: course.name,
            conflictingCourseCode: course.code,
            conflictingSchedule: course.schedule,
            hostBatchName: selectedHostSectionObj.sectionName,
            hostSchedule: selectedHostSectionObj.schedule,
            message: `تعارض زمني مباشر في جدول المتدرب [${trainee.name}]: مواعيد الشعبة المستضيفة (${selectedHostSectionObj.sectionName}: ${selectedHostSectionObj.schedule}) تتداخل مع مقرره الأساسي المتبقي [${course.name} - ${course.schedule}].`,
          };
        }
      }
    }

    return { hasConflict: false };
  }, [
    operationType,
    selectedHostSectionObj,
    selectedTraineesList,
    selectedExemptCourseId,
  ]);

  const handleToggleTraineeSelection = (id) => {
    setSelectedTraineeIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) {
          showNotificationToast('يجب إبقاء متدرب واحد محدد على الأقل', 'error');
          return prev;
        }
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleSaveCustomization = (e) => {
    e.preventDefault();

    if (conflictEvaluation.hasConflict) {
      showNotificationToast('تعذر الحفظ: يوجد تعارض زمني بين مواعيد الشعبة ومقررات المتدرب.', 'error');
      return;
    }

    const newLogs = selectedTraineesList.map((trainee, index) => {
      let opTypeLabel = 'استثناء + إلحاق';
      if (operationType === 'exempt') opTypeLabel = 'استثناء';
      if (operationType === 'attach') opTypeLabel = 'إلحاق';

      const exemptCourseObj = trainee.currentCourses.find((c) => c.id === selectedExemptCourseId);
      const failedCourseObj = trainee.failedCourses.find((c) => c.id === selectedFailedCourseId);

      return {
        id: `log-${Date.now()}-${index}`,
        traineeName: trainee.name,
        traineeId: trainee.id,
        nationalId: trainee.nationalId,
        primaryBatch: trainee.batch,
        term: trainee.term,
        opType: operationType,
        opTypeLabel,
        exemptCourseName:
          operationType === 'attach'
            ? '-'
            : exemptCourseObj
            ? `${exemptCourseObj.name} (${exemptCourseObj.code})`
            : selectedExemptCourseId,
        exemptCourseId: operationType === 'attach' ? '' : selectedExemptCourseId,
        attachedCourseName:
          operationType === 'exempt'
            ? '-'
            : failedCourseObj
            ? `${failedCourseObj.name} (${failedCourseObj.code})`
            : selectedFailedCourseId,
        attachedTrainer:
          operationType === 'exempt'
            ? '-'
            : selectedHostSectionObj
            ? selectedHostSectionObj.trainerName
            : '-',
        hostBatch:
          operationType === 'exempt'
            ? '-'
            : selectedHostSectionObj
            ? selectedHostSectionObj.sectionName
            : '-',
        date: new Date().toISOString().split('T')[0],
        staffName: 'أ. إبراهيم يوسف الحربي',
        status: 'active',
      };
    });

    setOperationsLog((prev) => [...newLogs, ...prev]);

    const countText =
      selectedTraineesList.length > 1
        ? `لعدد (${selectedTraineesList.length}) متدربين`
        : `للمتدرب [${selectedTraineesList[0].name}]`;

    showNotificationToast(`تم حفظ وتطبيق قرار التخصيص بنجاح ${countText}.`);
  };

  const handleCancelOperation = (logId) => {
    setOperationsLog((prev) => prev.filter((item) => item.id !== logId));
    showNotificationToast('تم إلغاء العملية واسترجاع الوضع الأكاديمي الطبيعي للمتدرب.');
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold shadow-lg animate-in fade-in slide-in-from-top-3 duration-300 ${
            notification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border border-rose-200'
              : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
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

      <div className="bg-gradient-to-r from-brand-purpleDark via-[#352f7f] to-brand-primary text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-gold border border-brand-secondary/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
              إدارة الخطط الفردية وشؤون المتدربين
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              تخصيص مقررات المتدرب (الاستثناء والإلحاق)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              معالجة حالات التعثر الأكاديمي، استثناء المقررات غير المسجلة، إلحاق المتدربين مع الشعب المستضيفة مع فحص التعارض الآلي وسجل العمليات المعتمد.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/15">
            <button
              onClick={() => setActiveMainTab('customize')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMainTab === 'customize'
                  ? 'bg-brand-secondary text-brand-purpleDark font-black shadow-sm'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              نموذج الاستثناء والإلحاق
            </button>
            <button
              onClick={() => setActiveMainTab('log')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMainTab === 'log'
                  ? 'bg-brand-secondary text-brand-purpleDark font-black shadow-sm'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              سجل العمليات ({operationsLog.length})
            </button>
          </div>
        </div>
      </div>

      {activeMainTab === 'customize' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-brand-purpleDark" />
                <div>
                  <h3 className="text-sm font-black text-brand-purpleDark">
                    1. اختيار المتدرب (البحث بالاسم أو الهوية أو الرقم التدريبي)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    يمكنك تحديد أكثر من متدرب لتطبيق نفس التخصيص كدفعة واحدة
                  </p>
                </div>
              </div>
              <div className="text-xs font-bold text-slate-600 bg-brand-purpleDark/5 px-3 py-1.5 rounded-xl border border-brand-purpleDark/10">
                المتدربون المحددون: <strong className="text-brand-purpleDark">{selectedTraineeIds.length}</strong>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم المتدرب، رقم الهوية الوطنية، أو الرقم التدريبي..."
                className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20 focus:border-brand-purpleDark"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              {filteredSearchResults.map((trainee) => {
                const isSelected = selectedTraineeIds.includes(trainee.id);
                return (
                  <div
                    key={trainee.id}
                    onClick={() => handleToggleTraineeSelection(trainee.id)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isSelected
                        ? 'border-brand-purpleDark bg-brand-purpleDark/5 ring-2 ring-brand-purpleDark/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-brand-purpleDark" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <div className="space-y-1 truncate flex-1">
                      <h4 className="font-bold text-xs text-brand-purpleDark truncate">{trainee.name}</h4>
                      <div className="text-[10px] text-slate-500 font-mono">
                        هوية: {trainee.nationalId}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                        <span className="font-bold">{trainee.batch}</span>
                        <span>•</span>
                        <span className="text-rose-700 font-bold">
                          {trainee.failedCourses.length} تعثر سابق
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-purpleDark/10 text-brand-purpleDark flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-brand-purpleDark" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400">الملف الأكاديمي للمتدرب الأساسي:</span>
                  <h3 className="text-base font-black text-brand-purpleDark">
                    {primarySelectedTrainee.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-0.5">
                    <span>الرقم التدريبي: <strong className="font-mono text-brand-purpleDark">{primarySelectedTrainee.id}</strong></span>
                    <span>•</span>
                    <span>الهوية: <strong className="font-mono">{primarySelectedTrainee.nationalId}</strong></span>
                    <span>•</span>
                    <span>الشعبة: <strong className="text-brand-purpleDark">{primarySelectedTrainee.batch}</strong></span>
                    <span>•</span>
                    <span>الترم: {primarySelectedTrainee.term}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-black text-amber-900 block">مقررات التعثر السابقة:</span>
                  <span className="text-[11px] text-amber-800">
                    {primarySelectedTrainee.failedCourses.map((c) => `${c.name} (${c.failedScore})`).join('، ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-black text-brand-purpleDark">
                2. اختيار نوع عملية التخصيص:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setOperationType('exempt')}
                  className={`p-3.5 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                    operationType === 'exempt'
                      ? 'border-brand-purpleDark bg-brand-purpleDark/5 ring-2 ring-brand-purpleDark/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-brand-purpleDark">العملية 1: استثناء فقط</span>
                    <XCircle className="w-4 h-4 text-rose-500" />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    إلغاء مقرر من جدول شعبته الأساسية (لا يحضر ولا يختبر فيه ولا يُحسب عليه غياب).
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setOperationType('attach')}
                  className={`p-3.5 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                    operationType === 'attach'
                      ? 'border-brand-purpleDark bg-brand-purpleDark/5 ring-2 ring-brand-purpleDark/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-brand-purpleDark">العملية 2: إلحاق فقط</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    إلحاق مقرر تعثر سابق مع شعبة مستضيفة تقدمه هذا الترم وفق مقاعدها الشاغرة.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setOperationType('both')}
                  className={`p-3.5 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                    operationType === 'both'
                      ? 'border-brand-purpleDark bg-brand-purpleDark/5 ring-2 ring-brand-purpleDark/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-brand-purpleDark">العملية 3: استثناء + إلحاق</span>
                    <ArrowRightLeft className="w-4 h-4 text-brand-secondary" />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    استبدال متكامل: استثناء مقرر من شعبته الحالية وإلحاق مقرر تعثر مكانه في تدفق واحد.
                  </p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(operationType === 'exempt' || operationType === 'both') && (
                <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/60 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <h4 className="text-xs font-black text-brand-purpleDark">
                        المقرر المطلوب استثناؤه من الشعبة الأساسية ({primarySelectedTrainee.batch}):
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-500">اختر المقرر</span>
                  </div>

                  <div className="space-y-2">
                    {primarySelectedTrainee.currentCourses.map((course) => {
                      const isSelected = selectedExemptCourseId === course.id;
                      return (
                        <div
                          key={course.id}
                          onClick={() => setSelectedExemptCourseId(course.id)}
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-rose-400 bg-rose-50/60 text-rose-900'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-black block">{course.name}</span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {course.code} • {course.creditHours} ساعات • {course.schedule}
                            </span>
                          </div>
                          <div>
                            {isSelected ? (
                              <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-300">
                                تم اختيار الاستثناء
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-400">مُدرج</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                    <strong>الأثر النظامي للاستثناء:</strong> يُحذف المقرر المستثنى فوراً من جدول المحاضرات المباشرة والاختبارات للمتدرب، ويُعفى من متطلبات الحضور والغياب فيه لهذا الترم.
                  </div>
                </div>
              )}

              {(operationType === 'attach' || operationType === 'both') && (
                <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/60 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-black text-brand-purpleDark">
                        مقرر التعثر والشعبة المستضيفة المتاحة:
                      </h4>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      إلحاق أكاديمي
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        اختر مقرر التعثر من سجل المتدرب:
                      </label>
                      <select
                        value={selectedFailedCourseId}
                        onChange={(e) => {
                          setSelectedFailedCourseId(e.target.value);
                          const hosts = HOST_SECTIONS_DB[e.target.value] || [];
                          if (hosts.length > 0) setSelectedHostBatchId(hosts[0].id);
                        }}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                      >
                        {primarySelectedTrainee.failedCourses.map((fc) => (
                          <option key={fc.id} value={fc.id}>
                            {fc.name} ({fc.code}) — رسوب سابق: {fc.failedScore}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        الشعب المستضيفة التي تقدم هذا المقرر هذا الترم:
                      </label>
                      <div className="space-y-2">
                        {availableHostSections.map((host) => {
                          const isSelected = selectedHostBatchId === host.id;
                          return (
                            <div
                              key={host.id}
                              onClick={() => setSelectedHostBatchId(host.id)}
                              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${
                                isSelected
                                  ? 'border-emerald-500 bg-emerald-50/60'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-brand-purpleDark">
                                  {host.sectionName} — {host.trainerName}
                                </span>
                                <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                                  {host.availableSeats} مقاعد شاغرة
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-600 font-mono flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{host.schedule}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {conflictEvaluation.hasConflict ? (
                    <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-900 text-xs space-y-1 animate-in shake duration-300">
                      <div className="flex items-center gap-2 font-black text-rose-800">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>تعارض زمني مباشر يمنع حفظ الإلحاق!</span>
                      </div>
                      <p className="leading-relaxed font-semibold pr-6">
                        {conflictEvaluation.message}
                      </p>
                      <p className="text-[11px] text-rose-700 font-bold pr-6">
                        الحل: اختر شعبة مستضيفة بموعد غير متعارض، أو قم باستثناء المقرر المتعارض إذا كان ضمن خطة الاستبدال.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs space-y-1 text-emerald-900">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>تم فحص التعارض الآلي بنجاح</span>
                      </div>
                      <p className="text-[11px] text-emerald-700 leading-relaxed pr-5">
                        لا يوجد أي تعارض زمني بين مواعيد الشعبة المستضيفة والمقررات المتبقية للمتدرب في شعبته الأساسية.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600 font-medium">
                ملخص القرار: {operationType === 'exempt' && 'استثناء مقرر'}
                {operationType === 'attach' && 'إلحاق مقرر تعثر'}
                {operationType === 'both' && 'استبدال: استثناء مقرر وإلحاق مقرر تعثر بديل'}
                {' • '} لعدد ({selectedTraineeIds.length}) متدربين محددين.
              </div>

              <button
                type="button"
                onClick={handleSaveCustomization}
                disabled={conflictEvaluation.hasConflict}
                className={`px-7 py-3 rounded-2xl text-xs font-black transition-all shadow-md flex items-center gap-2 ${
                  conflictEvaluation.hasConflict
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-brand-purpleDark hover:bg-[#1f1a54] text-white cursor-pointer hover:scale-[1.02]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>تأكيد واعتماد قرار التخصيص</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-brand-purpleDark">
                سجل قرارات الاستثناء والإلحاق المعتمدة
              </h3>
              <p className="text-xs text-slate-500">
                توثيق كامل للعمليات الأكاديمية الصادرة من موظف القبول والتسجيل مع إمكانية الإلغاء
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              إجمالي السجلات: {operationsLog.length}
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">المتدرب</th>
                  <th className="py-3.5 px-4">رقم الهوية</th>
                  <th className="py-3.5 px-4">الشعبة الأساسية</th>
                  <th className="py-3.5 px-4">نوع العملية</th>
                  <th className="py-3.5 px-4">المقرر المستثنى</th>
                  <th className="py-3.5 px-4">المقرر الملحق والمدرب</th>
                  <th className="py-3.5 px-4">الشعبة المستضيفة</th>
                  <th className="py-3.5 px-4">تاريخ العملية والموظف</th>
                  <th className="py-3.5 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {operationsLog.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-purpleDark">{log.traineeName}</div>
                      <div className="text-[11px] font-mono text-slate-400">{log.traineeId}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {log.nationalId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {log.primaryBatch}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          log.opType === 'both'
                            ? 'bg-purple-50 text-purple-800 border border-purple-200'
                            : log.opType === 'exempt'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {log.opTypeLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {log.exemptCourseName !== '-' ? (
                        <span className="font-bold text-rose-800 text-[11px]">
                          {log.exemptCourseName}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {log.attachedCourseName !== '-' ? (
                        <div>
                          <div className="font-bold text-emerald-900 text-[11px]">
                            {log.attachedCourseName}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            المدرب: {log.attachedTrainer}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      {log.hostBatch}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-700 font-bold text-[11px]">{log.date}</div>
                      <div className="text-[10px] text-slate-500">{log.staffName}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMainTab('customize');
                            setSelectedTraineeIds([log.traineeId]);
                            showNotificationToast('تم تحميل بيانات المتدرب في نموذج التخصيص للتعديل.');
                          }}
                          title="تعديل العملية"
                          className="p-1.5 text-brand-purpleDark hover:bg-brand-purpleDark/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancelOperation(log.id)}
                          title="إلغاء العملية واستعادة المقرر"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
