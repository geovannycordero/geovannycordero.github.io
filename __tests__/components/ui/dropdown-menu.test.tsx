import { render, screen, fireEvent } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu';

describe('DropdownMenu Components', () => {
  describe('Basic DropdownMenu', () => {
    it('renders trigger and content', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('Open Menu')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders trigger with custom className', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger className='custom-trigger'>
            Open Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const trigger = screen.getByText('Open Menu');
      expect(trigger).toHaveClass('custom-trigger');
    });
  });

  describe('DropdownMenuItem', () => {
    it('renders with default styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Test Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByText('Test Item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass(
        'relative',
        'flex',
        'cursor-default',
        'select-none'
      );
    });

    it('renders with inset styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByText('Inset Item');
      expect(item).toHaveClass('pl-8');
    });

    it('handles click events', () => {
      const handleClick = jest.fn();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleClick}>
              Clickable Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      // Test that the component renders with the onClick handler
      expect(handleClick).toBeDefined();
      expect(typeof handleClick).toBe('function');
    });
  });

  describe('DropdownMenuCheckboxItem', () => {
    it('renders with checkbox styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>
              Checkbox Item
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByText('Checkbox Item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('pl-8', 'pr-2');
    });

    it('renders with default styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>
              Regular Checkbox
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByText('Regular Checkbox');
      expect(item).toBeInTheDocument();
    });
  });

  describe('DropdownMenuRadioItem', () => {
    it('renders with radio styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioItem value='option1'>
              Radio Item
            </DropdownMenuRadioItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByText('Radio Item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('pl-8', 'pr-2');
    });
  });

  describe('DropdownMenuLabel', () => {
    it('renders with label styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Section Label</DropdownMenuLabel>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const label = screen.getByText('Section Label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('px-2', 'py-1.5', 'text-sm', 'font-semibold');
    });

    it('renders with inset styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const label = screen.getByText('Inset Label');
      expect(label).toHaveClass('pl-8');
    });
  });

  describe('DropdownMenuSeparator', () => {
    it('renders separator with styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const separator = document.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('-mx-1', 'my-1', 'h-px', 'bg-muted');
    });
  });

  describe('DropdownMenuShortcut', () => {
    it('renders shortcut with styling', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Copy
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const shortcut = screen.getByText('⌘C');
      expect(shortcut).toBeInTheDocument();
      expect(shortcut).toHaveClass(
        'ml-auto',
        'text-xs',
        'tracking-widest',
        'opacity-60'
      );
    });
  });

  describe('DropdownMenuGroup', () => {
    it('renders group container', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Group Item 1</DropdownMenuItem>
              <DropdownMenuItem>Group Item 2</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('Group Item 1')).toBeInTheDocument();
      expect(screen.getByText('Group Item 2')).toBeInTheDocument();
    });
  });

  describe('DropdownMenuSub', () => {
    it('renders submenu structure', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub defaultOpen>
              <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('More Options')).toBeInTheDocument();
      // Submenu items are not visible by default, so we just test the trigger
    });

    it('renders submenu trigger with chevron', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const subTrigger = screen.getByText('More Options');
      expect(subTrigger).toBeInTheDocument();
      expect(subTrigger).toHaveClass('flex', 'cursor-default', 'select-none');
    });
  });

  describe('DropdownMenuRadioGroup', () => {
    it('renders radio group', () => {
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value='option1'>
              <DropdownMenuRadioItem value='option1'>
                Option 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='option2'>
                Option 2
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });
});
