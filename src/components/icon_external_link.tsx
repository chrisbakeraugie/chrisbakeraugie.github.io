import {
  IconControlLabel,
  iconControlAttributes,
  resolveIconAriaLabel,
  resolveIconDescription,
  type IconControlProps,
} from '@/components/icon_control';

export interface IconExternalLinkProps extends IconControlProps {
  href: string;
  /** When true, opens in a new browsing context. Defaults to true. */
  newTab?: boolean;
}

/** Icon link for external URLs with tooltip and descriptive HTML. */
export function IconExternalLink({
  href,
  icon,
  tooltip,
  description,
  ariaLabel,
  newTab = true,
}: IconExternalLinkProps) {
  const resolvedDescription = resolveIconDescription(description, tooltip);
  const resolvedAriaLabel = resolveIconAriaLabel(
    ariaLabel,
    resolvedDescription,
    tooltip,
  );

  return (
    <a
      href={href}
      {...iconControlAttributes(tooltip, resolvedAriaLabel)}
      {...(newTab
        ? { target: '_blank', rel: 'noopener noreferrer' as const }
        : {})}
    >
      <IconControlLabel icon={icon} description={resolvedDescription} />
    </a>
  );
}
