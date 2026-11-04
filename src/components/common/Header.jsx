import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  ChevronDown, 
  LogOut, 
  Menu, 
  ShieldCheck, 
  Briefcase, 
  UserCheck
} from 'lucide-react';
import { ROLES, ROLE_LABELS } from '../../constants/mockData';
import logoImg from '../../assets/logoUmmAlqura_white.png';

export const Header = ({
  currentRole,
  user,
  onSelectTab,
  onBackToLanding,
  onLogout,
  onToggleSidebar,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const getRoleBadge = (role) => {
    switch (role) {
      case ROLES.TRAINEE:
        return { text: 'بوابة المتدرب', icon: GraduationCap, color: 'text-brand-gold bg-brand-gold/15 border-brand-gold/30' };
      case ROLES.TRAINER:
        return { text: 'بوابة المدرب', icon: UserCheck, color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' };
      case ROLES.STAFF:
        return { text: 'شؤون المتدربين', icon: Briefcase, color: 'text-brand-orange bg-brand-orange/15 border-brand-orange/30' };
      case ROLES.ADMIN:
        return { text: 'لوحة الإدارة', icon: ShieldCheck, color: 'text-rose-400 bg-rose-500/15 border-rose-500/30' };
      default:
        return { text: 'منصة التدريب', icon: GraduationCap, color: 'text-brand-gold bg-brand-gold/15 border-brand-gold/30' };
    }
  };

  const badge = getRoleBadge(currentRole);
  const BadgeIcon = badge.icon;

  return (
    <header className="sticky top-0 z-20 h-16 bg-brand-purpleDark/95 backdrop-blur-md border-b border-white/10 text-white shadow-elevated">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all cursor-pointer"
              title="فتح القائمة الجانبية"
              aria-label="فتح القائمة"
            >
              <Menu className="w-5 h-5 text-brand-gold" />
            </button>

            <div 
              onClick={onBackToLanding}
              className="flex lg:hidden items-center cursor-pointer group py-1"
              title="العودة للصفحة الرئيسية للمعهد"
            >
              <img
                src={logoImg}
                alt="معهد أم القرى العالي للتدريب"
                className="h-7 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </div>

            <div className={`hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold shadow-xs select-none ${badge.color}`}>
              <BadgeIcon className="w-4 h-4 shrink-0" />
              <span>{badge.text}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-label="قائمة الملف الشخصي"
                aria-expanded={isProfileMenuOpen}
                className={`flex items-center gap-2.5 p-1.5 pr-2 rounded-xl border transition-all focus:outline-none cursor-pointer ${
                  isProfileMenuOpen 
                    ? 'bg-white/20 border-brand-gold/50 shadow-sm' 
                    : 'bg-white/10 hover:bg-white/15 border-white/10'
                }`}
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-brand-purpleDark flex items-center justify-center border border-brand-gold/40 shrink-0">
                  {user?.avatar && !user.avatar.includes('unsplash.com') ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-4.5 h-4.5 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 0116 0H4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-bold text-white max-w-[130px] truncate">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-brand-gold font-medium">
                    {ROLE_LABELS[currentRole]}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileMenuOpen(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-gradient-to-b from-[#1C184D] to-[#262262] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-brand-gold/30 p-2 text-white z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                    <div className="px-3.5 py-3 border-b border-white/10 text-right">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-brand-purpleDark flex items-center justify-center border border-brand-gold/40 shrink-0 shadow-xs">
                          {user?.avatar && !user.avatar.includes('unsplash.com') ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-5 h-5 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 0116 0H4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white tracking-wide truncate">{user.name}</p>
                          <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-brand-gold/15 border border-brand-gold/30 text-[10px] font-bold text-brand-gold">
                            <span>{currentRole === ROLES.TRAINEE ? 'الرقم الأكاديمي:' : 'الرقم الوظيفي:'}</span>
                            <span className="font-mono">{user.traineeId || user.employeeId || 'UQT-2026'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1.5 space-y-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          if (onSelectTab) onSelectTab('dashboard');
                        }}
                        className="lg:hidden w-full px-3 py-2 text-xs font-bold text-right rounded-xl bg-brand-gold/10 hover:bg-brand-gold/20 flex items-center justify-between text-brand-gold transition-all cursor-pointer group border border-brand-gold/30"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-brand-gold/20 flex items-center justify-center transition-colors border border-brand-gold/40">
                            <BadgeIcon className="w-3.5 h-3.5 text-brand-gold" />
                          </div>
                          <span>{badge.text}</span>
                        </div>
                        <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-md font-medium">
                          الرئيسية
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onSelectTab('account');
                        }}
                        className="w-full px-3 py-2.5 text-xs font-bold text-right rounded-xl hover:bg-white/10 flex items-center gap-2.5 text-slate-200 hover:text-white transition-all cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-brand-gold/20 flex items-center justify-center transition-colors border border-white/10 group-hover:border-brand-gold/40">
                          <User className="w-3.5 h-3.5 text-brand-gold" />
                        </div>
                        <span>حسابي</span>
                      </button>

                      <div className="border-t border-white/10 my-1" />

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full px-3 py-2.5 text-xs font-bold text-right rounded-xl hover:bg-rose-500/15 flex items-center gap-2.5 text-rose-300 hover:text-rose-200 transition-all cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-500/10 group-hover:bg-rose-500/25 flex items-center justify-center transition-colors border border-rose-500/20">
                          <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        </div>
                        <span>تسجيل خروج</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
