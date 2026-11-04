import React, { useState } from 'react';
import { 
  AlertCircle, 
  Lock, 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Download, 
  CreditCard,
  GraduationCap,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';
import { MOCK_TRANSCRIPT_SEMESTERS, CURRENT_USER } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';
import { downloadTranscriptPdf } from '../../utils/pdfGenerator';

export const TraineeTranscript = ({ onNavigateFinancials }) => {
  const [hasOverdueFees, setHasOverdueFees] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const confirmAndDownload = () => {
    downloadTranscriptPdf(CURRENT_USER, MOCK_TRANSCRIPT_SEMESTERS);
    setShowDownloadModal(false);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="السجل التدريبي الأكاديمي المعتمد"
        title="كشف الدرجات والسجل التدريبي"
        subtitle="متابعة المعدل التراكمي والفصلي وحالات المواد واجتياز المتطلبات الأكاديمية الرسمية"
        icon={GraduationCap}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <div className="inline-flex items-center gap-1.5 p-1 bg-black/25 backdrop-blur-xl rounded-xl border border-white/15 shadow-inner">
            <span className="text-xs font-bold text-slate-300 pr-2.5 pl-1 hidden sm:inline">
              حالة الحساب المالي :
            </span>
            <button
              type="button"
              onClick={() => setHasOverdueFees(false)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !hasOverdueFees
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>مسدد (السجل متاح)</span>
            </button>
            <button
              type="button"
              onClick={() => setHasOverdueFees(true)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                hasOverdueFees
                  ? 'bg-[#FB5F5F] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>متعثر (السجل محجوب)</span>
            </button>
          </div>
        </div>
      </TraineePageHeader>

      {hasOverdueFees ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden animate-in fade-in duration-200">
          <div className="p-4 px-6 bg-brand-purpleDark text-white flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">السجل التدريبي محجوب مؤقتاً</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  يتطلب عرض الدرجات والمعدل التراكمي تسوية المستحقات المالية أولاً
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300 bg-rose-500/20 px-3 py-1.5 rounded-lg border border-rose-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
              <span>مستحقات معلقة</span>
            </span>
          </div>

          <div className="p-6 sm:p-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-rose-600 border border-rose-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-slate-500 block">سبب الحجب الأكاديمي</span>
                  <span className="text-xs font-bold text-rose-700 block mt-0.5">قسط تدريبي متعثر</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-brand-purpleDark border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-slate-500 block">المبلغ المطلوب سداده</span>
                  <span className="text-sm font-black text-brand-purpleDark font-mono block mt-0.5">2,500 ر.س</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-slate-500 block">آلية رفع الحجب</span>
                  <span className="text-xs font-bold text-emerald-700 block mt-0.5">فك الحجب فوري وتلقائي</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-background/80 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600 leading-relaxed max-w-xl">
                عزيزي المتدرب ({CURRENT_USER.name})، النظام يتحقق تلقائياً من إتمام السداد المالي، وسيتم إتاحة كشف الدرجات الأكاديمي والمعدل الفصلي والتراكمي فورياً بمجرد تأكيد الدفع.
              </div>

              <button
                onClick={onNavigateFinancials}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-purpleDark hover:bg-[#352F7F] text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-[1.02] cursor-pointer shrink-0"
              >
                <CreditCard className="w-4 h-4 text-brand-gold" />
                <span>سداد القسط الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                  <Award className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-purpleDark text-base">السجل التدريبي الأكاديمي المعتمد</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    كشف الدرجات الأكاديمي الشامل للمتدرب ({CURRENT_USER.name}) • {CURRENT_USER.program}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70 w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>رقم الوثيقة: UQ-TR-8842</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 block">جهة الاعتماد الأكاديمي</span>
                <span className="text-xs sm:text-sm font-bold text-brand-purpleDark block mt-0.5">معهد أم القرى للتدريب</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">معتمد من المؤسسة العامة TVTC</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 block">نوع السجل التدريبي</span>
                <span className="text-xs sm:text-sm font-bold text-brand-purpleDark block mt-0.5">كشف درجات تراكمي شامل</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">سجل معتمد لكافة الفصول التدريبية</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 block">التحقق والصلاحية</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-700 block mt-0.5">موثق ومعتمد رسمياً</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">صالح للتقديم الأكاديمي والوظيفي</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>وثيقة إلكترونية رسمية معتمدة ومحمية بكود التحقق الرقمي المعتمد دولياً</span>
              </div>

              <button
                onClick={() => setShowDownloadModal(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-purpleDark hover:bg-[#352F7F] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:scale-[1.01] cursor-pointer shrink-0"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>تم تحميل كشف الدرجات</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-brand-gold" />
                    <span>تحميل كشف الدرجات المعتمد (PDF)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/70 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-500">المعدل التراكمي العام</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    مرتبة الشرف
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-lg sm:text-xl font-black text-brand-purpleDark font-mono">4.82</span>
                  <span className="text-xs font-semibold text-slate-400">/ 5.00</span>
                  <span className="text-[11px] font-bold text-emerald-700 mr-auto hidden sm:inline">ممتاز مرتفع</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-purpleDark border border-purple-200/70 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-brand-purpleDark" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-500">الساعات المكتسبة</span>
                  <span className="text-[10px] font-bold text-brand-purpleDark bg-purple-100/70 px-2 py-0.5 rounded-lg">
                    من أصل 68
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg sm:text-xl font-black text-brand-purpleDark font-mono">32</span>
                  <span className="text-xs font-semibold text-slate-500">ساعة تدريبية</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/70 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-500">الإنذارات الأكاديمية</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-lg">
                    سجل سليم
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg sm:text-xl font-black text-emerald-600 font-mono">0</span>
                  <span className="text-xs font-semibold text-slate-500">إنذارات</span>
                  <span className="text-[11px] font-bold text-slate-400 mr-auto hidden sm:inline">سجل نظامي</span>
                </div>
              </div>
            </div>
          </div>

          {MOCK_TRANSCRIPT_SEMESTERS.map((sem) => (
            <div key={sem.termId} className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
              <div className="p-3.5 px-4 sm:px-6 bg-brand-purpleDark text-white flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-brand-gold shrink-0" />
                  <span className="text-sm font-black text-white">{sem.termName}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs flex-wrap">
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg text-slate-200">
                    الساعات : <strong className="text-white">{sem.totalCredits}</strong>
                  </span>
                  <span className="bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2.5 py-1 rounded-lg font-bold">
                    المعدل الفصلي : {sem.gpa} / {sem.maxGpa}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse text-[11px] sm:text-xs">
                  <thead className="bg-brand-background text-brand-textLight border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-2 sm:px-4">رمز المقرر</th>
                      <th className="py-2.5 px-2 sm:px-4">اسم المقرر التدريبي</th>
                      <th className="py-2.5 px-1.5 sm:px-3 text-center">الساعات</th>
                      <th className="py-2.5 px-1.5 sm:px-3 text-center">الدرجة المئوية</th>
                      <th className="py-2.5 px-1.5 sm:px-3 text-center">التقدير</th>
                      <th className="py-2.5 px-1.5 sm:px-3 text-center">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sem.courses.map((c) => (
                      <tr key={c.code} className="hover:bg-brand-background/50 transition-colors">
                        <td className="py-2.5 px-2 sm:px-4 font-mono font-bold text-brand-purpleDark whitespace-nowrap">
                          {c.code}
                        </td>
                        <td className="py-2.5 px-2 sm:px-4 font-bold text-slate-800 leading-snug">
                          {c.name}
                        </td>
                        <td className="py-2.5 px-1.5 sm:px-3 text-center font-mono font-semibold text-slate-700">
                          {c.hours}
                        </td>
                        <td className="py-2.5 px-1.5 sm:px-3 text-center font-mono font-black text-brand-purpleDark">
                          {c.grade}
                        </td>
                        <td className="py-2.5 px-1.5 sm:px-3 text-center font-bold text-emerald-700">
                          {c.letter}
                        </td>
                        <td className="py-2.5 px-1.5 sm:px-3 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-lg font-bold text-[10px] sm:text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purpleDark/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-brand-purpleDark border border-purple-200 flex items-center justify-center mx-auto shadow-sm mb-4">
              <Download className="w-7 h-7 text-brand-purpleDark" />
            </div>

            <h3 className="text-lg font-bold text-brand-purpleDark">تأكيد تحميل كشف الدرجات الأكاديمي</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              هل ترغب في بدء تحميل ملف PDF المعتمد للسجل الأكاديمي الشامل إلى جهازك؟
            </p>

            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-right space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span>اسم الملف:</span>
                <strong className="font-mono text-brand-purpleDark text-[11px] dir-ltr">
                  Transcript_{CURRENT_USER.id || 'TR-2024-8842'}.pdf
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>الصيغة:</span>
                <span className="font-bold text-slate-700">مستند PDF رسمي معتمد (A4)</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>حالة الوثيقة:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>معتمد إلكترونياً</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={confirmAndDownload}
                className="flex-1 py-3 px-4 bg-brand-purpleDark hover:bg-[#352F7F] text-white font-bold text-xs rounded-xl shadow-md shadow-brand-purpleDark/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-brand-gold" />
                <span>نعم، تحميل الملف الآن</span>
              </button>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
