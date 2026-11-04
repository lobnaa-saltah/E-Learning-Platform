export function downloadTranscriptPdf(user, _semesters) {
  const pageWidth = 595;
  const pageHeight = 842;

  let stream = '';

  stream += '0.15 0.13 0.38 rg\n';
  stream += `0 ${pageHeight - 90} ${pageWidth} 90 re\n`;
  stream += 'f\n';

  stream += '0.94 0.69 0.27 rg\n';
  stream += `0 ${pageHeight - 94} ${pageWidth} 4 re\n`;
  stream += 'f\n';

  stream += 'BT\n';
  stream += '/F2 18 Tf\n';
  stream += '1 1 1 rg\n';
  stream += `40 ${pageHeight - 45} Td\n`;
  stream += '(UMM AL-QURA TRAINING INSTITUTE) Tj\n';

  stream += '/F1 11 Tf\n';
  stream += '0.94 0.69 0.27 rg\n';
  stream += '0 -20 Td\n';
  stream += '(ACADEMIC AFFAIRS & REGISTRATION - OFFICIAL TRANSCRIPT) Tj\n';
  stream += 'ET\n';

  stream += '0.97 0.97 0.98 rg\n';
  stream += '40 640 515 90 re\n';
  stream += 'f\n';
  stream += '0.85 0.85 0.90 RG\n';
  stream += '1 w\n';
  stream += '40 640 515 90 re\n';
  stream += 'S\n';

  stream += 'BT\n';
  stream += '0.15 0.13 0.38 rg\n';
  stream += '/F2 10 Tf\n';
  stream += '55 705 Td\n';
  stream += `(Trainee Name: ${user.name || 'Abdullah Mohammed Al-Qurashi'}) Tj\n`;
  stream += '260 0 Td\n';
  stream += `(Trainee ID: ${user.id || 'TR-2024-8842'}) Tj\n`;

  stream += '-260 -22 Td\n';
  stream += '/F1 10 Tf\n';
  stream += `(Program: ${user.program || 'Applied Information Technology Diploma'}) Tj\n`;
  stream += '260 0 Td\n';
  stream += '/F2 10 Tf\n';
  stream += '0.05 0.59 0.41 rg\n';
  stream += '(Status: Good Standing - Fully Paid) Tj\n';

  stream += '-260 -22 Td\n';
  stream += '0.15 0.13 0.38 rg\n';
  stream += '/F2 10 Tf\n';
  stream += '(Cumulative GPA: 4.82 / 5.00  [Excellent with High Honors]) Tj\n';
  stream += '260 0 Td\n';
  stream += '/F1 10 Tf\n';
  stream += '(Earned Credits: 32 / 68 Hours) Tj\n';
  stream += 'ET\n';

  const addTermTable = (termTitle, gpa, credits, courses, startY) => {
    let s = '';
    s += '0.15 0.13 0.38 rg\n';
    s += `40 ${startY} 515 24 re\n`;
    s += 'f\n';

    s += 'BT\n';
    s += '1 1 1 rg\n';
    s += '/F2 10 Tf\n';
    s += `50 ${startY + 7} Td\n`;
    s += `(${termTitle}) Tj\n`;
    s += `300 0 Td\n`;
    s += `/F1 9 Tf\n`;
    s += `(Term GPA: ${gpa} / 5.00  |  Credits: ${credits}) Tj\n`;
    s += 'ET\n';

    s += '0.94 0.94 0.96 rg\n';
    s += `40 ${startY - 18} 515 18 re\n`;
    s += 'f\n';

    s += 'BT\n';
    s += '0.3 0.3 0.35 rg\n';
    s += '/F2 8 Tf\n';
    s += `50 ${startY - 13} Td\n`;
    s += '(Course Code) Tj\n';
    s += '80 0 Td\n';
    s += '(Course Title) Tj\n';
    s += '210 0 Td\n';
    s += '(Credits) Tj\n';
    s += '55 0 Td\n';
    s += '(Score) Tj\n';
    s += '55 0 Td\n';
    s += '(Grade) Tj\n';
    s += '45 0 Td\n';
    s += '(Status) Tj\n';
    s += 'ET\n';

    let rowY = startY - 34;
    courses.forEach((c, idx) => {
      if (idx % 2 === 1) {
        s += '0.98 0.98 0.99 rg\n';
        s += `40 ${rowY - 2} 515 16 re\n`;
        s += 'f\n';
      }
      s += 'BT\n';
      s += '0.15 0.15 0.20 rg\n';
      s += '/F1 8 Tf\n';
      s += `50 ${rowY + 2} Td\n`;
      s += `(${c.code}) Tj\n`;
      s += `80 0 Td\n`;
      s += `(${c.name}) Tj\n`;
      s += `210 0 Td\n`;
      s += `(${c.credits}) Tj\n`;
      s += `55 0 Td\n`;
      s += `(${c.score}%) Tj\n`;
      s += `55 0 Td\n`;
      s += `/F2 8 Tf\n`;
      s += `(${c.grade}) Tj\n`;
      s += `/F1 8 Tf\n`;
      s += `45 0 Td\n`;
      s += '0.05 0.59 0.41 rg\n';
      s += '(Passed) Tj\n';
      s += 'ET\n';

      s += '0.90 0.90 0.93 RG\n';
      s += '0.5 w\n';
      s += `40 ${rowY - 2} m 555 ${rowY - 2} l S\n`;
      rowY -= 16;
    });

    return s;
  };

  const term1Courses = [
    { code: 'CS101', name: 'Web Programming Fundamentals', credits: '4', score: '96', grade: 'A+' },
    { code: 'DB102', name: 'Database Management Systems', credits: '4', score: '92', grade: 'A' },
    { code: 'ENG101', name: 'Technical English for IT', credits: '4', score: '95', grade: 'A+' }
  ];

  const term2Courses = [
    { code: 'CS201', name: 'Advanced Front-End Development', credits: '5', score: '98', grade: 'A+' },
    { code: 'SEC202', name: 'Information Security & Networks', credits: '5', score: '94', grade: 'A+' }
  ];

  stream += addTermTable('TERM 1 - COMPLETED', '4.80', '12 Hours', term1Courses, 600);
  stream += addTermTable('TERM 2 - COMPLETED', '4.85', '10 Hours', term2Courses, 490);

  stream += '0.88 0.95 0.92 rg\n';
  stream += '40 85 515 48 re\n';
  stream += 'f\n';
  stream += '0.2 0.7 0.4 RG\n';
  stream += '1 w\n';
  stream += '40 85 515 48 re\n';
  stream += 'S\n';

  stream += 'BT\n';
  stream += '0.05 0.5 0.3 rg\n';
  stream += '/F2 10 Tf\n';
  stream += '55 116 Td\n';
  stream += '(OFFICIAL DOCUMENT VALIDATION SEAL) Tj\n';
  stream += '/F1 8 Tf\n';
  stream += '0.2 0.3 0.3 rg\n';
  stream += '0 -15 Td\n';
  stream += '(This document is electronically verified and certified by Umm Al-Qura Training Institute.) Tj\n';
  stream += '0 -12 Td\n';
  stream += '(Verification Hash: UQ-TR-8842-SECURE-2026-VAL | Date Issued: 2026-10-28) Tj\n';
  stream += 'ET\n';

  stream += 'BT\n';
  stream += '0.5 0.5 0.5 rg\n';
  stream += '/F1 7 Tf\n';
  stream += '40 40 Td\n';
  stream += '(Umm Al-Qura Training Institute - Kingdom of Saudi Arabia - Page 1 of 1) Tj\n';
  stream += 'ET\n';

  const encoder = new TextEncoder();
  const streamBytes = encoder.encode(stream);
  const streamLength = streamBytes.length;

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}\nendstream\nendobj\n`
  ];

  let header = '%PDF-1.4\n';
  let body = '';
  let offsets = [];
  let currentOffset = encoder.encode(header).length;

  for (let i = 0; i < objects.length; i++) {
    offsets.push(currentOffset);
    body += objects[i];
    currentOffset += encoder.encode(objects[i]).length;
  }

  let xrefOffset = currentOffset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let offset of offsets) {
    xref += String(offset).padStart(10, '0') + ' 00000 n \n';
  }

  let trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  const pdfString = header + body + xref + trailer;
  const pdfBlob = new Blob([pdfString], { type: 'application/pdf' });

  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `كشف_الدرجات_الأكاديمي_${user.id || 'TR-2024-8842'}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadSyllabusPdf(courseCode, courseName) {
  const pageWidth = 595;
  const pageHeight = 842;

  let stream = '';

  stream += '0.15 0.13 0.38 rg\n';
  stream += `0 ${pageHeight - 80} ${pageWidth} 80 re\n`;
  stream += 'f\n';

  stream += '0.94 0.69 0.27 rg\n';
  stream += `0 ${pageHeight - 84} ${pageWidth} 4 re\n`;
  stream += 'f\n';

  stream += 'BT\n';
  stream += '/F2 16 Tf\n';
  stream += '1 1 1 rg\n';
  stream += `40 ${pageHeight - 40} Td\n`;
  stream += '(UMM AL-QURA TRAINING INSTITUTE) Tj\n';

  stream += '/F1 10 Tf\n';
  stream += '0.94 0.69 0.27 rg\n';
  stream += '0 -18 Td\n';
  stream += '(OFFICIAL COURSE SYLLABUS & DESCRIPTION) Tj\n';
  stream += 'ET\n';

  stream += '0.97 0.97 0.98 rg\n';
  stream += '40 660 515 80 re\n';
  stream += 'f\n';
  stream += '0.85 0.85 0.90 RG\n';
  stream += '1 w\n';
  stream += '40 660 515 80 re\n';
  stream += 'S\n';

  stream += 'BT\n';
  stream += '0.15 0.13 0.38 rg\n';
  stream += '/F2 11 Tf\n';
  stream += '55 715 Td\n';
  stream += `(Course: ${courseName}) Tj\n`;
  stream += '0 -20 Td\n';
  stream += `(Course Code: ${courseCode} | Credit Hours: 4 Hours) Tj\n`;
  stream += '0 -18 Td\n';
  stream += '/F1 9 Tf\n';
  stream += '0.05 0.59 0.41 rg\n';
  stream += '(Accreditation: Approved by Technical and Vocational Training Corporation) Tj\n';
  stream += 'ET\n';

  stream += 'BT\n';
  stream += '0.2 0.2 0.25 rg\n';
  stream += '/F2 11 Tf\n';
  stream += '40 620 Td\n';
  stream += '(Course Objectives & Learning Outcomes:) Tj\n';
  stream += '/F1 9 Tf\n';
  stream += '0 -18 Td\n';
  stream += '(1. Understand fundamental theoretical concepts and core architectural patterns.) Tj\n';
  stream += '0 -16 Td\n';
  stream += '(2. Practical hands-on training with industry-standard development tools.) Tj\n';
  stream += '0 -16 Td\n';
  stream += '(3. Complete comprehensive laboratory assignments and real-world project scenarios.) Tj\n';
  stream += '0 -26 Td\n';
  stream += '/F2 11 Tf\n';
  stream += '(Grading & Assessment Distribution:) Tj\n';
  stream += '/F1 9 Tf\n';
  stream += '0 -18 Td\n';
  stream += '( - Periodic Practical Assessments & Quizzes: 20%) Tj\n';
  stream += '0 -16 Td\n';
  stream += '( - Hands-on Lab Assignments & Homework: 20%) Tj\n';
  stream += '0 -16 Td\n';
  stream += '( - Midterm Examination: 20%) Tj\n';
  stream += '0 -16 Td\n';
  stream += '( - Final Comprehensive Theoretical & Practical Exam: 40%) Tj\n';
  stream += 'ET\n';

  stream += '0.88 0.95 0.92 rg\n';
  stream += '40 100 515 45 re\n';
  stream += 'f\n';
  stream += '0.2 0.7 0.4 RG\n';
  stream += '1 w\n';
  stream += '40 100 515 45 re\n';
  stream += 'S\n';

  stream += 'BT\n';
  stream += '0.05 0.5 0.3 rg\n';
  stream += '/F2 9 Tf\n';
  stream += '55 128 Td\n';
  stream += '(VERIFIED SYLLABUS - UMM AL-QURA TRAINING INSTITUTE) Tj\n';
  stream += '/F1 8 Tf\n';
  stream += '0.2 0.3 0.3 rg\n';
  stream += '0 -14 Td\n';
  stream += `(Document Reference: SYL-${courseCode}-2026 | Approved for Academic Year 2026) Tj\n`;
  stream += 'ET\n';

  const encoder = new TextEncoder();
  const streamBytes = encoder.encode(stream);
  const streamLength = streamBytes.length;

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}\nendstream\nendobj\n`
  ];

  let header = '%PDF-1.4\n';
  let body = '';
  let offsets = [];
  let currentOffset = encoder.encode(header).length;

  for (let i = 0; i < objects.length; i++) {
    offsets.push(currentOffset);
    body += objects[i];
    currentOffset += encoder.encode(objects[i]).length;
  }

  let xrefOffset = currentOffset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let offset of offsets) {
    xref += String(offset).padStart(10, '0') + ' 00000 n \n';
  }

  let trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  const pdfString = header + body + xref + trailer;
  const pdfBlob = new Blob([pdfString], { type: 'application/pdf' });

  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `خطة_مقرر_${courseCode}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
