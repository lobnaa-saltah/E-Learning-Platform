import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Check, 
  X, 
  ArrowLeft, 
  Upload, 
  User, 
  CheckCircle2
} from 'lucide-react';
import { MOCK_ASSIGNMENTS } from '../../constants/mockData';
import { TraineePageHeader } from './TraineePageHeader';

export const TraineeAssignments = () => {
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleOpenSubmission = (item) => {
    setSelectedAssignment(item);
    setUploadedFileName('');
    setSubmissionSuccess(false);
  };

  const handleConfirmSubmission = (e) => {
    e.preventDefault();
    setSubmissionSuccess(true);
    setTimeout(() => {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === selectedAssignment.id
            ? { ...a, status: 'completed', score: 'قيد التصحيح' }
            : a
        )
      );
      setTimeout(() => {
        setSelectedAssignment(null);
        setSubmissionSuccess(false);
      }, 1200);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <TraineePageHeader
        badge="الترم التدريبي الحالي"
        title="سجل الواجبات والمهام العملية"
        subtitle="جدول بمواعيد تسليم الواجبات، الدرجات المعتمدة، وحالات الحل والانتهاء"
        icon={FileText}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs">
            <span className="text-slate-300">إجمالي الواجبات:</span>
            <span className="font-bold text-brand-gold font-mono text-xs">{assignments.length} واجبات</span>
          </div>
        </div>
      </TraineePageHeader>

      <div className="space-y-4">
        {assignments.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all ${
              item.status === 'completed'
                ? 'border-emerald-200/80 shadow-sm hover:shadow-card'
                : item.status === 'expired'
                ? 'border-slate-200/80 bg-slate-50/50 opacity-80'
                : 'border-slate-200/90 shadow-sm hover:shadow-card hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${
                    item.status === 'completed'
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : item.status === 'expired'
                      ? 'bg-slate-200 text-slate-500'
                      : 'bg-brand-purpleDark text-brand-gold shadow-brand-purpleDark/20'
                  }`}
                >
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : item.status === 'expired' ? (
                    <X className="w-5 h-5 text-slate-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-brand-gold" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-brand-purpleDark text-base">
                      {item.title}
                    </h3>

                    {item.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 shrink-0">
                        الدرجة: {item.score}
                      </span>
                    ) : item.score === 'قيد التصحيح' ? (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200 shrink-0">
                        قيد التصحيح
                      </span>
                    ) : item.status === 'expired' ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200 shrink-0">
                        الدرجة: {item.score}
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-brand-background text-brand-purpleDark border border-slate-200 shrink-0">
                        الدرجة: {item.maxScore} درجات
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {item.course}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                    <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span className="font-bold text-slate-800">{item.trainer}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-brand-background px-3 py-1.5 rounded-xl border border-slate-200/80 font-mono shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>يبدأ: {item.startDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs text-slate-600">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border shrink-0 font-mono ${
                      item.status === 'completed'
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                        : item.status === 'expired'
                        ? 'bg-rose-50/70 border-rose-200 text-rose-700'
                        : 'bg-amber-50/70 border-amber-200 text-amber-800'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-bold">
                      {item.status === 'expired' ? 'انتهى في:' : 'آخر موعد:'}
                    </span>
                    <span>{item.endDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                {item.status === 'completed' ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold text-xs">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>تم الحل والتسليم</span>
                  </div>
                ) : item.status === 'expired' ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 font-bold text-xs">
                    <div className="w-4 h-4 rounded-full bg-[#FB5F5F] text-white flex items-center justify-center">
                      <X className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>انتهت فترة التسليم</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenSubmission(item)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-secondary via-brand-orange to-brand-gold text-brand-purpleDark font-black text-xs shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>دخول الواجب والتسليم</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-purpleDark/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 px-6 bg-brand-purpleDark text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-brand-gold">{selectedAssignment.course}</span>
                <h3 className="font-bold text-base text-white">{selectedAssignment.title}</h3>
              </div>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-black text-lg text-brand-purpleDark">تم تسليم الواجب بنجاح!</h4>
                <p className="text-xs text-brand-textLight max-w-sm mx-auto">
                  تم إرسال الملف المرفق للأستاذ ({selectedAssignment.trainer}) وسيتم إشعارك فور رصد الدرجة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmSubmission} className="p-6 space-y-4">
                <div className="p-4 bg-brand-background rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-textLight">أستاذ المقرر:</span>
                    <strong className="text-brand-purpleDark">{selectedAssignment.trainer}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-textLight">الموعد النهائي:</span>
                    <strong className="font-mono text-brand-purpleDark">{selectedAssignment.endDate}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-textLight">الدرجة الكاملة:</span>
                    <strong className="font-mono text-brand-purpleDark">{selectedAssignment.maxScore} درجات</strong>
                  </div>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-brand-primary transition-colors cursor-pointer bg-brand-background/40">
                  <Upload className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                  <p className="text-xs font-bold text-brand-purpleDark">
                    {uploadedFileName || 'اسحب وأفلت ملف الحل هنا أو انقر للاختيار'}
                  </p>
                  <p className="text-[11px] text-brand-textLight mt-1">
                    الملفات المسموحة: PDF, ZIP, DOCX (الحد الأقصى 25 ميجابايت)
                  </p>
                  <input
                    type="file"
                    onChange={(e) => setUploadedFileName(e.target.files[0]?.name || '')}
                    className="mt-3 text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-purpleDark file:text-white hover:file:bg-brand-primary cursor-pointer"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedAssignment(null)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-black bg-brand-purpleDark hover:bg-brand-primary text-white rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    تأكيد رفع وتسليم الحل
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
