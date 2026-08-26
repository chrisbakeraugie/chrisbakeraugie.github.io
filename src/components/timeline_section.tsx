import type { TimelineEntry } from '@/lib/resume';

export interface TimelineSectionProps {
  /** Used as the section id and to derive the heading id. */
  sectionId: string;
  heading: string;
  entries: readonly TimelineEntry[];
  /**
   * When true, items render at their natural height (no per-item viewport
   * padding) and are excluded from the scroll-stage effect. Use for shorter
   * sections like education where full-viewport-per-item feels excessive.
   */
  dense?: boolean;
}

/**
 * Server-rendered dated timeline (experience, education, etc.) whose items opt
 * into the scroll-stage effect via `data-scroll-stage` unless `dense` is set.
 */
export function TimelineSection({
  sectionId,
  heading,
  entries,
  dense = false,
}: TimelineSectionProps) {
  if (entries.length === 0) return null;

  const headingId = `${sectionId}-heading`;

  return (
    <section id={sectionId} aria-labelledby={headingId}>
      <header className="major">
        <h2 id={headingId}>{heading}</h2>
      </header>
      <ol className="timeline-list">
        {entries.map((entry) => (
          <li
            key={entry.id}
            {...(dense ? {} : { 'data-scroll-stage': entry.id })}
          >
            <article>
              <header>
                <h3>
                  {entry.title && <>{entry.title} · </>}
                  <strong>{entry.subtitle}</strong>
                </h3>
                {entry.period && (
                  <time dateTime={entry.startDate ?? ''}>{entry.period}</time>
                )}
              </header>
              {entry.summary.length > 0 && (
                <div className="timeline-summary">
                  {entry.summary.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              {entry.highlights.length > 0 && (
                <ul className="timeline-highlights">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
