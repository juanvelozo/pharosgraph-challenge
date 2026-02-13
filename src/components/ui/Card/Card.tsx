import { memo, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CardProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  cta?: ReactNode;
  animationDelay?: number;
}

const Card = memo(function Card({
  title,
  children,
  className = "",
  cta,
  animationDelay = 0,
}: CardProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          delay: animationDelay,
        }}
        className={`rounded-3xl z-0 border border-gray-200 bg-white/50 p-6 dark:border-gray-700 backdrop-blur-lg dark:bg-gray-800 ${className}`}
      >
        {(title || cta) && (
          <div className="flex items-center justify-between mb-5">
            {title && (
              <div className="select-none font-stretch-110%  text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </div>
            )}
            {cta && cta}
          </div>
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
});

export default Card;
