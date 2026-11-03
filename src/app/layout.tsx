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
  title: 'Ahlan Catering | Premier Office Lunch, Bespoke Events & Luxury Catering',
  description:
    'Ahlan wa Sahlan. Ahlan Catering provides piping-hot executive office lunches, breathtaking wedding banquets, and live-chef catering. 100% Halal certified, punctual delivery, and unforgettable culinary craftsmanship.',
  keywords: [
    'Ahlan Catering',
    'office lunch catering',
    'corporate catering',
    'daily office lunch delivery',
    'wedding catering',
    'event banquet catering',
    'live cooking catering',
    'halal catering',
  ],
  openGraph: {
    title: 'Ahlan Catering | Office Lunch & Grand Event Catering',
    description: 'Ahlan wa Sahlan. Warm hospitality, chef-crafted office lunches, and royal event feasts.',
    url: 'https://ahlancatering.com',
    siteName: 'Ahlan Catering',
    images: [
      {
        url: '/studio_4k_v3_hero_food.png',
        width: 1200,
        height: 630,
        alt: 'Ahlan Catering Handcrafted Platter',
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
