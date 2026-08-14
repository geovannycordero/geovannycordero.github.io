const fs = require('fs');
const path = require('path');
const os = require('os');

let writePage;
let outDir;

beforeEach(() => {
  jest.resetModules();
  outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'write-test-'));
  process.env.BUILD_OUT_DIR = outDir;
  ({ writePage } = require('../../build/write'));
});

afterEach(() => {
  delete process.env.BUILD_OUT_DIR;
  fs.rmSync(outDir, { recursive: true, force: true });
});

describe('writePage', () => {
  it('writes routePath/index.html under the configured out dir', () => {
    writePage('/blog/hello-world', '<h1>Hello</h1>');

    const written = fs.readFileSync(
      path.join(outDir, 'blog', 'hello-world', 'index.html'),
      'utf8'
    );
    expect(written).toBe('<h1>Hello</h1>');
  });

  it('treats the root route as index.html at the out dir root', () => {
    writePage('/', '<h1>Home</h1>');

    const written = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
    expect(written).toBe('<h1>Home</h1>');
  });

  it('creates nested directories that do not exist yet', () => {
    writePage('/a/b/c', 'deep');
    expect(
      fs.existsSync(path.join(outDir, 'a', 'b', 'c', 'index.html'))
    ).toBe(true);
  });
});
