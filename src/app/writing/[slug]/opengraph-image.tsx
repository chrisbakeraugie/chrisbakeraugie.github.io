import { ImageResponse } from 'next/og';
import { getArticle, getArticleSlugs } from '@/lib/articles';
import { AUTHOR } from '@/lib/site';

export const alt = 'Article preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The image is its own route, so it needs the param list too for static export.
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    throw new Error(`No article found for slug "${slug}"`);
  }

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0a0a0a',
        color: '#ededed',
        padding: '80px',
      }}
    >
      <div style={{ display: 'flex', fontSize: 28, color: '#a3a3a3' }}>
        {AUTHOR.name} · Writing
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {article.title}
      </div>
      <div style={{ display: 'flex', fontSize: 30, color: '#a3a3a3' }}>
        chrisjbaker.dev
      </div>
    </div>,
    { ...size },
  );
}
