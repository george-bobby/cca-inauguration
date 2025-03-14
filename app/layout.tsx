import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Montserrat } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CARBO - Carbon Footprint Tracker',
  description: 'Track and reduce your carbon footprint in real-time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@700,500&display=swap" rel="stylesheet" />
      </head>
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}