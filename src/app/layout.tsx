import '@app/globals.css';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import React from 'react';
import { Metadata } from 'next';

import { Providers } from '@app/(home)/providers';
import { NavBar } from '@components/NavBar';
import { Footer } from '@components/Footer';

export const metadata: Metadata = {
  title: 'Bibata',
  description: "The place where Bibata's cursor gets personalized.",
  icons: {
    icon: ['favicon/favicon.ico?v=2'],
    apple: ['favicon/apple-touch-icon.png?v=2'],
    shortcut: ['favicon/apple-touch-icon.png?v=2']
  },
  manifest: '/favicon/site.webmanifest'
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <Providers>
        <body className='dark'>
          <NavBar />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
