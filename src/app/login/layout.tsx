import React from 'react';

export const metadata = {
  title: 'Bibata | Login',
  description: 'Login into Bibata'
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
