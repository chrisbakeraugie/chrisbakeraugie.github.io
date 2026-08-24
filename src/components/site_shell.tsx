import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboardButton } from '@/components/copy_to_clipboard_button';
import { IconExternalLink } from '@/components/icon_external_link';
import { SCROLL_STAGE_ROOT_ID } from '@/lib/scroll_stage';
import { AUTHOR } from '@/lib/site';
import { displayUrl } from '@/lib/utils';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const githubUrl = displayUrl(AUTHOR.github);
  const linkedinUrl = displayUrl(AUTHOR.linkedin);
  const emailCopyLabel = `Copy ${AUTHOR.email} to clipboard`;

  return (
    <div id="wrapper">
      <header id="header">
        <div id={SCROLL_STAGE_ROOT_ID} aria-hidden="true" />
        <span className="avatar avatar-photo" aria-hidden="true" />
        <h1>
          <strong>{AUTHOR.name}</strong>
          <br />
          {AUTHOR.role}
        </h1>
        <ul className="header-icons icons">
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
          <li>
            <IconExternalLink
              href={AUTHOR.linkedin}
              icon={faLinkedin}
              tooltip={`Visit ${linkedinUrl}`}
            />
          </li>
        </ul>
      </header>
      <main id="main">
        {children}
        <footer id="footer">
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
