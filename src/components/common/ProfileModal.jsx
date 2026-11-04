import React, { useState } from 'react';
import { User, Lock, Mail, ShieldAlert, Check, X } from 'lucide-react';

export const ProfileModal = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [errorNotice, setErrorNotice] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSave = (e) => {
    e.preventDefault();
    setErrorNotice('');
    setSuccessNotice('');

    if (newPassword && newPassword !== confirmPassword) {
      setErrorNotice('كلمة المرور الجديدة وتأكيدها غير متطابقين.');
      return;
    }

    const emailChanged = email.trim() !== user.email.trim();
    onUpdateUser({
      ...user,
      email: email.trim(),
      isEmailVerified: emailChanged ? false : user.isEmailVerified,
    });

    setSuccessNotice(
      emailChanged
        ? 'تم تحديث البريد الإلكتروني بنجاح. نظراً لتغيير البريد، يتوجب تفعيله مرة أخرى.'
        : 'تم حفظ التعديلات بنجاح.'
    );

    setTimeout(() => {
      onClose();
      setSuccessNotice('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-navy-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-400/20 text-gold-300 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">إعدادات الحساب الشخصي</h3>
              <p className="text-xs text-slate-300">البيانات الأساسية وتعديل الدخول</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          {errorNotice && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}

          {successNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                الاسم الكامل (غير قابل للتعديل)
              </label>
              <input
                type="text"
                disabled
                value={user.name}
                className="w-full text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                رقم الهوية الوطنية (محمي)
              </label>
              <input
                type="text"
                disabled
                value={user.nationalId}
                className="w-full text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg p-2.5 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed">
            ملاحظة نظامية: الاسم ورقم الهوية لا يُعدّلان ذاتياً ويتم تعديلهما حصراً عبر قسم شؤون المتدربين بالمعهد.
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              البريد الإلكتروني المعتمد
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-sm text-navy-900 bg-white border border-slate-300 rounded-xl p-2.5 pr-9 focus:ring-2 focus:ring-navy-800 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h4 className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gold-500" />
              <span>تغيير كلمة المرور (اختياري)</span>
            </h4>
            <div className="space-y-2">
              <input
                type="password"
                placeholder="كلمة المرور الحالية"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-navy-800 focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="password"
                  placeholder="كلمة المرور الجديدة"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-navy-800 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-navy-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-navy-800 hover:bg-navy-900 text-white rounded-xl shadow-md transition-all"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
