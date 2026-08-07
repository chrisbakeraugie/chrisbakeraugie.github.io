import Link from 'next/link';
import { AUTHOR } from '@/lib/site';
import { getAllArticleMeta } from '@/lib/articles';

// Dummy work history. In a later pass this can move to a resume.json read at
// build time so the same data drives both this page and a machine-readable file.
const WORK = [
  {
    company: 'Acme Corp',
    role: 'Senior Software Engineer',
    period: '2023 — Present',
    summary:
      'Lead front-end for the billing platform. Cut page load time 40% by moving to a static-first render pipeline.',
  },
  {
    company: 'Globex',
    role: 'Full-stack Engineer',
    period: '2020 — 2023',
    summary:
      'Built internal tooling in TypeScript and Node. Owned the design system used across six product teams.',
  },
  {
    company: 'Initech',
    role: 'Software Engineer',
    period: '2018 — 2020',
    summary:
      'Shipped customer-facing features on a React/Rails stack and mentored two junior engineers.',
  },
] as const;

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function Home() {
  const articles = await getAllArticleMeta();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight">{AUTHOR.name}</h1>
        <p className="mt-1 text-lg text-neutral-500">{AUTHOR.role}</p>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300">
          {AUTHOR.tagline}
        </p>
      </header>

      <section className="mb-16" aria-labelledby="experience-heading">
        <h2
          id="experience-heading"
          className="mb-6 text-xs font-semibold uppercase tracking-widest text-neutral-500"
        >
          Experience
        </h2>
        <ol className="space-y-8">
          {WORK.map((job) => (
            <li key={job.company}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold">
                  {job.role} ·{' '}
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {job.company}
                  </span>
                </h3>
                <span className="shrink-0 text-sm text-neutral-500">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                {job.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="writing-heading">
        <h2
          id="writing-heading"
          className="mb-6 text-xs font-semibold uppercase tracking-widest text-neutral-500"
        >
          Writing
        </h2>
        <ul className="space-y-8">
          {articles.map((article) => (
            <li key={article.slug}>
              <article>
                <Link href={`/writing/${article.slug}`} className="group block">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-semibold group-hover:underline">
                      {article.title}
                    </h3>
                    <time
                      dateTime={article.date}
                      className="shrink-0 text-sm text-neutral-500"
                    >
                      {formatDate(article.date)}
                    </time>
                  </div>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                    {article.description}
                  </p>
                  <span className="mt-2 inline-block text-sm text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-200">
                    Read article →
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
