import '@app/(home)/globals.css';

import React from 'react';
import { Metadata } from 'next';

import { Providers } from '@app/(home)/providers';
import { NavBar } from '@components/NavBar';

export const metadata: Metadata = {
  title: 'Bibata',
  description: "The place where Bibata's cursor gets personalized.",
  icons: {
    icon: ['favicon/favicon.ico?v=4'],
    apple: ['favicon/apple-touch-icon.png?v=4'],
    shortcut: ['favicon/apple-touch-icon.png']
  },
  manifest: '/favicon/site.webmanifest'
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <Providers>
        <body>
          <NavBar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
