import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingPage } from './components/landing/LandingPage';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { NotificationBanner } from './components/common/NotificationBanner';
import { EmailVerificationModal } from './components/common/EmailVerificationModal';
import { MailModal } from './components/common/MailModal';
import { ProfileModal } from './components/common/ProfileModal';
import { VirtualRoomModal } from './components/common/VirtualRoomModal';
import { LogoutModal } from './components/common/LogoutModal';
import { AuthPage } from './components/auth/AuthPage';
import { CustomCursor } from './components/common/CustomCursor';

import { TraineeDashboard } from './components/trainee/TraineeDashboard';
import { TraineePrograms } from './components/trainee/TraineePrograms';
import { TraineeLectures } from './components/trainee/TraineeLectures';
import { TraineeRecorded } from './components/trainee/TraineeRecorded';
import { TraineeSchedule } from './components/trainee/TraineeSchedule';
import { TraineeCourses } from './components/trainee/TraineeCourses';
import { TraineeAssignments } from './components/trainee/TraineeAssignments';
import { TraineeExams } from './components/trainee/TraineeExams';
import { TraineeDigitalContent } from './components/trainee/TraineeDigitalContent';
import { TraineeTranscript } from './components/trainee/TraineeTranscript';
import { TraineeFinancials } from './components/trainee/TraineeFinancials';
import { TraineeSupport } from './components/trainee/TraineeSupport';
import { TraineeAccount } from './components/trainee/TraineeAccount';

import { TrainerDashboard } from './components/trainer/TrainerDashboard';
import { TrainerCourses } from './components/trainer/TrainerCourses';
import { TrainerShortCourses } from './components/trainer/TrainerShortCourses';
import { TrainerCalendar } from './components/trainer/TrainerCalendar';
import { TrainerAssessments } from './components/trainer/TrainerAssessments';

import { StaffCourseExemption } from './components/staff/StaffCourseExemption';
import { StaffGradeEntry } from './components/staff/StaffGradeEntry';
import { StaffScheduleBuilder } from './components/staff/StaffScheduleBuilder';
import { StaffBatchSchedules } from './components/staff/StaffBatchSchedules';
import { StaffLecturesMonitoring } from './components/staff/StaffLecturesMonitoring';
import { StaffRecordingsLifecycle } from './components/staff/StaffRecordingsLifecycle';
import { StaffExamsManagement } from './components/staff/StaffExamsManagement';

import { AdminSettings } from './components/admin/AdminSettings';

import {
  ROLES,
  USERS,
  CURRENT_USER,
  TRAINEE_TABS,
  TRAINER_TABS,
  STAFF_TABS,
  ADMIN_TABS,
} from './constants/mockData';

const parseRouteFromUrl = (pathname) => {
  const cleanPath = (pathname || (typeof window !== 'undefined' ? window.location.pathname : '/')).replace(/\/+$/, '') || '/';
  if (cleanPath === '/' || cleanPath === '') {
    return { viewMode: 'landing', tab: 'dashboard' };
  }
  if (cleanPath === '/login') {
    return { viewMode: 'login', tab: 'dashboard' };
  }
  if (cleanPath === '/register') {
    return { viewMode: 'register', tab: 'dashboard' };
  }
  if (cleanPath.startsWith('/portal')) {
    const segments = cleanPath.split('/').filter(Boolean);
    const tab = segments[1] || 'dashboard';
    return { viewMode: 'portal', tab };
  }
  return { viewMode: 'landing', tab: 'dashboard' };
};

const getUrlFromRoute = (viewMode, activeTab) => {
  if (viewMode === 'landing') return '/';
  if (viewMode === 'login') return '/login';
  if (viewMode === 'register') return '/register';
  if (viewMode === 'portal') {
    return activeTab ? `/portal/${activeTab}` : '/portal/dashboard';
  }
  return '/';
};

export default function App() {
  const initialRoute = parseRouteFromUrl(typeof window !== 'undefined' ? window.location.pathname : '/');

  const [viewMode, setViewMode] = useState(() => initialRoute.viewMode);

  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const savedRole = localStorage.getItem('uqt_lms_role');
      return savedRole && Object.values(ROLES).includes(savedRole) ? savedRole : ROLES.TRAINEE;
    } catch {
      return ROLES.TRAINEE;
    }
  });

  const [activeTab, setActiveTab] = useState(() => {
    if (initialRoute.viewMode === 'portal' && initialRoute.tab) {
      return initialRoute.tab;
    }
    try {
      return localStorage.getItem('uqt_lms_activeTab') || 'dashboard';
    } catch {
      return 'dashboard';
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUserStr = localStorage.getItem('uqt_lms_user');
      if (savedUserStr) {
        const parsed = JSON.parse(savedUserStr);
        if (parsed.avatar && parsed.avatar.includes('unsplash.com')) {
          parsed.avatar = '';
          try {
            localStorage.setItem('uqt_lms_user', JSON.stringify(parsed));
          } catch {}
        }
        return parsed;
      }
      const savedRole = localStorage.getItem('uqt_lms_role');
      if (savedRole && USERS[savedRole]) return USERS[savedRole];
      return CURRENT_USER;
    } catch {
      return CURRENT_USER;
    }
  });

  useEffect(() => {
    const targetUrl = getUrlFromRoute(viewMode, activeTab);
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
  }, [viewMode, activeTab]);

  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromUrl(window.location.pathname);
      setViewMode(route.viewMode);
      if (route.viewMode === 'portal' && route.tab) {
        setActiveTab(route.tab);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('uqt_lms_role', currentRole);
    } catch {}
  }, [currentRole]);

  useEffect(() => {
    try {
      localStorage.setItem('uqt_lms_activeTab', activeTab);
    } catch {}
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem('uqt_lms_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeVirtualRoom, setActiveVirtualRoom] = useState(null);
  const [authInitialRole, setAuthInitialRole] = useState(ROLES.TRAINEE);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleRequestLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    try {
      localStorage.setItem('uqt_lms_viewMode', 'landing');
    } catch {}
    setViewMode('landing');
  };

  const handleOpenAuth = (mode = 'login', role = ROLES.TRAINEE) => {
    setAuthInitialRole(role);
    setViewMode(mode);
  };

  const handleLoginSuccess = (role) => {
    if (USERS[role]) {
      setUser(USERS[role]);
    }
    handleRoleChange(role);
    setViewMode('portal');
  };

  const handleRegisterSuccess = (newUserData) => {
    setUser((prev) => ({
      ...prev,
      ...newUserData,
    }));
    handleRoleChange(ROLES.TRAINEE);
    setViewMode('portal');
  };

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    if (USERS[newRole]) {
      setUser(USERS[newRole]);
    }
    if (newRole === ROLES.TRAINEE) {
      setActiveTab('dashboard');
    } else if (newRole === ROLES.TRAINER) {
      setActiveTab('dashboard');
    } else if (newRole === ROLES.STAFF) {
      setActiveTab('schedule_builder');
    } else if (newRole === ROLES.ADMIN) {
      setActiveTab('virtual_room');
    }
  };

  const getTabsForCurrentRole = () => {
    switch (currentRole) {
      case ROLES.TRAINEE:
        return TRAINEE_TABS;
      case ROLES.TRAINER:
        return TRAINER_TABS;
      case ROLES.STAFF:
        return STAFF_TABS;
      case ROLES.ADMIN:
        return ADMIN_TABS;
      default:
        return TRAINEE_TABS;
    }
  };

  const handleVerifySuccess = () => {
    setUser((prev) => ({
      ...prev,
      isEmailVerified: true,
    }));
  };

  const handleStartLiveLecture = (lecture) => {
    setActiveVirtualRoom(lecture);
  };

  const renderContent = () => {
    if (currentRole === ROLES.TRAINEE) {
      switch (activeTab) {
        case 'dashboard':
          return (
            <TraineeDashboard
              onNavigateTab={(tabId) => setActiveTab(tabId)}
              onJoinLecture={(lec) => handleStartLiveLecture(lec)}
            />
          );
        case 'programs':
          return <TraineePrograms />;
        case 'lectures':
          return (
            <TraineeLectures
              onJoinLecture={(lec) => handleStartLiveLecture(lec)}
            />
          );
        case 'recorded':
          return <TraineeRecorded />;
        case 'schedule':
          return <TraineeSchedule />;
        case 'courses':
          return <TraineeCourses />;
        case 'assignments':
          return <TraineeAssignments />;
        case 'exams':
          return <TraineeExams />;
        case 'content':
          return <TraineeDigitalContent />;
        case 'transcript':
          return (
            <TraineeTranscript
              onNavigateFinancials={() => setActiveTab('financials')}
            />
          );
        case 'financials':
          return <TraineeFinancials />;
        case 'support':
          return <TraineeSupport />;
        case 'account':
          return (
            <TraineeAccount
              user={user}
              onUpdateUser={(updated) => setUser(updated)}
              onTriggerVerification={() => setIsVerificationModalOpen(true)}
            />
          );
        default:
          return (
            <TraineeDashboard
              onNavigateTab={(tabId) => setActiveTab(tabId)}
              onJoinLecture={(lec) => handleStartLiveLecture(lec)}
            />
          );
      }
    }

    if (currentRole === ROLES.TRAINER) {
      switch (activeTab) {
        case 'dashboard':
          return (
            <TrainerDashboard
              onStartLecture={(lec) => handleStartLiveLecture(lec)}
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'courses':
          return (
            <TrainerCourses
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'short_courses':
          return (
            <TrainerShortCourses
              onStartLecture={(lec) => handleStartLiveLecture(lec)}
            />
          );
        case 'calendar':
          return (
            <TrainerCalendar
              onLaunchLecture={(lec) => handleStartLiveLecture(lec)}
            />
          );
        case 'assignments':
          return (
            <TrainerAssessments
              initialType="assignments"
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'exams':
          return (
            <TrainerAssessments
              initialType="exams"
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'support':
          return <TraineeSupport />;
        default:
          return (
            <TrainerDashboard
              onStartLecture={(lec) => handleStartLiveLecture(lec)}
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
      }
    }

    if (currentRole === ROLES.STAFF) {
      switch (activeTab) {
        case 'schedule_builder':
          return (
            <StaffScheduleBuilder
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'batch_schedules':
          return (
            <StaffBatchSchedules
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'lectures':
          return (
            <StaffLecturesMonitoring
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'attendance':
          return (
            <StaffLecturesMonitoring
              onNavigateTab={(tabId) => setActiveTab(tabId)}
              initialView="attendance"
            />
          );
        case 'recorded':
          return (
            <StaffRecordingsLifecycle
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'exams_management':
          return (
            <StaffExamsManagement
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
        case 'customization':
          return <StaffCourseExemption />;
        case 'grades':
          return (
            <StaffGradeEntry />
          );
        default:
          return (
            <StaffScheduleBuilder
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          );
      }
    }

    if (currentRole === ROLES.ADMIN) {
      return (
        <AdminSettings
          activeTab={activeTab}
          onNavigateTab={(tabId) => setActiveTab(tabId)}
        />
      );
    }

    return null;
  };

  if (viewMode === 'landing') {
    return (
      <>
        <CustomCursor />
        <LandingPage
          onEnterPortal={() => handleOpenAuth('login', ROLES.TRAINEE)}
          onSelectRoleAndEnter={(role) => handleOpenAuth('login', role)}
          onOpenRegister={() => handleOpenAuth('register', ROLES.TRAINEE)}
        />
      </>
    );
  }

  if (viewMode === 'login' || viewMode === 'register') {
    return (
      <>
        <CustomCursor />
        <AuthPage
          mode={viewMode}
          onSwitchMode={(newMode) => setViewMode(newMode)}
          onBackToLanding={() => setViewMode('landing')}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          initialRole={authInitialRole}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-brand-background text-brand-purpleDark flex flex-col font-sans selection:bg-brand-secondary/30">
      <CustomCursor />
      <NotificationBanner
        isVerified={user.isEmailVerified}
        onTriggerVerification={() => setIsVerificationModalOpen(true)}
      />

      <Sidebar
        currentRole={currentRole}
        user={user}
        unreadCount={user.unreadMessagesCount}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        tabs={getTabsForCurrentRole()}
        onOpenMail={() => setIsMailModalOpen(true)}
        onBackToLanding={() => setViewMode('landing')}
        onLogout={handleRequestLogout}
        isOpenMobile={isSidebarMobileOpen}
        onCloseMobile={() => setIsSidebarMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:mr-64 xl:mr-72 transition-all duration-300">
        <Header
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          user={user}
          unreadCount={user.unreadMessagesCount}
          onOpenMail={() => setIsMailModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          activeTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          tabs={getTabsForCurrentRole()}
          onBackToLanding={() => setViewMode('landing')}
          onLogout={handleRequestLogout}
          onToggleSidebar={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentRole}-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="bg-brand-purpleDark text-white border-t border-navy-950 py-6 text-xs mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="flex items-center gap-2 text-center">
              <span className="font-bold text-brand-gold">معهد أم القرى للتدريب</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">جميع الحقوق محفوظة © 2026</span>
            </div>
          </div>
        </footer>
      </div>

      <EmailVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        email={user.email}
        onVerifySuccess={handleVerifySuccess}
      />

      <MailModal
        isOpen={isMailModalOpen}
        onClose={() => setIsMailModalOpen(false)}
        userRole={currentRole}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser(updated)}
      />

      <VirtualRoomModal
        isOpen={Boolean(activeVirtualRoom)}
        onClose={() => setActiveVirtualRoom(null)}
        lecture={activeVirtualRoom}
        role={currentRole}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        userName={user?.name}
      />
    </div>
  );
}
