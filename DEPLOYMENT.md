# GitHub Pages Deployment Guide

This project is configured for static export and can be deployed to GitHub Pages.

## Quick Deploy

1. **Build the static site:**
   ```bash
   yarn build:static
   ```

2. **Deploy using the script:**
   ```bash
   ./deploy.sh
   ```

## Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages when you push to the `main` branch.

### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy your site

3. **Your site will be available at:**
   `https://[your-username].github.io/` (if using a custom domain)
   or
   `https://[your-username].github.io/geovanny-portfolio/` (if using repository name as subdirectory)

## Manual Deployment

If you prefer to deploy manually:

1. **Build the site:**
   ```bash
   yarn build:static
   ```

2. **Upload the `out` directory contents** to your web server or hosting provider

## Configuration

The project is configured with:
- `output: 'export'` - Generates static HTML files
- `trailingSlash: true` - Adds trailing slashes to URLs
- No basePath - Configured for root deployment (can be added if needed for subdirectory deployment)

## Build Output

After building, you'll find:
- `out/index.html` - Main entry point
- `out/blog/` - Blog pages
- `out/_next/` - Static assets
- `out/robots.txt`, `out/sitemap.xml`, `out/rss.xml` - SEO files

## Troubleshooting

- **Build fails with cssnano error:** Run `yarn add cssnano`
- **Dynamic routes error:** Ensure all routes have `export const dynamic = "force-static"`
- **SearchParams error:** Remove dynamic searchParams usage for static export 