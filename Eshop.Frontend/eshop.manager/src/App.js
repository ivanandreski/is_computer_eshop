import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/Authentication/RequireAuth";
import PersistLogin from "./components/Authentication/PersistLogin";

import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import Home from "./components/Home/Home";
import Categories from "./components/Category/Categories";
import Stores from "./components/Store/Stores";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./components/Error/ErrorPage";
import StoreDetails from "./components/Store/StoreDetails";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Unauthorized from "./components/Error/Unauthorized";
import Admin from "./components/Admin/Admin";
import Orders from "./components/Orders/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["Admin", "Manager"]} />}>
            <Route index element={<Home />} />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={["Admin", "Manager", "StoreClerk", "Driver"]}
              />
            }
          >
            <Route path="category" element={<Categories />} />

            <Route exact path="product/:hashId" element={<ProductDetails />} />
            <Route path="product" element={<Products />} />

            <Route exact path="store/:hashId" element={<StoreDetails />} />
            <Route path="store" element={<Stores />} />

            <Route path="orders" element={<Orders />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
