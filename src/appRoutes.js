import React, { useEffect, Suspense } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import {
  API_URL_CLIENT,
  doApiMethod,
  errorHandler,
} from "./services/axios-service/axios-service";
import {
  getUserInbox,
  getUserWishList,
  onLogin,
} from "./redux/features/userSlice";
import Loader from "./shared/components/loader/loader";
import WishList from "./pages/client/wishList";
import ConfirmHandler from "./shared/UI/confirm/confirm";
import Chat from "./pages/client/chat/chat";
import MyProfile from "./pages/client/myProfile";
import PopUpSideBarChat from './shared/components/sideBarChat/popUpSideBarChat';
import { onLikesToggle } from "./redux/features/toggleSlice";

// Lazy loading of routes
const LayoutAdmin = React.lazy(() =>
  import("./layout/layoutAdmin/layoutAdmin")
);
const Users = React.lazy(() => import("./pages/admin/users"));
const UserProfile = React.lazy(() => import("./pages/client/userProfile"));
const HomeAdmin = React.lazy(() => import("./pages/admin/homeAdmin"));
const Categories = React.lazy(() => import("./pages/admin/categories"));
const Layout = React.lazy(() => import("./layout/layoutUser/layout"));
const ProfileEdit = React.lazy(() =>
  import("./pages/client/profile-edit/profileEdit")
);
const Dashboard = React.lazy(() => import("./pages/client/dashboard"));
const Register = React.lazy(() => import("./api/auth/register"));
const Posts = React.lazy(() => import("./pages/admin/posts"));
const Page404 = React.lazy(() => import("./pages/page-not-found"));
const ResetPass = React.lazy(() => import("./api/auth/resetPass"));
const PopUpLikes = React.lazy(() => import("./pages/client/posts-likes/popUpLikes"));
const UserSearch = React.lazy(() =>
  import("./pages/client/userSearch/userSearch")
);
const SinglePost = React.lazy(() => import("./pages/client/singlePost"));
const AppRoutes = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userSlice);
  let { search, register ,showInbox} = useSelector((state) => state.toggleSlice);
  let { likes } = useSelector((state) => state.toggleSlice);
  let { postShow } = useSelector((state) => state.toggleSlice);
  useEffect(() => {
    let token;
    if (localStorage["token"]) {
      token = localStorage["token"];
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now()) {
        getUserInfo(decoded._id, token);
      } else errorHandler("Your authorization is expired please login again");
    }
    const getInbox = user
      ? setInterval(() => dispatch(getUserInbox()), 3000)
      : null;
    return () => {
      clearInterval(getInbox);
    };
  }, []);

  const getUserInfo = async (_id, token) => {
    let url = "/users/infoToken/" + _id;
    const { data } = await doApiMethod(url, "GET", token);
    if (!data.userInfo) {
      errorHandler("invalid user");
      window.open(API_URL_CLIENT, "_self");
      return;
    }
    localStorage.setItem("token", JSON.stringify(data.newAccessToken));
    dispatch(onLogin(data.userInfo));
    dispatch(getUserWishList());
  };
  return (
    <Suspense
      fallback={
        <div className="w-100 h-screen flex items-center justify-center">
          <Loader load={true} height="400" width="400" />
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/resetPassword/:id/:resetString"
              element={<ResetPass />}
            />
            <Route
              path="/confirm"
              element={
                <ConfirmHandler
                  action={"action"}
                  messege={"messege"}
                  showAction={"showAction"}
                />
              }
            />
            {/* outLet */}
            {/* Guest Routes */}
            <Route index element={<Dashboard />} />
            <Route path="/profile/:userId" element={<UserProfile />} />

            {user?.role === "user" && user?.active && (
              <React.Fragment>
                <Route path="/chat/:roomID/:creatorID" element={<Chat />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/profileEdit" element={<ProfileEdit />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="*" element={<Page404 />} />
              </React.Fragment>
            )}
          </Route>
          {user?.role === "admin" && user?.active && (
            <Route path="/admin" element={<LayoutAdmin />}>
              {/* OutLet */}
              <Route index element={<Dashboard />} />
              <Route path="/admin/chat/:roomID/:creatorID" element={<Chat />} />
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
        {postShow?.active ? <SinglePost post={postShow?.post}/>:null}
        {search ? <UserSearch /> : null}
        {register ? <Register /> : null}
        {likes?.active ? <PopUpLikes likesArr={likes?.likesArr} action={onLikesToggle}/> : null}
        {showInbox && user? <PopUpSideBarChat/>: null}
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
