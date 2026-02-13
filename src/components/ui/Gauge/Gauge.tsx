import { memo, useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";

export type GaugeVariant = "success" | "warning" | "danger";

export type GaugeSize = "sm" | "md" | "lg" | "xl";

interface GaugeProps {
  value: number;
  max?: number;
  variant?: GaugeVariant;
  className?: string;
  showValue?: boolean;
  strokeWidth?: number;
  size?: GaugeSize;
}

const sizeClasses: Record<GaugeSize, { svg: string; text: string }> = {
  sm: { svg: "h-24 w-24", text: "text-lg" },
  md: { svg: "h-32 w-32", text: "text-2xl" },
  lg: { svg: "h-40 w-40", text: "text-3xl" },
  xl: { svg: "h-48 w-48", text: "text-4xl" },
};

const variantColors: Record<GaugeVariant, string> = {
  success: "stroke-green-500",
  warning: "stroke-amber-500",
  danger: "stroke-red-500",
};

const Gauge = memo(function Gauge({
  value,
  max = 100,
  variant = "success",
  className = "",
  showValue = true,
  strokeWidth = 8,
  size = "md",
}: GaugeProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = (clamped / max) * 100;
  // Radius shrinks as strokeWidth grows so the stroke stays inside viewBox (100x100)
  const radius = 50 - strokeWidth / 2 - 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const { svg: svgSize, text: textSize } = sizeClasses[size];

  const [displayValue, setDisplayValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const target = Math.round(clamped);
    const controls = animate(fromRef.current, target, {
      duration: 0.8,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      onComplete: () => {
        fromRef.current = target;
      },
    });
    return () => controls.stop();
  }, [clamped]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg className={`${svgSize} -rotate-90`} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className={variantColors[variant]}
        />
      </svg>
      {showValue && (
        <span className={`absolute ${textSize} font-bold tabular-nums text-gray-900 dark:text-white`}>
          {displayValue}
        </span>
      )}
    </div>
  );
});

export default Gauge;
