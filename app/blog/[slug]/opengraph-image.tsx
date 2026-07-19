import { ImageResponse } from 'next/og';
import {
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
  ogTemplate,
} from '@/lib/og-image';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';

export const dynamic = 'force-static';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return new ImageResponse(
    ogTemplate({
      eyebrow: 'Blog',
      title: post?.title ?? 'Post not found',
      meta: post ? `${post.author} · ${post.readTime}` : undefined,
    }),
    size
  );
}
