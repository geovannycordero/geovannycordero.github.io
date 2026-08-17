const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const eslintBin = path.join(repoRoot, 'node_modules', '.bin', 'eslint');

// A throwaway file under docs/ so this test doesn't depend on a real
// `yarn build` having run first (docs/ is gitignored build output).
const dummyDir = path.join(repoRoot, 'docs', '__eslint-config-test__');
const dummyFile = path.join(dummyDir, 'dummy.js');

function run(file) {
  try {
    return execFileSync(eslintBin, [file], { encoding: 'utf8', cwd: repoRoot });
  } catch (err) {
    return err.stdout;
  }
}

describe('eslint.config.mjs ignores build output', () => {
  beforeAll(() => {
    fs.mkdirSync(dummyDir, { recursive: true });
    fs.writeFileSync(dummyFile, '// dummy build output\n');
  });

  afterAll(() => {
    fs.rmSync(dummyDir, { recursive: true, force: true });
  });

  it('ignores the docs/ static export directory (yarn lint hang cause)', () => {
    expect(run(path.relative(repoRoot, dummyFile))).toContain('File ignored');
  });

  it('still lints source files under build/', () => {
    expect(run('build/layout.js')).not.toContain('File ignored');
  });
});
