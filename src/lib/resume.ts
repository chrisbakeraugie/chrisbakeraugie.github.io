import { cache } from 'react';
import { GIST_USER } from '@/lib/site';

const RESUME_FILENAME = 'resume.json';
const GISTS_ENDPOINT = `https://api.github.com/users/${GIST_USER}/gists?per_page=100`;

const LOGO_BY_COMPANY: Readonly<Record<string, string>> = {
  'monday.com': '/logos/monday_com.svg',
  'orb group (formerly edison inc)': '/logos/orb_group.svg',
  'thrive networking': '/logos/thrive.png',
  cyient: '/logos/cyient.png',
};

interface RawWorkEntry {
  name?: string;
  position?: string;
  location?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
  portfolioSummary?: string;
  portfolioHighlights?: string[];
}

interface RawResume {
  work?: RawWorkEntry[];
}

interface GistFile {
  filename: string;
  raw_url: string;
}

interface Gist {
  files: Record<string, GistFile>;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  startDate?: string;
  url?: string;
  summary: string;
  highlights: readonly string[];
  logoSrc?: string;
  logoAlt: string;
}

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': `${GIST_USER}-portfolio-build`,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

interface YearMonth {
  year: string;
  month?: number;
}

function parseYearMonth(iso: string): YearMonth | null {
  const match = /^(\d{4})(?:-(\d{2}))?/.exec(iso);
  if (!match) return null;
  const monthNum = match[2] ? Number(match[2]) : undefined;
  const month =
    monthNum && monthNum >= 1 && monthNum <= 12 ? monthNum : undefined;
  return { year: match[1], month };
}

function formatMonthYear(parsed: YearMonth): string {
  if (parsed.month) return `${MONTH_NAMES[parsed.month - 1]} ${parsed.year}`;
  return parsed.year;
}

function formatPeriod(startDate?: string, endDate?: string): string {
  const start = startDate ? parseYearMonth(startDate) : null;
  const end = endDate ? parseYearMonth(endDate) : null;

  // Missing endDate, or endDate parses to a future moment, is treated as ongoing.
  const isOngoing =
    !endDate || (!!endDate && new Date(endDate).getTime() > Date.now());

  const startLabel = start ? formatMonthYear(start) : null;
  const endLabel = end ? formatMonthYear(end) : null;

  if (startLabel && isOngoing) return `${startLabel} - Present`;
  if (startLabel && endLabel) return `${startLabel} - ${endLabel}`;
  if (startLabel) return `${startLabel} — Present`;
  if (endLabel) return endLabel;
  return '';
}

async function fetchResumeFile(): Promise<GistFile> {
  const res = await fetch(GISTS_ENDPOINT, { headers: githubHeaders() });
  if (!res.ok) {
    throw new Error(
      `Failed to list gists for "${GIST_USER}": ${res.status} ${res.statusText}`,
    );
  }

  const gists = (await res.json()) as Gist[];
  for (const gist of gists) {
    const file = gist.files[RESUME_FILENAME];
    if (file) return file;
  }

  throw new Error(
    `No gist containing "${RESUME_FILENAME}" found for user "${GIST_USER}".`,
  );
}

async function fetchResume(): Promise<RawResume> {
  const file = await fetchResumeFile();
  const res = await fetch(file.raw_url, { headers: githubHeaders() });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch "${RESUME_FILENAME}": ${res.status} ${res.statusText}`,
    );
  }
  return (await res.json()) as RawResume;
}

function polishWork(entry: RawWorkEntry): WorkExperience | null {
  const rawName = entry.name?.trim();
  if (!rawName) return null;

  const key = rawName.toLowerCase();
  const summary = entry.portfolioSummary ?? entry.summary ?? '';
  const highlights = entry.portfolioHighlights ?? entry.highlights ?? [];

  return {
    id: slugify(rawName),
    company: rawName,
    position: entry.position ?? '',
    period: formatPeriod(entry.startDate, entry.endDate),
    startDate: entry.startDate,
    url: entry.url,
    summary,
    highlights,
    logoSrc: LOGO_BY_COMPANY[key],
    logoAlt: rawName,
  };
}

const loadResume = cache(fetchResume);

export async function getWorkExperiences(): Promise<WorkExperience[]> {
  const resume = await loadResume();
  const entries = (resume.work ?? [])
    .map(polishWork)
    .filter((entry): entry is WorkExperience => entry !== null);

  return entries.sort((a, b) => {
    const aStart = a.startDate ?? '';
    const bStart = b.startDate ?? '';
    if (aStart === bStart) return 0;
    return aStart < bStart ? 1 : -1;
  });
}
