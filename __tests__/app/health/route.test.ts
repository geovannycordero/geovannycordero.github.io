/**
 * @jest-environment node
 */
import { GET } from '@/app/health.json/route';

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('ok');
  });

  it('includes a built_at ISO timestamp', async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.built_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('returns JSON content-type', async () => {
    const response = await GET();
    expect(response.headers.get('content-type')).toContain('application/json');
  });
});
