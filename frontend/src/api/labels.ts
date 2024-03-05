import axios from 'axios';

import type { Label } from '@meiro/backend/src/labels/data';
import type { PageData, Params } from '../types';

const apiUrl = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

export const fetchAllLabels = async (
  params: Params,
  prevData: Label[] = [],
): Promise<PageData<Label[], Params>['data']> => {
  try {
    const res = await axios.get<PageData<Label[], Params>>(`${apiUrl}/labels`, {
      params,
    });

    const { data, meta } = res.data;

    if (meta.hasNextPage) {
      return fetchAllLabels(
        {
          offset: meta.offset + meta.limit,
          limit: meta.limit,
        },
        prevData.concat(data),
      );
    }

    return prevData.concat(data);
  } catch (error) {
    throw new Error('Failed to fetch labels');
  }
};
