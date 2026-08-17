const { escapeHtml } = require('../../build/render');

describe('escapeHtml', () => {
  it('escapes &, <, >, ", and \'', () => {
    expect(escapeHtml(`<a href="x">Tom & Jerry's</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;'
    );
  });

  it('passes plain text through unchanged', () => {
    expect(escapeHtml('Geovanny Cordero Valverde')).toBe(
      'Geovanny Cordero Valverde'
    );
  });

  it('coerces non-string input', () => {
    expect(escapeHtml(42)).toBe('42');
  });
});
