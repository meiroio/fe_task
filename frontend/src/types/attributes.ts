export type AttributeType = {
  id: string;
  name: string;
  createdAt: string; // ISO8601 string
  labelIds: string[];
  deleted: boolean;
};

export type MetaType = {
  offset: number;
  limit: number;
  searchText: string;
  sortBy: string;
  sortDir: string;
  hasNextPage: boolean;
};

export type AttributeQuery = {
  data: AttributeType[];
  meta: MetaType;
};
