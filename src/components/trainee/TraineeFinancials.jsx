import React, { useState } from 'react';
import { 
  CreditCard, 
  Printer, 
  ChevronLeft, 
  Calendar, 
  ArrowLeft, 
  ShieldCheck, 
  Check, 
  X,
  GraduationCap,
  Wallet,
  Layers,
  Clock
} from 'lucide-react';
import { MOCK_FINANCIAL_PROGRAMS } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';

export const TraineeFinancials = () => {
  const [programs, setPrograms] = useState(MOCK_FINANCIAL_PROGRAMS);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [printingInvoice, setPrintingInvoice] = useState(null);

  const selectedProgram = programs.find((p) => p.id === selectedProgramId);

  const handlePayInstallment = () => {
    setTimeout(() => {
      setPrograms((prev) =>
        prev.map((prog) => {
          if (prog.id === selectedProgram.id) {
            const updatedRemaining = Math.max(0, prog.remainingAmount - 2500);
            const updatedPaid = prog.paidAmount + 2500;
            return {
              ...prog,
              remainingAmount: updatedRemaining,
              paidAmount: updatedPaid,
              remainingInstallments: Math.max(0, prog.remainingInstallments - 1),
              installments: prog.installments.map((inst) =>
                inst.status === 'مستحق'
                  ? { ...inst, status: 'مدفوع', paidAt: '2026-10-25' }
                  : inst
              ),
              invoices: [
                ...prog.invoices.filter((inv) => inv.id !== 'INV-44503'),
                {
                  id: 'INV-44503-PAID',
                  number: 'فاتورة ضريبية مسددة #44503',
                  date: '2026-10-25',
                  amount: 2500,
                  status: 'مدفوع',
                  type: 'سداد القسط الأخير',
                },
              ],
            };
          }
          return prog;
        })
      );
      setPaymentModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="إدارة الرسوم والأقساط والفواتير"
        title="الماليات والرسوم الدراسية"
        subtitle="متابعة الرسوم التدريبية المعتمدة وسداد الأقساط وطباعة الفواتير الإلكترونية المعتمدة"
        icon={CreditCard}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs">
            <span className="text-slate-300">إجمالي رسوم البرامج:</span>
            <span className="font-bold text-white font-mono text-xs">9,300 ر.س</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs">
            <span className="text-slate-300">إجمالي المدفوع:</span>
            <span className="font-bold text-emerald-300 font-mono text-xs">6,800 ر.س</span>
          </div>
        </div>
      </TraineePageHeader>

      {!selectedProgram ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
          <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                <CreditCard className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-brand-purpleDark text-base">جدول البرامج المسجلة للمتدرب</h3>
                <p className="text-xs text-slate-500 mt-0.5">اختر "المزيد" لاستعراض الأقساط والفواتير التابعة لكل برنامج</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs">
              <thead className="bg-brand-background text-brand-textLight border-b border-slate-200">
                <tr>
                  <th className="py-4 px-5">اسم البرنامج التدريبي</th>
                  <th className="py-4 px-5 text-center">إجمالي الرسوم</th>
                  <th className="py-4 px-5 text-center">تاريخ التسجيل</th>
                  <th className="py-4 px-5 text-center">المبلغ المدفوع</th>
                  <th className="py-4 px-5 text-center">حالة السداد</th>
                  <th className="py-4 px-5 text-center">التفاصيل المالية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programs.map((prog) => (
                  <tr key={prog.id} className="hover:bg-brand-background/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-brand-purpleDark text-sm">{prog.name}</div>
                      <span className="text-[11px] text-brand-textLight font-mono">{prog.code}</span>
                    </td>

                    <td className="py-4 px-5 text-center font-mono font-bold text-brand-purpleDark text-sm">
                      {prog.totalFees.toLocaleString()} ر.س
                    </td>

                    <td className="py-4 px-5 text-center font-mono text-slate-700">
                      {prog.registrationDate}
                    </td>

                    <td className="py-4 px-5 text-center font-mono font-black text-emerald-700 text-sm">
                      {prog.paidAmount.toLocaleString()} ر.س
                    </td>

                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                          prog.remainingAmount === 0
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-brand-secondary/20 text-brand-purpleDark border border-brand-secondary/40'
                        }`}
                      >
                        {prog.remainingAmount === 0 ? 'مسدد بالكامل' : 'قيد السداد بالأقساط'}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={() => setSelectedProgramId(prog.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purpleDark hover:bg-brand-primary text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        <span>المزيد</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={() => setSelectedProgramId(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-purpleDark hover:text-brand-primary bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-subtle transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>العودة لجدول البرامج (المستوى الأول)</span>
            </button>

            <span className="text-xs font-bold text-brand-textLight">
              المستوى الثاني: تفاصيل الخطة المالية والفواتير
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-brand-purpleDark text-white flex items-center justify-center shadow-sm shrink-0">
                  <GraduationCap className="w-5 h-5 text-brand-gold" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-brand-purpleDark text-base">
                    {selectedProgram.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs font-mono font-bold bg-brand-background text-brand-primary px-2.5 py-0.5 rounded-lg border border-slate-200 shrink-0">
                      {selectedProgram.code}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-brand-background text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span>تاريخ التسجيل المعتمد:</span>
                      <strong className="font-mono text-brand-purpleDark font-bold">{selectedProgram.registrationDate}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {!selectedProgram.isFullPayment && selectedProgram.remainingAmount > 0 && (
                <button
                  onClick={() => setPaymentModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark font-black text-xs rounded-2xl shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-brand-purpleDark" />
                  <span>سداد قسط مستحق (2,500 ر.س)</span>
                </button>
              )}
            </div>

            {selectedProgram.isFullPayment || selectedProgram.remainingAmount === 0 ? (
              <div className="pt-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-l from-emerald-50/90 via-emerald-50/40 to-white border border-emerald-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0 shadow-emerald-600/25">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm sm:text-base text-slate-800">
                          تم سداد الرسوم التدريبية كاملة نقداً
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-lg border border-emerald-300">
                          <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                          <span>خالص الرسوم 100%</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        تم استيفاء كامل المبالغ المقررة للبرنامج التدريبي بنجاح، وسجلك المالي منتظم بدون أي التزامات متبقية.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-emerald-200/80 shadow-2xs shrink-0 self-start md:self-center">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">إجمالي المسدد</span>
                      <div className="text-base font-black text-emerald-700 font-mono">
                        {selectedProgram.paidAmount.toLocaleString()} <span className="text-xs font-bold text-slate-500">ر.س</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6">
                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-brand-background/80 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/70 flex items-center justify-center shrink-0">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-500">المبلغ المتبقي</span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-lg">قسط أخير</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-lg sm:text-xl font-black text-rose-600 font-mono">
                        {selectedProgram.remainingAmount.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-slate-500">ر.س</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-brand-background/80 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-purpleDark border border-purple-200/70 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-500">الأقساط المتبقية</span>
                      <span className="text-[10px] font-bold text-brand-purpleDark bg-purple-100/70 px-2 py-0.5 rounded-lg">
                        من أصل {selectedProgram.installmentsCount}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-lg sm:text-xl font-black text-brand-purpleDark font-mono">
                        {selectedProgram.remainingInstallments}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">قسط متبقي</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-brand-background/80 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-500">الاستحقاق القادم</span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-lg">خلال 21 يوماً</span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-brand-purpleDark font-mono mt-0.5">
                      2026-11-15
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!selectedProgram.isFullPayment && selectedProgram.installments.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
              <div className="p-4 px-6 bg-brand-purpleDark text-white flex items-center justify-between text-xs font-bold">
                <span>جدول الأقساط وتواريخ الاستحقاق</span>
                <span className="font-mono text-brand-gold">عدد الأقساط: {selectedProgram.installments.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse text-xs">
                  <thead className="bg-brand-background text-brand-textLight border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-5">القسط</th>
                      <th className="py-3 px-5 text-center">المبلغ</th>
                      <th className="py-3 px-5 text-center">تاريخ الاستحقاق</th>
                      <th className="py-3 px-5 text-center">حالة القسط</th>
                      <th className="py-3 px-5 text-center">تاريخ السداد الفعلي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedProgram.installments.map((inst) => (
                      <tr key={inst.id} className="hover:bg-brand-background/50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-slate-800">{inst.number}</td>
                        <td className="py-3.5 px-5 text-center font-mono font-bold text-brand-purpleDark">
                          {inst.amount.toLocaleString()} ر.س
                        </td>
                        <td className="py-3.5 px-5 text-center font-mono text-slate-600">{inst.dueDate}</td>
                        <td className="py-3.5 px-5 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-lg font-bold text-[11px] ${
                              inst.status === 'مدفوع'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-[#FB5F5F]/15 text-[#FB5F5F] border border-[#FB5F5F]/30'
                            }`}
                          >
                            {inst.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-center font-mono text-slate-500">
                          {inst.paidAt || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
            <div className="p-4 px-6 bg-brand-purpleDark text-white flex items-center justify-between text-xs font-bold">
              <span>فواتير البرنامج الإلكترونية مع خيار الطباعة المباشرة</span>
              <span className="text-brand-gold">فواتير وسندات معتمدة</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead className="bg-brand-background text-brand-textLight border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5">رقم الفاتورة</th>
                    <th className="py-3 px-5">البيان</th>
                    <th className="py-3 px-5 text-center">تاريخ الإصدار</th>
                    <th className="py-3 px-5 text-center">المبلغ</th>
                    <th className="py-3 px-5 text-center">الحالة</th>
                    <th className="py-3 px-5 text-center">طباعة الفاتورة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedProgram.invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-brand-background/50 transition-colors">
                      <td className="py-3.5 px-5 font-mono font-bold text-brand-purpleDark">{inv.id}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-800">{inv.type}</td>
                      <td className="py-3.5 px-5 text-center font-mono text-slate-600">{inv.date}</td>
                      <td className="py-3.5 px-5 text-center font-mono font-black text-brand-purpleDark">
                        {inv.amount.toLocaleString()} ر.س
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-lg font-bold text-[11px] ${
                            inv.status.includes('مدفوع')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-brand-secondary/20 text-brand-purpleDark border border-brand-secondary/40'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <button
                          onClick={() => setPrintingInvoice(inv)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-background hover:bg-brand-purpleDark hover:text-white text-brand-purpleDark font-bold border border-slate-200 transition-all cursor-pointer shadow-sm"
                          title="طباعة الفاتورة الضريبية الرسمية"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>طباعة</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purpleDark/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 px-6 bg-brand-purpleDark text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-gold" />
                <h3 className="font-bold text-base text-white">سداد القسط التدريبي</h3>
              </div>
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 bg-brand-background rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-brand-textLight">البرنامج:</span>
                  <strong className="text-brand-purpleDark">{selectedProgram.name}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-textLight">القسط المستحق:</span>
                  <strong className="text-brand-purpleDark">القسط الثالث والأخير</strong>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-sm">
                  <span className="font-bold text-slate-800">المبلغ الإجمالي للدفع:</span>
                  <span className="font-mono font-black text-emerald-700 text-lg">2,500 ر.س</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">طريقة الدفع:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" className="p-3 rounded-xl border-2 border-brand-purpleDark bg-brand-background font-bold text-xs text-brand-purpleDark text-center">
                    مدى Mada
                  </button>
                  <button type="button" className="p-3 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-700 text-center hover:border-slate-300">
                    Visa / MC
                  </button>
                  <button type="button" className="p-3 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-700 text-center hover:border-slate-300">
                    Apple Pay
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handlePayInstallment}
                  className="px-6 py-2.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
                >
                  تأكيد سداد المبلغ (2,500 ر.س)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {printingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purpleDark/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-xl overflow-hidden">
            <div className="p-5 px-6 bg-brand-purpleDark text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-brand-gold" />
                <h3 className="font-bold text-base text-white">معاينة الفاتورة الضريبية الرسمية</h3>
              </div>
              <button
                onClick={() => setPrintingInvoice(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs text-slate-800">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <h4 className="font-black text-lg text-brand-purpleDark">معهد أم القرى للتدريب</h4>
                  <p className="text-brand-textLight text-[11px]">فرع التعليم والتدريب عن بعد</p>
                  <p className="text-slate-500 font-mono text-[10px] mt-0.5">الرقم الضريبي: 30045678900003</p>
                </div>
                <div className="text-left font-mono">
                  <span className="font-bold text-brand-purpleDark block text-sm">{printingInvoice.id}</span>
                  <span className="text-slate-500 block">{printingInvoice.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-brand-background rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-brand-textLight block">اسم العميل (المتدرب):</span>
                  <strong className="text-brand-purpleDark">عبدالله محمد القرشي</strong>
                </div>
                <div>
                  <span className="text-brand-textLight block">رقم الهوية الوطنية:</span>
                  <strong className="font-mono text-brand-purpleDark">1098765432</strong>
                </div>
                <div>
                  <span className="text-brand-textLight block">البرنامج التدريبي:</span>
                  <strong className="text-brand-purpleDark">{selectedProgram.name}</strong>
                </div>
                <div>
                  <span className="text-brand-textLight block">طريقة السداد:</span>
                  <strong className="text-brand-purpleDark">دفع إلكتروني معتمد (سداد)</strong>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-700">
                    <tr>
                      <th className="p-3">الوصف</th>
                      <th className="p-3 text-center">المبلغ الأساسي</th>
                      <th className="p-3 text-center">الضريبة 15%</th>
                      <th className="p-3 text-center">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-medium">{printingInvoice.type}</td>
                      <td className="p-3 text-center font-mono">{(printingInvoice.amount * 0.8695).toFixed(2)} ر.س</td>
                      <td className="p-3 text-center font-mono">{(printingInvoice.amount * 0.1305).toFixed(2)} ر.س</td>
                      <td className="p-3 text-center font-mono font-black text-brand-purpleDark">{printingInvoice.amount.toLocaleString()} ر.س</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  فاتورة ضريبية مبسطة صادرة إلكترونياً
                </span>
                <div className="w-12 h-12 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-400 rotate-12">
                  ختم سداد
                </div>
              </div>
            </div>

            <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setPrintingInvoice(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
              >
                إغلاق
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-purpleDark hover:bg-brand-primary text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4 text-brand-gold" />
                <span>طباعة الفاتورة الآن</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
