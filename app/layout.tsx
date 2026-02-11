import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cover Letter Generator | Create Professional Cover Letters',
  description:
    'Create professional cover letters with our modern generator. Multiple templates, real-time preview, and PDF export functionality.',
  keywords: [
    'cover letter',
    'cover letter generator',
    'job application',
    'resume',
    'career',
    'professional',
  ] as unknown as string,
  authors: [{ name: 'Sebastian Llovera Studio' }],
  creator: 'Sebastian Llovera Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cover-letter-app-v2.vercel.app',
    title: 'Cover Letter Generator',
    description: 'Create professional cover letters in minutes',
    siteName: 'Cover Letter Generator',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
