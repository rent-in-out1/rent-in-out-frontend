import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { onLogout, onRegisterShow, onSearchToggle } from "../../redux/features/toggleSlice";
import { API_URL_CLIENT } from "../../services/service";
import { useNavigate } from "react-router-dom";
//style
import { Wrapper } from "../style/wrappers/sideBar";
// icons import
import Dashboard from "../icons/dashboard";
import Profile from "../icons/profile";
import Inbox from "../icons/inbox";
import Notifications from "../icons/notifications";
import SignOut from "../icons/signOut";
import Search from "../icons/search";
import Home from './../icons/home';
import WishList from "../icons/wishlist";

const SideBar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isLogin = useSelector((state) => state.userSlice?.user !== null);
  const user = useSelector((state) => state.userSlice?.user);
  return (
    <Wrapper
      className="w-2/12 z-10 top-16 left-0 fixed hidden lg:flex"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 w-full bg-white rounded">
        <ul className="space-y-2">
          <li>
            <Link to={user?.role === "admin" ? "/admin" : "/"}>
              <Dashboard />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          {user?.role === "admin" ? (
            <li>
              <Link to="/admin/home">
                <Home color={"#6B7280"} />
                <span className="ml-3">Home Admin</span>
              </Link>
            </li>
          ) : null}
          <li onClick={()=> dispatch(onSearchToggle())}>
            <Link>
              <Search color={"#6B7280"} />
              <span className="ml-3">Search</span>
            </Link>
          </li>
          {isLogin && (
            <React.Fragment>
              <li>
                <Link
                  to={user?.role === "admin" ? "/admin/profile" : "/profile"}
                >
                  <Profile />
                  <span className="flex-1 ml-3">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to={user?.role === "admin" ? "/admin/wishlist" : "/wishlist"}
                >
                  <WishList color={"#6B7280"}/>
                  <span className="flex-1 ml-3">Wish List</span>
                </Link>
              </li>
              <li>
                <Link to={user?.role === "admin" ? "/admin" : "/"}>
                  <Inbox />
                  <span className="flex-1 ml-3">Inbox</span>
                  <aside>1</aside>
                </Link>
              </li>
              <li>
                <Link to={user?.role === "admin" ? "/admin" : "/"}>
                  <Notifications />
                  <span className="flex-1 ml-3">Notifications</span>
                  <aside>2</aside>
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
          <li
            className={`w-full p-2 rounded cursor-pointer`}
            onClick={() => {
              if (isLogin) {
                localStorage.removeItem("token");
                window.open(API_URL_CLIENT, "_self");
                dispatch(onLogout());
              } else {
                dispatch(onRegisterShow())
              }
            }}
          >
            <span className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
              <SignOut />
              <span className="flex-1 ml-3">
                {isLogin ? "Sign Out" : "Sign In"}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default SideBar;
