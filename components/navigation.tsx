'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useBlogNavigation } from './blog-navigation-handler';
import { ThemeToggle } from '@/components/theme-toggle';

interface NavItemData {
  href: string;
  label: string;
  type: 'anchor' | 'blog' | 'projects';
}

const NAV_ITEMS: NavItemData[] = [
  { href: '/#work', label: 'Work', type: 'anchor' },
  { href: '/#about', label: 'About', type: 'anchor' },
  { href: '/#skills', label: 'Skills', type: 'anchor' },
  { href: '/#experience', label: 'Experience', type: 'anchor' },
  { href: '/#credentials', label: 'Credentials', type: 'anchor' },
  { href: '/blog', label: 'Blog', type: 'blog' },
  { href: '/projects', label: 'Projects', type: 'projects' },
];

const LINK_CLASSES =
  'font-medium text-ink-muted transition-colors hover:text-accent-brand';

function NavItem({
  item,
  onNavigate,
  className,
}: {
  item: NavItemData;
  onNavigate: (item: NavItemData) => void;
  className?: string;
}) {
  if (item.type === 'blog') {
    return (
      <button
        type='button'
        onClick={() => onNavigate(item)}
        className={className ?? LINK_CLASSES}
      >
        {item.label}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      className={className ?? LINK_CLASSES}
      onClick={() => onNavigate(item)}
    >
      {item.label}
    </Link>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const { navigateToBlog } = useBlogNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleNavClick = (item: NavItemData) => {
    setIsOpen(false);

    if (item.type === 'blog') {
      navigateToBlog('#blog-content');
      return;
    }
    if (item.type === 'projects') {
      router.push('/projects');
      return;
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isOpen ? 'bottom-0 flex flex-col bg-paper dark:bg-paper' : ''
      } ${
        isOpen
          ? ''
          : scrolled
            ? 'border-b border-line bg-paper/90 backdrop-blur-md dark:border-line/20 dark:bg-paper/90'
            : 'bg-transparent'
      }`}
    >
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isOpen ? 'flex flex-1 flex-col overflow-hidden' : ''}`}
      >
        <div className='flex items-center justify-between py-4'>
          <Link href='/' className='font-mono text-sm text-ink'>
            Geovanny Cordero
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden items-center gap-6 lg:flex'>
            <div className='flex gap-6'>
              {NAV_ITEMS.map(item => (
                <NavItem
                  key={item.href}
                  item={item}
                  onNavigate={handleNavClick}
                />
              ))}
            </div>
            <Link
              href='/#contact'
              className='rounded-sm bg-ink px-4 py-2 text-sm text-paper transition-opacity hover:opacity-80 dark:bg-accent-brand dark:text-paper'
            >
              Get in touch
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className='flex items-center gap-2 lg:hidden'>
            <ThemeToggle />
            <Button
              variant='ghost'
              size='icon'
              className='text-ink-muted hover:text-accent-brand'
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className='flex-1 overflow-y-auto border-t border-line bg-paper pb-4 dark:border-line/20 dark:bg-paper lg:hidden'>
            <div className='flex flex-col gap-4 pt-4'>
              {NAV_ITEMS.map(item => (
                <NavItem
                  key={item.href}
                  item={item}
                  onNavigate={handleNavClick}
                  className={`${LINK_CLASSES} text-left`}
                />
              ))}
              <Link
                href='/#contact'
                onClick={() => setIsOpen(false)}
                className='inline-block w-fit rounded-sm bg-ink px-4 py-2 text-sm text-paper dark:bg-accent-brand'
              >
                Get in touch
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
