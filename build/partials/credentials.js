const { html, escapeHtml } = require('../render');
const { icon } = require('../icons');
const { renderSectionHead } = require('./section-head');

const EDUCATION = [
  { degree: 'MBA in Project Management', institution: 'Universidad Estatal a Distancia (UNED)', period: 'In Progress' },
  { degree: 'Bachelor in Computer Science', institution: 'Universidad de Costa Rica (UCR)', period: '2019' },
];

const CERTIFICATIONS = [
  { title: 'Gerencia con Liderazgo', institution: 'INCAE Business School', year: '2020', url: 'https://www.credential.net/bacae4cc-2a7c-4cda-9d4f-feac8c5f1500' },
  { title: 'Introduction to Data Analytics for Business', institution: 'University of Colorado Boulder, Coursera', year: '2020', url: 'https://coursera.org/share/4af8428f026c178ae5d826b5bc4b4e6c' },
  { title: 'Crisis Management', institution: 'INCAE Business School', year: '2022', url: 'https://www.credential.net/c4d5b5b2-3179-45c2-bd8a-b1fe3b2b6918' },
  { title: 'Introduction to Big Data', institution: 'University of California San Diego, Coursera', year: '2021', url: 'https://coursera.org/share/e2da619b7d37207e620e9dd1a3aa5552' },
  { title: 'Desarrollo de Habilidades Blandas', institution: 'UNED', year: '2023' },
  { title: 'Claude 101', institution: 'Anthropic Education', year: '2026', url: 'https://verify.skilljar.com/c/swr37jiqyx99' },
  { title: 'Claude Code 101', institution: 'Anthropic Education', year: '2026', url: 'https://verify.skilljar.com/c/x94svf5rz4h2' },
  { title: 'Claude Code in Action', institution: 'Anthropic Education', year: '2026', url: 'https://verify.skilljar.com/c/dvyh735ucjte' },
];

function educationRow(edu) {
  return html`
    <div class="border-b border-line pb-4 last:border-b-0 dark:border-line/20">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h3 class="font-semibold text-ink">${escapeHtml(edu.degree)}</h3>
        <span class="text-sm text-ink-muted">${escapeHtml(edu.period)}</span>
      </div>
      <p class="text-sm text-ink-muted">${escapeHtml(edu.institution)}</p>
    </div>
  `;
}

function certRow(cert) {
  const verify = cert.url
    ? `<a href="${cert.url}" target="_blank" rel="noopener noreferrer" aria-label="Verify ${escapeHtml(cert.title)} certificate" class="inline-flex items-center gap-1 text-xs font-medium text-accent-brand hover:underline">${icon('external-link', 'h-3.5 w-3.5')}<span>Verify</span></a>`
    : '';
  return html`
    <div class="border-l-2 border-line pl-4 dark:border-line/20">
      <h3 class="text-sm font-semibold text-ink">${escapeHtml(cert.title)}</h3>
      <p class="text-sm text-ink-muted">${escapeHtml(cert.institution)}</p>
      <div class="mt-1 flex items-center gap-3">
        <span class="font-mono text-xs text-ink-muted">${escapeHtml(cert.year)}</span>
        ${verify}
      </div>
    </div>
  `;
}

function renderCredentials() {
  return renderSectionHead({
    index: '05',
    label: 'Credentials',
    id: 'credentials',
    content: html`
      <div class="space-y-10">
        <div>
          <p class="mb-4 font-mono text-xs uppercase tracking-wider text-accent-brand">Education</p>
          <div class="space-y-4">${EDUCATION.map(educationRow).join('')}</div>
        </div>

        <div>
          <p class="mb-4 font-mono text-xs uppercase tracking-wider text-accent-brand">Certifications</p>
          <div class="grid gap-4 md:grid-cols-2">${CERTIFICATIONS.map(certRow).join('')}</div>
        </div>

        <div>
          <p class="mb-4 font-mono text-xs uppercase tracking-wider text-accent-brand">Award</p>
          <div class="flex items-start gap-4 border-l-2 border-accent-brand pl-4">
            ${icon('trophy', 'mt-1 h-6 w-6 flex-shrink-0 text-accent-brand')}
            <div>
              <h3 class="font-semibold text-ink">2020 Programathon Competition Winner</h3>
              <p class="text-sm text-ink-muted">Winner of Costa Rica&apos;s most prestigious programming competition, sponsored by Fiserv.</p>
            </div>
          </div>
        </div>
      </div>
    `,
  });
}

module.exports = { renderCredentials };
