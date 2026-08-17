const { generateHealthJson } = require('../../../build/content/health');

describe('generateHealthJson', () => {
  it('returns status ok with an ISO built_at timestamp', () => {
    const body = JSON.parse(generateHealthJson());
    expect(body.status).toBe('ok');
    expect(body.built_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
