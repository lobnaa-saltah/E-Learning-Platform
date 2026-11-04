import React, { useState, useRef, useEffect } from 'react';
import { 
  HelpCircle, 
  Video, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Tag, 
  Paperclip, 
  UploadCloud,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Headphones,
  Play,
  GraduationCap,
  FileCheck,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { TraineePageHeader } from './TraineePageHeader';

const COMPLAINT_TYPES = [
  {
    id: 'virtual-class',
    label: 'شكوى فنية في القاعات الافتراضية',
    desc: 'مشاكل البث المباشر، انقطاع الصوت أو الميكروفون',
    icon: Video,
  },
  {
    id: 'transcript',
    label: 'استفسار حول السجل والدرجات',
    desc: 'متابعة المعدل الفصلي والتراكمي واعتماد المواد',
    icon: GraduationCap,
  },
  {
    id: 'exam-assignment',
    label: 'اعتراض على تقييم واجب أو اختبار',
    desc: 'مراجعة التصحيح أو إعادة النظر في نتيجة تقييم',
    icon: FileCheck,
  },
  {
    id: 'digital-content',
    label: 'مشكلة في المحتوى الرقمي والمصادر',
    desc: 'صعوبة فتح الملفات، الحقائب التدريبية أو الروابط',
    icon: BookOpen,
  },
  {
    id: 'improvement',
    label: 'اقتراح تطويري للخدمات التدريبية',
    desc: 'أفكار ومقترحات لتحسين تجربة المتدرب والمنصة',
    icon: Sparkles,
  },
];

export const TraineeSupport = () => {
  const [activeTab, setActiveTab] = useState('lectures');
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [complaintType, setComplaintType] = useState('شكوى فنية في القاعات الافتراضية');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [complaintSubject, setComplaintSubject] = useState('');
  const [complaintDetails, setComplaintDetails] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');
  const [copiedText, setCopiedText] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const guideTabs = [
    { id: 'lectures', label: 'الدخول للمحاضرات' },
    { id: 'exams', label: 'الدخول للاختبارات' },
    { id: 'assignments', label: 'تسليم الواجبات' },
    { id: 'payments', label: 'طريقة سداد الأقساط' },
    { id: 'complaints', label: 'الشكاوى والمقترحات' },
    { id: 'contact', label: 'اتصل بنا' },
  ];

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="أدلة الاستخدام والدعم الفني"
        title="مركز الدعم والمساعدة الإرشادي"
        subtitle="شروحات مرئية لطريقة استخدام أدوات المنصة، ورفع الشكاوى والتواصل المباشر مع إدارة المعهد"
        icon={HelpCircle}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
        {guideTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center cursor-pointer ${
              activeTab === tab.id
                ? 'bg-navy-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-6">
        {activeTab === 'lectures' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                <Video className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-brand-purpleDark text-base">دليل الانضمام للمحاضرات المباشرة والقاعات الافتراضية</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  شاهد هذا المقطع التوضيحي لمعرفة كيفية الدخول إلى قاعات البث المباشر وتفعيل الميكروفون
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto aspect-video bg-gradient-to-br from-brand-purpleDark via-navy-950 to-slate-900 rounded-2xl flex flex-col items-center justify-center p-5 text-white text-center relative border border-white/10 shadow-lg group hover:border-brand-gold/40 transition-all">
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-2.5 py-0.5 rounded-lg">
                شرح مرئي
              </span>
              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-purpleDark transition-all shadow-md mb-2 cursor-pointer">
                <Play className="w-5 h-5 fill-current mr-0.5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white max-w-xs">الدخول والمشاركة في المحاضرة الافتراضية</p>
              <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold bg-black/60 px-2 py-0.5 rounded-md text-slate-300">
                3:45 دقيقة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">1. الدخول المبكر</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">الانضمام قبل الموعد بـ 5 دقائق للتحقق من الاتصال</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">2. إعداد الصوت</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">تفعيل الميكروفون عند طلب الإذن بالمشاركة</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">3. التفاعل المباشر</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">استخدام الشات ورفع اليد للتواصل مع المدرب</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                <Video className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-brand-purpleDark text-base">دليل أداء الاختبارات الإلكترونية المعتمدة</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  يوضح هذا الشرح آلية الحفظ التلقائي للإجابات والتعامل مع انقطاع الاتصال وضوابط العداد
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto aspect-video bg-gradient-to-br from-brand-purpleDark via-navy-950 to-slate-900 rounded-2xl flex flex-col items-center justify-center p-5 text-white text-center relative border border-white/10 shadow-lg group hover:border-brand-gold/40 transition-all">
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-2.5 py-0.5 rounded-lg">
                شرح مرئي
              </span>
              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-purpleDark transition-all shadow-md mb-2 cursor-pointer">
                <Play className="w-5 h-5 fill-current mr-0.5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white max-w-xs">التعامل مع شاشة الاختبارات والعداد التنازلي</p>
              <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold bg-black/60 px-2 py-0.5 rounded-md text-slate-300">
                2:50 دقيقة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">1. استقرار الاتصال</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">التأكد من شبكة الإنترنت قبل بدء محاولة الاختبار</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">2. الحفظ التلقائي</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">تُحفظ الإجابات آلياً عند التنقل بين الأسئلة</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">3. التسليم النهائي</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">مراجعة كامل الأسئلة قبل تأكيد التسليم</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                <Video className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-brand-purpleDark text-base">دليل رفع وتسليم الواجبات</h3>
                <p className="text-xs text-slate-500 mt-0.5">خطوات إرفاق الملفات والحلول والتحقق من اعتماد التسليم</p>
              </div>
            </div>

            <div className="max-w-md mx-auto aspect-video bg-gradient-to-br from-brand-purpleDark via-navy-950 to-slate-900 rounded-2xl flex flex-col items-center justify-center p-5 text-white text-center relative border border-white/10 shadow-lg group hover:border-brand-gold/40 transition-all">
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-2.5 py-0.5 rounded-lg">
                شرح مرئي
              </span>
              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-purpleDark transition-all shadow-md mb-2 cursor-pointer">
                <Play className="w-5 h-5 fill-current mr-0.5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white max-w-xs">رفع ملفات الحلول والتحقق من الاعتماد</p>
              <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold bg-black/60 px-2 py-0.5 rounded-md text-slate-300">
                3:10 دقائق
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">1. مطابقة المتطلبات</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">مراجعة صيغة الملف المطلوبة قبل رفعه</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">2. إرفاق الملف</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">رفع الملف مع إضافة أي ملاحظات للمدرب</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">3. إشعار التسليم</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">التأكد من تحول الحالة إلى "مسلّم"</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                <Video className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-brand-purpleDark text-base">دليل سداد الأقساط وطباعة الفواتير</h3>
                <p className="text-xs text-slate-500 mt-0.5">بوابات الدفع الإلكتروني المعتمدة وفك حجب السجل التدريبي</p>
              </div>
            </div>

            <div className="max-w-md mx-auto aspect-video bg-gradient-to-br from-brand-purpleDark via-navy-950 to-slate-900 rounded-2xl flex flex-col items-center justify-center p-5 text-white text-center relative border border-white/10 shadow-lg group hover:border-brand-gold/40 transition-all">
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-2.5 py-0.5 rounded-lg">
                شرح مرئي
              </span>
              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-purpleDark transition-all shadow-md mb-2 cursor-pointer">
                <Play className="w-5 h-5 fill-current mr-0.5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white max-w-xs">بوابات الدفع الإلكتروني وفك حجب السجل التدريبي</p>
              <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold bg-black/60 px-2 py-0.5 rounded-md text-slate-300">
                2:20 دقيقة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">1. اختيار الفاتورة</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">تحديد القسط المستحق من الشؤون المالية</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">2. السداد الآمن</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">الدفع عبر مدى أو فيزا أو نظام سداد</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-right">
                <span className="font-bold text-brand-purpleDark block">3. الفك الفوري</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">فك حجب السجل التدريبي يتم فورياً وتلقائياً</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="max-w-2xl mx-auto space-y-6 py-2">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-purpleDark/5 border border-brand-purpleDark/10 text-brand-purpleDark text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>استقبال مباشر للبلاغات • معالجة رسمية خلال 24 ساعة</span>
              </div>
              <h3 className="text-xl font-black text-brand-purpleDark">بوابة البلاغات والمقترحات الأكاديمية</h3>
              <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
                تُحال رسالتك آلياً إلى وحدة الجودة وشؤون المتدربين للمتابعة واتخاذ الإجراء اللازم بسرية تامة وتوثيق رسمي.
              </p>
            </div>

            {complaintSubmitted ? (
              <div className="p-7 sm:p-8 bg-white border border-emerald-200/90 rounded-3xl text-center space-y-4 shadow-card">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-lg">
                    تم تسجيل البلاغ بنجاح
                  </span>
                  <h4 className="font-black text-brand-purpleDark text-lg mt-3">
                    الرقم المرجعي للبلاغ: <span className="font-mono text-emerald-700">CMP-2026-8921</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                    تم تحويل البلاغ إلى الشؤون الأكاديمية وفريق الدعم الفني، وسيتم الرد عليك عبر البريد الإلكتروني وصندوق الرسائل بالمنصة خلال 24 ساعة كحد أقصى.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-xs text-right space-y-2">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>التصنيف:</span>
                    <strong className="text-brand-purpleDark">{complaintType}</strong>
                  </div>
                  {complaintSubject && (
                    <div className="flex justify-between items-center text-slate-500">
                      <span>الموضوع:</span>
                      <strong className="text-slate-800">{complaintSubject}</strong>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setComplaintSubmitted(false);
                      setComplaintSubject('');
                      setComplaintDetails('');
                      setAttachedFileName('');
                    }}
                    className="px-6 py-2.5 bg-brand-purpleDark hover:bg-[#352F7F] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    تقديم بلاغ أو مقترح آخر
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setComplaintSubmitted(true);
                }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 space-y-5"
              >
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-bold text-brand-purpleDark">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-brand-gold" />
                      <span>نوع البلاغ أو التصنيف</span>
                    </span>
                    <span className="text-[10px] text-brand-primary bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60 font-semibold">
                      إلزامي
                    </span>
                  </label>

                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full flex items-center justify-between pr-3.5 pl-4 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                        isDropdownOpen
                          ? 'border-brand-primary ring-4 ring-brand-primary/10 bg-white shadow-sm'
                          : 'border-slate-200/90 bg-slate-50/80 hover:bg-white text-brand-purpleDark'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {(() => {
                          const current = COMPLAINT_TYPES.find((c) => c.label === complaintType) || COMPLAINT_TYPES[0];
                          const IconComponent = current.icon;
                          return (
                            <>
                              <div className="w-7 h-7 rounded-lg bg-brand-purpleDark/10 text-brand-purpleDark flex items-center justify-center shrink-0">
                                <IconComponent className="w-4 h-4 text-brand-gold" />
                              </div>
                              <span className="truncate">{current.label}</span>
                            </>
                          );
                        })()}
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 text-brand-purpleDark/70 transition-transform duration-200 shrink-0 ${
                          isDropdownOpen ? 'rotate-180 text-brand-primary' : ''
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-30 mt-2 w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-1.5 animate-in fade-in zoom-in-95 duration-150">
                        {COMPLAINT_TYPES.map((type) => {
                          const IconComponent = type.icon;
                          const isSelected = complaintType === type.label;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => {
                                setComplaintType(type.label);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-right transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-brand-purpleDark text-white shadow-2xs font-bold'
                                  : 'hover:bg-purple-50/70 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? 'bg-white/15 text-brand-gold'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <span className="block text-xs font-bold truncate">{type.label}</span>
                                  <span
                                    className={`block text-[10px] mt-0.5 truncate ${
                                      isSelected ? 'text-slate-200' : 'text-slate-400'
                                    }`}
                                  >
                                    {type.desc}
                                  </span>
                                </div>
                              </div>

                              {isSelected && (
                                <Check className="w-4 h-4 text-brand-gold shrink-0 mr-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-brand-purpleDark">
                    موضوع البلاغ / العنوان المختصر
                  </label>
                  <input
                    type="text"
                    required
                    value={complaintSubject}
                    onChange={(e) => setComplaintSubject(e.target.value)}
                    placeholder="مثال: تعذر الدخول لمحاضرة مقرر قواعد البيانات اليوم..."
                    className="w-full text-xs p-3 border border-slate-200/90 rounded-xl bg-slate-50/80 hover:bg-white focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center justify-between text-xs font-bold text-brand-purpleDark">
                    <span>تفاصيل الشكوى أو المقترح</span>
                    <span className="text-[10px] text-slate-400 font-normal">يرجى توضيح التفاصيل بدقة</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={complaintDetails}
                    onChange={(e) => setComplaintDetails(e.target.value)}
                    placeholder="اشرح المشكلة بالتفصيل، مع ذكر اسم المقرر، والتاريخ أو التوقيت لمساعدتنا في معالجتها سريعاً..."
                    className="w-full text-xs p-3.5 border border-slate-200/90 rounded-2xl bg-slate-50/80 hover:bg-white focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center justify-between text-xs font-bold text-brand-purpleDark">
                    <span className="flex items-center gap-1.5">
                      <Paperclip className="w-4 h-4 text-brand-gold" />
                      <span>المرفقات الداعمة (اختياري)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">PNG, JPG, PDF (الحد 10 ميجا)</span>
                  </label>

                  <label className="p-3.5 border-2 border-dashed border-slate-200 hover:border-brand-primary/50 bg-slate-50/50 hover:bg-purple-50/20 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                        <UploadCloud className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-700 block">
                          {attachedFileName ? attachedFileName : 'إرفاق لقطة شاشة أو ملف داعم'}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {attachedFileName ? 'تم اختيار الملف بنجاح' : 'اضغط لاختيار ملف من جهازك'}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-brand-primary bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      استعراض
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setAttachedFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>تخضع جميع البلاغات لسرية تامة وتدقيق الجودة</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 bg-brand-purpleDark hover:bg-[#352F7F] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-purpleDark/20 hover:scale-[1.01] cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-brand-gold" />
                    <span>إرسال البلاغ الآن</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto space-y-4 py-1">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>فريق الدعم متاح لخدمتكم</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800">قنوات التواصل المباشر</h3>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                نسعد بالرد على استفساراتكم ومساندتكم عبر القنوات الرسمية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-brand-purpleDark border border-purple-100 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 text-brand-purpleDark" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">مركز الاتصال الموحد</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-0.5">9200 12345</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">خدمة الرد الآلي والمحادثة المباشرة</p>
                  </div>
                </div>

                <div className="pt-2.5 flex items-center gap-1.5 border-t border-slate-100">
                  <a
                    href="tel:920012345"
                    className="flex-1 py-1.5 px-3 bg-brand-purpleDark hover:bg-[#352F7F] text-white text-xs font-semibold rounded-lg text-center transition-colors"
                  >
                    اتصال فوري
                  </a>
                  <button
                    onClick={() => handleCopy('920012345', 'phone')}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    title="نسخ الرقم"
                  >
                    {copiedText === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">واتساب الدعم السريع</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-0.5 dir-ltr text-right">+966 50 123 4567</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">محادثة نصية ومتابعة البلاغات</p>
                  </div>
                </div>

                <div className="pt-2.5 flex items-center gap-1.5 border-t border-slate-100">
                  <a
                    href="https://wa.me/966501234567"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>محادثة واتساب</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy('+966501234567', 'whatsapp')}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    title="نسخ الرقم"
                  >
                    {copiedText === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">البريد الإلكتروني الرسمي</span>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 mt-0.5 break-all">support@uq-institute.edu.sa</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">للمراسلات الرسمية والطلبات الأكاديمية</p>
                  </div>
                </div>

                <div className="pt-2.5 flex items-center gap-1.5 border-t border-slate-100">
                  <a
                    href="mailto:support@uq-institute.edu.sa"
                    className="flex-1 py-1.5 px-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-semibold rounded-lg text-center shadow-xs transition-colors"
                  >
                    إرسال بريد
                  </a>
                  <button
                    onClick={() => handleCopy('support@uq-institute.edu.sa', 'email')}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    title="نسخ البريد"
                  >
                    {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/70 flex items-center justify-center shrink-0 shadow-2xs text-slate-600">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block text-xs">المقر الرئيسي</span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">مكة المكرمة - العزيزية</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/70 flex items-center justify-center shrink-0 shadow-2xs text-slate-600">
                  <Clock className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block text-xs">ساعات العمل</span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">الأحد - الخميس: 8:00 ص - 4:00 م</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/70 flex items-center justify-center shrink-0 shadow-2xs text-slate-600">
                  <Headphones className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block text-xs">الدعم المسائي</span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">متاح حتى نهاية المحاضرات</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
