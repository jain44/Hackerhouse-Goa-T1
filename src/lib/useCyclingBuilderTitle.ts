import { useMemo } from 'react';
import { generateBuilderTitle } from './builderTitleGenerator';

/**
 * Backwards-compatible helper kept for older imports.
 * Builder Class is intentionally static now: it changes only when the role changes.
 */
export function useCyclingBuilderTitle(stack: string): string {
  return useMemo(() => generateBuilderTitle(stack), [stack]);
}
