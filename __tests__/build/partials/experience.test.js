const { getByRole, getByText, within } = require('@testing-library/dom');
const { renderExperience } = require('../../../build/partials/experience');
const { getExperience } = require('../../../build/content/experience');

const [job] = getExperience();

function mount() {
  document.body.innerHTML = renderExperience();
  return document.body;
}

describe('renderExperience', () => {
  it('renders the experience section heading', () => {
    const body = mount();
    expect(getByRole(body, 'heading', { level: 2, name: /experience/i })).toBeTruthy();
  });

  it('displays company, period and location', () => {
    const body = mount();
    expect(getByText(body, job.company)).toBeTruthy();
    expect(getByText(body, job.period)).toBeTruthy();
    expect(getByText(body, job.location)).toBeTruthy();
  });

  it('displays the summary and every achievement', () => {
    const body = mount();
    expect(getByText(body, job.summary)).toBeTruthy();
    job.achievements.forEach(a => expect(getByText(body, a)).toBeTruthy());
  });

  it('has proper semantic structure', () => {
    const body = mount();
    const section = body.querySelector('#experience');
    expect(section).toBeTruthy();
    expect(section.tagName).toBe('SECTION');
  });

  it('uses flat mono tech chips, not rounded-full badge pills', () => {
    const body = mount();
    const chips = body.querySelectorAll('.font-mono.text-xs.text-ink-muted');
    expect(chips.length).toBeGreaterThan(0);
    chips.forEach(chip => expect(chip.className).not.toMatch(/rounded-full/));
  });

  it('renders client engagements as native <details> with name/period/impact/stack visible in <summary>', () => {
    const body = mount();
    const [project] = job.clientProjects;
    const details = getByText(body, project.name).closest('details');
    expect(details).toBeTruthy();
    expect(details.hasAttribute('open')).toBe(false);

    const summary = details.querySelector('summary');
    expect(within(summary).getByText(project.period)).toBeTruthy();
    expect(within(summary).getByText(project.impactSummary)).toBeTruthy();
    project.technologies.forEach(tech => {
      expect(within(summary).getByText(tech)).toBeTruthy();
    });
  });

  it('puts highlights in a sibling <ul>, outside <summary> — hidden until expanded is a native <details> behavior, not JS', () => {
    const body = mount();
    const [project] = job.clientProjects;
    const details = getByText(body, project.name).closest('details');
    const summary = details.querySelector('summary');
    const [firstHighlight] = project.highlights;
    const highlightEl = getByText(body, firstHighlight);
    expect(summary.contains(highlightEl)).toBe(false);
    expect(details.contains(highlightEl)).toBe(true);
  });

  it('links to the matching /projects/ entry when one exists', () => {
    const body = mount();
    const linked = job.clientProjects.filter(p => p.relatedProjectId);
    expect(linked.length).toBeGreaterThan(0);
    linked.forEach(project => {
      const details = getByText(body, project.name).closest('details');
      const link = within(details).getByRole('link', { name: /view full project/i });
      expect(link.getAttribute('href')).toBe(`/projects/#${project.relatedProjectId}`);
    });
  });
});
