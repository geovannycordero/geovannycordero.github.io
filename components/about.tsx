import SectionHead from '@/components/section-head';

const PARAGRAPHS = [
  "I've spent five years at Pernix Solutions moving from Apprentice to Software Engineer III to Supervisor of the Apprentice Program — a path that taught me as much about mentoring as it did about Golang and Rails.",
  "I've worked with teams across the US, Colombia, Australia, and India, and I currently split my time between that leadership track and freelance builds for small businesses who need a site that actually converts.",
  "Right now I'm pursuing an MBA focused on project management, mostly to get better at the parts of engineering that happen outside the editor.",
];

const STATS = [
  { label: '5+ years', detail: 'Full-stack, Golang & Rails' },
  { label: '4 client sites', detail: 'Shipped & live in production' },
  { label: '4 countries', detail: 'Teams collaborated with' },
  { label: '2020', detail: 'Programathon Competition Champion' },
];

export default function About() {
  return (
    <SectionHead index='02' label='About' id='about'>
      <div className='grid gap-12 lg:grid-cols-[1.3fr_1fr]'>
        <div data-testid='about-prose' className='measure max-w-[640px]'>
          {PARAGRAPHS.map(paragraph => (
            <p key={paragraph} className='mb-4 text-ink-muted'>
              {paragraph}
            </p>
          ))}
        </div>

        <div className='grid content-start gap-5'>
          {STATS.map(stat => (
            <div
              key={stat.label}
              data-testid='about-stat'
              className='border-l-2 border-accent-brand pl-4'
            >
              <b className='block text-base text-ink'>{stat.label}</b>
              <span className='text-sm text-ink-muted'>{stat.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionHead>
  );
}
