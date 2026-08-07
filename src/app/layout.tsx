import { Source_Sans_3 } from 'next/font/google';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/site_shell';
import { AUTHOR, SITE_URL } from '@/lib/site';
import './globals.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

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
    <html lang="en" className={sourceSans.className}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
