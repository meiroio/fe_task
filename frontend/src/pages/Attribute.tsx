import { Layout } from '../components';
import { useAttribute } from '../hooks';

const Attribute = () => {
  const { data } = useAttribute();

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
};

export default Attribute;
