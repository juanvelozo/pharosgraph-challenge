import { memo, useMemo } from "react";
import type { Dimension } from "../../../types/analysis.types.ts";
import Card from "../../ui/Card/Card.tsx";
import BarChart from "../../ui/BarChart/BarChart.tsx";
import type { BarChartDataItem } from "../../ui/BarChart/BarChart.tsx";

interface DimensionScoresChartProps {
  dimensions: Dimension[];
}

function DimensionScoresChart({ dimensions }: DimensionScoresChartProps) {
  const data = useMemo<BarChartDataItem[]>(
    () =>
      dimensions.map((d) => ({
        label: d.name,
        value: d.score,
      })),
    [dimensions]
  );

  return (
    <Card title="Dimension Scores">
      <BarChart data={data} maxValue={100} />
    </Card>
  );
}

export default memo(DimensionScoresChart);
