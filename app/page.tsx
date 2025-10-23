import type { Metadata } from 'next';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Experience from '@/components/experience';
import Education from '@/components/education';
import Awards from '@/components/awards';
import Contact from '@/components/contact';
import EnhancedNavigation from '@/components/enhanced-navigation';
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
    images: [
      {
        url: '/icons/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Geovanny Cordero Valverde - Full-Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geovanny Cordero Valverde - Full-Stack Software Engineer',
    description:
      'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.',
    images: ['/icons/android-chrome-512x512.png'],
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
    <main className='min-h-screen bg-white'>
      <EnhancedNavigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Awards />
      <Contact />
      <Footer />
    </main>
  );
}
