type Params = {
  offset: number;
  limit: number;
};

export type GetAttributeParams = Params & {
  searchText: string;
  sortBy: 'name' | 'createdAt';
  sortDir: 'asc' | 'desc';
};
