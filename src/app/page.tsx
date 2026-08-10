import Link from 'next/link';
import { ScrollStage } from '@/components/scroll_stage';
import { TimelineSection } from '@/components/timeline_section';
import { getAllArticleMeta } from '@/lib/articles';
import { getEducation, getWorkExperiences } from '@/lib/resume';
import { AUTHOR } from '@/lib/site';
import { formatDate } from '@/lib/utils';

export default async function Home() {
  const [articles, work, education] = await Promise.all([
    getAllArticleMeta(),
    getWorkExperiences(),
    getEducation(),
  ]);

  const stages = work.map((entry) => ({
    id: entry.id,
    logoSrc: entry.logoSrc,
    logoAlt: entry.logoAlt,
  }));

  return (
    <>
      <ScrollStage stages={stages} />
      <section className="home-intro" aria-labelledby="intro-heading">
        <header className="major">
          <h2 id="intro-heading">{AUTHOR.tagline}</h2>
        </header>
        <p>{AUTHOR.intro}</p>
      </section>

      <TimelineSection
        sectionId="experience"
        heading="Experience"
        entries={work}
      />

      <TimelineSection
        sectionId="education"
        heading="Education"
        entries={education}
        dense
      />

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
