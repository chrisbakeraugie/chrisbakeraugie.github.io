import type { Metadata } from 'next';
import { AUTHOR, SITE_URL } from '@/lib/site';
import './globals.css';

// metadataBase lets every page emit ABSOLUTE og:image / og:url values from
// relative paths — required for LinkedIn and other unfurlers.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR.name} — ${AUTHOR.role}`,
    template: `%s — ${AUTHOR.name}`,
  },
  description: AUTHOR.tagline,
  openGraph: {
    type: 'website',
    siteName: AUTHOR.name,
    url: SITE_URL,
    title: `${AUTHOR.name} — ${AUTHOR.role}`,
    description: AUTHOR.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
