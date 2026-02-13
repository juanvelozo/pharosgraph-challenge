import { memo } from "react";
import type { AnnotatedSpan } from "../../../hooks/useAnnotatedSpans.ts";
import type { Flag } from "../../../types/analysis.types.ts";
import Popover from "../../ui/Popover/Popover.tsx";
import Card from "../../ui/Card/Card.tsx";

interface FlagAnnotatedTextProps {
  spans: AnnotatedSpan[];
  onFlagClick?: (flag: Flag) => void;
}

const riskClasses =
  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 cursor-pointer hover:underline rounded px-0.5";
const opportunityClasses =
  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 cursor-pointer hover:underline rounded px-0.5";

function FlagDetails({ flag }: { flag: Flag }) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
        {flag.title}
      </h4>
      <p className="text-md text-gray-600 dark:text-gray-300">
        {flag.description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-gray-700">Suggestion:</span> {flag.suggestion}
      </p>
    </div>
  );
}

function FlagAnnotatedText({ spans, onFlagClick }: FlagAnnotatedTextProps) {
  return (
    <Card title="Annotated Ad Text">
      <div className="inline text-base leading-relaxed text-gray-800 dark:text-gray-200">
        {spans.map((s, i) => {
          if (s.flag) {
            const classes =
              s.flag.type === "risk" ? riskClasses : opportunityClasses;
            return (
              <Popover
                key={i}
                trigger={
                  <span
                    className={classes}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onFlagClick?.(s.flag!);
                      }
                    }}
                    onClick={() => onFlagClick?.(s.flag!)}
                  >
                    {s.text}
                  </span>
                }
                content={<FlagDetails flag={s.flag} />}
                className="inline"
              />
            );
          }
          return <span key={i}>{s.text}</span>;
        })}
      </div>
    </Card>
  );
}

export default memo(FlagAnnotatedText);
