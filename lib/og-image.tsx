export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = 'image/png';

const BACKGROUND = '#080c0a';
const FOREGROUND = '#f1f5f9';
const MUTED = '#8fa199';
const ACCENT = '#36d399';

export function ogTemplate({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 96px',
        background: BACKGROUND,
        fontFamily: '-apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{ width: 40, height: 6, background: ACCENT, borderRadius: 3 }}
        />
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: ACCENT,
          }}
        >
          {eyebrow}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: title.length > 40 ? 56 : 72,
          fontWeight: 700,
          lineHeight: 1.15,
          color: FOREGROUND,
          maxWidth: 980,
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{ fontSize: 28, fontWeight: 600, color: FOREGROUND }}>
          Geovanny Cordero Valverde
        </span>
        {meta ? (
          <span style={{ fontSize: 26, color: MUTED, marginLeft: 20 }}>
            {`· ${meta}`}
          </span>
        ) : null}
      </div>
    </div>
  );
}
