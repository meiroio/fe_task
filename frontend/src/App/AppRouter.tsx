import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants';
import { PageLayout, PagePreloader } from '../components';

const Error = lazy(() => import('../modules/Error/Error'));
const Home = lazy(() => import('../modules/Home/Home'));
const Attributes = lazy(() => import('../modules/Attributes/Attributes'));

const AppRouter = () => {
  const router = createBrowserRouter(
    [
      {
        path: '*',
        element: <Error />,
      },
      {
        element: <PageLayout />,
        children: [
          {
            path: ROUTES.home.path,
            element: <Home />,
          },
          {
            path: ROUTES.attributes.path,
            element: <Attributes />,
            children: [
              {
                path: `${ROUTES.attributes.path}/:id`,
                element: <Attributes />,
              },
            ],
          },
        ],
      },
    ],
    { basename: '' }
  );

  return <RouterProvider router={router} fallbackElement={<PagePreloader />} />;
};

export default AppRouter;
