import { memo, type ReactNode } from "react";

interface CardProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  cta?: ReactNode;
}

const Card = memo(function Card({ title, children, className = "", cta }: CardProps) {
  return (
    <div
      className={`rounded-3xl z-0  border border-gray-200 bg-white/50 p-6 dark:border-gray-700 backdrop-blur-lg dark:bg-gray-800 ${className}`}
    >
      {(title || cta) && <div className="flex items-center justify-between  mb-5">

        {title && (
          <div className="select-none font-stretch-110% text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </div>
        )}
        {cta && (
          cta
        )}
      </div>}
      {children}
    </div>
  );
});

export default Card;
