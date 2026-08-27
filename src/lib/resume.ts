import { cache } from 'react';
import { gistGithubHeaders } from '@/lib/github_gist';
import { GIST_USER } from '@/lib/site';

const RESUME_FILENAME = 'resume.json';
const OVERLAY_FILENAME_RE = /^resume-overlay-(.+)\.json$/;
const GISTS_ENDPOINT = `https://api.github.com/users/${GIST_USER}/gists?per_page=100`;

/** Logo lookup shared across work + education (companies and institutions). */
const LOGO_BY_ORG: Readonly<Record<string, string>> = {
  'monday.com': '/logos/monday_com.svg',
  'orb group (formerly edisen inc)': '/logos/orb_group.svg',
  'orb group (formerly edison inc)': '/logos/orb_group.svg',
  'thrive networking': '/logos/thrive.png',
  cyient: '/logos/cyient.png',
  'augustana college': '/logos/augustana_college.png',
};

/** Gist `resume.json` — JSON Resume plus portfolio-specific extensions. */
interface RawMeta {
  theme?: string;
}

interface RawLocation {
  city?: string;
  region?: string;
  countryCode?: string;
  country?: string;
}

interface RawProfile {
  network?: string;
  username?: string;
  url?: string;
}

interface RawBasics {
  availability?: boolean;
  name?: string;
  label?: string;
  image?: string;
  email?: string;
  url?: string;
  summary?: string;
  location?: RawLocation;
  profiles?: RawProfile[];
}

/** Shared JSON Resume fields for dated timeline items (work, education). */
interface RawTimelineFields {
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

interface RawWorkEntry extends RawTimelineFields {
  name?: string;
  position?: string;
  location?: string;
  /** Portfolio prose: one string per paragraph. Falls back to `summary` when absent. */
  portfolioSummary?: string[];
  portfolioHighlights?: string[];
}

interface RawEducationEntry extends RawTimelineFields {
  institution?: string;
  area?: string;
  studyType?: string;
}

interface RawSkill {
  name?: string;
  level?: string;
  keywords?: string[];
}

interface RawResume {
  meta?: RawMeta;
  basics?: RawBasics;
  work?: RawWorkEntry[];
  education?: RawEducationEntry[];
  skills?: RawSkill[];
  volunteer?: unknown[];
  references?: unknown[];
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
  /** One paragraph per element; sourced from `portfolioSummary` or `summary`. */
  summary: readonly string[];
  highlights: readonly string[];
  logoSrc?: string;
  logoAlt: string;
}

/** Site-wide basics sourced from the gist resume's `basics` block. */
export interface Basics {
  availability: boolean;
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
  const res = await fetch(GISTS_ENDPOINT, { headers: gistGithubHeaders() });
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
  const res = await fetch(file.raw_url, { headers: gistGithubHeaders() });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch "${RESUME_FILENAME}": ${res.status} ${res.statusText}`,
    );
  }
  return (await res.json()) as RawResume;
}

/** Work/education fields passed into timeline normalization. */
type RawTimelineSource = RawTimelineFields &
  Partial<Pick<RawWorkEntry, 'portfolioSummary' | 'portfolioHighlights'>>;

interface ToTimelineArgs {
  orgName: string;
  title: string;
  fields: RawTimelineSource;
}

function normalizeSummary(fields: RawTimelineSource): readonly string[] {
  const portfolio = fields.portfolioSummary;
  if (portfolio !== undefined) {
    if (
      !Array.isArray(portfolio) ||
      portfolio.some((paragraph) => typeof paragraph !== 'string')
    ) {
      throw new Error(
        'resume.json: portfolioSummary must be an array of strings when present.',
      );
    }
    return portfolio
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);
  }

  const fallback = fields.summary?.trim();
  return fallback ? [fallback] : [];
}

function normalizeHighlights(fields: RawTimelineSource): readonly string[] {
  const portfolio = fields.portfolioHighlights;
  if (portfolio !== undefined) {
    if (
      !Array.isArray(portfolio) ||
      portfolio.some((item) => typeof item !== 'string')
    ) {
      throw new Error(
        'resume.json: portfolioHighlights must be an array of strings when present.',
      );
    }
    return portfolio;
  }
  return fields.highlights ?? [];
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
    summary: normalizeSummary(fields),
    highlights: normalizeHighlights(fields),
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

export async function getRawResume(): Promise<unknown> {
  return loadResume();
}

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

// -----------------------------------------------------------------------------
// Audience-tailored resume variants
//
// Each variant is a small overlay gist file named `resume-overlay-<slug>.json`
// that overrides parts of the base `resume.json`: the `basics.summary`, a
// tailored per-job `portfolioSummary`/`portfolioHighlights`, and audience
// metadata (title, description, whenToPrefer copy). The overlay approach keeps
// the base gist as the single source of truth for facts (dates, job names,
// education) — variants only reshape the framing.
// -----------------------------------------------------------------------------

/** Audience metadata declared inside every overlay's `audience` block. */
export interface ResumeOverlayAudience {
  slug: string;
  title: string;
  description: string;
  whenToPrefer: string;
  /** Schema.org occupationalCategory, e.g. "Software Developer". Optional. */
  occupationalCategory?: string;
}

/** Per-job override map: keyed by work entry `name` (case-insensitive). */
export type WorkOverrideMap = Readonly<
  Record<
    string,
    {
      portfolioSummary?: string[];
      portfolioHighlights?: string[];
    }
  >
>;

/** Parsed overlay JSON. Small on purpose — everything else falls through. */
export interface ResumeOverlay {
  audience: ResumeOverlayAudience;
  basics?: { summary?: string };
  workOverrides?: WorkOverrideMap;
}

/** Polished variant: audience block + reordered timeline + merged raw JSON. */
export interface ResumeVariant {
  audience: ResumeOverlayAudience;
  work: TimelineEntry[];
  education: TimelineEntry[];
  /** Merged JSON Resume payload, emitted at /resume-<slug>.json. */
  merged: unknown;
}

async function fetchOverlayFiles(): Promise<GistFile[]> {
  const res = await fetch(GISTS_ENDPOINT, { headers: gistGithubHeaders() });
  if (!res.ok) {
    throw new Error(
      `Failed to list gists for "${GIST_USER}": ${res.status} ${res.statusText}`,
    );
  }
  const gists = (await res.json()) as Gist[];
  return gists
    .flatMap((gist) => Object.values(gist.files))
    .filter((file) => OVERLAY_FILENAME_RE.test(file.filename));
}

function validateAudience(
  filename: string,
  audience: unknown,
): ResumeOverlayAudience {
  if (!audience || typeof audience !== 'object') {
    throw new Error(
      `Resume overlay "${filename}": missing required "audience" object.`,
    );
  }
  const a = audience as Partial<ResumeOverlayAudience>;
  const required: Array<keyof ResumeOverlayAudience> = [
    'slug',
    'title',
    'description',
    'whenToPrefer',
  ];
  for (const key of required) {
    if (typeof a[key] !== 'string' || a[key].trim().length === 0) {
      throw new Error(
        `Resume overlay "${filename}": audience.${key} must be a non-empty string.`,
      );
    }
  }
  return {
    slug: a.slug!,
    title: a.title!,
    description: a.description!,
    whenToPrefer: a.whenToPrefer!,
    ...(typeof a.occupationalCategory === 'string'
      ? { occupationalCategory: a.occupationalCategory }
      : {}),
  };
}

async function fetchOverlay(file: GistFile): Promise<ResumeOverlay> {
  const res = await fetch(file.raw_url, { headers: gistGithubHeaders() });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch resume overlay "${file.filename}": ${res.status} ${res.statusText}`,
    );
  }
  const parsed = (await res.json()) as Partial<ResumeOverlay>;
  const audience = validateAudience(file.filename, parsed.audience);

  const filenameMatch = OVERLAY_FILENAME_RE.exec(file.filename);
  const filenameSlug = filenameMatch ? filenameMatch[1] : '';
  if (filenameSlug && filenameSlug !== audience.slug) {
    throw new Error(
      `Resume overlay "${file.filename}": audience.slug "${audience.slug}" must match filename slug "${filenameSlug}".`,
    );
  }

  return {
    audience,
    ...(parsed.basics ? { basics: parsed.basics } : {}),
    ...(parsed.workOverrides ? { workOverrides: parsed.workOverrides } : {}),
  };
}

const loadOverlays = cache(async (): Promise<ResumeOverlay[]> => {
  const files = await fetchOverlayFiles();
  const overlays = await Promise.all(files.map(fetchOverlay));
  const seen = new Set<string>();
  for (const overlay of overlays) {
    if (seen.has(overlay.audience.slug)) {
      throw new Error(
        `Duplicate resume overlay audience.slug "${overlay.audience.slug}".`,
      );
    }
    seen.add(overlay.audience.slug);
  }
  return overlays;
});

/** Apply an overlay to the base resume, returning a new RawResume. */
function applyOverlay(base: RawResume, overlay: ResumeOverlay): RawResume {
  const overrides = overlay.workOverrides ?? {};
  const overrideByName = new Map<
    string,
    { portfolioSummary?: string[]; portfolioHighlights?: string[] }
  >();
  for (const [company, override] of Object.entries(overrides)) {
    overrideByName.set(company.trim().toLowerCase(), override);
  }

  const baseWorkNames = new Set(
    (base.work ?? []).map((w) => (w.name ?? '').trim().toLowerCase()),
  );
  for (const key of overrideByName.keys()) {
    if (!baseWorkNames.has(key)) {
      throw new Error(
        `Resume overlay "${overlay.audience.slug}": workOverrides references unknown company "${key}".`,
      );
    }
  }

  const nextWork = (base.work ?? []).map((entry) => {
    const override = overrideByName.get(
      (entry.name ?? '').trim().toLowerCase(),
    );
    if (!override) return entry;
    return {
      ...entry,
      ...(override.portfolioSummary !== undefined
        ? { portfolioSummary: override.portfolioSummary }
        : {}),
      ...(override.portfolioHighlights !== undefined
        ? { portfolioHighlights: override.portfolioHighlights }
        : {}),
    };
  });

  return {
    ...base,
    meta: { ...base.meta, audience: overlay.audience } as RawMeta & {
      audience: ResumeOverlayAudience;
    },
    basics: {
      ...base.basics,
      ...(overlay.basics?.summary !== undefined
        ? { summary: overlay.basics.summary }
        : {}),
    },
    work: nextWork,
  };
}

/** Slugs for every discovered overlay. Empty until overlay gists exist. */
export async function getVariantSlugs(): Promise<string[]> {
  const overlays = await loadOverlays();
  return overlays.map((overlay) => overlay.audience.slug);
}

/** Audience metadata for every variant, used for cross-linking + llms.txt. */
export async function getVariantAudiences(): Promise<ResumeOverlayAudience[]> {
  const overlays = await loadOverlays();
  return overlays.map((overlay) => overlay.audience);
}

/** Full variant payload for a slug: audience + reordered timeline + merged JSON. */
export async function getVariant(
  slug: string,
): Promise<ResumeVariant | undefined> {
  const [base, overlays] = await Promise.all([loadResume(), loadOverlays()]);
  const overlay = overlays.find((o) => o.audience.slug === slug);
  if (!overlay) return undefined;

  const merged = applyOverlay(base, overlay);
  const work = (merged.work ?? [])
    .map(polishWork)
    .filter((entry): entry is TimelineEntry => entry !== null)
    .sort(byStartDateDesc);
  const education = (merged.education ?? [])
    .map(polishEducation)
    .filter((entry): entry is TimelineEntry => entry !== null)
    .sort(byStartDateDesc);

  return { audience: overlay.audience, work, education, merged };
}
