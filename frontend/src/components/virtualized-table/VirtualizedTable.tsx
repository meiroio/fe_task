import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
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
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasNextPage: boolean;
  className?: string;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export function VirtualizedDataTable<TData, TValue>({
  columns,
  data,
  hasNextPage,
  className,
  fetchNextPage,
  isFetchingNextPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const { virtualizer, scrollerRef } = useVirtualScroll<Row<TData>>({
    allItems: rows,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div
      ref={scrollerRef}
      className={cn("overflow-auto border rounded-md", className)}
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center gap-1"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <ArrowDownNarrowWideIcon size={16} />,
                            desc: <ArrowDownWideNarrowIcon size={16} />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const isLoaderRow = virtualRow.index > rows.length - 1;
              const row = rows[virtualRow.index] as Row<TData>;

              if (isLoaderRow) {
                return (
                  <TableRow
                    key={virtualRow.index}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${
                        virtualRow.start - index * virtualRow.size
                      }px)`,
                    }}
                  >
                    <TableCell colSpan={columns.length}>
                      {hasNextPage ? "Loading more..." : "No more data!"}
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow
                  key={row.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
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
    </div>
  );
}
