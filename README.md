# Geovanny Cordero Portfolio Website

[![Tests](https://github.com/geovannycordero/geovannycordero.github.io/workflows/Tests/badge.svg)](https://github.com/geovannycordero/geovannycordero.github.io/actions)
[![Deploy Status](https://github.com/geovannycordero/geovannycordero.github.io/workflows/Deploy/badge.svg)](https://github.com/geovannycordero/geovannycordero.github.io/actions)

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. This project showcases Geovanny Cordero's professional experience, skills, and blog content in a clean, accessible design.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Blog System**: Markdown-based blog with RSS feed support
- **Performance Optimized**: Static site generation with Next.js export
- **Accessibility**: WCAG compliant with proper semantic HTML
- **Testing**: Comprehensive test coverage with Jest and React Testing Library
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Dark/Light Theme**: Theme switching capability
- **Contact Form**: Interactive contact section with form validation

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **PostCSS** - CSS processing

### Content Management

- **Markdown** - Blog post content
- **Gray Matter** - Front matter parsing
- **Remark** - Markdown processing

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── blog/             # Blog pages and components
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── about.tsx         # About section
│   ├── contact.tsx       # Contact form
│   ├── hero.tsx          # Hero section
│   └── ...               # Other sections
├── content/               # Blog content (Markdown files)
├── lib/                   # Utility functions
├── public/                # Static assets
└── __tests__/            # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/geovannycordero/geovannycordero.github.io.git
cd geovannycordero.github.io
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Run the development server:

```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn format` - Format code with Prettier
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Generate test coverage report

## 🧪 Testing

The project includes comprehensive testing setup:

- **Jest** as the test runner
- **React Testing Library** for component testing
- **Coverage thresholds** set to 70% for all metrics
- **Test files** located in `__tests__/` directories

Run tests:

```bash
yarn test              # Run all tests
yarn test:watch        # Run tests in watch mode
yarn test:coverage     # Generate coverage report
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom color palette** with emerald and sage themes
- **Responsive design** with mobile-first approach
- **CSS animations** and transitions
- **Typography** optimized for readability

## 📱 Responsive Design

The website is fully responsive with:

- Mobile-first design approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized for all device sizes

## ♿ Accessibility

- **WCAG 2.1 AA** compliance
- **Semantic HTML** structure
- **ARIA labels** and roles
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** compliance

## 🔧 Configuration

### Next.js Config

- Static export enabled for GitHub Pages deployment
- Image optimization disabled for static hosting
- ESLint and TypeScript errors ignored during build

### Tailwind Config

- Custom color palette
- Typography plugin integration
- Animation keyframes
- Responsive breakpoints

### TypeScript Config

- Strict mode enabled
- Path aliases configured
- ES5 target for broad compatibility

## 📊 Performance

- **Static Site Generation** for optimal performance
- **Image optimization** with WebP and AVIF support
- **Code splitting** and lazy loading
- **Minified output** in production
- **Compression** enabled

## 🚀 Deployment

The project is configured for static hosting (GitHub Pages):

1. Build the project:

```bash
yarn build
```

2. The static files will be generated in the `docs/` directory
3. Deploy the contents of `docs/` to your hosting provider

### GitHub Pages

- Configured for root domain deployment
- Static export enabled
- Trailing slash support

## 📝 Blog System

The blog system supports:

- **Markdown** content with front matter
- **RSS feed** generation
- **SEO optimization** for each post
- **Category organization**
- **Date-based routing**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 👨‍💻 Author

**Geovanny Cordero Valverde**

- Full-Stack Software Engineer
- Based in San José, Costa Rica
- 5+ years of experience in software development
- Specializing in Golang, Ruby on Rails, and JavaScript technologies

## 🔗 Links

- **Portfolio**: [geovannycordero.com](https://geovannycordero.com)
- **GitHub**: [@geovannycordero](https://github.com/geovannycordero)

---

Built with ❤️ using Next.js, React, and Tailwind CSS
