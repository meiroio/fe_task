import { Helmet } from 'react-helmet-async';

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
      {children}
    </>
  );
};

export default Layout;
