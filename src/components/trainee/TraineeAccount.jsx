import React, { useState, useRef } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  Save, 
  KeyRound, 
  Fingerprint, 
  CheckCircle2,
  Info,
  Eye,
  EyeOff,
  GraduationCap,
  Camera,
  Upload,
  Trash2
} from 'lucide-react';
import { TraineePageHeader } from './TraineePageHeader';

export const TraineeAccount = ({ user, onUpdateUser, onTriggerVerification }) => {
  const [avatar, setAvatar] = useState(user.avatar && !user.avatar.includes('unsplash.com') ? user.avatar : '');
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('حجم الصورة يجب ألا يتجاوز 2 ميجابايت.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newAvatarUrl = event.target.result;
      setAvatar(newAvatarUrl);
      onUpdateUser({
        ...user,
        avatar: newAvatarUrl,
      });
      setSuccessMessage('تم تحديث الصورة الشخصية بنجاح.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUpdateUser({
      ...user,
      avatar: '',
    });
    setSuccessMessage('تمت إزالة الصورة الشخصية.');
  };

  const handleSave = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage('كلمة المرور الجديدة وتأكيدها غير متطابقين.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setErrorMessage('يجب أن لا تقل كلمة المرور الجديدة عن 6 أحرف أو أرقام.');
      return;
    }

    const emailHasChanged = email.trim().toLowerCase() !== user.email.trim().toLowerCase();

    onUpdateUser({
      ...user,
      email: email.trim(),
      avatar: avatar,
      isEmailVerified: emailHasChanged ? false : user.isEmailVerified,
    });

    if (emailHasChanged) {
      setSuccessMessage(
        'تم حفظ البريد الإلكتروني الجديد بنجاح. نظراً لتغيير البريد يرجى تفعيله الآن لإلغاء شريط التنبيه.'
      );
    } else {
      setSuccessMessage('تم تحديث بيانات الحساب وكلمة المرور بنجاح.');
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <TraineePageHeader
        badge="متطلب 2.13 - إدارة الحساب"
        title="إعدادات حسابي وبيانات الدخول"
        subtitle="إدارة البريد الإلكتروني وكلمة المرور والاطلاع على البيانات الرسمية المعتمدة"
        icon={KeyRound}
      >
        <div className="flex items-center justify-center">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              user.isEmailVerified
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-brand-gold/20 text-brand-goldLight border border-brand-gold/40'
            }`}
          >
            {user.isEmailVerified ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>البريد مفعل ومعتمد</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-brand-gold" />
                <span>البريد غير مفعل</span>
              </>
            )}
          </span>
        </div>
      </TraineePageHeader>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-[#FB5F5F]/10 border border-[#FB5F5F]/30 text-[#FB5F5F] text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between gap-2.5 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
          {!user.isEmailVerified && (
            <button
              onClick={onTriggerVerification}
              className="px-3 py-1 bg-brand-purpleDark text-white rounded-lg text-[11px] font-bold hover:bg-brand-primary cursor-pointer"
            >
              تفعيل البريد الآن
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-5">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-l from-purple-50/90 via-slate-50/70 to-purple-50/40 border border-purple-100 border-r-4 border-r-brand-purpleDark flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white border border-brand-purpleDark/20 flex items-center justify-center shadow-xs shrink-0">
                <Fingerprint className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-purpleDark">بطاقة الهوية الأكاديمية والبيانات المعتمدة</h3>
                <p className="text-xs text-slate-500 mt-0.5">البيانات الرسمية المسجلة في السجلات الأكاديمية للمعهد</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white text-emerald-700 border border-emerald-200/80 text-xs font-bold w-fit shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>سجل موثق ونظامي</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 rounded-2xl bg-gradient-to-r from-purple-50/70 via-slate-50/60 to-amber-50/40 border border-slate-200/80">
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-brand-gold/40 shadow-md flex items-center justify-center text-brand-purpleDark">
                {avatar && !avatar.includes('unsplash.com') ? (
                  <img src={avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 0116 0H4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1.5 -left-1.5 p-2 rounded-xl bg-brand-purpleDark hover:bg-[#352F7F] text-brand-gold shadow-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
                title="تغيير الصورة الشخصية"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-right space-y-2">
              <div>
                <h4 className="text-sm font-bold text-slate-800">الصورة الشخصية للمتدرب</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  تظهر في بطاقتك الأكاديمية وبوابة المنصة وقاعات المحاضرات
                </p>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-brand-purpleDark hover:bg-[#352F7F] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5 text-brand-gold" />
                  <span>رفع صورة جديدة</span>
                </button>

                {avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>إزالة الصورة</span>
                  </button>
                )}

                <span className="text-[11px] text-slate-400 mr-1">
                  JPG, PNG أو WebP (أقصى حجم 2MB)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-purple-200 transition-colors">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[11px] font-bold text-slate-500">الاسم الكامل</span>
                <User className="w-3.5 h-3.5 text-brand-gold" />
              </div>
              <p className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug">{user.name}</p>
              <span className="text-[10px] text-slate-400 block mt-1">مطابق للسجل المدني</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-purple-200 transition-colors">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[11px] font-bold text-slate-500">الهوية الوطنية / الإقامة</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-xs sm:text-[13px] font-bold font-mono text-slate-800">{user.nationalId || '1098765432'}</p>
              <span className="text-[10px] text-slate-400 block mt-1">موثق عبر النفاذ</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-purple-200 transition-colors">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[11px] font-bold text-slate-500">الرقم التدريبي الأكاديمي</span>
                <Lock className="w-3.5 h-3.5 text-brand-purpleDark" />
              </div>
              <p className="text-xs sm:text-[13px] font-bold font-mono text-brand-purpleDark">{user.traineeId || '44501289'}</p>
              <span className="text-[10px] text-slate-400 block mt-1">الرقم الجامعي المعتمد</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-purple-200 transition-colors">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="text-[11px] font-bold text-slate-500">البرنامج المقيد به</span>
                <GraduationCap className="w-3.5 h-3.5 text-brand-purpleDark" />
              </div>
              <p className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug truncate" title={user.program}>{user.program || 'تقنية المعلومات التطبيقي'}</p>
              <span className="text-[10px] text-slate-400 block mt-1">دبلوم معتمد TVTC</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-brand-purpleDark flex items-center gap-2.5">
            <Info className="w-4 h-4 text-brand-gold shrink-0" />
            <span className="text-[11px] leading-relaxed text-slate-600">
              البيانات الأكاديمية محمية وغير قابلة للتعديل المباشر لضمان مطابقة الشهادات الصادرة، ويمكن تحديثها عبر مراجعة إدارة شؤون المتدربين.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-l from-emerald-50/90 via-slate-50/70 to-emerald-50/40 border border-emerald-100 border-r-4 border-r-emerald-600 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-purpleDark">البريد الإلكتروني المعتمد</h3>
                    <p className="text-xs text-slate-500 mt-0.5">قناة الإشعارات والتحقق الرسمي</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 shadow-2xs ${
                    user.isEmailVerified
                      ? 'bg-white text-emerald-700 border border-emerald-200'
                      : 'bg-white text-amber-700 border border-amber-200'
                  }`}
                >
                  {user.isEmailVerified ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>بريد مفعل</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>غير مفعل</span>
                    </>
                  )}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  عنوان البريد الإلكتروني (قابل للتحديث):
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-xs font-bold text-slate-800 bg-slate-50/50 hover:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl p-3 pr-10 transition-all focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-emerald-600 absolute right-3.5 top-3.5" />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  تُرسل نتائج الاختبارات وجداول المحاضرات وإشعارات الرسوم إلى هذا البريد.
                </p>
              </div>
            </div>

            {!user.isEmailVerified && (
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-[11px]">يرجى التحقق لتفعيل استلام الإشعارات</span>
                </div>
                <button
                  type="button"
                  onClick={onTriggerVerification}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  تفعيل الآن
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-l from-amber-50/90 via-slate-50/70 to-amber-50/40 border border-amber-100 border-r-4 border-r-brand-gold flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold text-brand-purpleDark flex items-center justify-center shadow-xs shrink-0">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-purpleDark">أمان الحساب وكلمة المرور</h3>
                    <p className="text-xs text-slate-500 mt-0.5">تحديث بيانات الدخول المباشر</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium shrink-0 shadow-2xs">
                  اختياري
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    كلمة المرور الحالية:
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="أدخل كلمة المرور الحالية للتأكيد"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full text-xs text-slate-800 bg-slate-50/50 hover:bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl p-3 pr-10 pl-10 transition-all focus:outline-none"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute left-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      كلمة المرور الجديدة:
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="لا تقل عن 6 خانات"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full text-xs text-slate-800 bg-slate-50/50 hover:bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl p-3 pl-10 transition-all focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute left-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      تأكيد كلمة المرور:
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="أعد كتابتها للتطابق"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full text-xs text-slate-800 bg-slate-50/50 hover:bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl p-3 pl-10 transition-all focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>ينصح باستخدام كلمة مرور تدمج بين حروف وأرقام</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>يتم تشفير وتأمين جميع التعديلات طبقاً لمعايير أمن المعلومات الأكاديمية</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-purpleDark hover:bg-[#352F7F] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:scale-[1.01] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4 text-brand-gold" />
            <span>حفظ تعديلات الحساب</span>
          </button>
        </div>
      </form>
    </div>
  );
};
