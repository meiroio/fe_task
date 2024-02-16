import {
  ColumnSort,
  OnChangeFn,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useVirtualScroll } from "./VirtualTable.hook";
import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from "lucide-react";
import { useState } from "react";
import { DataTableProps, TableSortState } from "./VirtualTable.types";

export function VirtualizedDataTable<TData, TValue>({
  columns,
  data,
  hasNextPage,
  className,
  fetchNextPage,
  isFetchingNextPage,
  onSort,
  initialSort,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(
    initialSort?.id ? [initialSort as ColumnSort] : [],
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    if (table.getRowModel().rows.length) {
      virtualizer.scrollToIndex?.(0);
    }

    if (typeof updater === "function") {
      const update = updater(table.getState().sorting);
      setSorting(update);
      if (onSort) {
        const data = update[0] as ColumnSort;
        onSort(data as TableSortState<TData> | undefined);
      }
    }
  };

  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }));

  const { rows } = table.getRowModel();

  const { virtualizer, scrollerRef, fetchMoreOnBottomReached } =
    useVirtualScroll<Row<TData>>({
      allItems: rows,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    });

  return (
    <div
      className={cn("border rounded-md overflow-auto relative", className)}
      onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      ref={scrollerRef}
    >
      <Table className="grid">
        <TableHeader className="grid sticky top-0 z-10 bg-secondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="flex items-center flex-1"
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex gap-1 items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        desc: <ArrowDownWideNarrowIcon size={16} />,
                        asc: <ArrowUpNarrowWideIcon size={16} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          className="gird relative"
          style={{
            height: `${virtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > rows.length - 1;
            const row = rows[virtualRow.index] as Row<TData>;

            if (!row) {
              return null;
            }

            return (
              <TableRow
                data-index={virtualRow.index} //needed for dynamic row height measurement
                ref={(node) => virtualizer.measureElement(node)} //measure dynamic row height
                key={row.id}
                className="flex absolute w-full h-[80px]" // h-[80px] does not need to be there (I added it there cos I did not have enaugh data to make the infinite loading nicer expereinec since there is not enaugh data)
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {isLoaderRow
                  ? "Is Loading"
                  : row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className="flex items-center flex-1"
                          style={{
                            width: cell.column.getSize(),
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
