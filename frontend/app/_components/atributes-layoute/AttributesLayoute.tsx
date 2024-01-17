"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Table from "./components/table/Table";
import SearchBar from "../search-bar/SearchBar";
import { useAttributesLayouteModel } from "./AttributesLayoute.model";
import { Attribute, Label } from "./AttributesLayoute.types";
import Toolbar from "./components/toolbar/Toolbar";

export interface AttributesLayoutProps {
  attributes: Attribute[];
  searchedText: string;
  setSearchedText: Dispatch<SetStateAction<string>>;
  fetchNextPage: () => Promise<any>;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<any>;
}

const AttributesLayoute: React.FC = () => {
  const {
    attributes,

    searchedText,
    setSearchedText,

    fetchNextPage,

    isFetchingNextPage,
    hasNextPage,

    isEditMode,
    setIsEditMode,

    refetch,
  } = useAttributesLayouteModel();

  return (
    <>
      <h1 className="text-4xl pt-24 font-bold text-center">Attributes</h1>

      <SearchBar
        searchedText={searchedText}
        setSearchedText={setSearchedText}
      />

      <section className="flex flex-col  w-[60vw] self-center">
        <Toolbar isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
        <Table data={attributes} isEditMode={isEditMode} refetch={refetch} />
        <button
          className={`bg-translarent ${
            hasNextPage ? " cursor-pointer" : "cursor-default"
          } text-gray-700 py-2 px-4 my-5 max-w-sm self-center`}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Click me or scroll down to show more"
            : "Nothing more to show"}
        </button>
      </section>
    </>
  );
};

export default AttributesLayoute;
