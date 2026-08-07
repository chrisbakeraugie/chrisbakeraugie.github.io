import Link from 'next/link';
import { getAllArticleMeta } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import { AUTHOR } from '@/lib/site';

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
    role: 'Fullstack Engineer',
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

export default async function Home() {
  const articles = await getAllArticleMeta();

  return (
    <>
      <section aria-labelledby="intro-heading">
        <header className="major">
          <h2 id="intro-heading">{AUTHOR.tagline}</h2>
        </header>
        <p>{AUTHOR.intro}</p>
      </section>

      <section id="experience" aria-labelledby="experience-heading">
        <header className="major">
          <h2 id="experience-heading">Experience</h2>
        </header>
        <ol className="experience-list">
          {WORK.map((job) => (
            <li key={job.company}>
              <article>
                <header>
                  <h3>
                    {job.role} · <strong>{job.company}</strong>
                  </h3>
                  <time dateTime={job.period.replace(/\s/g, '')}>
                    {job.period}
                  </time>
                </header>
                <p>{job.summary}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>

      {articles.length > 0 && (
        <section aria-labelledby="writing-heading">
          <header className="major">
            <h2 id="writing-heading">Recent Writing</h2>
          </header>
          <ul className="work-grid">
            {articles.map((article) => (
              <li key={article.slug} className="work-item">
                <article>
                  <Link
                    href={`/writing/${article.slug}`}
                    className="strata-link"
                  >
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    {article.date && (
                      <time dateTime={article.date}>
                        {formatDate(article.date)}
                      </time>
                    )}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="contact-heading">
        <header className="major">
          <h2 id="contact-heading">Get In Touch</h2>
        </header>
        <p>
          Open to conversations about fullstack engineering, static-first
          architecture, and teams that care about craft. Reach out by email or
          GitHub.
        </p>
        <ul className="contact-grid">
          <li>
            <h3>Location</h3>
            <address>{AUTHOR.location}</address>
          </li>
          <li>
            <h3>Email</h3>
            <p>
              <a href={`mailto:${AUTHOR.email}`} className="strata-link">
                {AUTHOR.email}
              </a>
            </p>
          </li>
          <li>
            <h3>GitHub</h3>
            <p>
              <a href={AUTHOR.github} className="strata-link">
                {AUTHOR.github.replace('https://', '')}
              </a>
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}
