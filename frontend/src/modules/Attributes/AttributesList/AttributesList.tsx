import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { AttributeInfinityListResponse } from '../../../types';
import { useInfinityAttributes } from '../../../hooks';
import { useAttributesContext } from '../contexts';
import AttributesListFilter from './AttributesListFilter';
import AttributesListTable from './AttributesListTable';

interface AttributesListProps {
  onDelete: (id: string) => void;
}

const AttributesList = ({ onDelete }: AttributesListProps) => {
  const { offset, limit, searchText, sortBy, sortDir, setOffset } = useAttributesContext();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading } = useInfinityAttributes({
    offset,
    limit,
    sortBy,
    sortDir,
    searchText,
  });

  const deleteHandler = (id: string) => onDelete(id);

  useEffect(() => {
    if (data?.pageParams[1]) setOffset(data?.pageParams[1] as number);
  }, [data]);

  return (
    <Stack direction="column" gap={2}>
      <AttributesListFilter />
      <AttributesListTable
        onRowDelete={deleteHandler}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        status={status}
        isLoading={isLoading}
        data={data as AttributeInfinityListResponse}
      />
    </Stack>
  );
};

export default AttributesList;
