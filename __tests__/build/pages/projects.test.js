const { renderProjectsPage } = require('../../../build/pages/projects');
const { getSideProjects } = require('../../../build/content/projects');

function parse() {
  return new DOMParser().parseFromString(renderProjectsPage(), 'text/html');
}

function getJsonLd(doc, type) {
  const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
  const match = scripts.map(s => JSON.parse(s.textContent)).find(json => json['@type'] === type);
  if (!match) throw new Error(`No JSON-LD block found for @type "${type}"`);
  return match;
}

describe('renderProjectsPage', () => {
  it('renders one card per side project, each with its id anchor', () => {
    const doc = parse();
    getSideProjects().forEach(project => {
      expect(doc.getElementById(project.id)).toBeTruthy();
    });
  });

  it('sets canonical url', () => {
    const doc = parse();
    expect(doc.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://geovannycordero.com/projects/'
    );
  });

  it('lists every project with position and url in ItemList JSON-LD', () => {
    const doc = parse();
    const list = getJsonLd(doc, 'ItemList');
    expect(list.itemListElement.length).toBe(getSideProjects().length);
    expect(list.itemListElement[0]).toMatchObject({ '@type': 'ListItem', position: 1 });
  });

  it('links back to case studies on the homepage', () => {
    const doc = parse();
    expect(doc.querySelector('a[href="/#work"]')).toBeTruthy();
  });
});
