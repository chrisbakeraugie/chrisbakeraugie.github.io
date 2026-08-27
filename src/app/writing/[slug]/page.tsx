import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, getArticleSlugs } from '@/lib/articles';
import { buildArticleJsonLd, serializeJsonLd } from '@/lib/json_ld';
import { formatDate } from '@/lib/utils';

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticle(slug);
  if (!article) return {};

  const canonical = `/writing/${slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      tags: [...article.tags],
    },
  };
}

export default async function ArticlePage({ params }: PageParams) {
  const { slug } = await params;

  const article = await getArticle(slug);
  if (!article) notFound();

  const articleJsonLd = buildArticleJsonLd({
    title: article.title,
    description: article.description,
    slug: article.slug,
    date: article.date || undefined,
  });

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <Link href="/" className="article-page-back">
        &larr; Back
      </Link>

      <article className="article-page">
        <header className="major">
          <h1>{article.title}</h1>
          {article.date && (
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          )}
        </header>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </article>
    </section>
  );
}
