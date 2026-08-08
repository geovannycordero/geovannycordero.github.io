import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TECH_CHIP_CLASSES =
  'rounded-sm border border-line px-2 py-1 font-mono text-xs text-ink-muted dark:border-line/30';
