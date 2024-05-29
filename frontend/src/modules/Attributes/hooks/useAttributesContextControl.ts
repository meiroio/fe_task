import { useState } from 'react';
import { AttributeListSortBy, AttributeListSortDir, LabelList } from '../../../types';
import { attributesListSortByKeys, attributesListSortDirKeys } from '../../../enums';
import { ATTRIBUTES_FILTER_LIMIT_DEFAULT } from '../../../constants';

export const useAttributesContextControl = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(ATTRIBUTES_FILTER_LIMIT_DEFAULT);
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<AttributeListSortBy>(attributesListSortByKeys.name);
  const [sortDir, setSortDir] = useState<AttributeListSortDir>(attributesListSortDirKeys.asc);
  const [labels, setLabels] = useState<LabelList>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return {
    offset,
    setOffset,
    limit,
    setLimit,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    labels,
    setLabels,
    confirmOpen,
    setConfirmOpen,
    confirmId,
    setConfirmId,
  };
};
