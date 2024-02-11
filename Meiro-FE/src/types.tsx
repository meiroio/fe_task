export const BASE_URL = "http://127.0.0.1:3000";

export type SortBy = "name" | "createdAt";
export type sortDir = "asc" | "desc";

export type Meta = {
  offset: number;
  limit: number;
  searchText: string;
  sortBy: SortBy;
  sortDir: sortDir;
  hasNextPage: boolean;
};

export type Attribute = {
  id: string;
  name: string;
  createdAt: string;
  labelIds: Array<Label_<"id">>;
  deleted: boolean;
};

export type ResponseData = {
  data: Array<Attribute>;
  meta: Meta;
};

export type Label = {
  id: string;
  name: string;
};

export type ResponseLabels = {
  data: Array<Label>;
  meta: Meta;
};

type Label_<T> = T extends keyof Label ? Pick<Label, T> : never;

export type Filters = Pick<Meta, "searchText" | "sortBy" | "sortDir">;
