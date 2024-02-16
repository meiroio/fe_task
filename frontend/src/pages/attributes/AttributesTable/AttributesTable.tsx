import { VirtualizedDataTable } from "@/components/virtualized-table";
import { AttributeType } from "@/types/attributes";
import { COLUMNS } from "./AttributesTables.config";
import { ComponentProps } from "react";

type Props = Omit<
  ComponentProps<typeof VirtualizedDataTable<AttributeType, unknown>>,
  "columns" | "className"
>;

export const AttributesTable = (props: Props) => {
  return (
    <VirtualizedDataTable
      className="max-h-[500px] mt-4"
      columns={COLUMNS}
      {...props}
    />
  );
};
