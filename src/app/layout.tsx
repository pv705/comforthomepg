import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LeadCapture from '@/components/LeadCapture';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Comfort Home PG - Verified PG in Sarita Vihar, New Delhi',
  description:
    'Comfort Home PG offers bright, spacious single, double and triple-sharing rooms near Sarita Vihar Metro. Fully verified PG for students and working professionals. Starting ₹6,500/month.',
  keywords: [
    'PG in Sarita Vihar',
    'Paying Guest Sarita Vihar',
    'Verified PG New Delhi',
    'Student accommodation Delhi',
    'Working professional PG',
    'Comfort Home PG',
  ],
  openGraph: {
    title: 'Comfort Home PG - Verified PG in Sarita Vihar, New Delhi',
    description:
      'Bright, spacious rooms near Sarita Vihar Metro. Starting ₹6,500/month. Fully verified and built for students and working professionals.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Comfort Home PG',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <LeadCapture>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        </LeadCapture>
      </body>
    </html>
  );
}
