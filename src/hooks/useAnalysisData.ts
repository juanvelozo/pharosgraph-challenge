import { useState, useEffect, useMemo } from "react";
import type { Analysis, AnalysisDataPayload } from "../types/analysis.types.ts";

import rawData from "../data/frontend_takehome_exercise.json";

/**
 * Loads and validates analysis data. Single source of truth — components just consume.
 * Uses static import for now; could switch to fetch() for remote data. Validates shape
 * so we don't pass garbage to consumers.
 * @returns Parsed analysis or loading/error state
 */
export function useAnalysisData(): {
  data: Analysis | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const payload = rawData as unknown as AnalysisDataPayload;
      const analysis = payload?.analysis;

      if (!analysis) {
        setError(new Error("Invalid data: missing analysis"));
        setIsLoading(false);
        return;
      }

      if (
        typeof analysis.id !== "string" ||
        typeof analysis.ad_text !== "string" ||
        typeof analysis.overall_score !== "number" ||
        !Array.isArray(analysis.dimensions) ||
        !Array.isArray(analysis.flags)
      ) {
        setError(new Error("Invalid data: analysis shape mismatch"));
        setIsLoading(false);
        return;
      }

      setData(analysis);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Failed to load data"));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return useMemo(
    () => ({ data, isLoading, error }),
    [data, isLoading, error]
  );
}
