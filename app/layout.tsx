import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimasi font loading
});

// Structured Data untuk SEO - Sports Event
const sportsEventSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'BAYAN EVENT',
  description: 'Penyelenggara Event Terbesar di Balikpapan - Bayan Run, Bayan Open, Bayan Craftart Festival',
  url: 'https://www.bayanevent.com', // Ganti dengan URL sebenarnya
  logo: 'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519204/black_uqk69m.png',
  sport: ['Running', 'Badminton', 'Marathon', 'Athletics'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Balikpapan',
    addressRegion: 'Kalimantan Timur',
    addressCountry: 'ID'
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '-1.2379',
      longitude: '116.8529'
    }
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-xxx-xxxx-xxxx', // Ganti dengan nomor sebenarnya
    contactType: 'customer service',
    areaServed: 'ID',
    availableLanguage: ['Indonesian', 'English']
  }
};

export const metadata: Metadata = {
  // Basic SEO
  title: {
    default: 'BAYAN EVENT - THE NEXT LEVEL | Official Website Bayan Event',
    template: '%s | BAYAN EVENT'
  },
  description: 'BAYAN EVENT - Penyelenggara Bayan Run, Bayan Open, Bayan Craftart Festival di Balikpapan. Event lari dan bulutangkis terbesar di Kalimantan Timur',
  
  // Keywords yang relevan - FOKUS SPORTS EVENT
  keywords: [
    'Bayan',
    'Bayan Event',
    'Bayan Run',
    'Bayan Open',
    'Bayan Run Balikpapan',
    'Bayan Open Balikpapan',
    'event running Balikpapan',
    'event lari Balikpapan',
    'marathon Balikpapan',
    'event running Kalimantan',
    'lomba lari Kalimantan Timur',
    'event bulutangkis Indonesia',
    'Bayan Open Badminton',
    'turnamen badminton Balikpapan',
    'kompetisi bulutangkis Kalimantan',
    'half marathon Balikpapan',
    '5K run Balikpapan',
    '10K run Balikpapan',
    'fun run Balikpapan',
    'badminton tournament Indonesia',
    'Bayan Championship',
    'sport event Kalimantan Timur'
  ],
  
  // Author & Creator
  authors: [{ name: 'BAYAN EVENT' }],
  creator: 'BAYAN EVENT',
  publisher: 'BAYAN EVENT',
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.bayanevent.com', // Ganti dengan URL sebenarnya
    siteName: 'BAYAN EVENT',
    title: 'BAYAN EVENT - THE NEXT LEVEL | Official Website Bayan Event',
    description: 'BAYAN EVENT - Penyelenggara Bayan Run, Bayan Open, Bayan Craftart Festival di Balikpapan. Event lari dan bulutangkis terbesar di Kalimantan Timur',
    images: [
      {
        url: 'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519204/black_uqk69m.png',
        width: 1200,
        height: 630,
        alt: 'BAYAN EVENT - Bayan Run & Bayan Open',
      }
    ],
  },
  
  
  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons dengan optimasi
  icons: {
    icon: [
      { url: 'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519204/black_uqk69m.png', media: '(prefers-color-scheme: light)' },
      { url: 'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519200/nextlevel_aqk8gz.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      { url: 'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519204/black_uqk69m.png' },
    ],
  },
  
  // Manifest untuk PWA
  manifest: '/manifest.json',
  
  // Verification (tambahkan setelah verifikasi)
  verification: {
    google: 'your-google-verification-code', // Dari Google Search Console
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  
  // Geo Location
  other: {
    'geo.region': 'ID-KI',
    'geo.placename': 'Balikpapan',
    'geo.position': '-1.2379;116.8529', // Koordinat Balikpapan
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sportsEventSchema),
          }}
        />
        
        {/* Canonical URL - Ganti dengan URL sebenarnya */}
        <link rel="canonical" href="https://www.bayanevent.com" />
        
        {/* Preconnect untuk performa */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* Alternate Language (jika ada versi bahasa lain) */}
        <link rel="alternate" hrefLang="id" href="https://www.bayanevent.com" />
        <link rel="alternate" hrefLang="en" href="https://www.bayanevent.com/en" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}