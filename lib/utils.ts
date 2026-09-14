import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names, resolving conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format an integer using the visitor-independent site locale. */
export function formatCount(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
