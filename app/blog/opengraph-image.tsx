import { ImageResponse } from 'next/og';
import {
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
  ogTemplate,
} from '@/lib/og-image';

export const dynamic = 'force-static';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = 'Blog - Geovanny Cordero Valverde';

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      eyebrow: 'Blog',
      title: 'Software development, technology & leadership',
    }),
    size
  );
}
