import React, { useState } from 'react';
import { Mail, X, Inbox, Clock, ChevronLeft } from 'lucide-react';
import { MOCK_MESSAGES } from '../../constants/mockData';

export const MailModal = ({ isOpen, onClose, userRole }) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState(null);

  if (!isOpen) {
    return null;
  }

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setMessages((prev) =>
      prev.map((item) => (item.id === msg.id ? { ...item, read: true } : item))
    );
  };

  const getSenderName = (originalSender) => {
    if (userRole === 'trainee') {
      return 'النظام';
    }
    return originalSender === 'النظام' ? 'إدارة الشؤون التدريبية (أ. عبد الإله)' : originalSender;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-navy-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-400/20 text-gold-300 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">صندوق البريد الداخلي</h3>
              <p className="text-xs text-slate-300">
                {userRole === 'trainee'
                  ? 'استقبال الإشعارات والتعاميم الموجهة من النظام'
                  : 'الرسائل والمراسلات الإدارية الرسمية'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {selectedMessage ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedMessage(null)}
                className="flex items-center gap-1.5 text-xs text-navy-800 hover:text-royalBlue-600 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 rotate-180" />
                <span>العودة لقائمة الرسائل</span>
              </button>

              <div className="border border-slate-200 rounded-xl p-5 bg-surface-base space-y-4">
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">{selectedMessage.subject}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>المرسل:</span>
                      <span className="font-semibold text-navy-800">
                        {getSenderName(selectedMessage.sender)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedMessage.date}</span>
                  </div>
                </div>

                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line py-2">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {messages.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Inbox className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">لا توجد رسائل حالياً</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleSelectMessage(message)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                      message.read
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-navy-50/40 border-navy-200 hover:border-navy-300 shadow-subtle'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 ${
                          message.read ? 'bg-slate-300' : 'bg-royalBlue-600'
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-navy-900">
                            {getSenderName(message.sender)}
                          </span>
                          {!message.read && (
                            <span className="text-[10px] bg-royalBlue-50 text-royalBlue-700 border border-royalBlue-200 px-1.5 py-0.2 rounded-full font-bold">
                              جديد
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm text-slate-800 truncate mt-0.5">
                          {message.subject}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                          {message.content}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap flex-shrink-0">
                      {message.date}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          {userRole === 'trainee'
            ? 'ملاحظة: الرسائل الواردة موجهة للمطالعة فقط من إدارة المركز ولا يمكن الرد عليها مباشرة.'
            : 'نظام المراسلات الإدارية الموحدة لمعهد أم القرى للتدريب'}
        </div>
      </div>
    </div>
  );
};
