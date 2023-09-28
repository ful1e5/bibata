import './globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const font = Inter({ weight: '400', subsets: ['latin'] });

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
    <html lang="en">
      <Providers>
        <body className={font.className}>{children}</body>
      </Providers>
    </html>
  );
}
