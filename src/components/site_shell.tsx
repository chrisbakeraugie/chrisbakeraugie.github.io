import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboardButton } from '@/components/copy_to_clipboard_button';
import { IconExternalLink } from '@/components/icon_external_link';
import { AUTHOR } from '@/lib/site';
import { displayUrl, initials } from '@/lib/utils';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const githubUrl = displayUrl(AUTHOR.github);
  const emailCopyLabel = `Copy ${AUTHOR.email} to clipboard`;

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
              <IconExternalLink
                href={AUTHOR.github}
                icon={faGithub}
                tooltip={`Visit ${githubUrl}`}
              />
            </li>
            <li>
              <CopyToClipboardButton
                value={AUTHOR.email}
                icon={faEnvelope}
                label={emailCopyLabel}
                errorFallbackHref={`mailto:${AUTHOR.email}`}
              />
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
