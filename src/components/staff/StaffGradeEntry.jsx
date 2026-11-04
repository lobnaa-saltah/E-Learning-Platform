import React, { useState } from 'react';
import { FileSpreadsheet, Check, Save, User, Tag } from 'lucide-react';

export const StaffGradeEntry = () => {
  const [trainees, setTrainees] = useState([
    { id: '44501289', name: 'عبدالله محمد القرشي', originalBatch: 'شعبة 201', isHost: true, midterm: 28, assignments: 18, finalExam: 42, total: 88 },
    { id: '44501290', name: 'سلمان فهد الحربي', originalBatch: 'شعبة 105', isHost: false, midterm: 26, assignments: 19, finalExam: 45, total: 90 },
    { id: '44501291', name: 'عمر خالد السليماني', originalBatch: 'شعبة 105', isHost: false, midterm: 24, assignments: 17, finalExam: 39, total: 80 },
  ]);

  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleGradeChange = (id, field, value) => {
    const numVal = parseInt(value, 10) || 0;
    setTrainees((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, [field]: numVal };
          updated.total = updated.midterm + updated.assignments + updated.finalExam;
          return updated;
        }
        return t;
      })
    );
  };

  const handleExportExcel = () => {
    const csvRows = [
      ['الرقم التدريبي', 'اسم المتدرب', 'نوع القيد', 'النصفي', 'الواجبات', 'النهائي', 'المجموع'],
      ...trainees.map((t) => [t.id, t.name, t.isHost ? `ملحق من ${t.originalBatch}` : 'أساسي', t.midterm, t.assignments, t.finalExam, t.total]),
    ];
    const csvContent = '\uFEFF' + csvRows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `كشف_درجات_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveGrades = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-brand-purpleDark">رصد الدرجات والتقييمات</h2>
            <span className="text-xs font-bold bg-brand-purpleDark/10 text-brand-purpleDark px-2.5 py-0.5 rounded-full">
              متطلب 5.8
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            شعبة 105 - مبادئ المحاسبة المالية (يظهر المتدرب الملحق مع الشعبة المستضيفة وتُحسب درجته في سجله)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>تصدير إلى Excel</span>
          </button>
          <button
            onClick={handleSaveGrades}
            className="flex items-center gap-2 px-5 py-2 bg-brand-purpleDark hover:bg-[#1e1a50] text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            <Save className="w-4 h-4 text-brand-gold" />
            <span>حفظ واعتماد الرصد</span>
          </button>
        </div>
      </div>

      {isSavedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
          <span>تم حفظ درجات المتدربين بنجاح واحتساب الملحقين في سجلهم الأكاديمي.</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-brand-purpleDark text-white font-bold border-b border-brand-purpleDark/70">
                <th className="py-4 px-4">الرقم التدريبي</th>
                <th className="py-4 px-4">اسم المتدرب</th>
                <th className="py-4 px-4 text-center">نوع القيد</th>
                <th className="py-4 px-4 text-center">النصفي (30)</th>
                <th className="py-4 px-4 text-center">الواجبات (20)</th>
                <th className="py-4 px-4 text-center">النهائي (50)</th>
                <th className="py-4 px-4 text-center">المجموع (100)</th>
                <th className="py-4 px-4 text-center">التقدير</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trainees.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-brand-purpleDark">{t.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{t.name}</td>
                  <td className="py-3 px-4 text-center">
                    {t.isHost ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold text-[10px]">
                        <Tag className="w-3 h-3" />
                        <span>مُلحق (من {t.originalBatch})</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">أساسي بالدفعة</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      max={30}
                      min={0}
                      value={t.midterm}
                      onChange={(e) => handleGradeChange(t.id, 'midterm', e.target.value)}
                      className="w-14 text-center font-mono font-bold text-brand-purpleDark border border-slate-300 rounded-lg py-1 focus:ring-2 focus:ring-brand-purpleDark/50 focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      max={20}
                      min={0}
                      value={t.assignments}
                      onChange={(e) => handleGradeChange(t.id, 'assignments', e.target.value)}
                      className="w-14 text-center font-mono font-bold text-brand-purpleDark border border-slate-300 rounded-lg py-1 focus:ring-2 focus:ring-brand-purpleDark/50 focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      max={50}
                      min={0}
                      value={t.finalExam}
                      onChange={(e) => handleGradeChange(t.id, 'finalExam', e.target.value)}
                      className="w-14 text-center font-mono font-bold text-brand-purpleDark border border-slate-300 rounded-lg py-1 focus:ring-2 focus:ring-brand-purpleDark/50 focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-black text-brand-purpleDark text-sm">
                    {t.total}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full font-bold text-xs bg-emerald-50 text-emerald-700">
                      {t.total >= 90 ? 'أ+' : t.total >= 80 ? 'ب+' : 'ج'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
