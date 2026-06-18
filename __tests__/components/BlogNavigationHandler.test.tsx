import { renderHook, act } from '@testing-library/react';
import { useBlogNavigation } from '@/components/blog-navigation-handler';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

describe('useBlogNavigation', () => {
  beforeEach(() => {
    mockPush.mockClear();
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });
  });

  it('navigateToBlog pushes /blog', () => {
    const { result } = renderHook(() => useBlogNavigation());
    act(() => result.current.navigateToBlog());
    expect(mockPush).toHaveBeenCalledWith('/blog');
  });

  it('navigateToBlog pushes /blog with hash when provided', () => {
    const { result } = renderHook(() => useBlogNavigation());
    act(() => result.current.navigateToBlog('#blog-content'));
    expect(mockPush).toHaveBeenCalledWith('/blog#blog-content');
  });

  it('navigateToBlogPage pushes /blog?page=N for page > 1', () => {
    const { result } = renderHook(() => useBlogNavigation());
    act(() => result.current.navigateToBlogPage(3));
    expect(mockPush).toHaveBeenCalledWith('/blog?page=3');
  });

  it('navigateToBlogPage pushes /blog for page 1', () => {
    const { result } = renderHook(() => useBlogNavigation());
    act(() => result.current.navigateToBlogPage(1));
    expect(mockPush).toHaveBeenCalledWith('/blog');
  });

  it('scrollToTarget calls window.scrollTo with top: 0', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useBlogNavigation());
    act(() => result.current.scrollToTarget(0));
    act(() => jest.runAllTimers());
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
    jest.useRealTimers();
  });
});
