import { atom } from "recoil";
import { Filters } from "../../types";

export const initialState: Filters = {
  searchText: "",
  sortBy: "name",
  sortDir: "asc",
};

export const filtersAtom = atom<Filters>({
  key: "filtersAtom",
  default: initialState,
});
