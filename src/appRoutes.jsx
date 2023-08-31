import jwt_decode from "jwt-decode";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./views/client/chat/chat";
import MyProfile from "./views/client/myProfile";
import WishList from "./views/client/wishList";
import { onLikesToggle } from "./redux/features/toggleSlice";
import {
  getUserInbox,
  getUserWishList,
  onLogin,
} from "./redux/features/userSlice";
import { doApiMethod } from "./api/services/axios-service/axios-service";
import { errorHandler } from "./util/functions";
import { secret } from "./util/secrets";
import ConfirmHandler from "./shared/UI/confirm/confirm";
import Loader from "./shared/components/loader/loader";
import PopUpSideBarChat from "./shared/components/sideBarChat/popUpSideBarChat";

// Lazy loading of routes
const LayoutAdmin = React.lazy(() =>
  import("./layout/layoutAdmin/layoutAdmin")
);
const Users = React.lazy(() => import("./views/admin/users"));
const UserProfile = React.lazy(() => import("./views/client/userProfile"));
const HomeAdmin = React.lazy(() => import("./views/admin/homeAdmin"));
const Categories = React.lazy(() => import("./views/admin/categories"));
const Layout = React.lazy(() => import("./layout/layoutUser/layout"));
const PostEdit = React.lazy(() => import("./views/client/postEdit/postEdit"));
const ProfileEdit = React.lazy(() =>
  import("./views/client/profile-edit/profileEdit")
);
const Dashboard = React.lazy(() => import("./views/client/dashboard"));
const Register = React.lazy(() => import("./views/auth/register"));
const Posts = React.lazy(() => import("./views/admin/posts"));
const Page404 = React.lazy(() => import("./views/page-not-found"));
const ResetPass = React.lazy(() => import("./views/auth/resetPass"));
const PopUpLikes = React.lazy(() =>
  import("./views/client/postsLikes/popUpLikes/popUpLikes")
);
const UserSearch = React.lazy(() =>
  import("./views/client/userSearch/userSearch")
);
const SinglePost = React.lazy(() => import("./views/client/singlePost"));
// Lazy loading of routes - close

const AppRoutes = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userSlice);
  let { search, register, showInbox } = useSelector(
    (state) => state.toggleSlice
  );
  let { likes } = useSelector((state) => state.toggleSlice);
  let { postShow } = useSelector((state) => state.toggleSlice);

  useEffect(() => {
    checkTokenFromLocalStorage();
    const getInbox = user
      ? setInterval(() => dispatch(getUserInbox()), 3000)
      : null;

    // clear interval
    return () => {
      clearInterval(getInbox);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkTokenFromLocalStorage = () => {
    let token;
    // check in local storage for token
    if (localStorage["token"]) {
      token = localStorage["token"];
      // decoded token
      const decoded = jwt_decode(token);
      // check if token expired
      if (decoded.exp < Date.now()) {
        getUserInfo(decoded._id, token);
      } else errorHandler("Your authorization is expired please login again");
    }
  };

  const getUserInfo = async (_id, token) => {
    let url = `/users/infoToken/${_id}`;
    const { data } = await doApiMethod(url, "GET", token);
    // if token expired return to login page
    if (!data.userInfo) {
      errorHandler("Invalid User");
      window.open(secret.CLIENT_API_URL, "_self");
      return;
    }
    // set token with new token
    localStorage.setItem("token", JSON.stringify(data.newAccessToken));
    // login with user info
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
                <Route path="/editPost" element={<PostEdit />} />
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
              <Route path="/admin/editPost" element={<PostEdit />} />
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
        {postShow?.active ? <SinglePost post={postShow?.post} /> : null}
        {search ? <UserSearch /> : null}
        {register ? <Register /> : null}
        {likes?.active ? (
          <PopUpLikes likesArr={likes?.likesArr} action={onLikesToggle} />
        ) : null}
        {showInbox && user ? <PopUpSideBarChat /> : null}
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
