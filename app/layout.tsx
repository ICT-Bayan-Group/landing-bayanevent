import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BAYAN EVENT',
  description: 'Coming Soon Bayan Event Website',
  icons: {
    icon: [
      {
        url: 'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519204/black_uqk69m.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519200/nextlevel_aqk8gz.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}