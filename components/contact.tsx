import Link from 'next/link';

const CONTACT_LINKS = [
  { href: 'mailto:geovanny@pm.me', label: 'geovanny@pm.me', external: false },
  {
    href: 'https://linkedin.com/in/geovannycordero',
    label: 'LinkedIn',
    external: true,
  },
  {
    href: 'https://github.com/geovannycordero',
    label: 'GitHub',
    external: true,
  },
  {
    href: 'https://www.upwork.com/freelancers/~013cc6068c4bfca093',
    label: 'Upwork',
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id='contact'
      className='scroll-mt-24 bg-paper py-20 text-left dark:bg-paper'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='mb-4 text-balance font-serif text-3xl font-normal text-ink sm:text-4xl'>
          Let&apos;s talk about what you&apos;re building.
        </h2>
        <p className='mb-8 max-w-[50ch] text-ink-muted'>
          Open to full-time roles and select freelance projects. I read every
          message myself.
        </p>
        <div className='flex flex-wrap gap-8 font-mono text-sm'>
          {CONTACT_LINKS.map(({ href, label, external }) => (
            <Link
              key={href}
              href={href}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className='border-b border-line pb-0.5 text-ink transition-colors hover:border-accent-brand hover:text-accent-brand dark:border-line/30'
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
