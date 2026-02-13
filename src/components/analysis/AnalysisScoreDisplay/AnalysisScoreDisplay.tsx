import { memo } from "react";
import Card from "../../ui/Card/Card.tsx";
import Gauge, { type GaugeVariant } from "../../ui/Gauge/Gauge.tsx";

interface AnalysisScoreDisplayProps {
  score: number;
}

/**
 * Maps score (0-100) to color variant. Green > 70, amber 50-70, red < 50.
 */
function scoreToVariant(score: number): GaugeVariant {
  if (score >= 70) return "success";
  if (score >= 50) return "warning";
  return "danger";
}

function AnalysisScoreDisplay({ score }: AnalysisScoreDisplayProps) {
  const variant = scoreToVariant(score);

  return (
    <Card title="Overall Score" className="flex h-full min-h-0 flex-1 flex-col" animationDelay={0.1}>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex justify-center">
          <Gauge value={score} size="lg" max={100} variant={variant} strokeWidth={16} />
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Combined effectiveness score across all dimensions (0–100)
      </p>
    </Card>
  );
}

export default memo(AnalysisScoreDisplay);
