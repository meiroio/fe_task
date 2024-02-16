import { VirtualizedDataTable } from "@/components/virtualized-table";
import { AttributeType } from "@/types/attributes";
import { COLUMNS } from "./AttributesTables.config";

type Props = {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  data: AttributeType[];
};

export const AttributesTable = (props: Props) => {
  return (
    <VirtualizedDataTable
      className="max-h-[500px] mt-4"
      columns={COLUMNS}
      {...props}
    />
  );
};
