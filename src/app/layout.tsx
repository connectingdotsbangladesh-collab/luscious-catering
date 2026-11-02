import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '../components/providers/ClientProviders';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Luscious Haute Catering | Artisanal Dim Sum, Banquets & Luxury Galas',
  description:
    'Life is so endlessly delicious. Luscious brings Michelin-caliber culinary craft, handmade artisanal dumplings, and bespoke banquet catering directly to your luxury events.',
  keywords: [
    'catering',
    'luxury catering',
    'dim sum catering',
    'dumpling catering',
    'wedding banquet',
    'corporate gala catering',
    'artisanal food catering',
  ],
  openGraph: {
    title: 'Luscious Haute Catering | Artisanal Dim Sum & Luxury Banquets',
    description: 'Take a taste. Come join us. Life is so endlessly delicious.',
    url: 'https://lusciouscatering.com',
    siteName: 'Luscious Catering',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Luscious Handcrafted Catering Platter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
