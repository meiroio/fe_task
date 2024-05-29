import { createContext, useContext } from 'react';
import { AttributeListSortBy, AttributeListSortDir, AttributesFilter, LabelList } from '../../../types';
import { attributesListSortByKeys, attributesListSortDirKeys } from '../../../enums';

interface AttributesContext extends AttributesFilter {
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  setSearchText: (searchText: string) => void;
  setSortBy: (sortBy: AttributeListSortBy) => void;
  setSortDir: (sortDir: AttributeListSortDir) => void;
  labels: LabelList;
  setLabels: (labels: LabelList) => void;
  confirmOpen: boolean;
  setConfirmOpen: (open: boolean) => void;
  confirmId: string | null;
  setConfirmId: (id: string | null) => void;
}

const defaultContext: AttributesContext = {
  offset: 0,
  limit: 10,
  searchText: '',
  sortBy: attributesListSortByKeys.name,
  sortDir: attributesListSortDirKeys.asc,
  setOffset: () => {},
  setLimit: () => {},
  setSearchText: () => {},
  setSortBy: () => {},
  setSortDir: () => {},
  labels: [],
  setLabels: () => {},
  confirmOpen: false,
  setConfirmOpen: () => {},
  confirmId: null,
  setConfirmId: () => {},
};

const AttributesContext = createContext(defaultContext);

const AttributesContextProvider = AttributesContext.Provider;
const AttributesContextConsumer = AttributesContext.Consumer;

const useAttributesContext = () => useContext(AttributesContext);

export { AttributesContext, AttributesContextProvider, AttributesContextConsumer, useAttributesContext };
