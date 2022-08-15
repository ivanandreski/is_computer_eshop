import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import Home from "./components/Home/Home";
import Categories from "./components/Category/Categories";
import Stores from "./components/Store/Stores";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./components/Error/ErrorPage";
import StoreDetails from "./components/Store/StoreDetails";
import Login from "./components/Authentication/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />

          <Route path="category" element={<Categories />} />

          <Route exact path="product/:hashId" element={<ProductDetails />} />
          <Route path="product" element={<Products />} />

          <Route exact path="store/:hashId" element={<StoreDetails />} />
          <Route path="store" element={<Stores />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
