import { atom } from 'nanostores';
import { GetAttributeParams } from './types';

const defaultParams = {
  offset: 0,
  limit: 10,
  searchText: '',
  sortBy: 'name',
  sortDir: 'asc',
} satisfies GetAttributeParams;

export const $params = atom<GetAttributeParams>(defaultParams);

export const clearParams = () => {
  $params.set(defaultParams);
};
