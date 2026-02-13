import { memo } from "react";

export type HighlightVariant = "risk" | "opportunity" | "neutral";

export interface HighlightedSpan {
  text: string;
  variant?: HighlightVariant;
  onClick?: () => void;
}

interface HighlightedTextProps {
  spans: HighlightedSpan[];
  className?: string;
}

const variantClasses: Record<HighlightVariant, string> = {
  risk: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 cursor-pointer hover:underline",
  opportunity:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 cursor-pointer hover:underline",
  neutral: "",
};

const HighlightedText = memo(function HighlightedText({ spans, className = "" }: HighlightedTextProps) {
  return (
    <span className={`inline ${className}`}>
      {spans.map((span, i) => {
        const variant = span.variant ?? "neutral";
        const classes =
          variant === "neutral"
            ? ""
            : variantClasses[variant];

        if (span.onClick) {
          return (
            <span
              key={i}
              role="button"
              tabIndex={0}
              onClick={span.onClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  span.onClick?.();
                }
              }}
              className={classes}
            >
              {span.text}
            </span>
          );
        }

        return (
          <span key={i} className={classes}>
            {span.text}
          </span>
        );
      })}
    </span>
  );
});

export default HighlightedText;
