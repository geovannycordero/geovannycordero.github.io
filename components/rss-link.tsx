import { Rss } from 'lucide-react';
import Link from 'next/link';

export default function RSSLink() {
  return (
    <Link
      href='/rss.xml'
      target='_blank'
      className='inline-flex items-center gap-2 text-sage-600 hover:text-emerald-600 transition-colors text-sm'
      title='Subscribe to RSS Feed'
    >
      <Rss className='h-4 w-4' />
      <span>RSS Feed</span>
    </Link>
  );
}
