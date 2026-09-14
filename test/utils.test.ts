import { describe, expect, it } from 'vitest';

import { cn, formatCount } from '@/lib/utils';

describe('cn', () => {
  it('should join plain class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('should drop falsy values', () => {
    expect(cn('a', false && 'b', undefined, null, 'c')).toBe('a c');
  });

  it('should let the later of two conflicting Tailwind utilities win', () => {
    expect(cn('px-2', 'px-6')).toBe('px-6');
  });
});

describe('formatCount', () => {
  it('should group thousands with a separator', () => {
    expect(formatCount(1844)).toBe('1,844');
  });

  it('should leave values below a thousand unchanged', () => {
    expect(formatCount(844)).toBe('844');
  });
});
