import { ImageResponse } from 'next/og';
import {
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
  ogTemplate,
} from '@/lib/og-image';

export const dynamic = 'force-static';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = 'Geovanny Cordero Valverde - Full-Stack Software Engineer';

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      eyebrow: 'Portfolio',
      title: 'Full-Stack Software Engineer',
      meta: 'Golang · Ruby on Rails · JavaScript',
    }),
    size
  );
}
