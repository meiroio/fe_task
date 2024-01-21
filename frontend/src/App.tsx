import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./ui/components/custom/Header/Header";
import AttributesWInfiniteScroll from "./pages/AttributesWInfiniteScroll";
import AttributeDetail from "./pages/AttributeDetail";
import AttributesWPagination from "./pages/AttributesWPagination";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attributes-infinite-scroll" element={<AttributesWInfiniteScroll />} />
        <Route path="/attributes-pagination" element={<AttributesWPagination />} />
        <Route index={false} path="/attributes/:id" element={<AttributeDetail />} />
      </Routes>
    </>
  );
}

export default App;
