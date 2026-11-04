import React, { useState, useEffect } from 'react';
import { VirtualClassroomMockup } from '../admin/VirtualClassroomMockup';
import { loadAdminSettings } from '../admin/adminSettingsData';

export const VirtualRoomModal = ({ isOpen, onClose, lecture, role }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSettings(loadAdminSettings());
    }
  }, [isOpen]);

  if (!isOpen || !lecture) {
    return null;
  }

  const lectureTitle = lecture.courseName || lecture.name || 'محاضرة تفاعلية عن بعد';
  const instructorName = lecture.trainerName || 'د. فيصل إبراهيم الشهري';
  const normalizedRole = role === 'trainer' ? 'trainer' : 'trainee';

  return (
    <VirtualClassroomMockup
      settings={settings}
      onClose={onClose}
      initialRole={normalizedRole}
      lectureTitle={lectureTitle}
      instructorName={instructorName}
    />
  );
};
