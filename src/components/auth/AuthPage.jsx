import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  IdCard, 
  AlertCircle,
  Home,
  X
} from 'lucide-react';
import { ROLES, ACCOUNTS_CREDENTIALS } from '../../constants/mockData';
import logoWhite from '../../assets/logoUmmAlqura_white.png';

export const AuthPage = ({
  mode = 'login',
  onSwitchMode,
  onBackToLanding,
  onLoginSuccess,
  onRegisterSuccess,
  initialRole = ROLES.TRAINEE,
}) => {
  const [authMode, setAuthMode] = useState(mode);
  const [panelPosition, setPanelPosition] = useState(mode === 'login' ? 'start' : 'end');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    nationalId: '',
    phone: '',
    email: '',
    program: 'دبلوم تقنية المعلومات التطبيقي',
    password: '',
    confirmPassword: '',
    agreedToTerms: true,
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setAuthMode(mode);
    setPanelPosition(mode === 'login' ? 'start' : 'end');
    setIsForgotPassword(false);
    setResetSent(false);
    setErrorMessage('');
  }, [mode]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const id = loginForm.identifier.trim().toLowerCase();
    const pwd = loginForm.password.trim();

    if (!id || !pwd) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    const matchedAccount = ACCOUNTS_CREDENTIALS.find(
      (acc) =>
        (acc.email.toLowerCase() === id || (acc.alternateId && acc.alternateId.toLowerCase() === id)) &&
        acc.password === pwd
    );

    if (!matchedAccount) {
      setErrorMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة، يرجى التحقق من البيانات والمحاولة مجدداً');
      return;
    }

    setErrorMessage('');
    onLoginSuccess(matchedAccount.role, {
      identifier: id,
      role: matchedAccount.role,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.fullName.trim() || !registerForm.nationalId.trim() || !registerForm.email.trim()) {
      setErrorMessage('يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }
    if (registerForm.nationalId.length !== 10) {
      setErrorMessage('رقم الهوية الوطنية / الإقامة يجب أن يتكون من 10 أرقام');
      return;
    }
    if (registerForm.password && registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين');
      return;
    }

    onRegisterSuccess({
      name: registerForm.fullName,
      nationalId: registerForm.nationalId,
      phone: registerForm.phone,
      email: registerForm.email,
      program: registerForm.program,
      traineeId: '4450' + Math.floor(1000 + Math.random() * 9000),
      isEmailVerified: false,
    });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setResetSent(true);
  };

  const triggerSwitchMode = (targetMode) => {
    if (isAnimating || targetMode === authMode) return;
    setIsAnimating(true);
    setErrorMessage('');
    setIsForgotPassword(false);

    setPanelPosition('full');

    setTimeout(() => {
      setAuthMode(targetMode);
      setPanelPosition(targetMode === 'login' ? 'start' : 'end');

      if (onSwitchMode) {
        onSwitchMode(targetMode);
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, 380);
    }, 380);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B091E] via-[#140F35] to-[#0A071A] text-slate-800 flex flex-col font-sans relative overflow-x-hidden selection:bg-brand-secondary/30">
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-secondary/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30" />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-20">
        <div 
          className="w-full max-w-[900px] bg-white rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.65)] overflow-hidden relative border-0 outline-none min-h-[530px]"
          dir="ltr"
        >
          <button
            type="button"
            onClick={onBackToLanding}
            title="العودة للرئيسية"
            className="absolute top-[24px] md:top-[32px] lg:top-[36px] left-5 md:left-7 lg:left-8 z-30 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 text-brand-orange hover:text-brand-secondary transition-all duration-200 hover:scale-115 active:scale-90 cursor-pointer"
          >
            <X className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>

          <div className="hidden md:flex w-full h-[530px] relative">
            <div 
              className={`w-1/2 h-full p-7 lg:p-8 flex flex-col justify-center bg-white overflow-y-auto border-0 transition-opacity duration-300 ${
                authMode === 'register' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`} 
              dir="rtl"
            >
              <div className="space-y-3 my-auto">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-brand-purpleDark tracking-tight">
                    تسجيل متدرب جديد
                  </h3>
                  <p className="text-xs text-slate-500">
                    أنشئ حسابك الأكاديمي للالتحاق بالدبلومات المعتمدة
                  </p>
                </div>

                {errorMessage && authMode === 'register' && (
                  <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-[#FB5F5F] text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-2.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-brand-purpleDark">الاسم الرباعي (كما بالهوية):</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                        placeholder="مثال: تركي بن فهد الهذلي"
                        className="w-full text-xs font-bold pr-9 pl-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-secondary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brand-purpleDark">الهوية / الإقامة:</label>
                      <div className="relative">
                        <IdCard className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          maxLength={10}
                          value={registerForm.nationalId}
                          onChange={(e) => setRegisterForm({ ...registerForm, nationalId: e.target.value })}
                          placeholder="10 أرقام"
                          className="w-full text-xs font-bold pr-9 pl-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-secondary font-mono transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brand-purpleDark">رقم الجوال:</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                          placeholder="05XXXXXXXX"
                          className="w-full text-xs font-bold pr-9 pl-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-secondary font-mono transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-brand-purpleDark">البريد الإلكتروني:</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full text-xs font-bold pr-9 pl-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-secondary font-mono transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brand-purpleDark">كلمة المرور:</label>
                      <input
                        type="password"
                        required
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full text-xs font-bold p-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brand-purpleDark">تأكيد كلمة المرور:</label>
                      <input
                        type="password"
                        required
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        className="w-full text-xs font-bold p-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none pt-0.5">
                    <input
                      type="checkbox"
                      required
                      checked={registerForm.agreedToTerms}
                      onChange={(e) => setRegisterForm({ ...registerForm, agreedToTerms: e.target.checked })}
                      className="w-3.5 h-3.5 rounded text-brand-secondary focus:ring-0"
                    />
                    <span className="text-[10px] text-slate-600 font-medium">
                      أوافق على اللائحة التدريبية وشروط القبول بمعهد أم القرى
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark text-xs font-black shadow-md hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>إتمام التسجيل وبدء التدريب</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            <div 
              className={`w-1/2 h-full p-7 lg:p-8 flex flex-col justify-center bg-white overflow-y-auto border-0 transition-opacity duration-300 ${
                authMode === 'login' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`} 
              dir="rtl"
            >
              {isForgotPassword ? (
                <div className="space-y-4 my-auto">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-brand-purpleDark tracking-tight">
                      استعادة كلمة المرور
                    </h3>
                    <p className="text-xs text-slate-500">
                      أدخل رقم الهوية أو البريد المسجل لإرسال رابط التعيين
                    </p>
                  </div>

                  {resetSent ? (
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-emerald-900">تم إرسال رابط الاستعادة</h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        تم إرسال رمز التحقق ورابط تعيين كلمة المرور إلى البريد والجوال المسجلين.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(false);
                          setResetSent(false);
                        }}
                        className="mt-2 px-5 py-2 rounded-xl bg-brand-purpleDark text-white text-xs font-bold hover:bg-brand-primary transition-all cursor-pointer"
                      >
                        العودة لتسجيل الدخول
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handlePasswordReset} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-purpleDark">
                          رقم الهوية الوطنية أو البريد المسجل:
                        </label>
                        <div className="relative">
                          <IdCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="أدخل رقم الهوية أو البريد"
                            className="w-full text-xs font-bold pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-secondary transition-all"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark text-xs font-black shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                      >
                        إرسال رابط الاستعادة
                      </button>

                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => setIsForgotPassword(false)}
                          className="text-xs text-brand-primary font-bold hover:underline cursor-pointer"
                        >
                          الرجوع لتسجيل الدخول
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="space-y-5 my-auto max-w-[380px] w-full mx-auto">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-500/30 text-emerald-700 text-[11px] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>بوابة التدريب والتعليم الإلكتروني</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-brand-purpleDark tracking-tight">
                      تسجيل الدخول
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      أهلاً بك مجدداً، أدخل بيانات اعتمادك للوصول إلى لوحتك الأكاديمية
                    </p>
                  </div>

                  {errorMessage && authMode === 'login' && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[#FB5F5F] text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-purpleDark">
                        البريد الإلكتروني أو الرقم الأكاديمي:
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={loginForm.identifier}
                          onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                          placeholder="البريد الإلكتروني أو اسم المستخدم"
                          className="w-full text-xs font-bold pr-10 pl-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-secondary font-mono transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-brand-purpleDark">كلمة المرور:</label>
                        <button
                          type="button"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-[11px] text-brand-primary font-bold hover:underline cursor-pointer"
                        >
                          نسيت كلمة المرور؟
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="أدخل كلمة المرور"
                          className="w-full text-xs font-bold pr-10 pl-10 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-secondary transition-all shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-secondary focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs text-slate-600 font-medium">تذكرني</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark text-sm font-black shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>الدخول إلى المنصة التعليمية</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    </form>
                </div>
              )}
            </div>

            <div
              className={`hidden md:flex absolute top-0 bottom-0 h-full z-20 transition-all duration-380 ease-in-out overflow-hidden shadow-2xl border-0 outline-none ${
                panelPosition === 'start'
                  ? 'left-0 w-1/2 rounded-l-xl rounded-r-[45px]'
                  : panelPosition === 'full'
                  ? 'left-0 w-full rounded-xl'
                  : 'left-1/2 w-1/2 rounded-r-xl rounded-l-[45px]'
              }`}
              dir="rtl"
            >
              <div className={`w-full h-full bg-gradient-to-br from-[#120D2C] via-[#241F5A] to-[#0A3D2E] text-white p-7 lg:p-8 flex flex-col justify-between text-center relative overflow-hidden border-0 select-none ${
                panelPosition === 'start'
                  ? 'rounded-l-xl rounded-r-[45px]'
                  : panelPosition === 'full'
                  ? 'rounded-xl'
                  : 'rounded-r-xl rounded-l-[45px]'
              }`}>
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-gold/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-secondary/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <div className="flex items-center justify-center pt-1 relative z-10">
                  <img src={logoWhite} alt="معهد أم القرى" className="h-7 w-auto object-contain drop-shadow" />
                </div>

                <div className="relative z-10 my-auto py-2">
                  {authMode === 'login' ? (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="space-y-2 px-3">
                        <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight">
                          أهلاً بك في صرحك الأكاديمي
                        </h3>
                        <p className="text-xs text-slate-200/90 leading-relaxed max-w-sm mx-auto">
                          ليس لديك حساب تدريبي بعد؟ ابدأ رحلتك وسجل بياناتك للالتحاق بالدبلومات المعتمدة من المؤسسة العامة للتدريب التقني والمهني TVTC.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => triggerSwitchMode('register')}
                          className="group inline-flex items-center gap-2 px-7 py-2.5 rounded-xl border-2 border-brand-orange bg-brand-orange/10 hover:bg-brand-orange hover:border-brand-orange text-brand-orange hover:text-brand-purpleDark font-black text-xs transition-all duration-300 hover:scale-105 shadow-md active:scale-95 cursor-pointer"
                        >
                          <span>إنشاء حساب متدرب جديد</span>
                          <ArrowLeft className="w-3.5 h-3.5 text-brand-orange group-hover:text-brand-purpleDark transition-colors" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="space-y-2 px-3">
                        <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight">
                          لديك حساب تدريبي بالفعل؟
                        </h3>
                        <p className="text-xs text-slate-200/90 leading-relaxed max-w-sm mx-auto">
                          سجّل دخولك الآن للوصول المباشر إلى لوحة تحكمك الأكاديمية والمحاضرات المباشرة وجدول الاختبارات.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => triggerSwitchMode('login')}
                          className="group inline-flex items-center gap-2 px-7 py-2.5 rounded-xl border-2 border-brand-orange bg-brand-orange/10 hover:bg-brand-orange hover:border-brand-orange text-brand-orange hover:text-brand-purpleDark font-black text-xs transition-all duration-300 hover:scale-105 shadow-md active:scale-95 cursor-pointer"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-brand-orange group-hover:text-brand-purpleDark transition-colors" />
                          <span>تسجيل الدخول إلى حسابك</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 border-t border-white/10 pt-2.5 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="font-bold text-brand-gold">معهد أم القرى العالي للتدريب</span>
                  <span>اعتماد رسمي 1996م</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex flex-col w-full min-h-[580px] relative rounded-xl overflow-hidden bg-white">
            <div
              className={`absolute left-0 right-0 w-full z-20 transition-all duration-380 ease-in-out overflow-hidden shadow-2xl bg-gradient-to-br from-[#120D2C] via-[#241F5A] to-[#0A3D2E] text-white p-5 flex flex-col justify-between text-center select-none ${
                panelPosition === 'start'
                  ? 'top-0 h-[210px] rounded-t-xl rounded-b-[36px]'
                  : panelPosition === 'full'
                  ? 'top-0 h-full rounded-xl'
                  : 'top-[calc(100%-210px)] h-[210px] rounded-b-xl rounded-t-[36px]'
              }`}
              dir="rtl"
            >
              <div className="flex items-center justify-center pt-1 relative z-10">
                <img src={logoWhite} alt="معهد أم القرى" className="h-6 w-auto object-contain" />
              </div>

              <div className="my-auto py-1 relative z-10">
                {authMode === 'login' ? (
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white">أهلاً بك في صرحك الأكاديمي</h3>
                    <p className="text-[11px] text-slate-200">ليس لديك حساب؟ سجل الآن للالتحاق بالدبلومات</p>
                    <button
                      type="button"
                      onClick={() => triggerSwitchMode('register')}
                      className="group mt-2 inline-flex items-center gap-2 px-6 py-2 rounded-xl border-2 border-brand-orange bg-brand-orange/10 hover:bg-brand-orange hover:border-brand-orange text-brand-orange hover:text-brand-purpleDark font-black text-xs transition-all shadow-md cursor-pointer"
                    >
                      <span>إنشاء حساب متدرب جديد</span>
                      <ArrowLeft className="w-3.5 h-3.5 text-brand-orange group-hover:text-brand-purpleDark transition-colors" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white">لديك حساب تدريبي بالفعل؟</h3>
                    <p className="text-[11px] text-slate-200">سجّل دخولك الآن للوصول إلى لوحتك الأكاديمية</p>
                    <button
                      type="button"
                      onClick={() => triggerSwitchMode('login')}
                      className="group mt-2 inline-flex items-center gap-2 px-6 py-2 rounded-xl border-2 border-brand-orange bg-brand-orange/10 hover:bg-brand-orange hover:border-brand-orange text-brand-orange hover:text-brand-purpleDark font-black text-xs transition-all shadow-md cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-brand-orange group-hover:text-brand-purpleDark transition-colors" />
                      <span>تسجيل الدخول إلى حسابك</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-300 pt-1 border-t border-white/10 flex justify-between">
                <span className="text-brand-gold font-bold">معهد أم القرى</span>
                <span>اعتماد 1996م</span>
              </div>
            </div>

            <div 
              className={`flex-1 p-5 overflow-y-auto transition-all duration-300 ${
                authMode === 'login' ? 'pt-[225px]' : 'pb-[225px]'
              }`}
              dir="rtl"
            >
              {authMode === 'login' ? (
                <div className="space-y-3">
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-black text-brand-purpleDark">تسجيل الدخول</h3>
                    <p className="text-xs text-slate-500">أدخل بيانات اعتمادك للمنصة</p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-purpleDark">
                        البريد الإلكتروني أو الرقم الأكاديمي:
                      </label>
                      <input
                        type="text"
                        required
                        value={loginForm.identifier}
                        onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-purpleDark">كلمة المرور:</label>
                      <input
                        type="password"
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark text-xs font-black shadow-md"
                    >
                      الدخول إلى المنصة
                    </button>

                  </form>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-2.5">
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-black text-brand-purpleDark">تسجيل متدرب جديد</h3>
                    <p className="text-xs text-slate-500">أنشئ حسابك للالتحاق بالدبلومات</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-purpleDark">الاسم الرباعي:</label>
                    <input
                      type="text"
                      required
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                      className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-purpleDark">الهوية / الإقامة (10 أرقام):</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={registerForm.nationalId}
                      onChange={(e) => setRegisterForm({ ...registerForm, nationalId: e.target.value })}
                      className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-purpleDark">رقم الجوال:</label>
                    <input
                      type="tel"
                      required
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-purpleDark">البريد الإلكتروني:</label>
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-purpleDark">كلمة المرور:</label>
                      <input
                        type="password"
                        required
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-purpleDark">تأكيد المرور:</label>
                      <input
                        type="password"
                        required
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark text-xs font-black shadow-md"
                  >
                    إتمام التسجيل وبدء التدريب
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-30 py-4 text-center border-t border-white/10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <span className="font-bold text-brand-gold">معهد أم القرى العالي للتدريب</span>
          <span>•</span>
          <button
            type="button"
            onClick={onBackToLanding}
            className="hover:text-white transition-colors cursor-pointer hover:underline"
          >
            العودة للرئيسية
          </button>
          <span>•</span>
          <span>جميع الحقوق محفوظة © 2026</span>
        </div>
      </footer>
    </div>
  );
};
