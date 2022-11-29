import React, { useEffect, Suspense } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { API_URL_CLIENT, doApiMethod } from "./services/service";
import { onLogin} from "./redux/features/userSlice";
import Loader from "./components/loaderImg/loaderImg";
import UserSearch from "./pages/client/userSearch/userSearch";


// Lazy loading of routes

const LayoutAdmin = React.lazy(() =>
  import("./layout/layoutAdmin/layoutAdmin")
);
const Users = React.lazy(() => import("./pages/admin/users"));
const MyProfile = React.lazy(() => import("./pages/client/myProfile/myProfile"));
const HomeAdmin = React.lazy(() => import("./pages/admin/homeAdmin"));
const Categories = React.lazy(() => import("./pages/admin/categories"));
const Layout = React.lazy(() => import("./layout/layoutUser/layout"));
const ProfileEdit = React.lazy(() => import("./components/profileEdit/profileEdit"));
const Dashboard = React.lazy(() => import("./pages/client/dashboard"));
const Register = React.lazy(() => import("./api/auth/register"));
const Posts = React.lazy(() => import("./pages/admin/posts"));
const Page404 = React.lazy(() => import("./pages/error/page404"));

const AppRoutes = () => {
  // const nav = useNavigate()
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    let token;
    if (localStorage["token"]) {
      token = localStorage["token"];
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now()) {
        getUserInfo(decoded._id, token);
      }
    }
  }, []);

  const getUserInfo = async (_id, token) => {
    let url = "/users/info/" + _id;
    const { data } = await doApiMethod(url, "GET", token);
    if (!data.userInfo) {
      alert("invalid user");
      window.open(API_URL_CLIENT, "_self");
      return;
    }
    dispatch(onLogin(data.userInfo));
  };

  return (
    <Suspense fallback=
    {<div className="w-100 h-screen flex items-center justify-center">
      <Loader load={true} height="400" width="400"/>
    </div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />}/>
            {/* outLet */}
            {/* Guest Routes */}
            <Route index element={<Dashboard />} />
            <Route path ="passwordReset/*" element={<Dashboard />} />
            {user?.role === "user" && user?.active && (
              <React.Fragment>
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/profileEdit" element={<ProfileEdit />} />
                <Route path="/posts" element={"posts..."} />
                <Route path="/profile2" element={"<Users />"} />
              

                <Route path="*" element={<Page404 />} />
              </React.Fragment>

            )}
          </Route>
          {user?.role === "admin" && user?.active && (
            <Route path="/admin" element={<LayoutAdmin />}>
              {/* OutLet */}
              <Route index element={<HomeAdmin />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/posts" element={<Posts />} />
              <Route path="/admin/profile" element={<MyProfile />} />
              <Route path="/admin/profileEdit" element={<ProfileEdit />} />
              <Route path="/admin/*" element={<Page404 />} />
            </Route>
          )}
        </Routes>
        
        <ToastContainer position="bottom-right" />
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
