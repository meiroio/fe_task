import { Layout, Table } from '../components';
import { useAttributes } from '../hooks';

const Attributes = () => {
  const { data, isFetching } = useAttributes();

  return (
    <Layout>
      <h1>/attributes</h1>
      {/* just show first page for now */}
      <Table data={data?.pages[0].data} isFetching={isFetching} />
    </Layout>
  );
};

export default Attributes;
