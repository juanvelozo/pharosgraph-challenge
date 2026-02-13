import { memo, type ReactNode } from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  emptyMessage?: string;
}

const List = memo(function List<T>({
  items,
  renderItem,
  className = "",
  emptyMessage = "No items",
}: ListProps<T>) {
  if (items.length === 0) {
    return (
      <p className="py-4 text-center text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}) as <T>(props: ListProps<T>) => ReactNode;

export default List;
