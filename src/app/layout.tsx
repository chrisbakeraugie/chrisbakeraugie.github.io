import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chris Baker',
  description: 'Personal portfolio and writing site.',
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
