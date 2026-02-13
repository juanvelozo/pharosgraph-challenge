import { memo } from "react";
import { motion } from "framer-motion";

export type ChevronDirection = "up" | "down";

export type ChevronSize = "sm" | "md" | "lg" | number;

export type ChevronColor = "red" | "green" | "current";

interface ChevronProps {
  direction: ChevronDirection;
  size?: ChevronSize;
  color?: ChevronColor;
  className?: string;
}

const colorClasses: Record<ChevronColor, string> = {
  red: "text-red-500",
  green: "text-green-500",
  current: "",
};

const sizeMap: Record<Exclude<ChevronSize, number>, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const Chevron = memo(function Chevron({
  direction,
  size = "md",
  color = "current",
  className = "",
}: ChevronProps) {
  const pixelSize = typeof size === "number" ? size : sizeMap[size];
  const rotation = direction === "up" ? 0 : 180;

  return (
    <motion.svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${colorClasses[color]} ${className}`}
      initial={false}
      animate={{ rotate: rotation }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <path d="M6 15l6-6 6 6" />
    </motion.svg>
  );
});

export default Chevron;
