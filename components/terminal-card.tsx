const FACTS: Array<[string, string]> = [
  ['name', 'Geovanny Cordero'],
  ['title', 'Full-Stack Software Engineer'],
  ['location', 'San José, Costa Rica'],
  ['experience', '5+ years'],
  ['award', 'Programathon 2020 Champion'],
];

const LANGUAGES = ['Golang', 'Ruby', 'JavaScript', 'TypeScript'];

export default function TerminalCard() {
  return (
    <div
      aria-hidden='true'
      className='rounded-xl border border-line/20 bg-surface/40 p-6 font-mono text-sm dark:shadow-[0_0_30px_rgba(0,255,65,0.03)]'
    >
      <div className='mb-2 text-accent-brand'>$ cat about.md</div>
      <div className='space-y-1 text-ink-muted'>
        {FACTS.map(([key, value]) => (
          <p key={key}>
            <span className='text-accent-brand'>{key}</span>
            {' : '}
            {`"${value}"`}
          </p>
        ))}
        <p>
          <span className='text-accent-brand'>languages</span>
          {' : ['}
          {LANGUAGES.map(lang => `"${lang}"`).join(', ')}
          {']'}
        </p>
        <p className='mt-2 text-accent-brand motion-safe:animate-terminal-blink'>
          $ _
        </p>
      </div>
    </div>
  );
}
