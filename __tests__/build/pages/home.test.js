const { renderHomePage } = require('../../../build/pages/home');

// The jest jsdom test environment already provides DOMParser globally —
// no need for the standalone jsdom package to parse a full document string.
function parse() {
  return new DOMParser().parseFromString(renderHomePage(), 'text/html');
}

function getJsonLd(doc, type) {
  const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
  const match = scripts.map(s => JSON.parse(s.textContent)).find(json => json['@type'] === type);
  if (!match) throw new Error(`No JSON-LD block found for @type "${type}"`);
  return match;
}

describe('renderHomePage', () => {
  it('renders all main sections inside <main>, nav and footer as page chrome', () => {
    const doc = parse();
    const main = doc.getElementById('main');
    expect(main).toBeTruthy();

    // Deliberate deviation from the original React markup: there, <nav>
    // and <footer> were both children of <main>, which is a semantic-HTML
    // violation (<main> should hold only page-primary content). Here nav
    // is a sibling before <main> and footer a sibling after — same visual
    // result (nav is position:fixed either way), correct landmark nesting.
    expect(doc.querySelector('body > nav')).toBeTruthy();
    expect(doc.querySelector('body > footer')).toBeTruthy();
    expect(main.querySelector('nav')).toBeNull();
    expect(main.querySelector('footer')).toBeNull();

    expect(main.querySelector('h1')).toBeTruthy(); // Hero
    expect(main.querySelector('#work')).toBeTruthy(); // Case Studies
    expect(main.querySelector('#about')).toBeTruthy();
    expect(main.querySelector('#skills')).toBeTruthy();
    expect(main.querySelector('#experience')).toBeTruthy();
    expect(main.querySelector('#credentials')).toBeTruthy();
    expect(main.querySelector('#contact')).toBeTruthy();
  });

  it('has proper semantic structure: bg-paper, not a hardcoded white fallback', () => {
    const doc = parse();
    const main = doc.getElementById('main');
    expect(main.className).toMatch(/min-h-screen/);
    expect(main.className).toMatch(/bg-paper/);
    expect(main.className).not.toMatch(/\bbg-white\b/);
  });

  it('renders sections in the expected order', () => {
    const doc = parse();
    const main = doc.getElementById('main');
    // Hero has no id (it's not id-anchored from nav), every section after
    // it is SectionHead-driven and carries the nav anchor id.
    const ids = Array.from(main.children).map(el => el.id);
    expect(ids).toEqual(['', 'work', 'about', 'skills', 'experience', 'credentials', 'contact']);
  });

  it('includes the site-wide Person JSON-LD', () => {
    const doc = parse();
    const person = getJsonLd(doc, 'Person');
    expect(person['@context']).toBe('https://schema.org');
    expect(person.name).toBe('Geovanny Cordero Valverde');
    expect(person.url).toBe('https://geovannycordero.com');
    expect(Array.isArray(person.sameAs)).toBe(true);
    expect(person.sameAs.length).toBeGreaterThan(0);
  });

  it('declares the WebSite JSON-LD site name and root url', () => {
    const doc = parse();
    const site = getJsonLd(doc, 'WebSite');
    expect(site.name).toBe('Geovanny Cordero Portfolio');
    expect(site.url).toBe('https://geovannycordero.com');
  });
});
