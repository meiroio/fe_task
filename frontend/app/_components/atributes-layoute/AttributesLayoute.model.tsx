import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { AttributesLayoutProps } from "./AttributesLayoute";
import { Attribute, AttributeFetchResponse } from "./AttributesLayoute.types";
import useApi from "@/app/_api/api";

const useAttributesLayouteModel = (): AttributesLayoutProps => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [searchedText, setSearchedText] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  const { fetchAttributes } = useApi();

  const {
    data: attributesData,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "attributes",
    async ({ pageParam = 0 }) => {
      const parsedResponse: AttributeFetchResponse = await fetchAttributes({
        pageParam,
        searchedText,
      });
      return {
        data: parsedResponse.data,
        nextPage: pageParam + 10,
        hasNextPage: parsedResponse.meta.hasNextPage,
      };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : undefined,
    }
  );

  useEffect(() => {
    setAttributes(attributesData?.pages.flatMap((page) => page.data) || []);
  }, [attributesData]);

  // Handle scrolling to fetch more items
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <=
      document.documentElement.scrollHeight
    ) {
      return;
    }

    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [searchedText]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    attributes,
    searchedText,
    setSearchedText,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? true,
    setIsEditMode,
    isEditMode,
    refetch,
  };
};

export { useAttributesLayouteModel };
