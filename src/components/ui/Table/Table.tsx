import { memo, type ReactNode } from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}

function Table<T extends object>({
  columns,
  data,
  emptyMessage = "No data",
  className = "",
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <p
        className={`py-8 text-center text-gray-500 dark:text-gray-400 ${className}`}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <table className="w-full min-w-[500px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 font-semibold text-gray-900 dark:text-white"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 last:border-0 dark:border-gray-800"
            >
              {columns.map((col) => {
                const value = (item as Record<string, unknown>)[col.key as string];
                const cell = col.render
                  ? col.render(item)
                  : String(value ?? "");
                return (
                  <td
                    key={String(col.key)}
                    className="px-4 py-3 text-gray-700 dark:text-gray-300"
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(Table) as <T extends object>(
  props: TableProps<T>
) => ReactNode;
