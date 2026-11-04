import React, { useState, useMemo } from 'react';
import {
  FileText,
  Award,
  Plus,
  Copy,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  Search,
  Filter,
  X,
  Sparkles,
  CheckSquare,
  Square,
  Eye,
  Layers,
} from 'lucide-react';

export const TrainerAssessments = ({ initialType = 'exams' }) => {
  const [activeTab, setActiveTab] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  const [notification, setNotification] = useState(null);

  const GRADE_LIMITS = {
    assignment: { min: 1, max: 10, label: 'الواجبات' },
    quiz: { min: 1, max: 15, label: 'الاختبار القصير' },
    midterm: { min: 1, max: 30, label: 'الاختبار النصفي' },
    final: { min: 1, max: 50, label: 'الاختبار النهائي' },
  };

  const AVAILABLE_COURSES = [
    {
      id: 'WEB-301',
      name: 'تطوير تطبيقات الويب الحديثة',
      code: 'WEB-301',
      sections: ['شعبة 101', 'شعبة 105'],
    },
    {
      id: 'DB-204',
      name: 'قواعد البيانات العلائقية والمتقدمة',
      code: 'DB-204',
      sections: ['شعبة 103', 'شعبة 102'],
    },
    {
      id: 'SEC-305',
      name: 'الأمن السيبراني وحماية الشبكات',
      code: 'SEC-305',
      sections: ['شعبة 104', 'شعبة 106'],
    },
  ];

  const QUESTION_BANK = {
    'WEB-301': [
      {
        id: 'q-w1',
        type: 'mcq',
        text: 'ما هو الخطاف (Hook) المستخدم لإدارة الحالة المحلية في مكونات React الوظيفية؟',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 'useState',
        difficulty: 'متوسط',
        unit: 'الوحدة 2: React Hooks',
      },
      {
        id: 'q-w2',
        type: 'true_false',
        text: 'الخاصية key في تصيير القوائم بـ React تساعد محرك Virtual DOM في تحديد العناصر المعدلة بكفاءة.',
        options: ['صح', 'خطأ'],
        correctAnswer: 'صح',
        difficulty: 'سهل',
        unit: 'الوحدة 1: أساسيات Virtual DOM',
      },
      {
        id: 'q-w3',
        type: 'mcq',
        text: 'ما هي الأداة المستخدمة في تجميع وحزم تطبيقات الويب الحديثة بكفاءة عالية؟',
        options: ['Vite / Rolldown', 'Apache Tomcat', 'SQLite', 'Docker CLI'],
        correctAnswer: 'Vite / Rolldown',
        difficulty: 'متوسط',
        unit: 'الوحدة 3: أدوات البناء والتحزيم',
      },
      {
        id: 'q-w4',
        type: 'short',
        text: 'اشرح بإيجاز الفرق بين تمرير الخصائص (Props) وإدارة الحالة (State) في مكونات React.',
        options: [],
        correctAnswer: 'Props تمرر من المكون الأب وتكون للقراءة فقط، بينما State تدار محلياً وقابلة للتعديل.',
        difficulty: 'صعب',
        unit: 'الوحدة 2: هيكلة المكونات',
      },
      {
        id: 'q-w5',
        type: 'mcq',
        text: 'أي من الطرق التالية تُستخدم لمنع إعادة تصيير المكونات غير الضرورية في React؟',
        options: ['React.memo', 'setInterval', 'useEffect بدون مصفوفة', 'forceUpdate'],
        correctAnswer: 'React.memo',
        difficulty: 'صعب',
        unit: 'الوحدة 4: تحسين الأداء',
      },
    ],
    'DB-204': [
      {
        id: 'q-d1',
        type: 'mcq',
        text: 'أي نوع من أنواع الربط (JOIN) يقوم بإرجاع كافة السجلات من الجدول الأيسر حتى في حال عدم وجود تطابق؟',
        options: ['INNER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN', 'RIGHT OUTER JOIN'],
        correctAnswer: 'LEFT OUTER JOIN',
        difficulty: 'متوسط',
        unit: 'الوحدة 2: استعلامات الربط المتقدمة',
      },
      {
        id: 'q-d2',
        type: 'true_false',
        text: 'المفتاح الأساسي (Primary Key) يمكن أن يحتوي على قيم فارغة (NULL) في قواعد البيانات العلائقية.',
        options: ['صح', 'خطأ'],
        correctAnswer: 'خطأ',
        difficulty: 'سهل',
        unit: 'الوحدة 1: تصميم الجداول والقيود',
      },
      {
        id: 'q-d3',
        type: 'mcq',
        text: 'ما هي العبارة المستخدمة لتأكيد وحفظ العمليات ضمن المعاملة البرمجية (Transaction)؟',
        options: ['COMMIT', 'ROLLBACK', 'GRANT', 'REVOKE'],
        correctAnswer: 'COMMIT',
        difficulty: 'متوسط',
        unit: 'الوحدة 3: إدارة المعاملات ACID',
      },
      {
        id: 'q-d4',
        type: 'short',
        text: 'وضح الغرض الرئيسي من عملية تطبيع البيانات (Database Normalization) حتى الصيغة 3NF.',
        options: [],
        correctAnswer: 'تقليل التكرار غير المبرر للبيانات وتفادي مشكلات التحديث والحذف والإدراج.',
        difficulty: 'صعب',
        unit: 'الوحدة 1: التطبيع والتصميم',
      },
    ],
    'SEC-305': [
      {
        id: 'q-s1',
        type: 'mcq',
        text: 'ما هو الهجوم السيبراني الذي يستهدف إغراق خوادم الويب بكميات هائلة من الطلبات الوهمية لتعطيل الخدمة؟',
        options: ['DDoS Attack', 'SQL Injection', 'Cross-Site Scripting (XSS)', 'Phishing'],
        correctAnswer: 'DDoS Attack',
        difficulty: 'متوسط',
        unit: 'الوحدة 2: تهديدات وهجمات الشبكات',
      },
      {
        id: 'q-s2',
        type: 'true_false',
        text: 'بروتوكول HTTPS يعتمد على تشفير البيانات بين العميل والخادم باستخدام خوارزميات TLS/SSL.',
        options: ['صح', 'خطأ'],
        correctAnswer: 'صح',
        difficulty: 'سهل',
        unit: 'الوحدة 1: بروتوكولات الأمان',
      },
      {
        id: 'q-s3',
        type: 'mcq',
        text: 'ما هو رقم المنفذ القياسي (Default Port) المستخدم لخدمة الاتصال المشفر الآمن SSH؟',
        options: ['22', '80', '443', '21'],
        correctAnswer: '22',
        difficulty: 'متوسط',
        unit: 'الوحدة 3: المنافذ وجدران الحماية',
      },
    ],
  };

  const [exams, setExams] = useState([
    {
      id: 1,
      assessmentNumber: 1,
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      title: 'الاختبار النصفي - تطوير تطبيقات الويب',
      type: 'midterm',
      typeLabel: 'اختبار نصفي',
      score: 30,
      sections: ['شعبة 101'],
      startDate: '2026-11-05 07:00 م',
      endDate: '2026-11-05 08:30 م',
      durationMinutes: 60,
      autoSubmit: true,
      instantSave: true,
      shuffleQuestions: true,
      attemptsCount: 1,
      selectedQuestionIds: ['q-w1', 'q-w2', 'q-w3'],
      status: 'approved',
      statusLabel: 'معتمد',
    },
    {
      id: 2,
      assessmentNumber: 2,
      courseCode: 'DB-204',
      courseName: 'قواعد البيانات العلائقية والمتقدمة',
      title: 'اختبار قصير 1 - استعلامات SQL المتقدمة',
      type: 'quiz',
      typeLabel: 'اختبار قصير',
      score: 15,
      sections: ['شعبة 103'],
      startDate: '2026-11-08 04:00 م',
      endDate: '2026-11-08 04:45 م',
      durationMinutes: 45,
      autoSubmit: true,
      instantSave: true,
      shuffleQuestions: true,
      attemptsCount: 2,
      selectedQuestionIds: ['q-d1', 'q-d2'],
      status: 'approved',
      statusLabel: 'معتمد',
    },
    {
      id: 3,
      assessmentNumber: 3,
      courseCode: 'SEC-305',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      title: 'الاختبار النصفي - أمن الشبكات وفحص الثغرات',
      type: 'midterm',
      typeLabel: 'اختبار نصفي',
      score: 30,
      sections: ['شعبة 104'],
      startDate: '2026-11-12 06:00 م',
      endDate: '2026-11-12 07:30 م',
      durationMinutes: 60,
      autoSubmit: true,
      instantSave: true,
      shuffleQuestions: false,
      attemptsCount: 1,
      selectedQuestionIds: ['q-s1', 'q-s2', 'q-s3'],
      status: 'pending_approval',
      statusLabel: 'بانتظار الاعتماد',
    },
    {
      id: 4,
      assessmentNumber: 4,
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      title: 'الاختبار النهائي العملي - بناء منصة سحابية',
      type: 'final',
      typeLabel: 'اختبار نهائي',
      score: 50,
      sections: ['شعبة 101', 'شعبة 105'],
      startDate: '2026-12-01 05:00 م',
      endDate: '2026-12-01 07:00 م',
      durationMinutes: 120,
      autoSubmit: true,
      instantSave: true,
      shuffleQuestions: true,
      attemptsCount: 1,
      selectedQuestionIds: ['q-w1', 'q-w2', 'q-w3', 'q-w4', 'q-w5'],
      status: 'pending_approval',
      statusLabel: 'بانتظار الاعتماد',
    },
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 101,
      assessmentNumber: 1,
      courseCode: 'WEB-301',
      courseName: 'تطوير تطبيقات الويب الحديثة',
      title: 'الواجب الأول: تصميم واجهات تفاعلية بـ React',
      type: 'assignment',
      typeLabel: 'واجب تدريبي',
      score: 10,
      sections: ['شعبة 101'],
      startDate: '2026-10-25 08:00 ص',
      endDate: '2026-11-02 11:59 م',
      durationMinutes: 1440,
      autoSubmit: false,
      instantSave: true,
      shuffleQuestions: false,
      attemptsCount: 2,
      selectedQuestionIds: ['q-w1', 'q-w2'],
      status: 'approved',
      statusLabel: 'معتمد',
    },
    {
      id: 102,
      assessmentNumber: 2,
      courseCode: 'DB-204',
      courseName: 'قواعد البيانات العلائقية والمتقدمة',
      title: 'الواجب الأول: بناء استعلامات الربط والـ Subqueries',
      type: 'assignment',
      typeLabel: 'واجب تدريبي',
      score: 10,
      sections: ['شعبة 103'],
      startDate: '2026-10-28 09:00 ص',
      endDate: '2026-11-05 11:59 م',
      durationMinutes: 1440,
      autoSubmit: false,
      instantSave: true,
      shuffleQuestions: false,
      attemptsCount: 2,
      selectedQuestionIds: ['q-d1', 'q-d3'],
      status: 'approved',
      statusLabel: 'معتمد',
    },
    {
      id: 103,
      assessmentNumber: 3,
      courseCode: 'SEC-305',
      courseName: 'الأمن السيبراني وحماية الشبكات',
      title: 'الواجب الثاني: فحص المنافذ وتحليل التقارير الأمنية',
      type: 'assignment',
      typeLabel: 'واجب تدريبي',
      score: 10,
      sections: ['شعبة 104'],
      startDate: '2026-11-01 10:00 ص',
      endDate: '2026-11-09 11:59 م',
      durationMinutes: 1440,
      autoSubmit: false,
      instantSave: true,
      shuffleQuestions: false,
      attemptsCount: 1,
      selectedQuestionIds: ['q-s1', 'q-s3'],
      status: 'pending_approval',
      statusLabel: 'بانتظار الاعتماد',
    },
  ]);

  const [assessmentModal, setAssessmentModal] = useState({
    isOpen: false,
    mode: 'add',
    category: 'exam',
    data: null,
  });

  const [duplicateModal, setDuplicateModal] = useState({
    isOpen: false,
    item: null,
    category: 'exam',
    selectedSections: [],
    newStartDate: '',
    newEndDate: '',
  });

  const [previewQuestionsModal, setPreviewQuestionsModal] = useState({
    isOpen: false,
    item: null,
  });

  const [formData, setFormData] = useState({
    id: null,
    assessmentNumber: 1,
    courseCode: 'WEB-301',
    title: '',
    type: 'midterm',
    score: 20,
    sections: ['شعبة 101'],
    startDate: '',
    endDate: '',
    durationMinutes: 60,
    autoSubmit: true,
    instantSave: true,
    shuffleQuestions: true,
    attemptsCount: 1,
    selectedQuestionIds: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const showNotification = (msg, type = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const getNextAssessmentNumber = (category, courseCode) => {
    const list = category === 'exam' ? exams : assignments;
    const sameCourseItems = list.filter((item) => item.courseCode === courseCode);
    if (!sameCourseItems.length) return 1;
    const maxNum = Math.max(...sameCourseItems.map((i) => i.assessmentNumber || 1));
    return maxNum + 1;
  };

  const openAddModal = (category) => {
    const defaultCourse = 'WEB-301';
    const nextNum = getNextAssessmentNumber(category, defaultCourse);
    const defaultType = category === 'exam' ? 'midterm' : 'assignment';
    const defaultScore = category === 'exam' ? 30 : 10;

    setFormData({
      id: null,
      assessmentNumber: nextNum,
      courseCode: defaultCourse,
      title: '',
      type: defaultType,
      score: defaultScore,
      sections: ['شعبة 101'],
      startDate: '2026-11-10 06:00 م',
      endDate: '2026-11-10 07:30 م',
      durationMinutes: category === 'exam' ? 60 : 1440,
      autoSubmit: category === 'exam',
      instantSave: true,
      shuffleQuestions: category === 'exam',
      attemptsCount: 1,
      selectedQuestionIds: ['q-w1', 'q-w2'],
    });

    setFormErrors({});
    setAssessmentModal({
      isOpen: true,
      mode: 'add',
      category,
      data: null,
    });
  };

  const openEditModal = (item, category) => {
    setFormData({
      id: item.id,
      assessmentNumber: item.assessmentNumber,
      courseCode: item.courseCode,
      title: item.title,
      type: item.type,
      score: item.score,
      sections: [...item.sections],
      startDate: item.startDate,
      endDate: item.endDate,
      durationMinutes: item.durationMinutes,
      autoSubmit: item.autoSubmit,
      instantSave: item.instantSave,
      shuffleQuestions: item.shuffleQuestions,
      attemptsCount: item.attemptsCount,
      selectedQuestionIds: [...(item.selectedQuestionIds || [])],
    });

    setFormErrors({});
    setAssessmentModal({
      isOpen: true,
      mode: 'edit',
      category,
      data: item,
    });
  };

  const validateScore = (scoreValue, typeValue) => {
    const num = Number(scoreValue);
    const limit = GRADE_LIMITS[typeValue] || GRADE_LIMITS.assignment;
    if (isNaN(num) || num === null || num === undefined) {
      return 'يرجى إدخال قيمة عددية صحيحة للدرجة';
    }
    if (num < limit.min) {
      return `الحد الأدنى لدرجة ${limit.label} هو ${limit.min} درجات.`;
    }
    if (num > limit.max) {
      return `الدرجة المدخلة (${num}) تتجاوز الحد الأقصى المعتمد نظامياً لـ ${limit.label} وهو ${limit.max} درجات.`;
    }
    return '';
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'courseCode') {
        const found = AVAILABLE_COURSES.find((c) => c.code === value);
        if (found && found.sections.length > 0) {
          updated.sections = [found.sections[0]];
        }
        updated.assessmentNumber = getNextAssessmentNumber(assessmentModal.category, value);
        const questions = QUESTION_BANK[value] || [];
        updated.selectedQuestionIds = questions.slice(0, 2).map((q) => q.id);
      }

      if (field === 'type') {
        if (value === 'midterm') updated.score = 30;
        else if (value === 'final') updated.score = 50;
        else if (value === 'quiz') updated.score = 15;
        else updated.score = 10;
      }

      return updated;
    });

    if (field === 'score' || field === 'type') {
      const currentType = field === 'type' ? value : formData.type;
      const currentScore = field === 'score' ? value : formData.score;
      const scoreError = validateScore(currentScore, currentType);
      setFormErrors((prev) => ({ ...prev, score: scoreError }));
    }
  };

  const toggleSectionSelection = (sec) => {
    setFormData((prev) => {
      const exists = prev.sections.includes(sec);
      let updatedSections;
      if (exists) {
        if (prev.sections.length === 1) return prev;
        updatedSections = prev.sections.filter((s) => s !== sec);
      } else {
        updatedSections = [...prev.sections, sec];
      }
      return { ...prev, sections: updatedSections };
    });
  };

  const toggleQuestionSelection = (qId) => {
    setFormData((prev) => {
      const exists = prev.selectedQuestionIds.includes(qId);
      const updated = exists
        ? prev.selectedQuestionIds.filter((id) => id !== qId)
        : [...prev.selectedQuestionIds, qId];
      return { ...prev, selectedQuestionIds: updated };
    });
  };

  const handleSelectAllQuestions = (courseQuestions) => {
    const allIds = courseQuestions.map((q) => q.id);
    setFormData((prev) => {
      const isAllSelected = allIds.every((id) => prev.selectedQuestionIds.includes(id));
      return {
        ...prev,
        selectedQuestionIds: isAllSelected ? [] : allIds,
      };
    });
  };

  const handleSaveAssessment = (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'يرجى إدخال عنوان واضح للتقييم';
    }
    if (!formData.sections.length) {
      errors.sections = 'يرجى اختيار شعبة واحدة على الأقل';
    }
    const scoreErr = validateScore(formData.score, formData.type);
    if (scoreErr) {
      errors.score = scoreErr;
    }
    if (!formData.startDate) {
      errors.startDate = 'يرجى تحديد موعد البداية';
    }
    if (!formData.endDate) {
      errors.endDate = 'يرجى تحديد موعد النهاية';
    }
    if (!formData.selectedQuestionIds.length) {
      errors.questions = 'يرجى تحديد سؤال واحد على الأقل من بنك الأسئلة';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const courseObj = AVAILABLE_COURSES.find((c) => c.code === formData.courseCode);
    const courseName = courseObj ? courseObj.name : 'مقرر تقني';

    let typeLabel = 'واجب تدريبي';
    if (formData.type === 'midterm') typeLabel = 'اختبار نصفي';
    if (formData.type === 'final') typeLabel = 'اختبار نهائي';
    if (formData.type === 'quiz') typeLabel = 'اختبار قصير';

    if (assessmentModal.category === 'exam') {
      if (assessmentModal.mode === 'add') {
        const newExam = {
          id: Date.now(),
          assessmentNumber: formData.assessmentNumber,
          courseCode: formData.courseCode,
          courseName,
          title: formData.title,
          type: formData.type,
          typeLabel,
          score: Number(formData.score),
          sections: [...formData.sections],
          startDate: formData.startDate,
          endDate: formData.endDate,
          durationMinutes: Number(formData.durationMinutes),
          autoSubmit: formData.autoSubmit,
          instantSave: formData.instantSave,
          shuffleQuestions: formData.shuffleQuestions,
          attemptsCount: Number(formData.attemptsCount),
          selectedQuestionIds: [...formData.selectedQuestionIds],
          status: 'pending_approval',
          statusLabel: 'بانتظار الاعتماد',
        };
        setExams((prev) => [newExam, ...prev]);
        showNotification('تمت إضافة الاختبار بنجاح، وهو الآن «بانتظار الاعتماد» الأكاديمي.');
      } else {
        setExams((prev) =>
          prev.map((item) =>
            item.id === formData.id
              ? {
                  ...item,
                  courseCode: formData.courseCode,
                  courseName,
                  title: formData.title,
                  type: formData.type,
                  typeLabel,
                  score: Number(formData.score),
                  sections: [...formData.sections],
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  durationMinutes: Number(formData.durationMinutes),
                  autoSubmit: formData.autoSubmit,
                  instantSave: formData.instantSave,
                  shuffleQuestions: formData.shuffleQuestions,
                  attemptsCount: Number(formData.attemptsCount),
                  selectedQuestionIds: [...formData.selectedQuestionIds],
                  status: 'pending_approval',
                  statusLabel: 'بانتظار الاعتماد',
                }
              : item
          )
        );
        showNotification('تم تحديث بيانات الاختبار بنجاح وتم إرساله لإعادة الاعتماد.');
      }
    } else {
      if (assessmentModal.mode === 'add') {
        const newAssignment = {
          id: Date.now(),
          assessmentNumber: formData.assessmentNumber,
          courseCode: formData.courseCode,
          courseName,
          title: formData.title,
          type: 'assignment',
          typeLabel: 'واجب تدريبي',
          score: Number(formData.score),
          sections: [...formData.sections],
          startDate: formData.startDate,
          endDate: formData.endDate,
          durationMinutes: Number(formData.durationMinutes),
          autoSubmit: formData.autoSubmit,
          instantSave: formData.instantSave,
          shuffleQuestions: formData.shuffleQuestions,
          attemptsCount: Number(formData.attemptsCount),
          selectedQuestionIds: [...formData.selectedQuestionIds],
          status: 'pending_approval',
          statusLabel: 'بانتظار الاعتماد',
        };
        setAssignments((prev) => [newAssignment, ...prev]);
        showNotification('تمت إضافة الواجب بنجاح وإرساله للإدارة للاعتماد.');
      } else {
        setAssignments((prev) =>
          prev.map((item) =>
            item.id === formData.id
              ? {
                  ...item,
                  courseCode: formData.courseCode,
                  courseName,
                  title: formData.title,
                  score: Number(formData.score),
                  sections: [...formData.sections],
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  durationMinutes: Number(formData.durationMinutes),
                  autoSubmit: formData.autoSubmit,
                  instantSave: formData.instantSave,
                  shuffleQuestions: formData.shuffleQuestions,
                  attemptsCount: Number(formData.attemptsCount),
                  selectedQuestionIds: [...formData.selectedQuestionIds],
                  status: 'pending_approval',
                  statusLabel: 'بانتظار الاعتماد',
                }
              : item
          )
        );
        showNotification('تم تحديث بيانات الواجب وتعديل حالته إلى «بانتظار الاعتماد».');
      }
    }

    setAssessmentModal({ isOpen: false, mode: 'add', category: 'exam', data: null });
  };

  const openDuplicateModal = (item, category) => {
    const courseObj = AVAILABLE_COURSES.find((c) => c.code === item.courseCode);
    const availableSections = courseObj ? courseObj.sections : [];
    const unusedSections = availableSections.filter((sec) => !item.sections.includes(sec));

    setDuplicateModal({
      isOpen: true,
      item,
      category,
      selectedSections: unusedSections.length > 0 ? [unusedSections[0]] : availableSections.slice(0, 1),
      newStartDate: '2026-11-15 06:00 م',
      newEndDate: '2026-11-15 07:30 م',
    });
  };

  const handleConfirmDuplicate = (e) => {
    e.preventDefault();
    const { item, category, selectedSections, newStartDate, newEndDate } = duplicateModal;

    if (!selectedSections.length) {
      showNotification('يرجى اختيار شعبة جديدة واحدة على الأقل للتكرار', 'error');
      return;
    }
    if (!newStartDate || !newEndDate) {
      showNotification('يرجى تحديد المواعيد الجديدة للنسخة المكررة', 'error');
      return;
    }

    const nextNum = getNextAssessmentNumber(category, item.courseCode);

    const duplicatedItem = {
      ...item,
      id: Date.now(),
      assessmentNumber: nextNum,
      title: `${item.title} (نسخة ${selectedSections.join('، ')})`,
      sections: [...selectedSections],
      startDate: newStartDate,
      endDate: newEndDate,
      status: 'pending_approval',
      statusLabel: 'بانتظار الاعتماد',
    };

    if (category === 'exam') {
      setExams((prev) => [duplicatedItem, ...prev]);
      showNotification(`تم تكرار الاختبار بنجاح لـ (${selectedSections.join('، ')}) وحالته «بانتظار الاعتماد».`);
    } else {
      setAssignments((prev) => [duplicatedItem, ...prev]);
      showNotification(`تم تكرار الواجب بنجاح لـ (${selectedSections.join('، ')}) وحالته «بانتظار الاعتماد».`);
    }

    setDuplicateModal({
      isOpen: false,
      item: null,
      category: 'exam',
      selectedSections: [],
      newStartDate: '',
      newEndDate: '',
    });
  };

  const handleDelete = (id, category) => {
    if (category === 'exam') {
      setExams((prev) => prev.filter((i) => i.id !== id));
      showNotification('تم حذف الاختبار من السجل.');
    } else {
      setAssignments((prev) => prev.filter((i) => i.id !== id));
      showNotification('تم حذف الواجب من السجل.');
    }
  };

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchSearch =
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.sections.some((s) => s.includes(searchQuery));
      const matchCourse = selectedCourseFilter === 'all' || exam.courseCode === selectedCourseFilter;
      const matchStatus = selectedStatusFilter === 'all' || exam.status === selectedStatusFilter;
      return matchSearch && matchCourse && matchStatus;
    });
  }, [exams, searchQuery, selectedCourseFilter, selectedStatusFilter]);

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assign) => {
      const matchSearch =
        assign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assign.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assign.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assign.sections.some((s) => s.includes(searchQuery));
      const matchCourse = selectedCourseFilter === 'all' || assign.courseCode === selectedCourseFilter;
      const matchStatus = selectedStatusFilter === 'all' || assign.status === selectedStatusFilter;
      return matchSearch && matchCourse && matchStatus;
    });
  }, [assignments, searchQuery, selectedCourseFilter, selectedStatusFilter]);

  const activeQuestionsForForm = QUESTION_BANK[formData.courseCode] || [];

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
              نظام إدارة التقييمات وبنك الأسئلة
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              إدارة وتكرار الواجبات والاختبارات
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              إنشاء التقييمات الأكاديمية مع ضبط معايير الوقت والدرجات، واختيار الأسئلة، وتكرار النسخ للشعب الموازية بضغطة زر مع متابعة الاعتماد.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openAddModal('exam')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-secondary hover:bg-brand-gold text-brand-purpleDark text-xs font-black transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة اختبار جديد</span>
            </button>
            <button
              onClick={() => openAddModal('assignment')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="w-4 h-4 text-brand-gold" />
              <span>إضافة واجب جديد</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-brand-gold font-mono">
              {exams.length + assignments.length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">إجمالي التقييمات</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-emerald-400 font-mono">
              {exams.filter((e) => e.status === 'approved').length +
                assignments.filter((a) => a.status === 'approved').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">معتمدة رسمياً</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-amber-300 font-mono">
              {exams.filter((e) => e.status === 'pending_approval').length +
                assignments.filter((a) => a.status === 'pending_approval').length}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">بانتظار الاعتماد</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="block text-xl font-black text-white font-mono">
              {Object.values(QUESTION_BANK).reduce((acc, q) => acc + q.length, 0)}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">أسئلة بنك الأسئلة</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('exams')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'exams'
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark'
              }`}
            >
              <Award className="w-4 h-4 text-brand-gold" />
              <span>جدول الاختبارات ({exams.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'assignments'
                  ? 'bg-brand-purpleDark text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-purpleDark'
              }`}
            >
              <FileText className="w-4 h-4 text-brand-secondary" />
              <span>جدول الواجبات ({assignments.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              {activeTab === 'exams' ? 'إجمالي الاختبارات المعروضة:' : 'إجمالي الواجبات المعروضة:'}
            </span>
            <span className="px-2.5 py-1 bg-brand-purpleDark/5 text-brand-purpleDark font-mono font-bold text-xs rounded-lg">
              {activeTab === 'exams' ? filteredExams.length : filteredAssignments.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المقرر، أو الشعبة..."
              className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20 focus:border-brand-purpleDark transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
            >
              <option value="all">كافة المقررات التدريبية</option>
              {AVAILABLE_COURSES.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
            >
              <option value="all">كافة حالات الاعتماد</option>
              <option value="approved">معتمد رسمياً</option>
              <option value="pending_approval">بانتظار الاعتماد</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">رقم التقييم</th>
                <th className="py-3.5 px-4">المقرر التدريبي</th>
                <th className="py-3.5 px-4">عنوان التقييم</th>
                <th className="py-3.5 px-4">{activeTab === 'exams' ? 'نوع الاختبار' : 'نوع الواجب'}</th>
                <th className="py-3.5 px-4">الدرجة</th>
                <th className="py-3.5 px-4">الشعب المستهدفة</th>
                <th className="py-3.5 px-4">البداية والنهاية</th>
                <th className="py-3.5 px-4 text-center">حالة الاعتماد</th>
                <th className="py-3.5 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'exams' ? (
                filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-purpleDark">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-purpleDark border border-brand-primary/20">
                          {exam.assessmentNumber}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-brand-purpleDark">{exam.courseName}</div>
                        <div className="text-[11px] font-mono text-slate-500">{exam.courseCode}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{exam.title}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>المدة: {exam.durationMinutes} دقيقة</span>
                          <span>•</span>
                          <span>الأسئلة: {exam.selectedQuestionIds?.length || 0}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            exam.type === 'final'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : exam.type === 'midterm'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {exam.typeLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-black text-slate-800 text-sm">
                        {exam.score}
                        <span className="text-[11px] font-sans font-normal text-slate-500 mr-1">درجة</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {exam.sections.map((sec, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[11px] rounded-md border border-slate-200"
                            >
                              {sec}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-700 font-medium text-[11px] flex items-center gap-1">
                          <span className="text-emerald-700 font-bold">من:</span> {exam.startDate}
                        </div>
                        <div className="text-slate-700 font-medium text-[11px] flex items-center gap-1 mt-0.5">
                          <span className="text-rose-700 font-bold">إلى:</span> {exam.endDate}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {exam.status === 'approved' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>معتمد</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-300 font-bold text-[11px]">
                            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            <span>بانتظار الاعتماد</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                          <button
                            onClick={() => openEditModal(exam, 'exam')}
                            title="تعديل الاختبار"
                            className="p-1.5 text-brand-purpleDark hover:bg-brand-purpleDark/10 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDuplicateModal(exam, 'exam')}
                            title="تكرار الاختبار لشعب أخرى"
                            className="p-1.5 text-brand-secondary hover:bg-brand-secondary/15 rounded-lg transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setPreviewQuestionsModal({ isOpen: true, item: exam })}
                            title="معاينة الأسئلة"
                            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(exam.id, 'exam')}
                            title="حذف"
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-slate-500">
                      لا توجد اختبارات مطابقة لبحثك في النظام.
                    </td>
                  </tr>
                )
              ) : filteredAssignments.length > 0 ? (
                filteredAssignments.map((assign) => (
                  <tr key={assign.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-purpleDark">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-secondary/15 text-brand-purpleDark border border-brand-secondary/30">
                        {assign.assessmentNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-purpleDark">{assign.courseName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{assign.courseCode}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{assign.title}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>الأسئلة: {assign.selectedQuestionIds?.length || 0}</span>
                        <span>•</span>
                        <span>المحاولات: {assign.attemptsCount}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {assign.typeLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-slate-800 text-sm">
                      {assign.score}
                      <span className="text-[11px] font-sans font-normal text-slate-500 mr-1">درجات</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {assign.sections.map((sec, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[11px] rounded-md border border-slate-200"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-700 font-medium text-[11px] flex items-center gap-1">
                        <span className="text-emerald-700 font-bold">من:</span> {assign.startDate}
                      </div>
                      <div className="text-slate-700 font-medium text-[11px] flex items-center gap-1 mt-0.5">
                        <span className="text-rose-700 font-bold">إلى:</span> {assign.endDate}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {assign.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>معتمد</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-300 font-bold text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                          <span>بانتظار الاعتماد</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                        <button
                          onClick={() => openEditModal(assign, 'assignment')}
                          title="تعديل الواجب"
                          className="p-1.5 text-brand-purpleDark hover:bg-brand-purpleDark/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDuplicateModal(assign, 'assignment')}
                          title="تكرار الواجب لشعب أخرى"
                          className="p-1.5 text-brand-secondary hover:bg-brand-secondary/15 rounded-lg transition-colors cursor-pointer"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPreviewQuestionsModal({ isOpen: true, item: assign })}
                          title="معاينة الأسئلة"
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(assign.id, 'assignment')}
                          title="حذف"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-500">
                    لا توجد واجبات مطابقة لبحثك في النظام.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {assessmentModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-purpleDark/10 text-brand-purpleDark flex items-center justify-center">
                  {assessmentModal.category === 'exam' ? (
                    <Award className="w-5 h-5 text-brand-secondary" />
                  ) : (
                    <FileText className="w-5 h-5 text-brand-secondary" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-purpleDark">
                    {assessmentModal.mode === 'add'
                      ? assessmentModal.category === 'exam'
                        ? 'إضافة اختبار جديد'
                        : 'إضافة واجب جديد'
                      : assessmentModal.category === 'exam'
                      ? 'تعديل بيانات الاختبار'
                      : 'تعديل بيانات الواجب'}
                  </h3>
                  <p className="text-xs text-brand-textLight">
                    تحديد المقرر، الشعب، الدرجة القصوى المعتمدة، وإعدادات الاختبار المتقدمة
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssessmentModal({ isOpen: false, mode: 'add', category: 'exam', data: null })}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAssessment} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    المقرر التدريبي <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.courseCode}
                    onChange={(e) => handleFormChange('courseCode', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
                  >
                    {AVAILABLE_COURSES.map((course) => (
                      <option key={course.id} value={course.code}>
                        {course.name} ({course.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم التقييم التلقائي
                  </label>
                  <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-brand-purpleDark flex items-center justify-between">
                    <span>التقييم رقم: {formData.assessmentNumber}</span>
                    <span className="text-[10px] text-slate-500 font-sans">توليد تسلسلي آلي</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  عنوان التقييم <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  placeholder="مثال: الاختبار النصفي - تصميم وبرمجة واجهات الويب"
                  className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 ${
                    formErrors.title ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-brand-purpleDark/20'
                  }`}
                />
                {formErrors.title && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formErrors.title}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assessmentModal.category === 'exam' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      نوع الاختبار
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleFormChange('type', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
                    >
                      <option value="midterm">اختبار نصفي (الحد الأقصى: 30 درجة)</option>
                      <option value="final">اختبار نهائي (الحد الأقصى: 50 درجة)</option>
                      <option value="quiz">اختبار قصير (الحد الأقصى: 15 درجة)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      تصنيف الواجب
                    </label>
                    <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
                      واجب تدريبي وتطبيقي (الحد الأقصى: 10 درجات)
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      الدرجة القصوى <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">
                      الحد الأقصى للنظام: {GRADE_LIMITS[formData.type]?.max || 10}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={formData.score}
                    onChange={(e) => handleFormChange('score', e.target.value)}
                    min={GRADE_LIMITS[formData.type]?.min || 1}
                    max={GRADE_LIMITS[formData.type]?.max || 10}
                    className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 ${
                      formErrors.score ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-200' : 'border-slate-300 focus:ring-brand-purpleDark/20'
                    }`}
                  />
                  {formErrors.score && (
                    <div className="p-2 mt-1.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-[11px] font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>{formErrors.score}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  الشعب المستهدفة <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {(AVAILABLE_COURSES.find((c) => c.code === formData.courseCode)?.sections || []).map((sec) => {
                    const isSelected = formData.sections.includes(sec);
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => toggleSectionSelection(sec)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-purpleDark text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {isSelected ? <CheckSquare className="w-3.5 h-3.5 text-brand-gold" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{sec}</span>
                      </button>
                    );
                  })}
                </div>
                {formErrors.sections && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{formErrors.sections}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    تاريخ ووقت البداية <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => handleFormChange('startDate', e.target.value)}
                    placeholder="2026-11-10 06:00 م"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    تاريخ ووقت النهاية <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => handleFormChange('endDate', e.target.value)}
                    placeholder="2026-11-10 07:30 م"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Clock className="w-4 h-4 text-brand-secondary" />
                  <h4 className="text-xs font-black text-brand-purpleDark">
                    إعدادات الاختبار المتقدمة ومؤشرات الجلسة
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      مدة الاختبار بالدقائق:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.durationMinutes}
                        onChange={(e) => handleFormChange('durationMinutes', e.target.value)}
                        min={5}
                        max={360}
                        className="w-28 p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-center"
                      />
                      <span className="text-xs text-slate-500">دقيقة مع عداد تنازلي نشط</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      عدد المحاولات المتاحة للمتدرب:
                    </label>
                    <select
                      value={formData.attemptsCount}
                      onChange={(e) => handleFormChange('attemptsCount', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                    >
                      <option value={1}>محاولة واحدة فقط (رسمية)</option>
                      <option value={2}>محاولتان (احتساب الدرجة الأعلى)</option>
                      <option value={3}>3 محاولات</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.autoSubmit}
                      onChange={(e) => handleFormChange('autoSubmit', e.target.checked)}
                      className="w-4 h-4 rounded text-brand-purpleDark focus:ring-brand-purpleDark"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">التسليم التلقائي</span>
                      <span className="text-[10px] text-slate-500">عند نهاية الوقت آلياً</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.instantSave}
                      onChange={(e) => handleFormChange('instantSave', e.target.checked)}
                      className="w-4 h-4 rounded text-brand-purpleDark focus:ring-brand-purpleDark"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">حفظ لحظي للإجابة</span>
                      <span className="text-[10px] text-slate-500">فورية عند النقر</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.shuffleQuestions}
                      onChange={(e) => handleFormChange('shuffleQuestions', e.target.checked)}
                      className="w-4 h-4 rounded text-brand-purpleDark focus:ring-brand-purpleDark"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">خلط الأسئلة والخيارات</span>
                      <span className="text-[10px] text-slate-500">ترتيب عشوائي لكل متدرب</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-purpleDark" />
                    <h4 className="text-xs font-black text-brand-purpleDark">
                      اختيار الأسئلة من بنك الأسئلة المتاح ({activeQuestionsForForm.length} أسئلة متوفرة)
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectAllQuestions(activeQuestionsForForm)}
                    className="text-xs font-bold text-brand-secondary hover:underline cursor-pointer"
                  >
                    {activeQuestionsForForm.every((q) => formData.selectedQuestionIds.includes(q.id))
                      ? 'إلغاء تحديد الكل'
                      : 'تحديد كافة الأسئلة'}
                  </button>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  {activeQuestionsForForm.map((q) => {
                    const isChecked = formData.selectedQuestionIds.includes(q.id);
                    return (
                      <div
                        key={q.id}
                        onClick={() => toggleQuestionSelection(q.id)}
                        className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-brand-purpleDark/5 border-brand-purpleDark/40'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-brand-purpleDark" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{q.text}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500">
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold">{q.unit}</span>
                            <span>•</span>
                            <span>الصعوبة: {q.difficulty}</span>
                            <span>•</span>
                            <span className="font-bold text-emerald-700">
                              الإجابة النموذجية: {q.correctAnswer}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {formErrors.questions && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{formErrors.questions}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAssessmentModal({ isOpen: false, mode: 'add', category: 'exam', data: null })}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-purpleDark hover:bg-[#1f1b52] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>
                    {assessmentModal.mode === 'add' ? 'حفظ وإرسال للاعتماد' : 'تحديث التقييم وإرسال للاعتماد'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {duplicateModal.isOpen && duplicateModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-secondary/20 text-brand-purpleDark flex items-center justify-center">
                  <Copy className="w-4 h-4 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-purpleDark">
                    تكرار {duplicateModal.category === 'exam' ? 'الاختبار' : 'الواجب'} لشعب جديدة
                  </h3>
                  <p className="text-[11px] text-slate-500">إنشاء نسخة مطابقة للشعب الموازية</p>
                </div>
              </div>
              <button
                onClick={() => setDuplicateModal({ isOpen: false, item: null, category: 'exam', selectedSections: [], newStartDate: '', newEndDate: '' })}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-brand-purpleDark/5 rounded-2xl border border-brand-purpleDark/15 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block">التقييم الأصلي:</span>
              <p className="text-xs font-black text-brand-purpleDark">{duplicateModal.item.title}</p>
              <div className="flex items-center gap-3 text-[11px] text-slate-600 pt-1 font-medium">
                <span>المقرر: {duplicateModal.item.courseName}</span>
                <span>•</span>
                <span>الدرجة: {duplicateModal.item.score}</span>
                <span>•</span>
                <span>الشعب الحالية: {duplicateModal.item.sections.join('، ')}</span>
              </div>
            </div>

            <form onSubmit={handleConfirmDuplicate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  اختر الشعبة / الشعب الجديدة المستهدفة: <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {(AVAILABLE_COURSES.find((c) => c.code === duplicateModal.item.courseCode)?.sections || []).map((sec) => {
                    const isSelected = duplicateModal.selectedSections.includes(sec);
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => {
                          setDuplicateModal((prev) => {
                            const exists = prev.selectedSections.includes(sec);
                            const updated = exists
                              ? prev.selectedSections.filter((s) => s !== sec)
                              : [...prev.selectedSections, sec];
                            return { ...prev, selectedSections: updated };
                          });
                        }}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-purpleDark text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-300'
                        }`}
                      >
                        {isSelected ? <CheckSquare className="w-3.5 h-3.5 text-brand-gold" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{sec}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    تاريخ ووقت البداية الجديد:
                  </label>
                  <input
                    type="text"
                    value={duplicateModal.newStartDate}
                    onChange={(e) => setDuplicateModal((prev) => ({ ...prev, newStartDate: e.target.value }))}
                    placeholder="2026-11-15 06:00 م"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    تاريخ ووقت النهاية الجديد:
                  </label>
                  <input
                    type="text"
                    value={duplicateModal.newEndDate}
                    onChange={(e) => setDuplicateModal((prev) => ({ ...prev, newEndDate: e.target.value }))}
                    placeholder="2026-11-15 07:30 م"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purpleDark/20"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  سيتم إنشاء نسخة جديدة مطابقة بنفس بنك الأسئلة والدرجة وإعدادات الوقت، وسيتم إسناد حالة التقييم الجديد تلقائياً إلى <strong>«بانتظار الاعتماد»</strong>.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDuplicateModal({ isOpen: false, item: null, category: 'exam', selectedSections: [], newStartDate: '', newEndDate: '' })}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-secondary hover:bg-brand-gold text-brand-purpleDark text-xs font-black transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>إضافة وتكرار التقييم</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewQuestionsModal.isOpen && previewQuestionsModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Eye className="w-5 h-5 text-brand-purpleDark" />
                <div>
                  <h3 className="text-base font-black text-brand-purpleDark">
                    معاينة أسئلة التقييم ({previewQuestionsModal.item.title})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {previewQuestionsModal.item.courseName} • الدرجة الإجمالية:{' '}
                    {previewQuestionsModal.item.score}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewQuestionsModal({ isOpen: false, item: null })}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 p-1">
              {(
                QUESTION_BANK[previewQuestionsModal.item.courseCode]?.filter((q) =>
                  previewQuestionsModal.item.selectedQuestionIds?.includes(q.id)
                ) || []
              ).map((q, index) => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-brand-purpleDark">السؤال #{index + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-white text-[10px] font-bold text-slate-600 border border-slate-200">
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{q.text}</p>
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-lg text-[11px] font-medium border ${
                            opt === q.correctAnswer
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                              : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {opt} {opt === q.correctAnswer && '✓ (نموذجية)'}
                        </div>
                      ))}
                    </div>
                  )}
                  {q.type === 'short' && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
                      <span className="font-bold block mb-0.5">الإجابة النموذجية المعتمدة:</span>
                      <span>{q.correctAnswer}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPreviewQuestionsModal({ isOpen: false, item: null })}
                className="px-5 py-2 bg-brand-purpleDark text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
