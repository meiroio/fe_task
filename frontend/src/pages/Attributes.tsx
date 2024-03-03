import { Layout, Table } from '../components';
import { useAttributes } from '../hooks';

const Attributes = () => {
  const { query, setSortBy } = useAttributes();
  const { data, isFetching } = query;

  return (
    <Layout>
      {/* just show first page for now */}
      <Table
        data={data?.pages[0].data}
        isFetching={isFetching}
        setSortBy={setSortBy}
      />
    </Layout>
  );
};

export default Attributes;
