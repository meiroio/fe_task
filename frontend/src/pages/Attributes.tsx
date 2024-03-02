import { useQuery } from '@tanstack/react-query';
import { Layout } from '../components';

type Test = {
  id: number;
  name: string;
};

const fetchAttributes = async (): Promise<Test> => {
  const res = await fetch('http://127.0.0.1:3000/attributes');

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();

  return data;
};

const Attributes = () => {
  const { data: attributes } = useQuery({
    queryKey: ['attributes'],
    queryFn: fetchAttributes,
  });

  return (
    <Layout>
      <h1>/attributes</h1>
      {attributes && <pre>{JSON.stringify(attributes, null, 2)}</pre>}
    </Layout>
  );
};

export default Attributes;
