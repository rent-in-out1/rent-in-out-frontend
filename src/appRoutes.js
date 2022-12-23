import React, { useEffect, Suspense , useState } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { API_URL_CLIENT, doApiMethod, errorHandler } from "./services/service";
import { getUserWishList, onLogin } from "./redux/features/userSlice";
import { onMessegeToggle } from "./redux/features/toggleSlice";
import Loader from "./components/loader/loader";
import UserSearch from "./pages/client/userSearch/userSearch";
import Likes from "./pages/client/likes";
import WishList from "./pages/client/wishList";
import ConfirmHandler from './components/UI/confirm/confirm';
import Chat from "./components/chat/chat";

// Lazy loading of routes
const LayoutAdmin = React.lazy(() => import("./layout/layoutAdmin/layoutAdmin"));
const Users = React.lazy(() => import("./pages/admin/users"));
const MyProfile = React.lazy(() => import("./pages/client/myProfile"));
const UserProfile = React.lazy(() => import("./pages/client/userProfile"));
const HomeAdmin = React.lazy(() => import("./pages/admin/homeAdmin"));
const Categories = React.lazy(() => import("./pages/admin/categories"));
const Layout = React.lazy(() => import("./layout/layoutUser/layout"));
const ProfileEdit = React.lazy(() => import("./components/profile/profileEdit"));
const Dashboard = React.lazy(() => import("./pages/client/dashboard"));
const Register = React.lazy(() => import("./api/auth/register"));
const Posts = React.lazy(() => import("./pages/admin/posts"));
const Page404 = React.lazy(() => import("./pages/error/page404"));
const ResetPass = React.lazy(() => import("./api/auth/loginPage/resetPass"))
const AppRoutes = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userSlice);
  let {search , register } = useSelector((state) => state.toggleSlice)
  let {likes } = useSelector((state) => state.toggleSlice)
  useEffect(() => {
    let token;
    if (localStorage["token"]) {
      token = localStorage["token"];
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now()) {
        getUserInfo(decoded._id, token);
      }
      else errorHandler("Your authorization is expired please login again")
    }
  }, []);

  const getUserInfo = async (_id, token) => {
    let url = "/users/infoToken/" + _id;
    const { data } = await doApiMethod(url, "GET", token);
    if (!data.userInfo) {
      errorHandler("invalid user");
      window.open(API_URL_CLIENT, "_self");
      return;
    }
    localStorage.setItem("token" , JSON.stringify(data.newAccessToken))
    dispatch(onLogin(data.userInfo));
    dispatch(getUserWishList())
  };
  return (
    <Suspense
      fallback={
        <div className="w-100 h-screen flex items-center justify-center">
          <Loader load={true} height="400" width="400" />
        </div>}>
      <Router>
        <Routes>
            
          <Route path="/" element={<Layout />}>
            <Route path="/resetPassword/:id/:resetString" element={<ResetPass />} />
            <Route path="/confirm" element={<ConfirmHandler action={"action"} messege={"messege"} showAction={"showAction"} />} />
            {/* outLet */}
            {/* Guest Routes */}
            <Route index element={<Dashboard />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            {user?.role === "user" && user?.active && (
              <React.Fragment>
                <Route path="*" element={<Page404 />} />
                <Route path="/chat/:roomID/:creatorID" element={<Chat/>}/>
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/profileEdit" element={<ProfileEdit />} />
                <Route path="/wishlist" element={<WishList />} />
              </React.Fragment>
            )}
          </Route>
          {user?.role === "admin" && user?.active && (
            <Route path="/admin" element={<LayoutAdmin />}>
              {/* OutLet */}
              <Route index element={<Dashboard />} />
              <Route path="/admin/chat/:roomID/:creatorID" element={<Chat/>}/>
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/home" element={<HomeAdmin />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/posts" element={<Posts />} />
              <Route path="/admin/profile/:userId" element={<UserProfile />} />
              <Route path="/admin/profile" element={<MyProfile />} />
              <Route path="/admin/wishlist" element={<WishList />} />
              <Route path="/admin/profileEdit" element={<ProfileEdit />} />
              <Route path="/admin/*" element={<Page404 />} />
            </Route>
          )}
        </Routes>
        <ToastContainer position="bottom-right" />
        {search? <UserSearch/> : null}
        {register? <Register/> : null}
        {likes.active ? <Likes likesArr={likes.likesArr}/>: null}
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
