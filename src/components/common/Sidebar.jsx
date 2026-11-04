import React from 'react';
import {
  LayoutDashboard,
  BookMarked,
  Video,
  PlaySquare,
  Calendar,
  BookOpen,
  Sparkles,
  FileEdit,
  CheckSquare,
  Layers,
  GraduationCap,
  CreditCard,
  HelpCircle,
  Mail,
  Key,
  CalendarDays,
  CalendarPlus,
  Table,
  FileCheck,
  UserCheck,
  Shuffle,
  Sliders,
  HardDrive,
  BarChart3,
  LogOut,
  X,
  ChevronLeft
} from 'lucide-react';
import logoImg from '../../assets/logoUmmAlqura_white.png';

const getTabIcon = (id) => {
  switch (id) {
    case 'dashboard':
      return LayoutDashboard;
    case 'programs':
      return BookMarked;
    case 'lectures':
      return Video;
    case 'recorded':
      return PlaySquare;
    case 'schedule':
    case 'calendar':
      return Calendar;
    case 'courses':
      return BookOpen;
    case 'short_courses':
      return Sparkles;
    case 'assignments':
      return FileEdit;
    case 'exams':
    case 'exams_management':
      return CheckSquare;
    case 'content':
      return Layers;
    case 'transcript':
      return GraduationCap;
    case 'financials':
      return CreditCard;
    case 'support':
    case 'support_content':
      return HelpCircle;
    case 'mail':
      return Mail;
    case 'account':
      return Key;
    case 'logout':
      return LogOut;
    case 'terms':
      return CalendarDays;
    case 'schedule_builder':
      return CalendarPlus;
    case 'batch_schedules':
      return Table;
    case 'grades':
      return FileCheck;
    case 'attendance':
      return UserCheck;
    case 'customization':
      return Shuffle;
    case 'virtual_room':
      return Video;
    case 'room_features':
      return Sliders;
    case 'recording_policy':
      return HardDrive;
    case 'grade_limits':
      return BarChart3;
    default:
      return LayoutDashboard;
  }
};

export const Sidebar = ({
  currentRole,
  user,
  unreadCount,
  activeTab,
  onSelectTab,
  tabs = [],
  onOpenMail,
  onBackToLanding,
  onLogout,
  isOpenMobile,
  onCloseMobile,
}) => {
  const handleTabClick = (tab) => {
    if (tab.id === 'logout') {
      if (onLogout) onLogout();
      if (onCloseMobile) onCloseMobile();
      return;
    }
    if (tab.id === 'mail') {
      if (onOpenMail) onOpenMail();
      if (onCloseMobile) onCloseMobile();
      return;
    }
    if (tab.id === 'account') {
      if (onSelectTab) onSelectTab('account');
      if (onCloseMobile) onCloseMobile();
      return;
    }
    if (onSelectTab) onSelectTab(tab.id);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full select-none">
      <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div
          onClick={onBackToLanding}
          className="flex items-center gap-3 cursor-pointer group"
          title="العودة للصفحة الرئيسية للمعهد"
        >
          <img
            src={logoImg}
            alt="معهد أم القرى العالي للتدريب"
            className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
          aria-label="إغلاق القائمة"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3.5 py-4 pb-8 space-y-1.5 sm:space-y-2 sidebar-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isHighlighted = tab.id === 'dashboard' || isActive;
          const IconComponent = getTabIcon(tab.id);

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              title={tab.isDiplomaOnly ? 'خاص بالمسجلين في الدبلومات التدريبية' : tab.label}
              className={`w-full group flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                tab.id === 'logout'
                  ? 'text-rose-300 hover:text-white hover:bg-rose-500/15 hover:pr-4'
                  : isHighlighted
                  ? 'bg-gradient-to-l from-brand-secondary via-[#F5C767] to-brand-gold text-brand-purpleDark font-black shadow-[0_4px_16px_rgba(239,177,68,0.3)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 hover:pr-4'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <IconComponent
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform group-hover:scale-110 ${
                    tab.id === 'logout'
                      ? 'text-rose-400 group-hover:text-rose-300'
                      : isHighlighted
                      ? 'text-brand-purpleDark'
                      : 'text-brand-gold/90 group-hover:text-brand-gold'
                  }`}
                />
                <span className="truncate">{tab.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 mr-2">
                {tab.isDiplomaOnly && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isHighlighted
                        ? 'bg-brand-purpleDark/25 text-brand-purpleDark font-black'
                        : 'bg-brand-gold/20 text-brand-gold border border-brand-gold/30'
                    }`}
                  >
                    دبلوم
                  </span>
                )}

                {tab.id === 'mail' && unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-[#FB5F5F] text-white text-[10px] font-black rounded-full shadow-sm animate-pulse">
                    {unreadCount}
                  </span>
                )}

                {isHighlighted && (
                  <ChevronLeft className="w-4 h-4 text-brand-purpleDark" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex fixed top-0 right-0 z-30 h-screen w-64 xl:w-72 bg-gradient-to-b from-[#1C184D] via-[#262262] to-[#141033] border-l border-white/10 text-white flex-col shadow-2xl">
        {sidebarContent}
      </aside>

      {isOpenMobile && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-72 max-w-[85vw] bg-gradient-to-b from-[#1C184D] via-[#262262] to-[#141033] border-l border-white/10 text-white flex flex-col shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
