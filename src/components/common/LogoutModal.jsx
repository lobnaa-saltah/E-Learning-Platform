import React from 'react';
import { LogOut, X, User } from 'lucide-react';

export const LogoutModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purpleDark/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center animate-in zoom-in-95 duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-sm mb-4">
          <LogOut className="w-7 h-7 text-rose-600" />
        </div>

        <h3 className="text-lg font-bold text-brand-purpleDark">تأكيد تسجيل الخروج</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          هل أنت متأكد من رغبتك في تسجيل الخروج من منصة معهد أم القرى للتدريب؟ سيتعين عليك تسجيل الدخول مرة أخرى للوصول إلى لوحتك التعليمية.
        </p>

        {userName && (
          <div className="mt-4 p-3 bg-brand-background rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-2 font-medium">
            <User className="w-4 h-4 text-brand-primary" />
            <span>الحساب الحالي: <strong className="text-brand-purpleDark font-bold">{userName}</strong></span>
          </div>
        )}

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20 transition-all cursor-pointer"
          >
            تأكيد تسجيل الخروج
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            إلغاء والتراجع
          </button>
        </div>
      </div>
    </div>
  );
};
