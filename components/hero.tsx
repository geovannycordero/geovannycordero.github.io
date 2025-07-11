import { Button } from '@/components/ui/button';
import { MapPin, Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className='min-h-screen flex items-center justify-center bg-background pt-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sage-900'>
                Geovanny
                <span className='block text-emerald-600'>Cordero</span>
              </h1>
              <p className='text-xl sm:text-2xl text-emerald-700 font-medium'>
                Full-Stack Software Engineer
              </p>
              <div className='flex items-center gap-2 text-sage-600'>
                <MapPin className='h-4 w-4' />
                <span>San José, Costa Rica</span>
              </div>
            </div>

            <p className='text-lg text-sage-700 leading-relaxed'>
              Passionate Full-Stack Software Engineer with 5+ years of
              experience, specializing in Golang, Ruby on Rails, and JavaScript
              technologies. Proven expertise in leading teams and delivering
              high-quality software solutions.
            </p>

            <div className='flex flex-wrap gap-4'>
              <Button
                asChild
                size='lg'
                className='bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <Link href='/#contact'>Get In Touch</Link>
              </Button>
              <Button
                variant='outline'
                size='lg'
                asChild
                className='border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300'
              >
                <Link href='/#about'>Learn More</Link>
              </Button>
            </div>

            <div className='flex flex-wrap gap-6 pt-4'>
              <Link
                href='mailto:geovanny@pm.me'
                className='flex items-center gap-2 text-sage-600 hover:text-emerald-600 transition-colors duration-200'
              >
                <Mail className='h-4 w-4' />
                <span className='hidden sm:inline'>geovanny@pm.me</span>
              </Link>
              <Link
                href='https://linkedin.com/in/geovannycordero'
                target='_blank'
                className='flex items-center gap-2 text-sage-600 hover:text-emerald-600 transition-colors duration-200'
              >
                <Linkedin className='h-4 w-4' />
                <span className='hidden sm:inline'>LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className='flex justify-center lg:justify-end'>
            <div className='relative'>
              <div className='w-80 h-80 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center overflow-hidden shadow-2xl hover-lift'>
                <Image
                  src='/images/me-forest.jpg'
                  alt='Geovanny Cordero Valverde on a forest bridge'
                  width={320}
                  height={320}
                  className='rounded-2xl object-cover w-full h-full'
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-emerald-200 rounded-full opacity-60 blur-xl'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-300 rounded-full opacity-40 blur-xl'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
