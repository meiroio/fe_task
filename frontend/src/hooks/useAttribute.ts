import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAttribute } from '../api';

const useAttribute = () => {
  const params = useParams();
  const id = params.id || '';

  const query = useQuery({
    queryKey: ['attribute', id],
    queryFn: () => fetchAttribute(id),
    enabled: id !== '',
    retry: false, // TODO: later enable this for error codes other 404 and max. 3 retries
  });

  return query;
};

export default useAttribute;
