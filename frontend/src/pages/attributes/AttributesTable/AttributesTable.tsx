import { VirtualizedDataTable } from "@/components/virtualized-table";
import { AttributeType } from "@/types/attributes";
import { getColumns } from "./AttributesTables.config";
import { ComponentProps } from "react";
import { useMutation } from "@tanstack/react-query";
import { ATTRIBUTES_QUERY_KEY, deleteAttribute } from "..";
import { queryClient } from "@/react-query";

type Props = Omit<
  ComponentProps<typeof VirtualizedDataTable<AttributeType, unknown>>,
  "columns" | "className"
>;

export const AttributesTable = (props: Props) => {
  const mutation = useMutation({
    mutationFn: deleteAttribute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTRIBUTES_QUERY_KEY] });
    },
  });

  return (
    <VirtualizedDataTable
      className="max-h-[500px] mt-4"
      columns={getColumns(mutation.mutate)}
      {...props}
    />
  );
};
