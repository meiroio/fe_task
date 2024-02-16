import { AttributeType } from "@/types/attributes";
import { ColumnDef } from "@tanstack/react-table";

export const COLUMNS: ColumnDef<AttributeType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Labels",
    cell: ({ row }) => row.original.labelIds.join(", "),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];
