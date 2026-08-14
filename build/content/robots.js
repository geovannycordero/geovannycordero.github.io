const { SITE_URL } = require('../layout');

function getRobots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/private/', '/admin/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

function generateRobotsTxt() {
  const { rules, sitemap } = getRobots();
  const disallow = [].concat(rules.disallow ?? []);
  return [
    `User-Agent: ${rules.userAgent}`,
    `Allow: ${rules.allow}`,
    ...disallow.map(rule => `Disallow: ${rule}`),
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
}

module.exports = { getRobots, generateRobotsTxt };
