import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional')).toBe('base conditional');
      expect(cn('base', false && 'conditional')).toBe('base');
    });

    it('filters out falsy values', () => {
      expect(cn('base', null, undefined, false, 'valid')).toBe('base valid');
    });

    it('handles objects with boolean values', () => {
      expect(cn('base', { conditional: true, hidden: false })).toBe(
        'base conditional'
      );
    });

    it('handles mixed input types', () => {
      expect(
        cn('base', 'static', { conditional: true }, false && 'hidden')
      ).toBe('base static conditional');
    });
  });
});
