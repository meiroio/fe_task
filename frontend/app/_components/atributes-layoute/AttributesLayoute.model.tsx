import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { AttributesLayoutProps } from "./AttributesLayoute";
import { Attribute, AttributeFetchResponse } from "./AttributesLayoute.types";
import useApi from "@/app/_api/api";
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BsAlphabet, BsFillCalendarDateFill } from "react-icons/bs";
import { ToolbarItemProps } from "./components/toolbar/toolbar-item/ToolbarItem";

const useAttributesLayouteModel = (): AttributesLayoutProps => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [searchedText, setSearchedText] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSortingByName, setIsSortingByName] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const [hasNextPageLocal, setHasNextPage] = useState(true);

  const { fetchAttributes } = useApi();

  const haveIReachedTheEndOfWebsite = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const height = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= height) return true;
    return false;
  };

  const toolbarTools: ToolbarItemProps[] = [
    {
      name: "Sort",
      isDefault: isAscending,
      toggleOptions: setIsAscending,
      DefaultIcon: AiOutlineSortDescending,
      SecondaryIcon: AiOutlineSortAscending,
    },
    {
      name: "Sort By",
      isDefault: isSortingByName,
      toggleOptions: setIsSortingByName,
      DefaultIcon: BsFillCalendarDateFill,
      SecondaryIcon: BsAlphabet,
    },
    {
      name: "Edit",
      isDefault: isEditMode,
      toggleOptions: setIsEditMode,
      DefaultIcon: AiOutlineEdit,
      SecondaryIcon: AiOutlineEye,
    },
  ];

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
        sortBy: isSortingByName ? "name" : "createdAt",
        sortDir: isAscending ? "asc" : "desc",
      });
      setHasNextPage(parsedResponse.meta.hasNextPage);
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
    if (!haveIReachedTheEndOfWebsite()) {
      return;
    }

    if (!isFetchingNextPage && hasNextPageLocal) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [searchedText, isSortingByName, isAscending]);

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
    toolbarTools,
    refetch,
  };
};

export { useAttributesLayouteModel };
