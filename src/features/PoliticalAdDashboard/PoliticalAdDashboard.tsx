import { useCallback } from "react";
import { useAnalysisData } from "../../hooks/useAnalysisData.ts";
import { useAnnotatedSpans } from "../../hooks/useAnnotatedSpans.ts";
import AnalysisScoreDisplay from "../../components/analysis/AnalysisScoreDisplay/AnalysisScoreDisplay.tsx";
import DimensionScoresChart from "../../components/analysis/DimensionScoresChart/DimensionScoresChart.tsx";
import FlagAnnotatedText from "../../components/analysis/FlagAnnotatedText/FlagAnnotatedText.tsx";
import FlagCardsList from "../../components/analysis/FlagCardsList/FlagCardsList.tsx";

function PoliticalAdDashboard() {
  const { data, isLoading, error } = useAnalysisData();
  const spans = useAnnotatedSpans(data?.ad_text ?? "", data?.flags ?? []);

  const handleFlagClick = useCallback(() => {
    // Could track analytics or open external link
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <p className="text-lg text-red-600 dark:text-red-400">
          Error: {error.message}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <p className="text-lg text-gray-600 dark:text-gray-400">No data</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl py-4 md:py-6 lg:py-8 space-y-4">
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Score - prominent on mobile, sidebar on desktop */}
        <div className="flex w-full lg:col-span-3">
          <AnalysisScoreDisplay score={data.overall_score} />
        </div>

        {/* Dimensions chart */}
        <div className="lg:col-span-9">
          <DimensionScoresChart dimensions={data.dimensions} />
        </div>

        {/* Annotated text - full width */}
        <div className="lg:col-span-12">
          <FlagAnnotatedText spans={spans} onFlagClick={handleFlagClick} />
        </div>

        {/* Flags list - full width */}
        <div className="lg:col-span-12">
          <FlagCardsList flags={data.flags} />
        </div>
      </div>
    </div>
  );
}

export default PoliticalAdDashboard;
