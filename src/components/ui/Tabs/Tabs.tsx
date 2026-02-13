import { memo } from "react";
import { motion } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

const Tabs = memo(function Tabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: TabsProps) {
  return (
    <div
      className={`relative border overflow-hidden border-gray-200 dark:border-gray-700 flex gap-1 rounded-3xl bg-gray-200 p-1 dark:bg-gray-800 ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative z-10 w-full rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
            ? "text-gray-900 dark:text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 rounded-3xl bg-white shadow-sm dark:bg-gray-700"
              transition={{
                type: "tween",
              }}
              style={{ zIndex: -1 }}
            />
          )}
          <span className="relative z-0">{tab.label}</span>
        </button>
      ))}
    </div>
  );
});

export default Tabs;
