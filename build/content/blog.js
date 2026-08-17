const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'content/blog');

function readAllFrontMatter() {
  return fs
    .readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'));
      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        readTime: data.readTime || '5 min read',
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author || 'Geovanny Cordero Valverde',
      };
    });
}

function getAllPosts() {
  return readAllFrontMatter().sort((a, b) => (a.date < b.date ? 1 : -1));
}

function getAllPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

// Async only because remark/remark-gfm/remark-html are ESM-only packages —
// a plain CommonJS require() can't load them, so this needs a dynamic
// import(). getAllPosts/getAllPostSlugs stay sync; they only touch
// gray-matter, which is CJS.
/* istanbul ignore next -- Jest can't load remark's dynamic import() (ESM);
   covered instead by the self-check at the bottom of this file, which
   every `yarn build` also runs for real. */
async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

  const { remark } = await import('remark');
  const remarkGfm = (await import('remark-gfm')).default;
  const remarkHtml = (await import('remark-html')).default;
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    content: processed.toString(),
    readTime: data.readTime || '5 min read',
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author || 'Geovanny Cordero Valverde',
  };
}

module.exports = { getAllPosts, getAllPostSlugs, getPostBySlug };

// Self-check: `node build/content/blog.js`. Exercises the real Markdown
// pipeline — Jest can't (see the comment in __tests__/build/content/
// blog.test.js), so this is the actual regression check, also run for real
// by every `yarn build`.
if (require.main === module) {
  (async () => {
    const assert = require('assert');
    const [{ slug }] = getAllPosts();
    const post = await getPostBySlug(slug);
    assert.strictEqual(post.slug, slug);
    assert.match(post.content, /<p>|<h\d|<ul>|<ol>/);

    const welcomePost = await getPostBySlug('2024-04-01-first-post');
    assert.match(welcomePost.content, /<h2>What You Can Expect<\/h2>/);

    console.log('build/content/blog.js self-check passed');
  })().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
