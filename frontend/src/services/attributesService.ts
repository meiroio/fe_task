const BASE_URL = "http://127.0.0.1:3000";

export type DataResponse = {
  data: Array<Attribute>;
  meta: {
    offset: number;
    limit: number;
    searchText: string;
    sortBy: "name" | "createdAt";
    sortDir: "asc" | "desc";
    hasNextPage: boolean;
  };
};

export type Attribute = {
  id: string;
  name: string;
  createdAt: string; // ISO8601
  labelIds: Pick<Label, "id">[];
  deleted: boolean;
};

export type Label = {
  id: string;
  name: string;
};

export type FilterQueryParamsInfiniteScroll = {
  limit: number;
  searchText: string;
  sortBy: "name" | "createdAt";
  sortDir: "asc" | "desc";
};

export type FilterQueryParamsPagination = FilterQueryParamsInfiniteScroll & {
  offset: number;
};

export const getAllAttributesInfiniteScroll = (
  filterObject: FilterQueryParamsInfiniteScroll,
  offset: number
) => {
  const queryParamsString = Object.entries({ ...filterObject, offset })
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

  return fetch(`${BASE_URL}/attributes?${queryParamsString}`, { method: "GET" })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching all attributes:", error);
    });
};

export const getAllAttributesPagination = (
  filterObject: FilterQueryParamsPagination
) => {
  const queryParamsString = Object.entries(filterObject)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

  return fetch(`${BASE_URL}/attributes?${queryParamsString}`, { method: "GET" })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching all attributes:", error);
    });
};

export const getAttribute = (id: string) =>
  fetch(`${BASE_URL}/attributes/${id}`, { method: "GET" })
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error fetching attribute with id: ${id}`, error);
    });

export const deleteAttribute = (id: string) =>
  fetch(`${BASE_URL}/attributes/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error deleting attribute with id: ${id}`, error);
    });
