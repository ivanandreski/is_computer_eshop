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
import Posts from "./components/Forum/Posts";
import Post from "./components/Forum/Post";
import Shop from "./components/Shop/Shop";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PLACE PUBLIC ROUTE HERE */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="Shop" element={<Shop />} />
        <Route index element={<Home />} />
        <Route exact path="forum/post" element={<Posts />} />
        <Route path="forum/post/:hashId" element={<Post />} />
        <Route path="shop" element={<PageNotDeveloped />} />

        <Route element={<PersistLogin />}>
          {/* PLACE ROUTES WHICH REQUIRE LOGIN HERE */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  "Admin",
                  "Manager",
                  "User",
                  "Moderator",
                  "StoreClerk",
                ]}
              />
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="builder" element={<PageNotDeveloped />} />
            <Route path="cart" element={<PageNotDeveloped />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
