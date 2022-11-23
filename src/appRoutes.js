import React , {useState , useEffect} from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
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
import {doApiMethod } from './services/service';
import { onLogin } from "./redux/features/userSlice";
import { onRegisterToggle } from "./redux/features/toggleSlice";

const AppRoutes = () => {
  const dispatch = useDispatch() 
  let {user} = useSelector((state) => state.userSlice);
  let isRegister = useSelector((state) => state.toggleSlice.register);


  useEffect(()=>{
    let token;
    if(localStorage['token']){
      token = localStorage['token'];
    }
    const decoded = jwt_decode(token)
    console.log(decoded)
    console.log(token)
    if(decoded.exp < Date.now()){
      getUserInfo(decoded._id, token)
    }
  },[])

  
  const getUserInfo = async (_id, token) => {
    let url = "/users/info/"+_id;
    const {data} = await doApiMethod(url, 'GET', token);
    dispatch(onLogin(data.userInfo))
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* outLet */}
          {/* Guest Routes */}
          <Route index element={<Dashboard />} />
          {user.role === "user" && (
            <React.Fragment>
              <Route path="/profile" element={<About />} />
              <Route path="/profile1" element={"<Dashboard />"} />
              <Route path="/profile2" element={"<Users />"} />
            </React.Fragment>
          )}
        </Route>
        {user.role === "admin" && (
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
