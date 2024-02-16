import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect, useCallback } from "react";

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
    estimateSize: () => 80,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 80 &&
          !isFetchingNextPage &&
          hasNextPage
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(scrollerRef.current);
  }, [fetchMoreOnBottomReached]);

  return { virtualizer, scrollerRef, fetchMoreOnBottomReached };
};
