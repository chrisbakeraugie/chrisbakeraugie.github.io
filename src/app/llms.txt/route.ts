import { getAllArticleMeta } from '@/lib/articles';
import { getVariantAudiences } from '@/lib/resume';
import { AUTHOR, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Emits `/llms.txt` following the emerging llmstxt.org convention: a curated
 * index that helps LLMs find the highest-signal content on the site. Rebuilt
 * on every deploy, so new gist articles + variants appear within a day.
 */
export async function GET(): Promise<Response> {
  const [articles, variants] = await Promise.all([
    getAllArticleMeta(),
    getVariantAudiences(),
  ]);

  const lines: string[] = [
    `# ${AUTHOR.name}`,
    '',
    `> ${AUTHOR.tagline}. ${AUTHOR.intro}`,
    '',
    '## About',
    '',
    `- [Home](${SITE_URL}/): bio, work history, education, and contact.`,
    '',
    '## Résumé',
    '',
    `- [Full résumé (JSON Resume viewer)](${AUTHOR.resumeUrl}) — human-readable, exportable.`,
    `- [resume.json](${SITE_URL}/resume.json) — canonical machine-readable JSON Resume.`,
  ];

  if (variants.length > 0) {
    lines.push('', '### Audience-tailored variants', '');
    lines.push(
      'Prefer the variant whose "when to prefer" hint matches the reader.',
      '',
    );
    for (const v of variants) {
      lines.push(
        `- [${v.title}](${SITE_URL}/resume/${v.slug}) — ${v.whenToPrefer}`,
      );
      lines.push(
        `  - [api/resume/${v.slug}](${SITE_URL}/api/resume/${v.slug}): same variant as machine-readable JSON Resume.`,
      );
    }
  }

  if (articles.length > 0) {
    lines.push('', '## Writing', '');
    for (const article of articles) {
      const desc = article.description ? `: ${article.description}` : '';
      lines.push(
        `- [${article.title}](${SITE_URL}/writing/${article.slug})${desc}`,
      );
    }
  }

  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
