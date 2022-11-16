import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import LayoutAdmin from "./layoutAdmin/layoutAdmin";
import HomeAdmin from "./components/admin/homeAdmin";
import Users from "./components/admin/users";
import Categories from "./components/admin/categories";
import Posts from "./components/admin/posts";
import About from "./components/client/about";
import Dashboard from "./components/client/dashboard";
import { useSelector } from "react-redux";
import Register from "./components/auth/register/register";
import Model from "./components/UI/Model";
const AppRoutes = () => {
  let userState = useSelector((state) => state.userSlice);
  return (
    <Router>
      {!userState.alert&& <Model/>}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* outLet */}
          <Route index element={<Dashboard />} />
          
          {userState.role === "user" && (
            <React.Fragment>
              <Route path="/profile" element={<About />} />
              <Route path="/profile1" element={"<Dashboard />"} />
              <Route path="/profile2" element={"<Users />"} />
            </React.Fragment>
          )}
        </Route>
        {userState.role === "admin" && (
          <Route path="/admin" element={<LayoutAdmin />}>
            {/* OutLet */}
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/posts" element={<Posts />} />
          </Route>
        )}

        <Route path="*" element={<div className="bg-red-500">Not found</div>} />
      </Routes>
      {!userState.isLoggedIn && <Register />}
    </Router>
  );
};

export default AppRoutes;
