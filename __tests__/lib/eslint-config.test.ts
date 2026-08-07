import { execFileSync } from 'child_process';
import path from 'path';

const eslintBin = path.join(
  __dirname,
  '..',
  '..',
  'node_modules',
  '.bin',
  'eslint'
);

function run(file: string): string {
  try {
    return execFileSync(eslintBin, [file], { encoding: 'utf8' });
  } catch (err) {
    return (err as { stdout: string }).stdout;
  }
}

describe('eslint.config.mjs ignores build output', () => {
  it('ignores the docs/ static export directory (yarn lint hang cause)', () => {
    expect(run('docs/dev/server/next-font-manifest.js')).toContain(
      'File ignored'
    );
  });

  it('still lints source files under app/', () => {
    expect(run('app/layout.tsx')).not.toContain('File ignored');
  });
});
