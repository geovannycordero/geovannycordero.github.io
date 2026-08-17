const THEME_STORAGE_KEY = 'geovanny-portfolio-theme';

// Runs synchronously in <head>, before first paint, so the correct theme
// class is already on <html> when the page renders — no flash of the wrong
// theme. Keep this logic in lockstep with assets/js/main.js's theme toggle.
const THEME_INIT_SCRIPT = `(function () {
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

module.exports = { THEME_STORAGE_KEY, THEME_INIT_SCRIPT };
