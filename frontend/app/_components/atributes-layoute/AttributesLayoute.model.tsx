import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { AttributesLayoutProps } from "./AttributesLayoute";
import {
  Attribute,
  AttributeFetchResponse,
  Label,
} from "./AttributesLayoute.types";
import useApi from "@/app/_api/api";

const useAttributesLayouteModel = (): AttributesLayoutProps => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [searchedText, setSearchedText] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  const { fetchLabels: fetchLabelsResponse } = useApi();

  const handleFetchLabels = async () => {
    let labels: Label[] = [];
    let labelsHaveNextPage: boolean = true;

    while (labelsHaveNextPage) {
      const labelsResponse = await fetchLabelsResponse(labels.length);
      labels.push(...labelsResponse.data);
      labelsHaveNextPage = labelsResponse.meta.hasNextPage;
    }

    setLabels(labels);
  };

  const {
    data: attributesData,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "attributes",
    async ({ pageParam = 0 }) => {
      const response = await fetch(
        `http://127.0.0.1:3000/attributes?offset=${pageParam}&limit=10&searchText=${searchedText}`
      );
      const parsedResponse: AttributeFetchResponse = await response.json();
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

  // Attach scroll event listener (consider useEffect to handle this)
  window.addEventListener("scroll", handleScroll);

  useEffect(() => {
    refetch();
  }, [searchedText]);

  useEffect(() => {
    handleFetchLabels();
  }, []);

  return {
    attributes,
    labels,
    searchedText,
    setSearchedText,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? true,
    setIsEditMode,
    isEditMode,
  };
};

export { useAttributesLayouteModel };
