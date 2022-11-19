import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutAdmin from './layout/layoutAdmin/layoutAdmin';
import HomeAdmin from './pages/admin/homeAdmin';
import Users from './pages/admin/users';
import Categories from './pages/admin/categories';
import Layout from './layout/layoutUser/layout'
import Dashboard from './pages/client/dashboard';
import About from './pages/client/about';
import Page404 from './pages/error/page404';
import Register from './api/auth/register';
import Posts from './pages/admin/posts';
const AppRoutes = () => {
  let {role} = useSelector((state) => state.userSlice);
  let isRegister = useSelector((state) => state.toggleSlice.register);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* outLet */}
          <Route index element={<Dashboard />} />
          
          {role === "user" && (
            <React.Fragment>
              <Route path="/profile" element={<About />} />
              <Route path="/profile1" element={"<Dashboard />"} />
              <Route path="/profile2" element={"<Users />"} />
            </React.Fragment>
          )}
        </Route>
        {role === "admin" && (
          <Route path="/admin" element={<LayoutAdmin />}>
            {/* OutLet */}
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/posts" element={<Posts />} />
          </Route>
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>
      {isRegister && <Register />}
    </Router>
  );
};

export default AppRoutes;
