export interface fetchAttributProps {
  pageParam: number;
  searchedText: string;
  sortBy?: "name" | "createdAt";
  sortDir?: "asc" | "desc";
}
