export const metadata = {
  title: 'Bibata Live | Login',
  description: 'Login into Bibata Live'
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
