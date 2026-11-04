import React, { useState, useEffect } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Users,
  MessageSquare,
  Share2,
  Hand,
  Maximize2,
  Minimize2,
  Disc,
  VolumeX,
  Lock,
  Unlock,
  PenTool,
  Type,
  Eraser,
  ChevronRight,
  ChevronLeft,
  FileText,
  Radio,
  Monitor,
  Presentation,
  Send,
  X,
  Sparkles
} from 'lucide-react';

export const VirtualClassroomMockup = ({
  settings,
  onClose,
  initialRole = 'trainer',
  lectureTitle = 'تطوير تطبيقات الويب الحديثة - شعبة 101',
  instructorName = 'د. فيصل إبراهيم الشهري'
}) => {
  const [activeRole, setActiveRole] = useState(initialRole);
  const [isMicOn, setIsMicOn] = useState(!settings?.muteMicsOnJoin);
  const [isVideoOn, setIsVideoOn] = useState(!settings?.disableCamerasOnJoin);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(Boolean(settings?.autoRecordLectures));
  const [recordingSeconds, setRecordingSeconds] = useState(148);
  const [isChatDisabled, setIsChatDisabled] = useState(Boolean(settings?.disableChat));
  const [activeSidebarTab, setActiveSidebarTab] = useState('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 6;
  const [whiteboardTool, setWhiteboardTool] = useState('pointer');
  const [whiteboardPenColor] = useState('#EFB144');
  const [whiteboardDrawings, setWhiteboardDrawings] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [myHandRaised, setMyHandRaised] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [attendeeSearch, setAttendeeSearch] = useState('');

  const [participants, setParticipants] = useState([
    { id: 'p1', name: 'د. فيصل إبراهيم الشهري', role: 'trainer', isHost: true, isMicOn: true, isVideoOn: true, handRaised: false, isAttached: false },
    { id: 'p2', name: 'عبدالله بن أحمد القرشي', role: 'trainee', isHost: false, isMicOn: false, isVideoOn: false, handRaised: true, isAttached: false },
    { id: 'p3', name: 'سارة بنت محمد المطيري', role: 'trainee', isHost: false, isMicOn: false, isVideoOn: false, handRaised: false, isAttached: false },
    { id: 'p4', name: 'خالد بن ناصر الغامدي', role: 'trainee', isHost: false, isMicOn: false, isVideoOn: false, handRaised: false, isAttached: true },
    { id: 'p5', name: 'ريان بن عبدالكريم الحربي', role: 'trainee', isHost: false, isMicOn: false, isVideoOn: false, handRaised: false, isAttached: false },
    { id: 'p6', name: 'فيصل بن ماجد الزهراني', role: 'trainee', isHost: false, isMicOn: false, isVideoOn: false, handRaised: false, isAttached: true },
    { id: 'p7', name: 'منى بنت عبدالعزيز السليمان', role: 'trainee', isHost: false, isMicOn: false, isVideoOn: false, handRaised: false, isAttached: false },
    { id: 'p8', name: 'عمر بن طارق العتيبي', role: 'trainee', isHost: false, isMicOn: false, isVideoOn: false, handRaised: false, isAttached: false }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'د. فيصل إبراهيم الشهري', role: 'trainer', text: 'السلام عليكم ورحمة الله وبركاته، مرحباً بكم في المحاضرة التفاعلية الرابعة.', time: '10:02 ص' },
    { id: 2, sender: 'عبدالله القرشي', role: 'trainee', text: 'وعليكم السلام يا دكتور، الصوت والصورة وشاشة العرض واضحة تماماً.', time: '10:03 ص' },
    { id: 3, sender: 'سارة المطيري', role: 'trainee', text: 'شكراً دكتور، هل سيتم رفع التسجيل بعد انتهاء المحاضرة؟', time: '10:04 ص' },
    { id: 4, sender: 'د. فيصل إبراهيم الشهري', role: 'trainer', text: 'نعم بالتأكيد، التسجيل يتم بشكل آلي طبقاً لسياسات معهد أم القرى العالي للتدريب.', time: '10:05 ص' }
  ]);
  const [newChatText, setNewChatText] = useState('');

  const [sharedNotes, setSharedNotes] = useState(
    '• محور اليوم: معمارية التطبيقات السحابية والربط مع BigBlueButton / plugNmeet API.\n• موعد تسليم الواجب الأول: يوم الأحد القادم حتى الساعة 11:59 مساءً.\n• تذكير: درجات الواجب تخضع لحدود الدرجات المعتمدة في النظام (الحد الأقصى 10 درجات).'
  );

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isCountHidden = activeRole === 'trainer'
    ? Boolean(settings?.hideAttendeeCountTrainers)
    : Boolean(settings?.hideAttendeeCountTrainees);

  const handleMuteAll = () => {
    setParticipants((prev) =>
      prev.map((p) => (p.role === 'trainer' ? p : { ...p, isMicOn: false }))
    );
    showToast('تم كتم صوت جميع المتدربين في القاعة بنجاح.');
  };

  const handleToggleChatPermission = () => {
    const nextState = !isChatDisabled;
    setIsChatDisabled(nextState);
    showToast(nextState ? 'تم إيقاف المحادثة النصية لكافة المتدربين.' : 'تم تفعيل المحادثة النصية للجميع.');
  };

  const handleToggleRecording = () => {
    if (settings?.autoRecordLectures) {
      showToast('التسجيل التلقائي مفعل نظامياً من إعدادات الآدمن ولا يمكن إيقافه.');
      return;
    }
    setIsRecording(!isRecording);
    showToast(!isRecording ? 'تم بدء التسجيل اليدوي للمحاضرة.' : 'تم إيقاف التسجيل مؤقتاً.');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newChatText.trim() || isChatDisabled) return;

    const newMsg = {
      id: Date.now(),
      sender: activeRole === 'trainer' ? instructorName : 'عبدالله القرشي (أنا)',
      role: activeRole,
      text: newChatText.trim(),
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setNewChatText('');
  };

  const handleAddWhiteboardDot = (e) => {
    if (whiteboardTool === 'pointer') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setWhiteboardDrawings((prev) => [
      ...prev,
      { id: Date.now(), x, y, tool: whiteboardTool, color: whiteboardPenColor }
    ]);
  };

  const clearWhiteboard = () => {
    setWhiteboardDrawings([]);
    showToast('تم مسح رسومات السبورة التفاعلية.');
  };

  const filteredParticipants = participants.filter((p) =>
    p.name.includes(attendeeSearch)
  );

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-[#0F1117] text-white font-sans ${isFullscreen ? 'p-0' : 'p-2 sm:p-4 bg-navy-950/85 backdrop-blur-md'}`}>
      <div className={`flex flex-col flex-1 bg-[#131722] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden ${isFullscreen ? 'rounded-none border-0' : ''}`}>
        
        <header className="h-14 px-4 bg-[#181E2E] border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#262262] border border-[#EFB144]/40 flex items-center justify-center text-[#EFB144] shadow-sm">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <span>{lectureTitle}</span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  بث مباشر
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#262262]/80 text-[#EFB144] border border-[#EFB144]/30">
                  {settings?.activePlatform || 'BigBlueButton Core'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>المحاضر: {instructorName}</span>
                <span>•</span>
                <span>الغرفة الافتراضية المعتمدة</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 bg-[#0F1117] px-2.5 py-1 rounded-xl border border-slate-800 text-xs">
              <span className="text-[11px] text-slate-400 hidden md:inline">وضع المعاينة:</span>
              <button
                type="button"
                onClick={() => {
                  setActiveRole('trainer');
                  showToast('تم التحويل لوضع معاينة المدرب (متحكم)');
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                  activeRole === 'trainer'
                    ? 'bg-[#262262] text-[#EFB144] border border-[#EFB144]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                المدرب
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveRole('trainee');
                  showToast('تم التحويل لوضع معاينة المتدرب (مستمع)');
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                  activeRole === 'trainee'
                    ? 'bg-[#262262] text-[#EFB144] border border-[#EFB144]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                المتدرب
              </button>
            </div>

            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                isRecording
                  ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400'
              }`}
              title={settings?.autoRecordLectures ? 'التسجيل التلقائي مفعل بواسطة الآدمن' : 'حالة التسجيل'}
            >
              <Disc className={`w-3.5 h-3.5 ${isRecording ? 'text-rose-500 animate-spin' : 'text-slate-500'}`} />
              <span className="font-mono">{formatTimer(recordingSeconds)}</span>
              {settings?.autoRecordLectures && (
                <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800/40 hidden lg:inline">
                  آلي ملزم
                </span>
              )}
            </div>

            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
                isCountHidden
                  ? 'bg-amber-950/30 border-amber-700/50 text-amber-300'
                  : 'bg-slate-800/70 border-slate-700 text-slate-200'
              }`}
              title={isCountHidden ? 'إخفاء عدد الحضور مفعل بالسياسات' : 'عدد الحضور الفعلي'}
            >
              {isCountHidden ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-bold">العدد مخفي بموجب السياسة</span>
                </>
              ) : (
                <>
                  <Users className="w-3.5 h-3.5 text-[#EFB144]" />
                  <span className="font-bold">38 حاضر</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title={isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 transition-colors"
                title="إغلاق المحاكاة"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {toastMessage && (
          <div className="bg-[#EFB144] text-[#262262] text-xs font-bold py-1.5 px-4 text-center shadow-md animate-in fade-in flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#262262]" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="flex-1 flex overflow-hidden relative">
          
          <main className="flex-1 flex flex-col bg-[#0F1117] relative overflow-hidden">
            
            <div className="h-10 px-4 bg-[#141824] border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsScreenSharing(false)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    !isScreenSharing
                      ? 'bg-[#262262] text-[#EFB144] border border-[#EFB144]/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>السبورة والشرائح</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsScreenSharing(true)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    isScreenSharing
                      ? 'bg-[#262262] text-[#EFB144] border border-[#EFB144]/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>مشاركة الشاشة الحية</span>
                  {isScreenSharing && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              </div>

              {!isScreenSharing && (
                <div className="flex items-center gap-1 bg-[#1A2030] px-2 py-0.5 rounded-lg border border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => setWhiteboardTool('pointer')}
                    className={`p-1 rounded ${whiteboardTool === 'pointer' ? 'bg-[#EFB144] text-[#262262]' : 'text-slate-400 hover:text-white'}`}
                    title="مؤشر تفاعلي"
                  >
                    <Radio className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setWhiteboardTool('pen')}
                    className={`p-1 rounded ${whiteboardTool === 'pen' ? 'bg-[#EFB144] text-[#262262]' : 'text-slate-400 hover:text-white'}`}
                    title="قلم السبورة"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setWhiteboardTool('text')}
                    className={`p-1 rounded ${whiteboardTool === 'text' ? 'bg-[#EFB144] text-[#262262]' : 'text-slate-400 hover:text-white'}`}
                    title="إضافة نص توضيحي"
                  >
                    <Type className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-[1px] h-3.5 bg-slate-700 mx-1" />
                  <button
                    type="button"
                    onClick={clearWhiteboard}
                    className="p-1 rounded text-rose-400 hover:text-rose-300"
                    title="مسح كافة الرسومات"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {!isScreenSharing && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentSlide <= 1}
                    onClick={() => setCurrentSlide((p) => Math.max(1, p - 1))}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs font-bold text-slate-200">
                    شريحة {currentSlide} / {totalSlides}
                  </span>
                  <button
                    type="button"
                    disabled={currentSlide >= totalSlides}
                    onClick={() => setCurrentSlide((p) => Math.min(totalSlides, p + 1))}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div
              className="flex-1 relative flex items-center justify-center p-4 bg-[#0B0D13] select-none cursor-crosshair overflow-hidden"
              onClick={handleAddWhiteboardDot}
            >
              {isScreenSharing ? (
                <div className="w-full h-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95">
                  <div className="h-8 bg-slate-800 px-3 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-700">
                    <span className="flex items-center gap-1.5 font-mono text-emerald-400">
                      <Monitor className="w-3.5 h-3.5" />
                      مشاركة حية من شاشة د. فيصل: Visual Studio Code - App.jsx
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded text-[10px] font-bold">
                      1080p 60fps
                    </span>
                  </div>
                  <div className="flex-1 p-6 font-mono text-xs text-slate-300 leading-relaxed bg-[#1e1e1e] overflow-auto">
                    <p className="text-emerald-400"># وحدة إدارة القاعة الافتراضية - معهد أم القرى</p>
                    <p className="text-blue-400">import <span className="text-white">React</span> from <span className="text-amber-300">'react'</span>;</p>
                    <p className="text-blue-400">export const <span className="text-yellow-300">VirtualRoomEngine</span> = () =&gt; &#123;</p>
                    <p className="pl-4 text-purple-400">const <span className="text-white">bbbClient</span> = new <span className="text-yellow-300">BigBlueButtonAPI</span>();</p>
                    <p className="pl-4 text-slate-400">return &lt;<span className="text-rose-400">ClassroomCanvas</span> activePlatform="<span className="text-amber-300">BBB-WebRTC</span>" /&gt;;</p>
                    <p className="text-blue-400">&#125;;</p>
                    <div className="mt-8 p-4 bg-navy-950/80 border border-[#EFB144]/30 rounded-xl text-center text-slate-200">
                      <p className="text-sm font-bold text-[#EFB144]">التطبيق العملي: تكامل واجهات البرمجة للقاعات التفاعلية</p>
                      <p className="text-xs text-slate-400 mt-1">يتابع المتدربون حالياً شرح المدرب الحي على الشاشة المباشرة</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full max-w-4xl bg-[#141824] border border-slate-800 rounded-2xl flex flex-col justify-between p-8 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#EFB144_1px,transparent_1px)] [background-size:20px_20px]" />

                  {whiteboardDrawings.map((draw) => (
                    <div
                      key={draw.id}
                      style={{ left: `${draw.x}%`, top: `${draw.y}%` }}
                      className="absolute w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFB144] shadow-md pointer-events-none animate-ping"
                    />
                  ))}

                  <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-b border-slate-700/60 pb-3">
                    <span className="font-bold text-slate-200">المقرر: تطوير تطبيقات الويب الحديثة (WEB-301)</span>
                    <span className="text-[#EFB144] font-semibold">معهد أم القرى العالي للتدريب</span>
                  </div>

                  <div className="relative z-10 my-auto space-y-4">
                    <div className="inline-flex p-3 rounded-2xl bg-[#262262]/80 border border-[#EFB144]/40 shadow-inner">
                      <Sparkles className="w-8 h-8 text-[#EFB144]" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {currentSlide === 1 && 'المحاضرة 4: تصميم الواجهات التفاعلية وأنظمة التعليم'}
                      {currentSlide === 2 && 'بنية الاتصال الصوتي والمرئي بتقنية WebRTC'}
                      {currentSlide === 3 && 'سياسات التحكم وإخفاء عدد الحضور في القاعات'}
                      {currentSlide === 4 && 'ربط التقييمات الآلية مع حدود الدرجات النظامية'}
                      {currentSlide === 5 && 'دورة حياة تسجيل المحاضرات والأرشفة السحابية'}
                      {currentSlide === 6 && 'خلاصة الجلسة وتوجيهات الواجب القادم'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                      {currentSlide === 1 && 'نستعرض اليوم هيكل منصات القاعات التفاعلية، ودور مفاتيح التحكم المركزية في تنظيم تجربة المتدرب والمدرب.'}
                      {currentSlide === 2 && 'كيف يتم معالجة تدفقات الصوت والفيديو بمعدلات تأخير منخفضة جداً عبر خوادم BigBlueButton و plugNmeet.'}
                      {currentSlide === 3 && 'التحكم الصارم في خصوصية الحضور ومراعاة الفروق الفردية وإلغاء تشتت المتدرب من خلال إخفاء الأعداد.'}
                      {currentSlide === 4 && 'تطبيق القيود الصارمة على مدخلات الدرجات لمنع إدخال قيم تتجاوز الحدود المعتمدة في اللائحة.'}
                      {currentSlide === 5 && 'التسجيل التلقائي فور بدء الجلسة والاحتفاظ بالتسجيل لمدة 30 يوماً قبل الأرشفة.'}
                      {currentSlide === 6 && 'يمكن لكافة المتدربين مراجعة التسجيل عبر شاشة المحاضرات المسجلة والبدء بحل الواجب.'}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-700/60">
                    <span>انقر على السبورة لإضافة نقاط وشروح تفاعلية</span>
                    <span>النظام التعليمي المتكامل 1448 هـ</span>
                  </div>
                </div>
              )}

              <div className="absolute top-4 left-4 z-20 w-44 bg-[#181E2E]/90 backdrop-blur border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                <div className="h-28 bg-[#0F1117] flex items-center justify-center relative">
                  <div className="w-12 h-12 rounded-full bg-[#262262] border border-[#EFB144] flex items-center justify-center font-bold text-white text-sm">
                    د.ف
                  </div>
                  <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-1 rounded-full text-[10px] animate-pulse">
                    <Mic className="w-3 h-3" />
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-slate-300">
                    المحاضر
                  </div>
                </div>
                <div className="p-2 text-center bg-[#181E2E]">
                  <p className="text-[11px] font-bold text-slate-200 truncate">{instructorName}</p>
                </div>
              </div>

              {myHandRaised && (
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-[#EFB144] text-[#262262] px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg animate-bounce">
                  <Hand className="w-4 h-4" />
                  <span>يدك مرفوعة لطلب المشاركة</span>
                </div>
              )}
            </div>

            <footer className="h-16 px-4 bg-[#141824] border-t border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isMicOn
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-rose-950/50 text-rose-300 border-rose-800/80 hover:bg-rose-900/60'
                  }`}
                  title={isMicOn ? 'كتم المايك' : 'تشغيل المايك'}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isMicOn ? 'الصوت نشط' : 'مكتوم'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isVideoOn
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-rose-950/50 text-rose-300 border-rose-800/80 hover:bg-rose-900/60'
                  }`}
                  title={isVideoOn ? 'إيقاف الكاميرا' : 'تشغيل الكاميرا'}
                >
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isVideoOn ? 'الكاميرا نشطة' : 'معطلة'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const next = !myHandRaised;
                    setMyHandRaised(next);
                    showToast(next ? 'تم رفع اليد لطلب الكلمة.' : 'تم إنزال اليد.');
                  }}
                  className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                    myHandRaised
                      ? 'bg-[#EFB144] text-[#262262] border-[#EFB144]'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="رفع اليد"
                >
                  <Hand className="w-4 h-4" />
                  <span className="hidden sm:inline">رفع اليد</span>
                </button>
              </div>

              {activeRole === 'trainer' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleMuteAll}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all"
                    title="كتم صوت جميع المتدربين دفعة واحدة"
                  >
                    <VolumeX className="w-4 h-4 text-amber-400" />
                    <span className="hidden md:inline">كتم الجميع</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleChatPermission}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                      isChatDisabled
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    }`}
                    title="تبديل صلاحية الشات العام"
                  >
                    {isChatDisabled ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    <span className="hidden md:inline">{isChatDisabled ? 'الشات موقوف' : 'إيقاف الشات'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleRecording}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                      isRecording
                        ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                    title="التسجيل اليدوي"
                  >
                    <Disc className="w-4 h-4" />
                    <span className="hidden lg:inline">{isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                      isScreenSharing
                        ? 'bg-[#262262] text-[#EFB144] border-[#EFB144]/60'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden xl:inline">مشاركة الشاشة</span>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSidebarOpen
                      ? 'bg-[#262262] text-[#EFB144] border-[#EFB144]/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="إظهار/إخفاء اللوحة الجانبية"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span className="hidden sm:inline">إنهاء الجلسة</span>
                </button>
              </div>
            </footer>
          </main>

          {isSidebarOpen && (
            <aside className="w-80 sm:w-88 bg-[#181E2E] border-r border-slate-800 flex flex-col shrink-0 animate-in slide-in-from-right duration-200">
              
              <div className="h-12 border-b border-slate-800 flex items-center p-1 bg-[#131722]">
                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('chat')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeSidebarTab === 'chat'
                      ? 'bg-[#262262] text-[#EFB144] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>الدردشة العامة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('participants')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeSidebarTab === 'participants'
                      ? 'bg-[#262262] text-[#EFB144] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>المشاركون</span>
                  {!isCountHidden && (
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded-full">
                      {participants.length}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('notes')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeSidebarTab === 'notes'
                      ? 'bg-[#262262] text-[#EFB144] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>ملاحظات</span>
                </button>
              </div>

              {activeSidebarTab === 'chat' && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {isChatDisabled && (
                    <div className="p-2.5 bg-rose-950/60 border-b border-rose-800/60 text-rose-300 text-[11px] font-bold flex items-center gap-2">
                      <Lock className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>تم إيقاف الدردشة بواسطة المدرب أو السياسة العامة.</span>
                    </div>
                  )}

                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-2.5 rounded-xl border ${
                          msg.role === 'trainer'
                            ? 'bg-[#262262]/40 border-[#EFB144]/30'
                            : 'bg-[#131722] border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className={`font-bold ${msg.role === 'trainer' ? 'text-[#EFB144]' : 'text-slate-200'}`}>
                            {msg.sender}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{msg.time}</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-2.5 border-t border-slate-800 bg-[#131722] flex gap-2">
                    <input
                      type="text"
                      disabled={isChatDisabled}
                      value={newChatText}
                      onChange={(e) => setNewChatText(e.target.value)}
                      placeholder={isChatDisabled ? 'الدردشة مغلقة حالياً' : 'اكتب رسالتك للمدرب والمتدربين...'}
                      className="flex-1 bg-[#181E2E] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#EFB144] placeholder-slate-500 disabled:opacity-40"
                    />
                    <button
                      type="submit"
                      disabled={isChatDisabled || !newChatText.trim()}
                      className="bg-[#262262] hover:bg-[#322c7a] disabled:opacity-40 text-[#EFB144] p-2 rounded-xl transition-all border border-[#EFB144]/40"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {activeSidebarTab === 'participants' && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="p-2.5 border-b border-slate-800">
                    <input
                      type="text"
                      value={attendeeSearch}
                      onChange={(e) => setAttendeeSearch(e.target.value)}
                      placeholder="بحث في الحاضرين..."
                      className="w-full bg-[#131722] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#EFB144] placeholder-slate-500"
                    />
                  </div>

                  <div className="px-3 py-2 bg-[#141824] border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>قائمة الحضور المسجلين</span>
                    {isCountHidden ? (
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        العدد مخفي
                      </span>
                    ) : (
                      <span className="font-bold text-slate-200">
                        {filteredParticipants.length} مشارك
                      </span>
                    )}
                  </div>

                  <div className="flex-1 p-2 overflow-y-auto space-y-1.5">
                    {filteredParticipants.map((p) => (
                      <div
                        key={p.id}
                        className={`p-2 rounded-xl border flex items-center justify-between transition-colors ${
                          p.role === 'trainer'
                            ? 'bg-[#262262]/30 border-[#EFB144]/40'
                            : 'bg-[#131722] border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            p.role === 'trainer'
                              ? 'bg-[#262262] text-[#EFB144] border border-[#EFB144]/50'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {p.name.charAt(0)}
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-200 truncate flex items-center gap-1">
                              <span>{p.name}</span>
                              {p.isHost && (
                                <span className="text-[9px] bg-[#EFB144]/20 text-[#EFB144] px-1 rounded font-bold">
                                  مضيف
                                </span>
                              )}
                              {p.isAttached && (
                                <span className="text-[9px] bg-teal-500/20 text-teal-300 px-1 rounded font-semibold">
                                  ملحق
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {p.role === 'trainer' ? 'المدرب المحاضر' : 'متدرب'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {p.handRaised && (
                            <span className="text-amber-400 p-1" title="يد مرفوعة">
                              <Hand className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <span
                            className={`p-1 rounded ${p.isMicOn ? 'text-emerald-400' : 'text-slate-500'}`}
                            title={p.isMicOn ? 'المايك يعمل' : 'المايك مكتوم'}
                          >
                            {p.isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                          </span>
                          <span
                            className={`p-1 rounded ${p.isVideoOn ? 'text-emerald-400' : 'text-slate-500'}`}
                            title={p.isVideoOn ? 'الكاميرا تعمل' : 'الكاميرا مغلقة'}
                          >
                            {p.isVideoOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSidebarTab === 'notes' && (
                <div className="flex-1 flex flex-col p-3 overflow-hidden">
                  <div className="text-[11px] text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#EFB144]" />
                    <span>الملاحظات التشاركية للجلسة:</span>
                  </div>
                  <textarea
                    value={sharedNotes}
                    onChange={(e) => setSharedNotes(e.target.value)}
                    rows={12}
                    className="flex-1 w-full bg-[#131722] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#EFB144] resize-none leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-500 mt-2">
                    يتم حفظ هذه الملاحظات في سجل المحاضرة ويمكن لكافة الحضور تصديرها.
                  </p>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};
