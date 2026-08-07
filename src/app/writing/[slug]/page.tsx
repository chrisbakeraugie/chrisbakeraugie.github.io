import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, getArticleSlugs } from '@/lib/articles';

interface PageParams {
  params: Promise<{ slug: string }>;
}

// Required for static export: enumerate every article page at build time.
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

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: PageParams) {
  const { slug } = await params;

  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/"
        className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
      >
        ← Back
      </Link>

      <article className="mt-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>
          <time
            dateTime={article.date}
            className="mt-2 block text-sm text-neutral-500"
          >
            {formatDate(article.date)}
          </time>
        </header>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </article>
    </main>
  );
}
