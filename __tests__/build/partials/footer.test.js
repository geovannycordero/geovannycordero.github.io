const { getAllByRole, getByText, queryByText } = require('@testing-library/dom');
const { renderFooter } = require('../../../build/partials/footer');

function mount() {
  document.body.innerHTML = renderFooter();
  return document.body;
}

describe('renderFooter', () => {
  it('renders a single footer landmark', () => {
    const body = mount();
    expect(getAllByRole(body, 'contentinfo')).toHaveLength(1);
  });

  it('displays copyright information for the current year', () => {
    const body = mount();
    const currentYear = new Date().getFullYear();
    expect(
      getByText(body, new RegExp(`© ${currentYear} Geovanny Cordero Valverde`))
    ).toBeTruthy();
  });

  it('includes the RSS link', () => {
    const body = mount();
    expect(getByText(body, /RSS/i)).toBeTruthy();
  });

  it('does not duplicate the social links already in Contact', () => {
    const body = mount();
    expect(queryByText(body, /geovanny@pm\.me/i)).toBeNull();
    expect(queryByText(body, 'Quick Links')).toBeNull();
    expect(queryByText(body, 'Services')).toBeNull();
  });
});
