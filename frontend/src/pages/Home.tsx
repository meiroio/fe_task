import { Link } from 'react-router-dom';
import { Layout } from '../components';

const Home = () => {
  return (
    <Layout>
      <div className="flex w-full flex-col items-center justify-center gap-4 pt-8">
        <h1 className="text-3xl font-bold">Meiro FE Task</h1>
        <span>by</span>
        <Link
          to="https://github.com/Pirastrino"
          target="_blank"
          className="font-medium text-orange-600 hover:underline"
        >
          @Pirastrino
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
