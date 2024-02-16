import { ScrollArea } from "@/components/ui/scroll-area";
import { ListItem } from "./ListItem";
import { useVirtualScroll } from "./VirtualizedList.hooks";
import { AttributeQuery } from "@/types/attributes";
import { InfiniteData } from "@tanstack/react-query";

type Props = {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  data: InfiniteData<AttributeQuery, unknown>;
};

export const VirtualizedList = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  data,
}: Props) => {
  const allItems = data.pages.flatMap((d) => d.data);

  const { virtualizer, scrollerRef } = useVirtualScroll({
    hasNextPage,
    allItems,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="mt-5 border rounded-md">
      <div className="flex items-center p-4 border-b">
        <p className="flex-1">Name</p>
        <p className="flex-1">Labels</p>
        <p className="flex-1">Created At</p>
      </div>
      <ScrollArea className="max-h-[500px] overflow-auto" ref={scrollerRef}>
        <div
          className="relative w-full"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizer.getVirtualItems().map((row) => {
            const isLoaderRow = row.index > allItems.length - 1;
            const attribute = allItems[row.index];

            return (
              <div
                className="w-full absolute top-0 left-0 border-b"
                style={{
                  height: `${row.size}px`,
                  transform: `translateY(${row.start}px)`,
                }}
                key={row.index}
              >
                {isLoaderRow ? (
                  hasNextPage ? (
                    "Loading more..."
                  ) : (
                    "Nothing more to load"
                  )
                ) : (
                  <ListItem
                    className="flex items-center px-4"
                    attribute={attribute}
                  />
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
