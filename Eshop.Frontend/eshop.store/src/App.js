import { Routes, Route } from "react-router-dom";

import RequireAuth from "./Components/Authentication/RequireAuth";
import PersistLogin from "./Components/Authentication/PersistLogin";

import Layout from "./Components/Layout/Layout";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import Unauthorized from "./Components/Error/Unauthorized";
import ErrorPage from "./Components/Error/ErrorPage";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import PageNotDeveloped from "./Components/Error/PageNotDeveloped";
import Posts from "./Components/Forum/Posts";
import Post from "./Components/Forum/Post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PLACE PUBLIC ROUTE HERE */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
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
