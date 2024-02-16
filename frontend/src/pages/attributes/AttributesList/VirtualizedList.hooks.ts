import { AttributeType } from "@/types/attributes";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect } from "react";

type HookParams = {
  hasNextPage: boolean;
  allItems: AttributeType[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const useVirtualScroll = ({
  hasNextPage,
  allItems,
  isFetchingNextPage,
  fetchNextPage,
}: HookParams) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length,
    getScrollElement: () => scrollerRef.current,
    estimateSize: () => 100,
  });
  const vritualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = vritualItems.at(-1);

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allItems.length,
    isFetchingNextPage,
    vritualItems,
  ]);

  return { virtualizer, scrollerRef };
};
