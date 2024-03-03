import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAttributes } from '../api';

import type { GetAttributeParams } from '../types';

const useAttributes = () => {
  const [params, setParams] = useState<GetAttributeParams>({
    offset: 0,
    limit: 10,
    searchText: '',
    sortBy: 'name',
    sortDir: 'asc',
  });

  const setSortBy = (sortBy: GetAttributeParams['sortBy']) => {
    setParams((prev) => ({
      ...prev,
      sortBy,
      sortDir:
        prev.sortBy === sortBy
          ? prev.sortDir === 'asc'
            ? 'desc'
            : 'asc'
          : 'asc',
    }));
  };

  const query = useInfiniteQuery({
    queryKey: ['attributes', params],
    queryFn: () => fetchAttributes(params),
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => {
      return meta.hasNextPage ? meta.offset + meta.limit : undefined;
    },
  });

  return {
    query,
    setSortBy,
  };
};

export default useAttributes;
