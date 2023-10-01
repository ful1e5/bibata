import './globals.css';

import { Metadata } from 'next';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Bibata Live',
  description: "The place where Bibata's cursor gets personalized.",
  icons: {
    icon: ['favicon/favicon.ico?v=4'],
    apple: ['favicon/apple-touch-icon.png?v=4'],
    shortcut: ['favicon/apple-touch-icon.png']
  },
  manifest: '/favicon/site.webmanifest'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
