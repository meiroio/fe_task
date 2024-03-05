export type Params = {
  offset: number;
  limit: number;
};

export type GetAttributeParams = Params & {
  searchText: string;
  sortBy: 'name' | 'createdAt';
  sortDir: 'asc' | 'desc';
};

export type PageData<T, U> = {
  data: T;
  meta: U & { hasNextPage: boolean };
};
