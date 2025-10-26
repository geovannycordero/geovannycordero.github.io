export const seoConfig = {
  siteName: 'Geovanny Cordero Portfolio',
  siteUrl: 'https://geovannycordero.com',
  author: 'Geovanny Cordero Valverde',
  email: 'geovanny@pm.me',
  phone: '+506 8852 7576',
  location: 'San José, Costa Rica',
  description:
    'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.',
  keywords: [
    'Full-Stack Developer',
    'Software Engineer',
    'Golang',
    'Ruby on Rails',
    'JavaScript',
    'Vue.js',
    'React',
    'Costa Rica',
    'Web Development',
    'Backend Development',
    'Frontend Development',
    'Team Leadership',
    'Project Management',
    'DevOps',
    'Software Architecture',
  ],
  social: {
    linkedin: 'https://linkedin.com/in/geovannycordero',
    github: 'https://github.com/geovannycordero',
    twitter: '', // Add if you have Twitter
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Geovanny Cordero Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@geovannycordero', // Add if you have Twitter
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    // Add other verification codes as needed
  },
};

export const generateArticleStructuredData = (post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  readTime: string;
  slug: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${seoConfig.siteUrl}/icons/android-chrome-512x512.png`,
    author: {
      '@type': 'Person',
      name: post.author,
      url: seoConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.author,
      url: seoConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/icons/android-chrome-512x512.png`,
      },
    },
    datePublished: post.date,
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: 'Technology',
    wordCount: post.content.split(' ').length,
    timeRequired: post.readTime,
    inLanguage: 'en-US',
  };
};

export const generateBreadcrumbStructuredData = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generatePersonStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seoConfig.author,
    jobTitle: 'Full-Stack Software Engineer',
    description: seoConfig.description,
    url: seoConfig.siteUrl,
    email: seoConfig.email,
    telephone: seoConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San José',
      addressCountry: 'Costa Rica',
    },
    sameAs: [seoConfig.social.linkedin, seoConfig.social.github].filter(
      Boolean
    ),
    knowsAbout: [
      'Golang',
      'Ruby on Rails',
      'JavaScript',
      'Vue.js',
      'Full-Stack Development',
      'Team Leadership',
      'Software Engineering',
      'Project Management',
      'DevOps',
    ],
  };
};
