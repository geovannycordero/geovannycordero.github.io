const fs = require('fs');
const path = require('path');

const OG_IMAGE_SIZE = { width: 1200, height: 630 };
const OG_IMAGE_CONTENT_TYPE = 'image/png';

const BACKGROUND = '#0a0a0a';
const FOREGROUND = '#e5e7eb';
const MUTED = '#9ca3af';
const ACCENT = '#00ff41';

// Geist-Regular.ttf, vendored from next/dist/compiled/@vercel/og — the same
// default font next/og used for these images. Geist is Vercel's open-source
// font (SIL OFL), bundled directly here so OG image generation doesn't
// depend on the `next` package once it's removed (Phase 12).
const FONT_PATH = path.join(__dirname, 'assets/fonts/Geist-Regular.ttf');

// satori's input is a plain {type, props: {style, children}} tree — the
// same shape JSX compiles to — not a React-specific format. This `h()` is
// that compilation step written by hand, so ogTemplate() below reads like
// the original JSX almost verbatim with zero React at runtime.
function h(type, props, ...children) {
  // React strips null/undefined/false children during reconciliation
  // before satori ever sees the tree; satori itself does not, so a
  // conditional `cond ? h(...) : null` (same pattern the original JSX
  // used) needs the same filtering done by hand here. A self-closing JSX
  // element (<div />) also gets no `children` key in props at all — satori
  // treats an explicit `children: []` on a flex parent's sibling
  // differently (triggers its "needs explicit display" check), so this
  // omits the key entirely for childless nodes rather than passing [].
  const flat = children.flat().filter(child => child != null && child !== false);
  return {
    type,
    props: flat.length > 0 ? { ...props, children: flat.length === 1 ? flat[0] : flat } : props,
  };
}

function ogTemplate({ eyebrow, title, meta }) {
  return h(
    'div',
    {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 96px',
        background: BACKGROUND,
        fontFamily: 'Geist',
      },
    },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 16 } },
      h('div', { style: { width: 40, height: 6, background: ACCENT, borderRadius: 3 } }),
      h(
        'span',
        {
          style: {
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: ACCENT,
          },
        },
        eyebrow
      )
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          fontSize: title.length > 40 ? 56 : 72,
          fontWeight: 700,
          lineHeight: 1.15,
          color: FOREGROUND,
          maxWidth: 980,
        },
      },
      title
    ),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'baseline' } },
      h('span', { style: { fontSize: 28, fontWeight: 600, color: FOREGROUND } }, 'Geovanny Cordero Valverde'),
      meta ? h('span', { style: { fontSize: 26, color: MUTED, marginLeft: 20 } }, ` · ${meta}`) : null
    )
  );
}

/* istanbul ignore next -- Jest can't load satori's dynamic import() (ESM);
   covered instead by the self-check at the bottom of this file, which
   every `yarn build` also runs for real. */
async function renderOgImagePng({ eyebrow, title, meta }) {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const svg = await satori(ogTemplate({ eyebrow, title, meta }), {
    ...OG_IMAGE_SIZE,
    fonts: [{ name: 'Geist', data: fs.readFileSync(FONT_PATH), weight: 400, style: 'normal' }],
  });

  return new Resvg(svg).render().asPng();
}

module.exports = { OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE, ogTemplate, renderOgImagePng };

// Self-check: `node build/og-image.js`. renderOgImagePng dynamic-import()s
// satori (ESM-only), so — same as build/content/blog.js — Jest can't run
// it; this is the real check, also exercised by every `yarn build`.
if (require.main === module) {
  (async () => {
    const assert = require('assert');

    const png = await renderOgImagePng({
      eyebrow: 'Portfolio',
      title: 'Full-Stack Software Engineer',
      meta: 'Golang · Ruby on Rails · JavaScript',
    });
    assert.ok(Buffer.isBuffer(png) || png instanceof Uint8Array);
    assert.ok(png.length > 1000, 'PNG output looks too small to be real');
    assert.deepStrictEqual([...png.subarray(0, 4)], [0x89, 0x50, 0x4e, 0x47]);

    const noMeta = await renderOgImagePng({ eyebrow: 'Blog', title: 'A post title' });
    assert.ok(noMeta.length > 1000);

    console.log('build/og-image.js self-check passed');
  })().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
