import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';
import { fetchAttributes } from '../api';

import type { GetAttributeParams } from '../types';
import { $params } from '../store';

const useAttributes = () => {
  const [searchText, setSearchText] = useState($params.get().searchText);
  const [params, setParams] = useState<GetAttributeParams>($params.get());

  const setSortBy = (sortBy: GetAttributeParams['sortBy']) => {
    const newParams = {
      ...params,
      sortBy,
      sortDir:
        params.sortBy === sortBy
          ? params.sortDir === 'asc'
            ? 'desc'
            : 'asc'
          : 'asc',
    } satisfies GetAttributeParams;

    setParams(newParams);
    $params.set(newParams);
  };

  const query = useInfiniteQuery({
    queryKey: ['attributes', params, useDebounce(searchText)],
    queryFn: ({ pageParam }) =>
      fetchAttributes({ ...params, searchText, offset: pageParam }),
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 0,
    getNextPageParam: ({ meta }) => {
      return meta.hasNextPage ? meta.offset + meta.limit : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    query,
    searchText,
    setSortBy,
    setSearchText: (value: string) => {
      setSearchText(value);
      $params.set({ ...$params.get(), searchText: value });
    },
  };
};

export default useAttributes;
