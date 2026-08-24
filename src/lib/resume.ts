import { cache } from 'react';
import { GIST_USER } from '@/lib/site';

const RESUME_FILENAME = 'resume.json';
const GISTS_ENDPOINT = `https://api.github.com/users/${GIST_USER}/gists?per_page=100`;

/** Logo lookup shared across work + education (companies and institutions). */
const LOGO_BY_ORG: Readonly<Record<string, string>> = {
  'monday.com': '/logos/monday_com.svg',
  'orb group (formerly edison inc)': '/logos/orb_group.svg',
  'thrive networking': '/logos/thrive.png',
  cyient: '/logos/cyient.png',
  'augustana college': '/logos/augustana_college.png',
};

interface RawTimelineFields {
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
  portfolioSummary?: string;
  portfolioHighlights?: string[];
}

interface RawWorkEntry extends RawTimelineFields {
  name?: string;
  position?: string;
  location?: string;
}

interface RawEducationEntry extends RawTimelineFields {
  institution?: string;
  area?: string;
  studyType?: string;
}

interface RawBasics {
  availability?: unknown;
}

interface RawResume {
  basics?: RawBasics;
  work?: RawWorkEntry[];
  education?: RawEducationEntry[];
}

interface GistFile {
  filename: string;
  raw_url: string;
}

interface Gist {
  files: Record<string, GistFile>;
}

/** Shared shape for any dated resume item rendered as a scroll-staged timeline. */
export interface TimelineEntry {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  startDate?: string;
  url?: string;
  summary: string;
  highlights: readonly string[];
  logoSrc?: string;
  logoAlt: string;
}

/** Site-wide basics sourced from the gist resume's `basics` block. */
export interface Basics {
  availability: boolean;
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

interface ToTimelineArgs {
  orgName: string;
  title: string;
  fields: RawTimelineFields;
}

function toTimelineEntry({
  orgName,
  title,
  fields,
}: ToTimelineArgs): TimelineEntry {
  const trimmed = orgName.trim();
  return {
    id: slugify(trimmed),
    title,
    subtitle: trimmed,
    period: formatPeriod(fields.startDate, fields.endDate),
    startDate: fields.startDate,
    url: fields.url,
    summary: fields.portfolioSummary ?? fields.summary ?? '',
    highlights: fields.portfolioHighlights ?? fields.highlights ?? [],
    logoSrc: LOGO_BY_ORG[trimmed.toLowerCase()],
    logoAlt: trimmed,
  };
}

function polishWork(entry: RawWorkEntry): TimelineEntry | null {
  const name = entry.name?.trim();
  if (!name) return null;
  return toTimelineEntry({
    orgName: name,
    title: entry.position ?? '',
    fields: entry,
  });
}

function polishEducation(entry: RawEducationEntry): TimelineEntry | null {
  const institution = entry.institution?.trim();
  if (!institution) return null;
  const title = [entry.studyType, entry.area].filter(Boolean).join(', ');
  return toTimelineEntry({
    orgName: institution,
    title,
    fields: entry,
  });
}

function byStartDateDesc(a: TimelineEntry, b: TimelineEntry): number {
  const aStart = a.startDate ?? '';
  const bStart = b.startDate ?? '';
  if (aStart === bStart) return 0;
  return aStart < bStart ? 1 : -1;
}

const loadResume = cache(fetchResume);

/** Work history from the gist resume, sorted newest first. */
export async function getWorkExperiences(): Promise<TimelineEntry[]> {
  const resume = await loadResume();
  return (resume.work ?? [])
    .map(polishWork)
    .filter((entry): entry is TimelineEntry => entry !== null)
    .sort(byStartDateDesc);
}

/** Education entries from the gist resume, sorted newest first. */
export async function getEducation(): Promise<TimelineEntry[]> {
  const resume = await loadResume();
  return (resume.education ?? [])
    .map(polishEducation)
    .filter((entry): entry is TimelineEntry => entry !== null)
    .sort(byStartDateDesc);
}

/**
 * Site-wide basics from the gist resume. Currently exposes only
 * `availability` — the boolean gate for the "Available for new work" chip.
 * When the chip UI is revived, import `getBasics()` for the on/off flag and
 * pair it with the label copy in `AUTHOR.availability` (label is UI copy,
 * unrelated to this boolean).
 */
export async function getBasics(): Promise<Basics> {
  const resume = await loadResume();
  return {
    availability: resume.basics?.availability === true,
  };
}
