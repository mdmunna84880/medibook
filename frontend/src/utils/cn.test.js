import { cn } from './cn';

describe('cn', () => {
  test('joins multiple class names', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center');
  });

  test('ignores falsy values', () => {
    expect(cn('p-4', false, null, undefined, 'm-2')).toBe('p-4 m-2');
  });

  test('supports conditional classes (clsx behavior)', () => {
    const isActive = true;

    expect(cn('btn', isActive && 'btn-active')).toBe(
      'btn btn-active'
    );
  });

  test('accepts arrays of classes', () => {
    expect(cn(['text-sm', 'font-bold'])).toBe(
      'text-sm font-bold'
    );
  });

  test('accepts object syntax', () => {
    expect(
      cn({
        hidden: false,
        block: true,
      })
    ).toBe('block');
  });

  test('merges conflicting tailwind classes', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  test('keeps non-conflicting tailwind classes', () => {
    expect(cn('p-4', 'm-2')).toBe('p-4 m-2');
  });

  test('last conflicting class wins', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  test('works with complex combinations', () => {
    const isActive = true;

    expect(
      cn(
        'p-2',
        ['m-4', false],
        { hidden: false, block: true },
        isActive && 'bg-red-500',
        'p-6'
      )
    ).toBe('m-4 block bg-red-500 p-6');
  });
});
