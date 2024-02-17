import { Button } from "@/components/ui/button";
import { AttributeType } from "@/types/attributes";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

export const getColumns = (
  onDelete: (id: string) => void,
): ColumnDef<AttributeType>[] => [
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
  {
    accessorKey: "delete",
    header: "",
    cell: ({ row }) => (
      <div className="flex w-full justify-end">
        <Button
          variant="destructive"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row.original.id);
          }}
        >
          <TrashIcon size={18} />
        </Button>
      </div>
    ),
  },
];
