import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  tags: string[];
  author: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  author: string;
}

// Optimized function to get all posts with better performance
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);

    // Process files in parallel for better performance
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const matterResult = matter(fileContents);

          return {
            slug,
            title: matterResult.data.title || 'Untitled',
            date: matterResult.data.date || new Date().toISOString(),
            excerpt: matterResult.data.excerpt || '',
            readTime: matterResult.data.readTime || '5 min read',
            tags: Array.isArray(matterResult.data.tags)
              ? matterResult.data.tags
              : [],
            author: matterResult.data.author || 'Geovanny Cordero Valverde',
          };
        })
    );

    // Sort by date (newest first) and return
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(remarkHtml)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || new Date().toISOString(),
      excerpt: matterResult.data.excerpt || '',
      content: contentHtml,
      readTime: matterResult.data.readTime || '5 min read',
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      author: matterResult.data.author || 'Geovanny Cordero Valverde',
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error loading post slugs:', error);
    return [];
  }
}

// Utility function to get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

// Utility function to get all unique tags
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagSet = new Set<string>();

  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

// Utility function to get recent posts
export async function getRecentPosts(limit = 5): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}
