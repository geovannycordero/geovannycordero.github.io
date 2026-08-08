import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Experience from '@/components/experience';
import { getExperience } from '@/lib/experience';

const [job] = getExperience();

describe('Experience Component', () => {
  it('renders the experience section with correct content', () => {
    render(<Experience />);

    expect(
      screen.getByRole('heading', { level: 2, name: /experience/i })
    ).toBeInTheDocument();
  });

  it('displays company, period and location', () => {
    render(<Experience />);

    expect(screen.getByText(job.company)).toBeInTheDocument();
    expect(screen.getByText(job.period)).toBeInTheDocument();
    expect(screen.getByText(job.location)).toBeInTheDocument();
  });

  it('displays every role held', () => {
    render(<Experience />);

    job.role.forEach(role => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it('displays the summary and every achievement', () => {
    render(<Experience />);

    expect(screen.getByText(job.summary)).toBeInTheDocument();
    job.achievements.forEach(achievement => {
      expect(screen.getByText(achievement)).toBeInTheDocument();
    });
  });

  it('displays technologies used', () => {
    render(<Experience />);

    job.technologies.forEach(tech => {
      expect(screen.getAllByText(tech).length).toBeGreaterThan(0);
    });
  });

  it('has proper semantic structure', () => {
    render(<Experience />);

    const section = document.getElementById('experience');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('renders its heading via the shared SectionHead component', () => {
    render(<Experience />);

    // SectionHead's mono index — proves the section adopted the shared
    // header rather than keeping its own bespoke heading markup.
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('uses the flat editorial card motif, not the rounded/shadow card-elegant one', () => {
    const { container } = render(<Experience />);

    // Regression guard: card-elegant/glow-accent/hover-lift pulled a
    // rounded, drop-shadowed look off the retired emerald-100/200/500
    // scale, visually mismatched with the flat Case Studies grid one
    // scroll away on the same page.
    expect(container.innerHTML).not.toMatch(
      /card-elegant|glow-accent|hover-lift/
    );

    const border = container.querySelector('.border-line');
    expect(border).toBeInTheDocument();
  });

  it('renders technology chips as flat mono chips, not rounded-full badge pills', () => {
    render(<Experience />);

    const [tech] = job.technologies;
    const chip = screen.getAllByText(tech)[0];
    expect(chip.className).toMatch(/font-mono/);
    expect(chip.className).not.toMatch(/rounded-full/);
  });

  it('renders role titles as flat mono text, not rounded-full badge pills', () => {
    render(<Experience />);

    const [role] = job.role;
    const roleEl = screen.getByText(role);
    expect(roleEl.closest('.font-mono')).toBeInTheDocument();
    expect(roleEl.closest('.rounded-full')).not.toBeInTheDocument();
  });

  it('uses the shared Case Studies hairline-grid container, with no timeline dot/rail', () => {
    const { container } = render(<Experience />);

    // Regression guard: the employer block used to sit in its own bordered
    // card with an absolute-positioned dot + connecting line standing in
    // for a "sequence" this section doesn't have (one employer, one date
    // range). It now shares Case Studies' own grid gap-px/border-line/
    // bg-line container instead of a bespoke timeline treatment.
    const grid = container.querySelector('.grid.gap-px.border-line.bg-line');
    expect(grid).toBeInTheDocument();

    // The dot marker was a `rounded-full` + `border-4` + `bg-accent-brand`
    // combination; the rail was `w-0.5`. Neither should remain.
    expect(container.querySelector('.border-4')).not.toBeInTheDocument();
    expect(container.querySelector('.w-0\\.5')).not.toBeInTheDocument();
  });

  describe('client engagements', () => {
    it('renders engagements as a divide-y sub-list, not individually boxed cards', () => {
      render(<Experience />);

      const [project] = job.clientProjects;
      const details = screen.getByText(project.name).closest('details');

      // Regression guard: each engagement used to be its own bordered
      // p-4 box (a second, competing container inside the employer's own
      // flat block). It's now a plain row in a hairline-divided list —
      // visually subordinate detail, not a peer "card".
      expect(details?.className).not.toMatch(/\bborder\b/);
      expect(details?.className).not.toMatch(/\bp-4\b/);

      const list = details?.parentElement;
      expect(list?.className).toMatch(/divide-y/);
    });

    it('shows name, period, impact summary and stack while collapsed', () => {
      render(<Experience />);

      job.clientProjects.forEach(project => {
        const name = screen.getByText(project.name);
        expect(name).toBeVisible();
        expect(screen.getByText(project.period)).toBeVisible();
        expect(screen.getByText(project.impactSummary)).toBeVisible();

        // Stack has to be scannable without expanding — i.e. inside <summary>
        const summary = name.closest('summary') as HTMLElement;
        project.technologies.forEach(tech => {
          expect(within(summary).getByText(tech)).toBeVisible();
        });
      });
    });

    it('hides highlights until the engagement is expanded', async () => {
      const user = userEvent.setup();
      render(<Experience />);

      const [project] = job.clientProjects;
      const [firstHighlight] = project.highlights;

      expect(screen.getByText(firstHighlight)).not.toBeVisible();

      await user.click(screen.getByText(project.name));
      project.highlights.forEach(highlight => {
        expect(screen.getByText(highlight)).toBeVisible();
      });

      await user.click(screen.getByText(project.name));
      expect(screen.getByText(firstHighlight)).not.toBeVisible();
    });

    it('links to the matching /projects entry when one exists', async () => {
      const user = userEvent.setup();
      render(<Experience />);

      const linked = job.clientProjects.filter(p => p.relatedProjectId);
      expect(linked.length).toBeGreaterThan(0);

      for (const project of linked) {
        await user.click(screen.getByText(project.name));
        const link = screen.getByRole('link', {
          name: /view full project/i,
        });
        expect(link).toHaveAttribute(
          'href',
          `/projects#${project.relatedProjectId}`
        );
      }
    });
  });
});
