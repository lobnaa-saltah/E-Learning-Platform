import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  FileCheck, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Download, 
  Printer
} from 'lucide-react';
import { MOCK_PROGRAMS, CURRENT_USER } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';
import { downloadSyllabusPdf } from '../../utils/pdfGenerator';

export const TraineePrograms = () => {
  const [selectedAgreementProgram, setSelectedAgreementProgram] = useState(null);

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="برامجي التدريبية المعتمدة • متطلب 2.2"
        title="برامجي التدريبية المسجلة"
        subtitle="عرض كافة البرامج التدريبية المسجلة مع إجمالي الرسوم والاتفاقية الموقعة لكل برنامج"
        icon={GraduationCap}
      />

      <div className="space-y-6">
        {MOCK_PROGRAMS.map((program, index) => (
          <div
            key={program.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 relative overflow-hidden transition-all hover:shadow-elevated hover:border-slate-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                  <GraduationCap className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-brand-purpleDark text-base">
                      {program.name}
                    </h3>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {program.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <span className="text-[11px] font-bold text-navy-800 bg-navy-50 px-2.5 py-0.5 rounded-full border border-navy-200">
                      {program.type}
                    </span>
                    <span className="text-xs text-slate-500">
                      {program.batchNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => setSelectedAgreementProgram(program)}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-purpleDark hover:bg-[#1D194F] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <FileCheck className="w-4 h-4 text-brand-gold" />
                  <span>عرض اتفاقية التسجيل الموقعة</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6">
              <div className="p-4 sm:p-5 bg-surface-base rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>تاريخ البداية:</span>
                </div>
                <span className="font-mono font-bold text-base text-navy-900 block mt-1">
                  {program.startDate}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">بداية الفصل التدريبي</span>
              </div>

              <div className="p-4 sm:p-5 bg-surface-base rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>تاريخ النهاية:</span>
                </div>
                <span className="font-mono font-bold text-base text-navy-900 block mt-1">
                  {program.endDate}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">تاريخ التخرج المتوقع</span>
              </div>

              <div className="p-4 sm:p-5 bg-surface-base rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span>إجمالي الرسوم:</span>
                </div>
                <span className="font-mono font-black text-xl text-navy-950 block mt-1">
                  {program.totalFees}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">إجمالي الرسوم فقط</span>
              </div>

              <div className="p-4 sm:p-5 bg-surface-base rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <FileCheck className="w-4 h-4 text-slate-400" />
                  <span>تاريخ التسجيل:</span>
                </div>
                <span className="font-mono font-bold text-base text-navy-900 block mt-1">
                  {program.registrationDate}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">تاريخ اعتماد القبول</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                رقم الاعتماد التدريبي: TVTC-UQ-2026-IT
              </span>
              <span className="font-bold text-brand-purpleDark">
                برنامج {index + 1} من إجمالي {MOCK_PROGRAMS.length} برامج
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedAgreementProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 px-6 bg-navy-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-gold-400" />
                <div>
                  <h3 className="font-bold text-sm">وثيقة اتفاقية التسجيل والتدريب الموقعة</h3>
                  <p className="text-[11px] text-slate-300">معهد أم القرى للتدريب - التعليم عن بعد</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgreementProgram(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">اسم المتدرب:</span>
                  <span className="font-bold text-navy-900 text-sm">{CURRENT_USER.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">رقم الهوية الوطنية:</span>
                  <span className="font-mono font-bold text-navy-900">{CURRENT_USER.nationalId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">البرنامج التدريبي:</span>
                  <span className="font-bold text-navy-900">{selectedAgreementProgram.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">رمز الاتفاقية الرقمية:</span>
                  <span className="font-mono font-bold text-royalBlue-700">{selectedAgreementProgram.agreementCode}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <h4 className="font-bold text-sm text-navy-900">بنود الالتزام والاتفاقية المعتمدة:</h4>
                <div className="space-y-2">
                  {selectedAgreementProgram.termsSummary.map((term, index) => (
                    <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-base border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>تم التوقيع الإلكتروني والاعتماد الرسمي</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 block mt-0.5">
                    تاريخ التوقيع: {selectedAgreementProgram.signedAt}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-emerald-500/60 flex items-center justify-center text-[10px] font-bold text-emerald-800 text-center leading-tight rotate-12">
                  ختم المعهد
                  <br />
                  المعتمد
                </div>
              </div>
            </div>

            <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedAgreementProgram(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
              >
                إغلاق
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة</span>
                </button>
                <button
                  onClick={() => downloadSyllabusPdf(selectedAgreementProgram.agreementCode, selectedAgreementProgram.name)}
                  className="flex items-center gap-1.5 px-5 py-2 bg-navy-800 hover:bg-navy-900 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4 text-gold-400" />
                  <span>تحميل PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
