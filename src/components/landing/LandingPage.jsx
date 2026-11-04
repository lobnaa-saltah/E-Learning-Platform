import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  ArrowLeft, 
  Video, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  FileCheck, 
  ExternalLink,
  MapPin,
  LogIn,
  X
} from 'lucide-react';
import logoImg from '../../assets/logoUmmAlqura_white.png';
import logoInstitute2 from '../../assets/logoUmmAlqura2.png';
import vision2030Img from '../../assets/vision2030.jpg';
import missionTrainingImg from '../../assets/missionTraining.jpg';
import campusesInstituteImg from '../../assets/campusesInstitute.jpg';
import { GraduateParticleHero } from './GraduateParticleHero';
import { FeaturesBubbleCanvas } from './FeaturesBubbleCanvas';

export const LandingPage = ({ onEnterPortal, onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navSections = [
    { id: 'about', label: 'عن المعهد', href: '#about' },
    { id: 'stats', label: 'أرقام وإنجازات', href: '#institute-stats' },
    { id: 'vision-mission', label: 'الرؤية والرسالة', href: '#vision-mission' },
    { id: 'features', label: 'مميزات المنصة', href: '#features' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineSteps = [
    {
      step: '1',
      title: 'قاعات افتراضية ذكية ومباشرة',
      description: 'بث تدريبي تفاعلي فائق الجودة يدعم تقنيات BigBlueButton و plugNmeet مع غرف نقاش وسبورة تفاعلية.',
      badge: 'الخطوة 01',
      tag: 'بث تفاعلي حي',
      icon: <Video className="w-3.5 h-3.5 text-slate-300" />,
    },
    {
      step: '2',
      title: 'أرشيف سحابي للمحاضرات المسجلة',
      description: 'إتاحة تسجيلات المحاضرات المنعقدة تلقائياً بجودة 1080p لمدة 30 يوماً للمراجعة والاستذكار في أي وقت.',
      badge: 'الخطوة 02',
      tag: 'سحابي بجودة 1080p',
      icon: <Clock className="w-3.5 h-3.5 text-slate-300" />,
    },
    {
      step: '3',
      title: 'اختبارات مراقبة وتقييم فوري',
      description: 'بنك أسئلة معياري مع حفظ تلقائي فوري للإجابات لحمايتك من انقطاع الاتصال ورصد آلي للدرجات.',
      badge: 'الخطوة 03',
      tag: 'حفظ آمن ورصد ذكي',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />,
    },
    {
      step: '4',
      title: 'سجل تدريبي ومالي موحد',
      description: 'متابعة الخطط الدراسية، كشوف الدرجات المعتمدة، وسداد الأقساط وفواتير ضريبية صادرة إلكترونياً.',
      badge: 'الخطوة 04',
      tag: 'إدارة تدريبية موحدة',
      icon: <FileCheck className="w-3.5 h-3.5 text-slate-300" />,
    },
    {
      step: '5',
      title: 'شهادات معتمدة وتوثيق TVTC',
      description: 'إصدار شهادات مهنية موثقة إلكترونياً برمز تحقق QR معتمد رسمياً من المؤسسة العامة للتدريب التقني.',
      badge: 'الخطوة 05',
      tag: 'اعتماد رسمي وموثق',
      icon: <Award className="w-3.5 h-3.5 text-slate-300" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#EAE4F6] text-brand-purpleDark flex flex-col font-sans selection:bg-brand-secondary/30 relative">
      <header
        className={`fixed top-0 left-0 right-0 z-40 text-white transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-purpleDark/95 backdrop-blur-md border-b border-navy-950/80 shadow-elevated py-0'
            : 'bg-transparent border-b border-transparent shadow-none py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="معهد أم القرى العالي للتدريب"
                className="h-8 sm:h-9 w-auto object-contain hover:scale-105 transition-transform cursor-pointer"
              />
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-200">
              <a href="#about" className="hover:text-brand-gold transition-colors flex items-center gap-1">
                <span>عن المعهد</span>
              </a>
              <a href="#institute-stats" className="hover:text-brand-gold transition-colors">
                <span>إنجازاتنا</span>
              </a>
              <a href="#vision-mission" className="hover:text-brand-gold transition-colors">
                <span>رسالتنا</span>
              </a>
              <a href="#features" className="hover:text-brand-gold transition-colors">المميزات</a>
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onEnterPortal}
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 hover:border-brand-gold/40 text-white font-bold text-xs transition-all border border-white/15 cursor-pointer hover:scale-105 shadow-sm"
              >
                <span>تسجيل الدخول</span>
                <LogIn className="w-3.5 h-3.5 text-brand-gold" />
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex lg:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white items-center justify-center transition-all cursor-pointer shadow-md"
                aria-label="القائمة الرئيسية"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-brand-orange" />
                ) : (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="15" y2="12" />
                    <line x1="4" y1="17" x2="10" y2="17" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 lg:hidden bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[calc(100%+8px)] left-4 right-4 sm:left-6 sm:right-6 max-w-md mx-auto bg-gradient-to-b from-[#18123B]/98 via-[#1E174A]/98 to-[#0E0A24]/98 backdrop-blur-2xl border border-brand-gold/30 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              {navSections.map((sec) => (
                <a
                  key={sec.id}
                  href={sec.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center justify-between py-3 px-3.5 rounded-2xl hover:bg-white/10 transition-all text-slate-100 hover:text-brand-gold border-b border-white/5 last:border-b-0"
                >
                  <span className="text-sm font-bold tracking-wide">{sec.label}</span>
                  <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-brand-gold group-hover:-translate-x-1.5 transition-all" />
                </a>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onEnterPortal();
                }}
                className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-brand-gold/50 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تسجيل الدخول</span>
                <LogIn className="w-4 h-4 text-brand-gold" />
              </button>
            </div>
          </div>
        )}
      </header>

      <GraduateParticleHero
        onEnterPortal={onEnterPortal}
        onOpenRegister={onOpenRegister}
      />

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10 scroll-mt-24 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-transparent border border-brand-secondary/40 hover:border-brand-secondary/70 text-brand-secondary text-xs font-black transition-all">
            <Sparkles className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
            <span>نبذة عن الصرح التدريبي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-purpleDark tracking-tight">
            معهد أم القرى العالي للتدريب
          </h2>
          <p className="text-xs sm:text-sm text-brand-textLight max-w-2xl mx-auto leading-relaxed">
            ثلاثون عاماً من الريادة والتميز في تأهيل الكفاءات وتطوير المهارات، معتمدون رسمياً من المؤسسة العامة للتدريب التقني والمهني
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-gradient-to-br from-[#18143d] via-[#241f5a] to-[#342e78] rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-card flex flex-col items-center justify-between relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/25 transition-all duration-500" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between w-full relative z-10 border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold text-brand-gold bg-brand-gold/15 px-3 py-1 rounded-md border border-brand-gold/30">
                تأسس عام 1996م
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-200 bg-white/10 px-3 py-1 rounded-md border border-white/15 shadow-xs backdrop-blur-xs">
                <Award className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>خبرة 30 عاماً</span>
              </span>
            </div>

            <div className="py-6 flex items-center justify-center relative z-10">
              <img
                src={logoInstitute2}
                alt="شعار معهد أم القرى العالي للتدريب"
                className="w-full max-w-[240px] sm:max-w-[270px] h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="pt-4 border-t border-white/10 w-full text-center relative z-10 space-y-2.5">
              <div className="text-xs font-black text-brand-gold">
                الصرح التدريبي الرائد بالمملكة
              </div>
              <div>
                <a
                  href="https://uqt.com.sa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-purpleDark text-white text-xs font-bold transition-all border border-white/15 hover:border-brand-gold shadow-sm group/btn"
                >
                  <span>زيارة الموقع الرسمي للمعهد</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-gold group-hover/btn:text-brand-purpleDark transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 max-w-[590px] py-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-orange/10 border border-brand-orange/40 text-xs font-bold text-amber-900 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0" />
                <span>ترخيص واعتماد المؤسسة العامة للتدريب التقني والمهني</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-brand-purpleDark tracking-tight leading-snug sm:whitespace-nowrap">
              مسيرة تدريب تصنع الكفاءات وتواكب رؤية 2030
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify [text-justify:inter-word]">
              يُعد <strong className="text-brand-purpleDark font-black">معهد أم القرى العالي للتدريب</strong> من الصروح الأكاديمية والمهنية الرائدة بالمملكة بخبرة تتجاوز ثلاثة عقود؛ نسعى لتمكين الكوادر الوطنية وسد الفجوة لمتطلبات سوق العمل، عبر دبلومات عليا وبرامج تدريبية معتمدة بمقراتنا في مكة المكرمة وجدة ومنظومة التدريب والتعليم عن بعد.
            </p>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-brand-purpleDark sm:whitespace-nowrap">
                <div className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>شهادات مهنية معتمدة رسمياً وموثقة من المؤسسة العامة للتدريب التقني والمهني</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-brand-purpleDark sm:whitespace-nowrap">
                <div className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>مقرات تدريب حديثة مجهزة بأعلى المعايير التدريبية للرجال والنساء بمكة وجدة</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-brand-purpleDark sm:whitespace-nowrap">
                <div className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>قاعات تدريب ذكية وبث تفاعلي مستمر مع نخبة من كبار المدربين المعتمدين</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="institute-stats" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8 relative z-10 scroll-mt-24">
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-transparent border border-brand-secondary/40 hover:border-brand-secondary/70 text-brand-secondary text-xs font-black transition-all">
            <Sparkles className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
            <span>إنجازات وأرقام قياسية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-purpleDark tracking-tight">
            أرقام وإنجازات تعكس تميزنا الأكاديمي
          </h2>
          <p className="text-xs sm:text-sm text-brand-textLight leading-relaxed">
            حقائق ومؤشرات أداء تؤكد ريادتنا في تأهيل وتدريب الكفاءات الوطنية لسوق العمل بالمملكة
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-brand-purpleDark rounded-2xl p-4 sm:p-5 border border-brand-purpleDark/80 shadow-md text-center space-y-1 hover:border-brand-gold/40 transition-all group">
            <div className="text-xl sm:text-2xl font-bold text-brand-gold tracking-tight">
              +30
            </div>
            <div className="text-xs font-medium text-slate-300">
              عاماً من الريادة والعطاء
            </div>
          </div>

          <div className="bg-brand-purpleDark rounded-2xl p-4 sm:p-5 border border-brand-purpleDark/80 shadow-md text-center space-y-1 hover:border-brand-gold/40 transition-all group">
            <div className="text-xl sm:text-2xl font-bold text-brand-gold tracking-tight">
              +3,000
            </div>
            <div className="text-xs font-medium text-slate-300">
              خريج وخريجة لسوق العمل
            </div>
          </div>

          <div className="bg-brand-purpleDark rounded-2xl p-4 sm:p-5 border border-brand-purpleDark/80 shadow-md text-center space-y-1 hover:border-brand-gold/40 transition-all group">
            <div className="text-xl sm:text-2xl font-bold text-brand-gold tracking-tight">
              100%
            </div>
            <div className="text-xs font-medium text-slate-300">
              برامج معتمدة من TVTC
            </div>
          </div>

          <div className="bg-brand-purpleDark rounded-2xl p-4 sm:p-5 border border-brand-purpleDark/80 shadow-md text-center space-y-1 hover:border-brand-gold/40 transition-all group">
            <div className="text-xl sm:text-2xl font-bold text-brand-gold tracking-tight">
              24/7
            </div>
            <div className="text-xs font-medium text-slate-300">
              منظومة تدريب تفاعلية ذكية
            </div>
          </div>
        </div>
      </section>

      <section id="vision-mission" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10 scroll-mt-24 relative z-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-transparent border border-brand-secondary/40 hover:border-brand-secondary/70 text-brand-secondary text-xs font-black transition-all">
            <Sparkles className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
            <span>الميثاق والتوجه الاستراتيجي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-purpleDark tracking-tight">
            رؤيتنا ورسالتنا نحو المستقبل
          </h2>
          <p className="text-xs sm:text-sm text-brand-textLight">
            مرتكزات انطلاقنا لتأهيل الكفاءات الوطنية وتحقيق التميز في التدريب المهني والتقني
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto w-full">
          <div data-interactive="true" className="relative rounded-[28px] overflow-hidden group h-[370px] sm:h-[390px] p-6 sm:p-7 flex flex-col justify-between items-center text-center border-2 border-emerald-500/40 hover:border-emerald-400 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
            <img
              src={vision2030Img}
              alt="رؤيتنا 2030"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06241b]/95 via-[#093528]/80 to-[#0A3D2E]/50 group-hover:via-[#093528]/70 transition-colors duration-500 pointer-events-none" />

            <div className="card-sheen-down" />

            <div className="relative z-10 pt-1">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/50 transition-all duration-300">
                <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
              </div>
            </div>

            <div className="relative z-10 space-y-2.5 my-auto pb-2">
              <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight">
                رؤيتنا 2030
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-100/90 leading-relaxed max-w-[94%] mx-auto">
                الريادة والتميز في تقديم برامج تدريبية وتأهيلية نوعية تُسهم في تمكين الكفاءات الوطنية وتحقيق التنمية المستدامة بالمملكة.
              </p>
            </div>
          </div>

          <div data-interactive="true" className="relative rounded-[28px] overflow-hidden group h-[370px] sm:h-[390px] p-6 sm:p-7 flex flex-col justify-between items-center text-center border-2 border-emerald-500/40 hover:border-emerald-400 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
            <img
              src={missionTrainingImg}
              alt="رسالتنا"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06241b]/95 via-[#093528]/80 to-[#0A3D2E]/50 group-hover:via-[#093528]/70 transition-colors duration-500 pointer-events-none" />

            <div className="card-sheen-down" />

            <div className="relative z-10 pt-1">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/50 transition-all duration-300">
                <BookOpen className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
              </div>
            </div>

            <div className="relative z-10 space-y-2.5 my-auto pb-2">
              <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight">
                رسالتنا
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-100/90 leading-relaxed max-w-[94%] mx-auto">
                تأهيل متدربين ومتدربات بمهارات عملية عالية ومعارف تقنية وإدارية حديثة تواكب سوق العمل وفق أعلى معايير الجودة والاعتماد.
              </p>
            </div>
          </div>

          <div data-interactive="true" className="relative rounded-[28px] overflow-hidden group h-[370px] sm:h-[390px] p-6 sm:p-7 flex flex-col justify-between items-center text-center border-2 border-emerald-500/40 hover:border-emerald-400 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
            <img
              src={campusesInstituteImg}
              alt="المقرات المعتمدة"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06241b]/95 via-[#093528]/80 to-[#0A3D2E]/50 group-hover:via-[#093528]/70 transition-colors duration-500 pointer-events-none" />

            <div className="card-sheen-down" />

            <div className="relative z-10 pt-1">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/50 transition-all duration-300">
                <MapPin className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
              </div>
            </div>

            <div className="relative z-10 space-y-2.5 my-auto pb-2">
              <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight">
                المقرات المعتمدة
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-100/90 leading-relaxed max-w-[94%] mx-auto">
                مقرات تدريب ذكية ومجهزة بأعلى المعايير في مكة المكرمة وجدة، مع منظومة تعليم وتدريب إلكتروني متطورة لكافة أنحاء المملكة.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B091E] via-[#120E2E] to-[#0A071A] text-white relative z-10 overflow-hidden border-y border-white/10 scroll-mt-20">
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-brand-primary/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-brand-secondary/15 rounded-full blur-[120px] pointer-events-none" />
        <FeaturesBubbleCanvas />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-transparent border border-brand-secondary/40 hover:border-brand-secondary/70 text-brand-secondary text-xs font-black transition-all">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
              <span>المعايير المعتمدة والتقنيات الذكية</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              مميزات منصة التعليم عن بعد
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-300/90 max-w-xl mx-auto leading-relaxed">
              منظومة تدريبية متكاملة مصممة وفق معايير التدريب الإلكتروني بالمملكة، ترافقك بسلاسة في كل مرحلة من رحلتك
            </p>
          </div>

          <div className="hidden lg:block relative max-w-6xl mx-auto">
            <div className="absolute top-1/2 left-[8%] right-[8%] h-[2px] -translate-y-1/2 bg-indigo-500/35 shadow-[0_0_12px_rgba(99,102,241,0.5)] z-0 rounded-full pointer-events-none" />

            <div className="grid grid-cols-5 gap-3 relative z-10">
              {timelineSteps.map((item, idx) => {
                const isTop = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center group"
                  >
                    {isTop ? (
                      <>
                        <div className="h-[130px] w-full flex flex-col justify-end">
                          <div className="w-full max-w-[200px] mx-auto p-2.5 sm:p-3 rounded-xl bg-[#120D2C]/85 backdrop-blur-md border border-white/10 hover:border-indigo-400 transition-colors duration-200 text-center space-y-1.5">
                            <div className="flex items-center justify-between gap-1.5 border-b border-white/10 pb-1.5">
                              <span className="text-[9.5px] font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                                {item.badge}
                              </span>
                              <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                                {item.icon}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="text-[10px] sm:text-[10.5px] text-slate-300/75 leading-relaxed line-clamp-3">
                                {item.description}
                              </p>
                            </div>

                            <div className="pt-0.5">
                              <span className="inline-block text-[9px] font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                {item.tag}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="w-[1.5px] h-2.5 my-0.5 bg-indigo-400/40 shadow-[0_0_4px_rgba(99,102,241,0.4)] shrink-0" />

                        <div className="shrink-0 relative z-10">
                          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#5850EC] to-[#7E3AF2] shadow-[0_0_24px_rgba(99,102,241,0.55)] border border-white/50 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                            <span className="text-lg sm:text-xl font-bold text-white drop-shadow select-none">
                              {item.step}
                            </span>
                          </div>
                        </div>

                        <div className="w-[1.5px] h-2.5 my-0.5 opacity-0 shrink-0" />
                        <div className="h-[130px] w-full opacity-0 pointer-events-none" />
                      </>
                    ) : (
                      <>
                        <div className="h-[130px] w-full opacity-0 pointer-events-none" />
                        <div className="w-[1.5px] h-2.5 my-0.5 opacity-0 shrink-0" />

                        <div className="shrink-0 relative z-10">
                          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#5850EC] to-[#7E3AF2] shadow-[0_0_24px_rgba(99,102,241,0.55)] border border-white/50 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                            <span className="text-lg sm:text-xl font-bold text-white drop-shadow select-none">
                              {item.step}
                            </span>
                          </div>
                        </div>

                        <div className="w-[1.5px] h-2.5 my-0.5 bg-indigo-400/40 shadow-[0_0_4px_rgba(99,102,241,0.4)] shrink-0" />

                        <div className="h-[130px] w-full flex flex-col justify-start">
                          <div className="w-full max-w-[200px] mx-auto p-2.5 sm:p-3 rounded-xl bg-[#120D2C]/85 backdrop-blur-md border border-white/10 hover:border-indigo-400 transition-colors duration-200 text-center space-y-1.5">
                            <div className="flex items-center justify-between gap-1.5 border-b border-white/10 pb-1.5">
                              <span className="text-[9.5px] font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                                {item.badge}
                              </span>
                              <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                                {item.icon}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="text-[10px] sm:text-[10.5px] text-slate-300/75 leading-relaxed line-clamp-3">
                                {item.description}
                              </p>
                            </div>

                            <div className="pt-0.5">
                              <span className="inline-block text-[9px] font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                {item.tag}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden relative space-y-4 max-w-md mx-auto pr-2">
            <div className="absolute right-6 sm:right-7 top-5 bottom-5 w-[1.5px] bg-indigo-500/35 shadow-[0_0_8px_rgba(99,102,241,0.4)] z-0" />
            {timelineSteps.map((item, idx) => (
              <div
                key={idx}
                className="relative z-10 flex items-start gap-3.5 group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5850EC] to-[#7E3AF2] shadow-[0_0_20px_rgba(99,102,241,0.55)] border border-white/50 flex items-center justify-center shrink-0">
                  <span className="text-base sm:text-lg font-bold text-white drop-shadow select-none">
                    {item.step}
                  </span>
                </div>

                <div className="flex-1 rounded-2xl p-3 sm:p-3.5 bg-[#120D2C]/85 backdrop-blur-md border border-white/10 hover:border-indigo-400 transition-colors duration-200">
                  <div className="flex items-center justify-between gap-1.5 border-b border-white/10 pb-1.5 mb-1.5">
                    <span className="text-[9.5px] font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {item.badge}
                    </span>
                    <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[10.5px] text-slate-300/75 leading-relaxed mb-2">
                    {item.description}
                  </p>

                  <div>
                    <span className="inline-block text-[9px] font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A071A] via-[#120D2C] to-[#0D0922] text-white relative z-10 overflow-hidden border-t border-white/10">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-primary/20 rounded-3xl blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-secondary/15 rounded-3xl blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="relative rounded-3xl p-1 bg-gradient-to-br from-brand-secondary/40 via-white/15 to-indigo-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="rounded-[22px] bg-gradient-to-br from-[#18123B]/95 via-[#1E174A]/90 to-[#0F1B24]/95 backdrop-blur-2xl p-10 sm:p-14 relative overflow-hidden text-center space-y-6">
              
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-gold/15 rounded-3xl blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-secondary/20 rounded-3xl blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-brand-secondary/40 text-brand-secondary text-xs font-black shadow-sm">
                  <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
                  <span>بوابة التدريب والتعليم الإلكتروني المعتمدة 2026</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug sm:leading-tight">
                  جاهز لبدء{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold drop-shadow-sm">
                    رحلتك التدريبية معنا؟
                  </span>
                </h2>

                <p className="text-xs sm:text-sm lg:text-[15px] text-slate-300/90 leading-relaxed max-w-xl mx-auto">
                  سجّل دخولك الآن للوصول إلى لوحة التحكم الخاصة بك واستعراض المقررات والمحاضرات المباشرة.
                </p>

                <div className="pt-3 flex justify-center">
                  <button
                    onClick={onEnterPortal}
                    className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark font-black text-xs sm:text-sm shadow-xl hover:scale-105 hover:shadow-brand-secondary/30 transition-all cursor-pointer group"
                  >
                    <GraduationCap className="w-5 h-5 text-brand-purpleDark transition-transform group-hover:-rotate-12" />
                    <span>الدخول للمنصة التعليمية الآن</span>
                    <ArrowLeft className="w-4 h-4 text-brand-purpleDark transition-transform group-hover:-translate-x-1" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <footer className="bg-navy-950 text-white border-t border-white/10 py-8 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex items-center gap-2 text-center">
            <span className="font-bold text-brand-gold">معهد أم القرى العالي للتدريب</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">جميع الحقوق محفوظة © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
