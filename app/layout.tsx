import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { THEME_INIT_SCRIPT } from '@/lib/theme-script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://geovannycordero.com'),
  title: {
    default: 'Geovanny Cordero Valverde - Full-Stack Software Engineer',
    template: '%s - Geovanny Cordero Valverde',
  },
  description:
    'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies. Based in San José, Costa Rica.',
  keywords:
    'Full-Stack Developer, Software Engineer, Golang, Ruby on Rails, JavaScript, Vue.js, React, Costa Rica, Web Development, Backend Development, Frontend Development',
  authors: [{ name: 'Geovanny Cordero Valverde' }],
  creator: 'Geovanny Cordero Valverde',
  publisher: 'Geovanny Cordero Valverde',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://geovannycordero.com',
    title: 'Geovanny Cordero Valverde - Full-Stack Software Engineer',
    description:
      'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.',
    siteName: 'Geovanny Cordero Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geovanny Cordero Valverde - Full-Stack Software Engineer',
    description:
      'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#059669',
      },
    ],
  },
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
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <head>
        {/* Set the correct theme class before first paint — avoids a flash of
            the wrong theme now that the default is 'system' rather than a
            hardcoded class. Must run before any stylesheet paints. */}
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />

        {/* Favicon and Icons */}
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          href='/icons/favicon-16x16.png'
          sizes='16x16'
          type='image/png'
        />
        <link
          rel='icon'
          href='/icons/favicon-32x32.png'
          sizes='32x32'
          type='image/png'
        />
        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
        <link rel='manifest' href='/icons/site.webmanifest' />

        {/* RSS */}
        <link
          rel='alternate'
          type='application/rss+xml'
          title='Geovanny Cordero Valverde - Blog RSS Feed'
          href='/rss.xml'
        />

        {/* Theme and Meta */}
        <meta name='theme-color' content='#059669' />
        <meta name='msapplication-TileColor' content='#059669' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Geovanny Cordero' />
        <meta name='application-name' content='Geovanny Cordero Portfolio' />
        <meta
          name='msapplication-tooltip'
          content='Geovanny Cordero Portfolio'
        />
        <meta name='msapplication-starturl' content='/' />
        <meta name='msapplication-navbutton-color' content='#059669' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Geovanny Cordero Valverde',
              jobTitle: 'Full-Stack Software Engineer',
              description:
                'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.',
              url: 'https://geovannycordero.com',
              email: 'geovanny@pm.me',
              telephone: '+506 8852 7576',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'San José',
                addressCountry: 'Costa Rica',
              },
              sameAs: ['https://linkedin.com/in/geovannycordero'],
              knowsAbout: [
                'Golang',
                'Ruby on Rails',
                'JavaScript',
                'Vue.js',
                'Full-Stack Development',
                'Team Leadership',
                'Software Engineering',
              ],
            }),
          }}
        />

        {/* Plausible Analytics (self-hosted) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              defer
              data-domain='geovannycordero.com'
              src='https://analytics.geovannycordero.com/js/script.file-downloads.outbound-links.js'
            />
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }',
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
