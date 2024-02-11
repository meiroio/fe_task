import { Route, Routes, useLocation } from "react-router";
import Attributes3 from "../pages/attributes3";
import ErrorPage from "../pages/Error";
import Home from "../pages/home";
import { ReactElement, useEffect } from "react";
import { useRecoilState } from "recoil";
import Attributes2 from "../pages/attributes2";
import Attributes1 from "../pages/attributes1";
import Attribute1 from "../pages/attributes1/[attributeId1]";
import Attribute2 from "../pages/attributes2/[attributeId2]";
import Attribute3 from "../pages/attributes3/[attributeId3]";
import { filtersAtom, initialState } from "../pages/attributes3/atoms";

const WithLayout = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const [, setFilters] = useRecoilState(filtersAtom);

  useEffect(() => {
    if (!location.pathname.split("/").includes("attributes3")) {
      setFilters(initialState);
    }
  }, [location.pathname, setFilters]);

  return <>{children}</>;
};

const Router = () => {
  return (
    <Routes>
      <Route
        path="/attributes2"
        element={
          <WithLayout>
            <Attributes2 />
          </WithLayout>
        }
      />
      <Route
        path="/attributes1"
        element={
          <WithLayout>
            <Attributes1 />
          </WithLayout>
        }
      />
      <Route
        path="/attributes3"
        element={
          <WithLayout>
            <Attributes3 />
          </WithLayout>
        }
      />
      <Route path="/attributes1/:id" element={<Attribute1 />} />
      <Route path="/attributes2/:id" element={<Attribute2 />} />
      <Route path="/attributes3/:id" element={<Attribute3 />} />

      <Route path="/Error" element={<ErrorPage />} />
      <Route
        path="/"
        element={
          <WithLayout>
            <Home />
          </WithLayout>
        }
      />
    </Routes>
  );
};

export default Router;
