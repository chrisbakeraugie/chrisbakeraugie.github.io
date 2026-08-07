import Link from 'next/link';
import { AUTHOR } from '@/lib/site';
import { initials } from '@/lib/utils';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div id="wrapper">
      <header id="header">
        <span className="avatar avatar-initials" aria-hidden="true">
          {initials(AUTHOR.name)}
        </span>
        <h1>
          <strong>{AUTHOR.name}</strong>
          <br />
          {AUTHOR.role}
        </h1>
      </header>
      <main id="main">
        {children}
        <footer id="footer">
          <ul className="icons">
            <li>
              <Link href={AUTHOR.github}>GitHub</Link>
            </li>
            <li>
              <a href={`mailto:${AUTHOR.email}`}>Email</a>
            </li>
          </ul>
          <ul className="copyright">
            <li>
              &copy; {new Date().getFullYear()} {AUTHOR.name}
            </li>
          </ul>
        </footer>
      </main>
    </div>
  );
}
