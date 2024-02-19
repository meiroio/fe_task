import { VirtualizedDataTable } from "@/components/virtualized-table";
import { AttributeType } from "@/types/attributes";
import { getColumns } from "./AttributesTables.config";
import { ComponentProps } from "react";
import { queryClient, useDeleteAttributeByIdQuery } from "@/react-query";
import { ATTRIBUTES_QUERY_KEY } from "..";

type Props = Omit<
  ComponentProps<typeof VirtualizedDataTable<AttributeType, unknown>>,
  "columns" | "className"
>;

export const AttributesTable = (props: Props) => {
  const { mutate } = useDeleteAttributeByIdQuery(() => {
    queryClient.invalidateQueries({
      queryKey: [ATTRIBUTES_QUERY_KEY],
    });
  });

  return (
    <VirtualizedDataTable
      className="max-h-[500px] mt-4"
      columns={getColumns(mutate)}
      {...props}
    />
  );
};
