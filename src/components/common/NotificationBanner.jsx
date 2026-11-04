import React from 'react';
import { AlertTriangle, ArrowLeft, MailCheck } from 'lucide-react';

export const NotificationBanner = ({ isVerified, onTriggerVerification }) => {
  if (isVerified) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark px-4 py-2.5 shadow-sm text-sm font-bold">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-brand-purpleDark/15 rounded-full flex-shrink-0 text-brand-purpleDark">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span>
            عزيزي المتدرب، يرجى تفعيل بريدك الإلكتروني{' '}
            <button
              onClick={onTriggerVerification}
              className="underline font-black hover:text-black transition-colors mx-1 cursor-pointer focus:outline-none"
            >
              بالضغط هنا
            </button>
            لتتمكن من استقبال إشعارات المنصة والرسائل الرسمية.
          </span>
        </div>
        <button
          onClick={onTriggerVerification}
          className="flex items-center gap-1.5 text-xs bg-brand-purpleDark text-white hover:bg-brand-primary px-3.5 py-1.5 rounded-lg font-bold transition-all shadow-sm flex-shrink-0"
        >
          <MailCheck className="w-3.5 h-3.5 text-brand-gold" />
          <span>تفعيل الآن</span>
          <ArrowLeft className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
