export const THEME_STORAGE_KEY = 'geovanny-portfolio-theme';

// Runs synchronously in <head>, before first paint, so the correct theme
// class is already on <html> when hydration starts — no flash of the wrong
// theme. Keep this logic in lockstep with the resolution order in
// components/theme-provider.tsx (explicit stored choice > system preference).
export const THEME_INIT_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'system';
    var resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);
  } catch (e) {}
})();`;
