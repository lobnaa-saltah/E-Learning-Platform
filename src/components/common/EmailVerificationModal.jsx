import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, X } from 'lucide-react';

export const EmailVerificationModal = ({ isOpen, onClose, email, onVerifySuccess }) => {
  const [step, setStep] = useState('request');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSendCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
    }, 600);
  };

  const handleConfirmCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onVerifySuccess();
      setStep('success');
      setTimeout(() => {
        onClose();
        setStep('request');
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-base">تفعيل البريد الإلكتروني</h3>
              <p className="text-xs text-slate-500">متطلب إلزامي لاستقبال التنبيهات الرسمية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {step === 'request' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                سيتم إرسال رمز تحقق صالح لمدة 15 دقيقة إلى عنوان بريدك الإلكتروني المسجل:
              </p>
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-center font-mono text-sm text-navy-800">
                {email}
              </div>
              <button
                onClick={handleSendCode}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-navy-800 hover:bg-navy-900 text-white rounded-xl font-semibold shadow-md transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isLoading ? 'جاري الإرسال...' : 'إرسال رمز التفعيل'}</span>
              </button>
            </div>
          )}

          {step === 'verify' && (
            <form onSubmit={handleConfirmCode} className="space-y-4">
              <p className="text-sm text-slate-600">
                أدخل رمز التحقق المكون من 6 أرقام المرسل إلى بريدك الإلكتروني:
              </p>
              <input
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="0 0 0 0 0 0"
                className="w-full text-center text-2xl tracking-widest font-mono py-3 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-800 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-royalBlue-600 hover:bg-royalBlue-700 text-white rounded-xl font-semibold shadow-md transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLoading ? 'جاري التحقق...' : 'تأكيد التفعيل'}</span>
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="py-6 text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-emerald-800">تم تفعيل بريدك بنجاح!</h4>
              <p className="text-xs text-slate-500">تم تحديث حالة حسابك وإلغاء شريط التنبيه.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
