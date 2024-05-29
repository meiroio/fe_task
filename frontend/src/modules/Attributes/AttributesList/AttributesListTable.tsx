import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { AttributeInfinityListResponse, AttributeResponseStatus } from '../../../types';
import { ATTRIBUTES_SEARCH_MIN_LENGTH, ROUTES } from '../../../constants';
import { attributesResponseStatusKeys } from '../../../enums';
import { useAttributesContext } from '../contexts';
import { LabelsList } from '../components';

interface AttributesListTableProps {
  onRowDelete: (id: string) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  status: AttributeResponseStatus;
  isLoading: boolean;
  data: AttributeInfinityListResponse;
}

const AttributesListTable = ({
  onRowDelete,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status,
  isLoading,
  data,
}: AttributesListTableProps) => {
  const { searchText } = useAttributesContext();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage?.();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <Box sx={{ height: '100%', overflowY: 'scroll' }}>
      <TableContainer component={Paper}>
        <Table aria-label="attributes table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Labels</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>Loading</TableCell>
              </TableRow>
            )}
            {status === attributesResponseStatusKeys.error && (
              <TableRow>
                <TableCell colSpan={4}>Error while loading data</TableCell>
              </TableRow>
            )}
            {data?.pages
              .flatMap((page) => page.data)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`${ROUTES.attributes.path}/${row.id}`}
                      sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <LabelsList
                      labelIds={row.labelIds}
                      stackProps={{ direction: 'row', gap: 1 }}
                      chipProps={{ size: 'small', variant: 'outlined' }}
                    />
                  </TableCell>
                  <TableCell>{`${dayjs(row.createdAt).format('YYYY-MM-DD')}`}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" gap={1} justifyContent="end">
                      <Button size="small" variant="outlined" color="error" onClick={() => onRowDelete(row.id)}>
                        Delete
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to={`${ROUTES.attributes.path}/${row.id}`}
                      >
                        Detail
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            {searchText.length > ATTRIBUTES_SEARCH_MIN_LENGTH && !isLoading && data?.pages[0].data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>For "{searchText}" nothing was found</TableCell>
              </TableRow>
            )}
            {isFetchingNextPage && (
              <TableRow>
                <TableCell colSpan={4}>Loading more ...</TableCell>
              </TableRow>
            )}
            <TableRow ref={lastElementRef} style={{ height: 20, display: hasNextPage ? 'table-row' : 'none' }}>
              <TableCell colSpan={4}>...</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttributesListTable;
