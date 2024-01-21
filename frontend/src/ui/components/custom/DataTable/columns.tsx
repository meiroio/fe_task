import { Attribute, deleteAttribute } from "@/services/attributesService";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../shadcn/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "../../shadcn/ui/alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { formatDateString } from "@/helpers/dateFormatter";
import { Link } from "react-router-dom";
import { matchLabelNames } from "@/helpers/matchLabelNames";
import { labels } from "../../../../../../backend/src/labels/data";

export const columns: ColumnDef<Attribute>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link
          className="max-w-60 overflow-hidden whitespace-nowrap text-ellipsis hover:underline"
          to={`/attributes/${row.original.id}`}
        >
          {row.getValue<string>("name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "labelIds",
    header: "Labels",
    cell: ({ row }) => {
      const correspondingLabelNames: string[] = matchLabelNames(
        labels,
        row.original.labelIds
      );

      return (
        <>
          {correspondingLabelNames.map((name) => {
            return <span key={name}>{name}/&nbsp;</span>;
          })}
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return <>{formatDateString(row.getValue<string>("createdAt"))}</>;
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const attribute = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient();
      return (
        <>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  attribute data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await deleteAttribute(attribute.id);
                    queryClient.invalidateQueries({ queryKey: ["attributes"] });
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
