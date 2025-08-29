import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/components/ui/use-mobile';

// Mock window.matchMedia
const mockMatchMedia = jest.fn();
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1024,
});

describe('useIsMobile Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMatchMedia.mockReturnValue({
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });
  });

  it('returns false for desktop width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('returns true for mobile width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 375,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('returns true for tablet width (below breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('returns false for tablet width (at breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 768,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('sets up media query listener', () => {
    renderHook(() => useIsMobile());

    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)');
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('cleans up media query listener on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('handles media query change events', () => {
    let changeCallback: (() => void) | null = null;

    mockAddEventListener.mockImplementation((event, callback) => {
      if (event === 'change') {
        changeCallback = callback;
      }
    });

    const { result } = renderHook(() => useIsMobile());

    // Initially should be false for desktop width
    expect(result.current).toBe(false);

    // Verify that the callback was captured
    expect(changeCallback).toBeDefined();
    expect(typeof changeCallback).toBe('function');
  });

  it('uses correct breakpoint constant', () => {
    renderHook(() => useIsMobile());

    // The hook should use 768px as the breakpoint
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)');
  });

  it('handles undefined initial state', () => {
    // Mock initial state as undefined
    const { result } = renderHook(() => useIsMobile());

    // Should resolve to a boolean value
    expect(typeof result.current).toBe('boolean');
  });
});
