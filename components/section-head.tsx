import type React from 'react';

interface SectionHeadProps {
  index: string;
  label: string;
  id: string;
  children: React.ReactNode;
}

export default function SectionHead({
  index,
  label,
  id,
  children,
}: SectionHeadProps) {
  return (
    <section
      id={id}
      className='scroll-mt-24 border-b border-line py-[4.5rem] dark:border-line/20'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-9 flex items-baseline gap-3'>
          <span className='font-mono text-sm text-accent-brand'>{index}</span>
          <h2 className='text-sm font-bold uppercase tracking-widest text-ink'>
            {label}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
