import type { TimelineEntry } from '@/lib/resume';
import { AUTHOR, SITE_URL } from '@/lib/site';

/**
 * Serialize a JSON-LD payload into a `<script>`-safe string. Escapes `<` so
 * embedded markup or a stray `</script>` in a description cannot break out of
 * the surrounding tag.
 */
export function serializeJsonLd(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}

interface SchemaOrganization {
  '@type': 'Organization';
  name: string;
  url?: string;
}

interface SchemaEducationalOrganization {
  '@type': 'EducationalOrganization';
  name: string;
  url?: string;
}

/** Optional per-audience overrides used by resume variant pages (PR 4). */
export interface PersonJsonLdOverrides {
  description?: string;
  jobTitle?: string;
  occupationalCategory?: string;
  url?: string;
}

interface BuildPersonArgs {
  work: readonly TimelineEntry[];
  education: readonly TimelineEntry[];
  overrides?: PersonJsonLdOverrides;
}

function toOrganization(entry: TimelineEntry): SchemaOrganization {
  return {
    '@type': 'Organization',
    name: entry.subtitle,
    ...(entry.url ? { url: entry.url } : {}),
  };
}

function toEducationalOrganization(
  entry: TimelineEntry,
): SchemaEducationalOrganization {
  return {
    '@type': 'EducationalOrganization',
    name: entry.subtitle,
    ...(entry.url ? { url: entry.url } : {}),
  };
}

/**
 * Build a schema.org `Person` payload for the author. Work entries are sorted
 * newest first upstream, so `work[0]` is treated as the current employer.
 */
export function buildPersonJsonLd({
  work,
  education,
  overrides,
}: BuildPersonArgs): Record<string, unknown> {
  const currentWork = work[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: overrides?.jobTitle ?? AUTHOR.role,
    description: overrides?.description ?? AUTHOR.intro,
    url: overrides?.url ?? SITE_URL,
    image: `${SITE_URL}/Profile.jpg`,
    email: `mailto:${AUTHOR.email}`,
    sameAs: [AUTHOR.github, AUTHOR.linkedin],
    ...(overrides?.occupationalCategory
      ? { occupationalCategory: overrides.occupationalCategory }
      : {}),
    ...(currentWork ? { worksFor: toOrganization(currentWork) } : {}),
    ...(education.length > 0
      ? { alumniOf: education.map(toEducationalOrganization) }
      : {}),
  };
}

interface BuildArticleArgs {
  title: string;
  description: string;
  slug: string;
  date?: string;
}

/** Build a schema.org `Article` payload for a writing page. */
export function buildArticleJsonLd({
  title,
  description,
  slug,
  date,
}: BuildArticleArgs): Record<string, unknown> {
  const canonical = `${SITE_URL}/writing/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    ...(date ? { datePublished: date } : {}),
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    url: canonical,
  };
}
