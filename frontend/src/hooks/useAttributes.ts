import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { useAxiosInstance } from './useAxiosInstance';
import { Attribute, AttributesFilter, AttributesResponse } from '../types';
import { API_EP } from '../constants';

const fetchAttributes = async (instance: AxiosInstance, filter: AttributesFilter): Promise<AttributesResponse> => {
  const response = await instance.get(API_EP.getAttributes, { params: { ...filter } });

  return {
    data: response.data?.data ?? [],
    meta: response?.data?.meta,
  };
};

export const useInfinityAttributes = ({ offset, limit, sortBy, sortDir, searchText }: AttributesFilter) => {
  const { apiBase } = useAxiosInstance();

  return useInfiniteQuery<AttributesResponse>({
    initialData: undefined,
    initialPageParam: undefined,
    queryKey: ['attributes', Object.values({ offset, limit, sortBy, sortDir, searchText })],
    queryFn: ({ pageParam }) =>
      fetchAttributes(apiBase, { offset: (pageParam as number) ?? 0, limit, sortBy, sortDir, searchText }),
    getNextPageParam: (lastPage, pages) => (lastPage.meta.hasNextPage ? pages.length * limit : undefined),
  });
};

export const useAttributesDetail = (id?: string) => {
  const { apiBase } = useAxiosInstance();

  const { data, ...query } = useQuery({
    enabled: !!id,
    queryKey: [`attributes`, id],
    queryFn: () => apiBase.get(API_EP.getAttributesDetail(id), {}),
  });

  return {
    data: data?.data?.data as Attribute,
    ...query,
  };
};

export const useDeleteAttributeMutation = (instance: AxiosInstance) =>
  useMutation({
    mutationFn: (id: string) => {
      return instance({
        url: API_EP.deleteAttributesDetail(id),
        method: 'DELETE',
      });
    },
  });
