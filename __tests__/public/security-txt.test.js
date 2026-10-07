const fs = require('fs');
const path = require('path');

// RFC 9116: Expires is required and should be under a year out. This fails CI
// once it lapses, which is the reminder to bump it.
describe('public/.well-known/security.txt', () => {
  const body = fs.readFileSync(
    path.join(__dirname, '../../public/.well-known/security.txt'),
    'utf8'
  );

  it('has a Contact field', () => {
    expect(body).toMatch(/^Contact: \S+$/m);
  });

  it('has not expired and expires within a year', () => {
    const expires = new Date(body.match(/^Expires: (\S+)$/m)[1]);
    const now = Date.now();
    expect(expires.getTime()).toBeGreaterThan(now);
    expect(expires.getTime() - now).toBeLessThanOrEqual(
      366 * 24 * 60 * 60 * 1000
    );
  });
});
