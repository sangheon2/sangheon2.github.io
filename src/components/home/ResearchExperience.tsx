'use client';

import Image from 'next/image';
import { CalendarDays, MapPin } from 'lucide-react';

interface ExperienceEntry {
  institution: string;
  advisor: string;
  department: string;
  role: string;
  dates: string;
  location: string;
  description: string;
  logo: string;
  accent: string;
}

const institutionLogos = [
  { match: 'California Institute of Technology', logo: '/caltech_logo.png', accent: '#FF6C0C' },
  { match: 'Georgia Institute of Technology', logo: '/gatech_logo.png', accent: '#B39051' },
  { match: 'Pusan National University', logo: '/pnu_logo.png', accent: '#176A54' },
];

function parseExperience(content: string): ExperienceEntry[] {
  return content
    .split(/^\s*---\s*$/m)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      if (lines.length < 5 || !lines[0].startsWith('### ')) return null;

      const [institution, advisor = ''] = lines[0].slice(4).split(' | ');
      const [dates = '', location = ''] = lines[3].replace(/\*\*/g, '').split(' | ');
      const branding = institutionLogos.find(({ match }) => institution.includes(match));

      return {
        institution,
        advisor,
        department: lines[1],
        role: lines[2].replace(/\*\*/g, ''),
        dates,
        location,
        description: lines.slice(4).join(' '),
        logo: branding?.logo || '',
        accent: branding?.accent || '#64748b',
      };
    })
    .filter((entry): entry is ExperienceEntry => entry !== null);
}

export default function ResearchExperience({ content }: { content: string }) {
  const experiences = parseExperience(content);

  return (
    <div className="w-full">
      {experiences.map((entry, index) => (
        <article
          key={entry.institution + index}
          className={`grid grid-cols-[64px_minmax(0,1fr)] gap-3 py-4 first:pt-0 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-5 sm:py-5 ${index < experiences.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-700' : ''}`}
        >
          <div className="flex items-start justify-center pt-0.5">
            {entry.logo && (
              <Image
                src={entry.logo}
                alt={`${entry.institution} logo`}
                width={80}
                height={80}
                className="h-auto max-h-20 w-full object-contain"
              />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-[16px] font-bold leading-snug tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-[18px]">
              {entry.institution}
              {entry.advisor && (
                <span className="font-medium" style={{ color: entry.accent }}>
                  {', ' + entry.advisor}
                </span>
              )}
            </h3>
            <p className="mt-1 text-[13px] leading-snug text-neutral-600 dark:text-neutral-400 sm:text-[14px]">
              {entry.department}
            </p>
            <div className="mt-2">
              <span className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-3 py-0.5 text-[12px] font-semibold text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 sm:text-[13px]">
                {entry.role}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-neutral-500 dark:text-neutral-400 sm:text-[13px]">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                {entry.dates}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                {entry.location}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-[14px]">
              {entry.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
