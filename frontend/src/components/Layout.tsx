import { Helmet } from 'react-helmet-async';
import TopBar from './TopBar';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Helmet
        titleTemplate="%s | Meiro"
        defaultTitle="Meiro"
        htmlAttributes={{ lang: 'en' }}
      >
        <meta name="description" content="Meiro frontend task" />
      </Helmet>
      <TopBar />
      <div className="mx-auto max-w-6xl rounded-2xl px-3 sm:px-6">
        {children}
      </div>
    </>
  );
};

export default Layout;
