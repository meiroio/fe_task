import axios from 'axios';

import type { Attribute } from '@meiro/backend/src/attributes/data';
import type { GetAttributeParams } from '../types';

export const fetchAttributes = async (params: GetAttributeParams) => {
  try {
    const res = await axios.get<{
      data: Attribute[];
      meta: GetAttributeParams & { hasNextPage: boolean };
    }>('http://127.0.0.1:3000/attributes', { params });

    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch attributes');
  }
};

export const fetchAttribute = async (id: Attribute['id']) => {
  try {
    const res = await axios.get<Attribute>(
      `http://127.0.0.1:3000/attributes/${id}`,
    );

    return res.data;
  } catch (error) {
    throw new Error('Failed to get the attribute');
  }
};

export const deleteAttribute = async (id: Attribute['id']) => {
  // added a bit delay so that the loading state is visible
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const res = await axios.delete<Attribute['id']>(
      `http://127.0.0.1:3000/attributes/${id}`,
    );

    return res.data;
  } catch (error) {
    throw new Error('Failed to delete the attribute');
  }
};
