import type { MetadataRoute } from 'next';
import { getAllArticleMeta } from '@/lib/articles';
import { getVariantSlugs } from '@/lib/resume';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Static sitemap emitted to `out/sitemap.xml`. Enumerates the home page, every
 * writing article, and every audience-tailored resume variant discovered from
 * gists at build time. The daily deploy cron picks up gist additions.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, variantSlugs] = await Promise.all([
    getAllArticleMeta(),
    getVariantSlugs(),
  ]);

  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/writing/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...variantSlugs.map((slug) => ({
      url: `${SITE_URL}/resume/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return entries;
}
