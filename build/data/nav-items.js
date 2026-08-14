// Blog is a plain link, not the client-side-router button the React version
// used (components/blog-navigation-handler.tsx) — with real static pages
// there's no SPA transition to manage. The #blog-content hash + main.js's
// smooth-scroll-on-load (Phase 8) reproduce the same landing behavior on a
// native page load, so nothing is lost, just simplified.
module.exports = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#credentials', label: 'Credentials' },
  { href: '/blog/#blog-content', label: 'Blog' },
  { href: '/projects/', label: 'Projects' },
];
