import { useMemo } from "react";
import type { Flag } from "../types/analysis.types.ts";
export interface AnnotatedSpan {
  text: string;
  flag: Flag | null;
  isHighlight: boolean;
}

/**
 * Splits ad text into segments for highlights. Handles overlapping spans by sorting first —
 * earlier spans win when overlap occurs. Each span either has a flag (highlight) or is plain text.
 * @param adText - Full ad copy
 * @param flags - Flags with text_span positions
 */
export function useAnnotatedSpans(
  adText: string,
  flags: Flag[]
): AnnotatedSpan[] {
  return useMemo(() => {
    if (!adText) return [];

    // Sort flags by start position to handle overlaps deterministically
    const sorted = [...flags].sort((a, b) => a.text_span.start - b.text_span.start);

    type Segment = { start: number; end: number; flag: Flag | null };
    const segments: Segment[] = [];

    let pos = 0;
    for (const flag of sorted) {
      const { start, end } = flag.text_span;
      if (start > pos) {
        segments.push({ start: pos, end: start, flag: null });
      }
      segments.push({ start, end, flag });
      pos = Math.max(pos, end);
    }
    if (pos < adText.length) {
      segments.push({ start: pos, end: adText.length, flag: null });
    }

    return segments.map(({ start, end, flag }) => ({
      text: adText.slice(start, end),
      flag,
      isHighlight: flag !== null,
    }));
  }, [adText, flags]);
}
