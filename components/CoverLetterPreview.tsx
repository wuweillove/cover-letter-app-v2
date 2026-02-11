'use client';

import { CoverLetterData, TemplateType } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CoverLetterPreviewProps {
  data: CoverLetterData;
}

const getTemplateStyles = (templateId: TemplateType) => {
  const styles = {
    professional: {
      container: 'bg-white',
      header: 'border-b-2 border-slate-800 pb-4',
      name: 'text-2xl font-bold text-slate-900',
      contact: 'text-sm text-slate-600',
      date: 'text-sm text-slate-600',
      recipient: 'text-base text-slate-800',
      greeting: 'text-lg font-semibold text-slate-900',
      body: 'text-base text-slate-800 leading-relaxed',
      section: 'mb-4',
    },
    modern: {
      container: 'bg-gradient-to-br from-slate-50 to-white',
      header: 'border-l-4 border-blue-500 pl-4 mb-6',
      name: 'text-3xl font-bold text-slate-900',
      contact: 'text-sm text-slate-600',
      date: 'text-sm text-slate-500 italic',
      recipient: 'text-base text-slate-700',
      greeting: 'text-xl font-bold text-blue-600',
      body: 'text-base text-slate-700 leading-relaxed',
      section: 'mb-4',
    },
    creative: {
      container: 'bg-gradient-to-br from-purple-50 via-white to-pink-50',
      header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-lg -m-8 mb-6',
      name: 'text-3xl font-bold text-white',
      contact: 'text-sm text-purple-100',
      date: 'text-sm text-slate-600',
      recipient: 'text-base text-slate-800 font-medium',
      greeting: 'text-2xl font-bold text-purple-600',
      body: 'text-base text-slate-700 leading-relaxed',
      section: 'mb-5',
    },
    minimal: {
      container: 'bg-white',
      header: 'mb-8',
      name: 'text-2xl font-light text-slate-900 tracking-wide',
      contact: 'text-xs text-slate-500 uppercase tracking-wider',
      date: 'text-xs text-slate-500',
      recipient: 'text-sm text-slate-700',
      greeting: 'text-base font-medium text-slate-900',
      body: 'text-sm text-slate-700 leading-relaxed',
      section: 'mb-4',
    },
  };

  return styles[templateId];
};

export default function CoverLetterPreview({ data }: CoverLetterPreviewProps) {
  const styles = getTemplateStyles(data.templateId as TemplateType);
  const currentDate = formatDate();

  return (
    <div
      id="cover-letter-preview"
      className={cn(
        'w-full max-w-[210mm] mx-auto p-8 shadow-lg rounded-lg',
        styles.container
      )}
    >
      {/* Header with Personal Info */}
      <div className={styles.header}>
        <h1 className={styles.name}>{data.personalInfo.name || 'Your Name'}</h1>
        <div className={cn('mt-2 space-y-1', styles.contact)}>
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.address && <div>{data.personalInfo.address}</div>}
        </div>
      </div>

      {/* Date */}
      <div className={cn('mt-6', styles.date)}>
        <p>{currentDate}</p>
      </div>

      {/* Recipient Info */}
      <div className={cn('mt-6', styles.recipient)}>
        {data.companyInfo.hiringManager && (
          <p className="font-semibold">{data.companyInfo.hiringManager}</p>
        )}
        {data.companyInfo.companyName && <p>{data.companyInfo.companyName}</p>}
      </div>

      {/* Greeting */}
      <div className={cn('mt-6', styles.greeting)}>
        <p>
          Dear{' '}
          {data.companyInfo.hiringManager || 'Hiring Manager'}
          {',
        </p>
      </div>

      {/* Opening Paragraph */}
      <div className={cn(styles.section, styles.body)}>
        <p>
          I am writing to express my strong interest in the{' '}
          <span className="font-semibold">
            {data.companyInfo.position || '[Position]'}
          </span>{' '}
          position at{' '}
          <span className="font-semibold">
            {data.companyInfo.companyName || '[Company Name]'}
          </span>
          . With{' '}
          <span className="font-semibold">
            {data.experienceInfo.yearsOfExperience || '[X]'} years of experience
          </span>{' '}
          as a{' '}
          <span className="font-semibold">
            {data.experienceInfo.currentRole || '[Current Role]'}
          </span>
          , I am confident in my ability to contribute effectively to your team.
        </p>
      </div>

      {/* Skills Section */}
      {data.skills && (
        <div className={cn(styles.section, styles.body)}>
          <p>
            My technical expertise includes: <span className="font-semibold">{data.skills}</span>.
            These skills have enabled me to deliver high-quality solutions and drive meaningful
            results in my previous roles.
          </p>
        </div>
      )}

      {/* Achievements Section */}
      {data.achievements && (
        <div className={cn(styles.section, styles.body)}>
          <p>
            Throughout my career, I have achieved notable successes, including: {data.achievements}.
            These experiences have honed my ability to tackle complex challenges and deliver
            innovative solutions.
          </p>
        </div>
      )}

      {/* Custom Message */}
      {data.customMessage && (
        <div className={cn(styles.section, styles.body)}>
          <p>{data.customMessage}</p>
        </div>
      )}

      {/* Closing */}
      <div className={cn(styles.section, styles.body)}>
        <p>
          I would welcome the opportunity to discuss how my background, skills, and enthusiasm
          align with the needs of your team. Thank you for considering my application. I look
          forward to the possibility of contributing to{' '}
          {data.companyInfo.companyName || 'your organization'}.
        </p>
      </div>

      {/* Signature */}
      <div className={cn('mt-8', styles.body)}>
        <p>Sincerely,</p>
        <p className="mt-4 font-semibold">{data.personalInfo.name || 'Your Name'}</p>
      </div>
    </div>
  );
}
