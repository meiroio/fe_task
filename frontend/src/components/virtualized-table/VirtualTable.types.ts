import { ColumnDef } from "@tanstack/react-table";

export type TableSortState<T> = { id: keyof T; desc: boolean };

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasNextPage: boolean;
  className?: string;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  onSort?: (sort?: TableSortState<TData>) => void;
  initialSort?: TableSortState<TData>;
};
