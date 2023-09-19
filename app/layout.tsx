import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Bibata Live",
  description: "The place where Bibata's cursor gets personalized.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
