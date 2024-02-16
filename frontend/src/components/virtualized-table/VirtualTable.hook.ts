import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect } from "react";

type HookParams<T> = {
  hasNextPage: boolean;
  allItems: T[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const useVirtualScroll = <T>({
  hasNextPage,
  allItems,
  isFetchingNextPage,
  fetchNextPage,
}: HookParams<T>) => {
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
