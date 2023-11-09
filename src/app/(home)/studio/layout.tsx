import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bibata Studio'
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <main>{children}</main>;
}
