import '@app/(home)/globals.css';

import { Metadata } from 'next';
import { Barlow } from 'next/font/google';

import { Providers } from '@app/(home)/providers';
import Navbar from '@components/Navbar';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow'
});

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

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <Providers>
        <body className={`${barlow.variable} font-barlow`}>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
