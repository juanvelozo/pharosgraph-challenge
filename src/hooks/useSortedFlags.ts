import { useMemo } from "react";
import type { Flag, FlagSeverity } from "../types/analysis.types.ts";

export type SortOption = "severity" | "type";

const severityOrder: Record<FlagSeverity, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Sorts flags by severity (high > medium > low) or type. Memoized so we don't re-sort
 * on every render — only when flags or sortBy change.
 * @param flags - Raw flags from analysis
 * @param sortBy - 'severity' | 'type' — could extend later
 */
export function useSortedFlags(
  flags: Flag[],
  sortBy: SortOption = "severity"
): Flag[] {
  return useMemo(() => {
    if (sortBy === "severity") {
      return [...flags].sort(
        (a, b) => severityOrder[b.severity] - severityOrder[a.severity]
      );
    }
    if (sortBy === "type") {
      return [...flags].sort((a, b) =>
        a.type.localeCompare(b.type)
      );
    }
    return flags;
  }, [flags, sortBy]);
}
