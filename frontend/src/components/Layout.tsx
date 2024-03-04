import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { clearParams } from '../store';
import TopBar from './TopBar';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes('attributes')) {
      clearParams();
    }
  }, [pathname]);

  return (
    <>
      <Helmet
        titleTemplate="%s | Meiro"
        defaultTitle="Meiro"
        htmlAttributes={{ lang: 'en' }}
      >
        <meta name="description" content="Meiro frontend task" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>
      <TopBar />
      <div className="mx-auto max-w-6xl rounded-2xl px-3 sm:px-6">
        {children}
      </div>
    </>
  );
};

export default Layout;
