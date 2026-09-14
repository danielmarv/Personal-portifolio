import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';

import { profile, socials } from '@/content/profile';
import { ui } from '@/content/site';

import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  axes: ['wdth'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://danielntege.dev';
const description = `${profile.role} in ${profile.location}. ${profile.focus}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.shortName} — ${profile.role}`,
    template: `%s — ${profile.shortName}`,
  },
  description,
  applicationName: `${profile.shortName} portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    'software engineer',
    'backend engineer',
    'Kampala',
    'Uganda',
    'Hedera',
    'Hiero',
    'distributed ledger',
    'TypeScript',
    'Node.js',
    'open source',
    profile.name,
  ],
  openGraph: {
    type: 'profile',
    siteName: profile.shortName,
    title: `${profile.shortName} — ${profile.role}`,
    description,
    url: siteUrl,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.shortName} — ${profile.role}`,
    description,
    creator: '@danielmarvin785',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#04050d',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/** Schema.org Person, so search engines resolve the identity correctly. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.shortName,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kampala',
    addressCountry: 'UG',
  },
  worksFor: {
    '@type': 'Organization',
    name: profile.organisation,
    url: profile.organisationUrl,
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Bugema University',
  },
  sameAs: socials.filter((s) => s.id !== 'email').map((s) => s.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="focus:bg-aurora-green focus:text-void sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold"
        >
          {ui.skipToContent}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
