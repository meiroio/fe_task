import { AttributeFetchResponse } from "../_components/atributes-layoute/AttributesLayoute.types";

const API_BASE_URL = "http://localhost:3000"; // Replace with your actual API base URL

interface useApiEndpoints {
  deleteAttribute: (id: string) => Promise<any>;
  fetchLabels: (offset: number) => Promise<any>;
  fetchAttribut: (id: string) => Promise<any>;
  fetchAttributes: ({
    pageParam,
    searchedText,
  }: {
    pageParam: number;
    searchedText: string;
  }) => Promise<AttributeFetchResponse>;
}

const useApi = (): useApiEndpoints => {
  const deleteAttribute = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/attributes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete attribute");
    }

    const data = await response.json();
    return data;
  };

  const fetchLabels = async (offset: number = 0) => {
    const response = await fetch(`${API_BASE_URL}/labels?offset=${offset}`);
    const parsedLabelsResponse = await response.json();
    return parsedLabelsResponse;
  };

  const fetchAttribut = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/attributes/${id}`);
    const parsedAttributeResponse = await response.json();
    return parsedAttributeResponse;
  };

  const fetchAttributes = async ({
    pageParam,
    searchedText,
  }: {
    pageParam: number;
    searchedText: string;
  }) => {
    const response = await fetch(
      `http://127.0.0.1:3000/attributes?offset=${pageParam}&limit=10&searchText=${searchedText}`
    );
    return await response.json();
  };

  return {
    deleteAttribute,
    fetchLabels,
    fetchAttributes,
    fetchAttribut,
  };
};

export default useApi;
