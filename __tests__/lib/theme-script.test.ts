import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from '@/lib/theme-script';

function run(storedValue: string | null, systemPrefersDark: boolean) {
  const classList = new Set<string>();
  const fakeDocument = {
    documentElement: {
      classList: {
        remove: (...names: string[]) => names.forEach(n => classList.delete(n)),
        add: (...names: string[]) => names.forEach(n => classList.add(n)),
      },
    },
  };
  const fakeWindow = {
    matchMedia: () => ({ matches: systemPrefersDark }),
  };
  const fakeLocalStorage = { getItem: () => storedValue };

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  new Function(
    'document',
    'window',
    'localStorage',
    THEME_INIT_SCRIPT
  )(fakeDocument, fakeWindow, fakeLocalStorage);

  return classList;
}

describe('THEME_INIT_SCRIPT', () => {
  it('uses the same storage key the ThemeProvider persists to', () => {
    expect(THEME_STORAGE_KEY).toBe('geovanny-portfolio-theme');
    expect(THEME_INIT_SCRIPT).toContain(THEME_STORAGE_KEY);
  });

  it('applies dark when no stored preference and system prefers dark', () => {
    expect(run(null, true)).toEqual(new Set(['dark']));
  });

  it('applies light when no stored preference and system prefers light', () => {
    expect(run(null, false)).toEqual(new Set(['light']));
  });

  it('honors an explicit stored light preference over a dark system preference', () => {
    expect(run('light', true)).toEqual(new Set(['light']));
  });

  it('honors an explicit stored dark preference over a light system preference', () => {
    expect(run('dark', false)).toEqual(new Set(['dark']));
  });

  it('falls back to system when the stored value is an unrecognized string', () => {
    expect(run('system', true)).toEqual(new Set(['dark']));
    expect(run('garbage', false)).toEqual(new Set(['light']));
  });

  it('never throws even if localStorage access fails', () => {
    const fakeDocument = {
      documentElement: { classList: { remove: jest.fn(), add: jest.fn() } },
    };
    const fakeWindow = { matchMedia: () => ({ matches: false }) };
    const throwingLocalStorage = {
      getItem: () => {
        throw new Error('blocked');
      },
    };

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      new Function(
        'document',
        'window',
        'localStorage',
        THEME_INIT_SCRIPT
      )(fakeDocument, fakeWindow, throwingLocalStorage);
    }).not.toThrow();
  });
});
