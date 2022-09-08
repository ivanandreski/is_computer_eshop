import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/Authentication/RequireAuth";
import PersistLogin from "./components/Authentication/PersistLogin";

import Layout from "./components/Layout/Layout";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Unauthorized from "./components/Error/Unauthorized";
import ErrorPage from "./components/Error/ErrorPage";
import Home from "./components/Home/HomePage";
import Profile from "./components/Profile/Profile";
import PageNotDeveloped from "./components/Error/PageNotDeveloped";
import Shop from "./components/Shop/Shop";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PLACE PUBLIC ROUTE HERE */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route index element={<Home />} />

        <Route element={<PersistLogin />}>
          {/* PLACE ROUTES WHICH REQUIRE LOGIN HERE */}
          <Route
            element={
              <RequireAuth allowedRoles={["Admin", "Manager", "User"]} />
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="Shop" element={<Shop/>} />
            <Route path="builder" element={<PageNotDeveloped />} />
            <Route path="forum" element={<PageNotDeveloped />} />
            <Route path="cart" element={<PageNotDeveloped />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
