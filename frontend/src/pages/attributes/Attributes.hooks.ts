import { AttributeType } from "@/types/attributes";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect } from "react";

type HookParams = {
  hasNextPage: boolean;
  allRows: AttributeType[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const useVirtualScroll = ({
  hasNextPage,
  allRows,
  isFetchingNextPage,
  fetchNextPage,
}: HookParams) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => scrollerRef.current,
    estimateSize: () => 100,
  });
  const vritualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...vritualItems].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    vritualItems,
  ]);

  return { virtualizer, scrollerRef };
};
