import { useState, ChangeEvent } from 'react';
import {
  Stack,
  OutlinedInput,
  Select,
  MenuItem,
  Paper,
  Toolbar,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { AttributeListSortBy, AttributeListSortDir } from '../../../types';
import {
  ATTRIBUTES_SEARCH_MIN_LENGTH,
  ATTRIBUTES_SORT_BY_OPTIONS,
  ATTRIBUTES_SORT_DIR_OPTIONS,
} from '../../../constants';
import { useAttributesContext } from '../contexts';

const AttributesListFilter = () => {
  const [searchStringTmp, setSearchStringTmp] = useState('');

  const { setSearchText, sortBy, setSortBy, sortDir, setSortDir, setOffset, offset } = useAttributesContext();

  const searchTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length > ATTRIBUTES_SEARCH_MIN_LENGTH) {
      setSearchText(value);
      setSearchStringTmp(value);
      setOffset(0);
    } else {
      setSearchText('');
      setSearchStringTmp(value);
      setOffset(offset);
    }
  };

  const sortByHandler = (event: SelectChangeEvent<AttributeListSortBy>) => {
    setSortBy(event.target.value as AttributeListSortBy);
    setOffset(0);
  };

  const sortDirectionHandler = (event: SelectChangeEvent<AttributeListSortDir>) => {
    setSortDir(event.target.value as AttributeListSortDir);
    setOffset(0);
  };

  const clearSearchHandler = () => {
    setSearchText('');
    setSearchStringTmp('');
    setOffset(0);
  };

  return (
    <Paper>
      <Toolbar>
        <Stack direction="row" gap={2}>
          <div>
            <OutlinedInput
              value={searchStringTmp}
              onChange={searchTextHandler}
              placeholder="Search in table"
              slotProps={{
                input: {
                  minLength: ATTRIBUTES_SEARCH_MIN_LENGTH,
                },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    sx={{ opacity: searchStringTmp.length > 1 ? 1 : 0 }}
                    onClick={clearSearchHandler}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div>
            <Select value={sortBy} onChange={sortByHandler}>
              {ATTRIBUTES_SORT_BY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Select value={sortDir} onChange={sortDirectionHandler}>
              {ATTRIBUTES_SORT_DIR_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Stack>
      </Toolbar>
    </Paper>
  );
};

export default AttributesListFilter;
