import axios from 'axios';

import type { Label } from '@meiro/backend/src/labels/data';
import type { PageData, Params } from '../types';

export const fetchAllLabels = async (
  params: Params,
  prevData: Label[] = [],
): Promise<PageData<Label[], Params>['data']> => {
  try {
    const res = await axios.get<PageData<Label[], Params>>(
      'http://127.0.0.1:3000/labels',
      { params },
    );

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
