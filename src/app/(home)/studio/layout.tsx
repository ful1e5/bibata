import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bibata Studio',
  description:
    'Bibata Studio. The easiest and fastest way to download and personalize color and animation in the #1 internet-ranked Bibata Cursor. Built with open-source technologies and freely accessible.'
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <main>{children}</main>;
}
