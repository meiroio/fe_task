import { useInfiniteQuery } from '@tanstack/react-query';

import type { ApiResponse, GetAttributeParams } from '../types';
import type { Attribute } from '@meiro/backend/src/attributes/data';

const fetchAttributes = async () => {
  const res = await fetch('http://127.0.0.1:3000/attributes');

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = (await res.json()) as ApiResponse<
    Attribute[],
    GetAttributeParams & { hasNextPage: boolean }
  >;

  return data;
};

const useAttributes = () => {
  const query = useInfiniteQuery({
    queryKey: ['attributes'],
    queryFn: fetchAttributes,
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => {
      return meta.hasNextPage ? meta.offset + meta.limit : undefined;
    },
  });

  return query;
};

export default useAttributes;
