import { useQuery } from '@tanstack/react-query';
import { fetchAllLabels } from '../api/labels';

import type { Label } from '@meiro/backend/src/labels/data';

const useLabels = () => {
  const query = useQuery({
    queryKey: ['labels'],
    queryFn: () => fetchAllLabels({ offset: 0, limit: 10 }),
    select: (data) =>
      data.reduce(
        (acc, { id, name }) => ({ ...acc, [id]: name }),
        {} as Record<Label['id'], Label['name']>,
      ),
  });

  return query;
};

export default useLabels;
