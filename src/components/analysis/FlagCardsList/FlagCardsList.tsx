import { memo, useCallback, useMemo, useState } from "react";
import type { Flag } from "../../../types/analysis.types.ts";
import { useSortedFlags } from "../../../hooks/useSortedFlags.ts";
import Card from "../../ui/Card/Card.tsx";
import Badge, { type BadgeVariant } from "../../ui/Badge/Badge.tsx";
import Chevron from "../../ui/Chevron/Chevron.tsx";
import Tabs from "../../ui/Tabs/Tabs.tsx";
import Table, { type TableColumn } from "../../ui/Table/Table.tsx";

interface FlagCardsListProps {
  flags: Flag[];
}

const TABS = [
  { id: "risks", label: "Risks" },
  { id: "opportunities", label: "Opportunities" },
];

function severityToBadgeVariant(severity: Flag["severity"]): BadgeVariant {
  if (severity === "high") return "danger";
  if (severity === "medium") return "warning";
  return "default";
}

type SortDirection = "asc" | "desc";

function FlagCardsList({ flags }: FlagCardsListProps) {
  const [activeTab, setActiveTab] = useState("risks");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedFlags = useSortedFlags(flags, "severity");

  const risks = useMemo(() => {
    const filtered = sortedFlags.filter((f) => f.type === "risk");
    return sortDirection === "asc" ? [...filtered].reverse() : filtered;
  }, [sortedFlags, sortDirection]);

  const opportunities = useMemo(() => {
    const filtered = sortedFlags.filter((f) => f.type === "opportunity");
    return sortDirection === "asc" ? [...filtered].reverse() : filtered;
  }, [sortedFlags, sortDirection]);

  const handleSortBySeverity = useCallback(() => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  }, []);

  const columns: TableColumn<Flag>[] = useMemo(
    () => [
      {
        key: "title",
        header: "Title",
        render: (flag) => (
          <span className="font-medium text-gray-900 dark:text-white">
            {flag.title}
          </span>
        ),
      },
      {
        key: "severity",
        header: "Severity",
        render: (flag) => (
          <Badge
            label={flag.severity}
            variant={severityToBadgeVariant(flag.severity)}
          />
        ),
      },
      {
        key: "description",
        header: "Description",
        render: (flag) => (
          <span className="text-gray-600 dark:text-gray-300">
            {flag.description}
          </span>
        ),
      },
      {
        key: "suggestion",
        header: "Suggestion",
        render: (flag) => (
          <span className="text-gray-500 dark:text-gray-400">
            {flag.suggestion}
          </span>
        ),
      },
    ],
    []
  );

  const data = activeTab === "risks" ? risks : opportunities;
  const disabledSortButton = data.length <= 1;

  return (
    <Card
      title="Flags"
      className="min-h-92"
      cta={
        <button
          type="button"
          disabled={disabledSortButton}
          onClick={handleSortBySeverity}
          className="flex items-center gap-2 rounded-lg px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          title={
            sortDirection === "desc"
              ? "Sorted high to low (click for low to high)"
              : "Sorted low to high (click for high to low)"
          }
        >

          <span>Sort by severity</span> <Chevron
            direction={sortDirection === "desc" ? "up" : "down"}
            color={sortDirection === "desc" ? "red" : "green"}
            size="md"
          />
        </button>
      }
    >
      <div className="space-y-4">
        <Tabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <Table
          columns={columns}
          data={data}
          emptyMessage={
            activeTab === "risks"
              ? "No risk flags found"
              : "No opportunity flags found"
          }
        />
      </div>
    </Card>
  );
}

export default memo(FlagCardsList);
