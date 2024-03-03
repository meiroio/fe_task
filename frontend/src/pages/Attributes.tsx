import { Layout, Table } from '../components';
import { useAttributes } from '../hooks';

const Attributes = () => {
  const { query, searchText, setSortBy, setSearchText } = useAttributes();
  const { data, isFetching } = query;

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
      {/* just show first page for now */}
      <Table
        data={data?.pages[0].data}
        action={{ onClick: () => {}, label: 'Delete' }}
        isFetching={isFetching}
        setSortBy={setSortBy}
      />
    </Layout>
  );
};

export default Attributes;
