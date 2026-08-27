import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TimelineSection } from '@/components/timeline_section';
import { buildPersonJsonLd, serializeJsonLd } from '@/lib/json_ld';
import { getVariant, getVariantSlugs } from '@/lib/resume';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

interface PageParams {
  params: Promise<{ variant: string }>;
}

/**
 * Next 16 with `output: 'export'` treats an empty `generateStaticParams`
 * return value as "missing" and errors the build. Until at least one
 * `resume-overlay-<slug>.json` gist exists, we emit a sentinel slug that
 * the page handles as `notFound()` — keeps the route wired up without
 * shipping a bogus variant page.
 */
const NO_VARIANTS_SENTINEL = '_none';

export async function generateStaticParams(): Promise<
  Array<{ variant: string }>
> {
  const slugs = await getVariantSlugs();
  if (slugs.length === 0) return [{ variant: NO_VARIANTS_SENTINEL }];
  return slugs.map((variant) => ({ variant }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { variant } = await params;
  const v = await getVariant(variant);
  if (!v) return {};

  const canonical = `/resume/${variant}`;
  return {
    title: v.audience.title,
    description: v.audience.description,
    alternates: { canonical },
    openGraph: {
      type: 'profile',
      title: v.audience.title,
      description: v.audience.description,
      url: canonical,
    },
  };
}

export default async function ResumeVariantPage({ params }: PageParams) {
  const { variant } = await params;
  const v = await getVariant(variant);
  if (!v) notFound();

  const personJsonLd = buildPersonJsonLd({
    work: v.work,
    education: v.education,
    overrides: {
      description: v.audience.description,
      jobTitle: v.audience.occupationalCategory,
      occupationalCategory: v.audience.occupationalCategory,
      url: `${SITE_URL}/resume/${variant}`,
    },
  });

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
      />
      <Link href="/" className="article-page-back">
        &larr; Back
      </Link>

      <header className="major">
        <h1>{v.audience.title}</h1>
      </header>
      <p>{v.audience.description}</p>
      <p>
        <a href={`${SITE_URL}/api/resume/${variant}`} className="strata-link">
          Machine-readable version (JSON Resume)
        </a>
      </p>

      <TimelineSection
        sectionId="experience"
        heading="Experience"
        entries={v.work}
        dense
      />

      <TimelineSection
        sectionId="education"
        heading="Education"
        entries={v.education}
        dense
      />
    </section>
  );
}
