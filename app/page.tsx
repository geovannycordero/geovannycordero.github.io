import type { Metadata } from 'next';
import Hero from '@/components/hero';
import CaseStudies from '@/components/case-studies';
import About from '@/components/about';
import Skills from '@/components/skills';
import Experience from '@/components/experience';
import Credentials from '@/components/credentials';
import Contact from '@/components/contact';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Geovanny Cordero Valverde - Full-Stack Software Engineer',
  description:
    'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies. Based in San José, Costa Rica.',
  keywords:
    'Full-Stack Developer, Software Engineer, Golang, Ruby on Rails, JavaScript, Vue.js, React, Costa Rica, Web Development, Backend Development, Frontend Development',
  authors: [{ name: 'Geovanny Cordero Valverde' }],
  creator: 'Geovanny Cordero Valverde',
  publisher: 'Geovanny Cordero Valverde',
  openGraph: {
    title: 'Geovanny Cordero Valverde - Full-Stack Software Engineer',
    description:
      'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.',
    url: 'https://geovannycordero.com',
    siteName: 'Geovanny Cordero Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geovanny Cordero Valverde - Full-Stack Software Engineer',
    description:
      'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.',
  },
  alternates: {
    canonical: 'https://geovannycordero.com',
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
};

export default function Home() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Geovanny Cordero Portfolio',
            url: 'https://geovannycordero.com',
          }),
        }}
      />
      <main id='main' className='min-h-screen bg-paper'>
        <Navigation />
        <Hero />
        <CaseStudies />
        <About />
        <Skills />
        <Experience />
        <Credentials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
