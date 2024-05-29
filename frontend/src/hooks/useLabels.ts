import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAxiosInstance } from './useAxiosInstance';
import { LabelList, LabelsFilter, LabelsMeta } from '../types';
import { API_EP, LABELS_FILTER_LIMIT_DEFAULT } from '../constants';

export const useLabels = (filter: LabelsFilter, enabled: boolean = true) => {
  const { apiBase } = useAxiosInstance();

  const { data, ...query } = useQuery({
    queryKey: ['labels', Object.values(filter)],
    queryFn: () => apiBase.get(API_EP.getLabels, { params: { ...filter } }),
    enabled,
  });

  return {
    data: (data?.data?.data ?? []) as LabelList,
    meta: data?.data?.meta as LabelsMeta,
    ...query,
  };
};

export const useLabelsItems = () => {
  const [labels, setLabels] = useState<LabelList>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(LABELS_FILTER_LIMIT_DEFAULT);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { data, meta } = useLabels({ offset, limit }, hasNextPage);

  useEffect(() => {
    if (data)
      setLabels(Array.from([...labels, ...data].reduce((map, obj) => map.set(obj.id, obj), new Map()).values()));
    if (meta) {
      setHasNextPage(meta.hasNextPage);
      if (meta.hasNextPage) setOffset(offset + limit);
    }
  }, [data, meta]);

  return {
    labels,
  };
};
