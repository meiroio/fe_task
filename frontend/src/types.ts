type Params = {
  offset: number;
  limit: number;
};

export type GetAttributeParams = Params & {
  searchText: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
};

export type ApiResponse<T, U extends Params> = {
  data: T;
  meta: U;
};
