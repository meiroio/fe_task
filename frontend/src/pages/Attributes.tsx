import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { Layout, Table } from '../components';
import { useAttributes } from '../hooks';

const Attributes = () => {
  const { query, searchText, setSortBy, setSearchText } = useAttributes();
  const observerBottom = useIntersectionObserver({});

  const { data, isFetching, hasNextPage, fetchNextPage } = query;

  useEffect(() => {
    if (observerBottom.isIntersecting && hasNextPage) {
      !isFetching && fetchNextPage();
    }
  }, [observerBottom, hasNextPage, isFetching, fetchNextPage]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Layout>
      <label htmlFor="attribute">Search: </label>
      <input
        name="attribute"
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleSearchText}
      />
      <div className="h-80 overflow-y-scroll">
        <Table
          fwdRef={observerBottom.ref}
          data={data}
          action={{ onClick: () => {}, label: 'Delete' }}
          isFetching={isFetching}
          setSortBy={setSortBy}
        />
      </div>
    </Layout>
  );
};

export default Attributes;
