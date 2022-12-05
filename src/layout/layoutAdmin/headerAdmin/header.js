import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  onRegisterToggle,
  onSearchToggle,
} from "../../../redux/features/toggleSlice";
import { Logo, Wrapper } from "../../../components/style/wrappers/navbarAdmin";
import { useSelector, useDispatch } from "react-redux";
import { onLogout } from "../../../redux/features/userSlice";
import Profile from "../../../components/icons/profile";
import Users from "../../../components/icons/users";
import Posts from "../../../components/icons/posts";
import Categories from "../../../components/icons/categories";
import Home from "../../../components/icons/home";
import SignIn from "../../../components/icons/signIn";
import SignOut from "../../../components/icons/signOut";
import Bell from "../../../components/icons/bell";
import Search from "./../../../components/icons/search";
const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userSlice?.user !== null);
  const user = useSelector((state) => state.userSlice.user);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <section>
        <div className="left flex flex-wrap">
          <Link to={"/admin"}>
            <Logo>
              <img src="../img/LOGO.png" alt="logo" />
              <p>rentInOut</p>
            </Logo>
          </Link>
        </div>
        <div className="right">
          <nav>
            <ul>
              <li>
                <button
                  type="button"
                  className="inline-flex relative items-center p-3 text-sm  text-center"
                >
                  <Bell />
                  <span className="sr-only">Notifications</span>
                  <div className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    2
                  </div>
                </button>
              </li>
            </ul>
          </nav>
          <div
            className="relative avatar"
            onMouseOver={() => setIsOpen(true)}
            onClick={() => setIsOpen(true)}
          >
            <img
              className="rounded-full"
              src={
                isLogin
                  ? user.profile_img.url
                  : "https://freesvg.org/img/Male-Avatar.png"
              }
              alt=""
            />
            <span
              className={`${
                isLogin ? "bg-green-400" : "bg-red-400"
              } bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full`}
            ></span>
          </div>
        </div>
      </section>
      {isOpen && (
        <ul
          onMouseLeave={() => setIsOpen(false)}
          className="absolute shadow dropdown z-50 bg-white w-full rounded right-0 -top-15 md:w-1/4 md:-bottom-30"
        >
          <li
            onClick={() => {
              setIsOpen(false);
              nav("/admin");
            }}
            className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
          >
            <div className="flex justify-between items-center">
              {" "}
              <p>Home</p> <Home />
            </div>
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              nav("/admin/users");
            }}
            className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
          >
            <div className="flex justify-between items-center">
              {" "}
              <p>Users</p> <Profile color="black" />
            </div>
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              nav("/admin/posts");
            }}
            className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
          >
            <div className="flex justify-between items-center">
              {" "}
              <p>Posts</p> <Posts color="black" />
            </div>
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              nav("/admin/categories");
            }}
            className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
          >
            <div className="flex justify-between items-center">
              {" "}
              <p>Categories</p> <Categories />
            </div>
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              nav("/admin/profile");
            }}
            className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
          >
            <div className="flex justify-between items-center">
              <p>Profile</p> <Users />
            </div>
          </li>
          <li
            onClick={() => dispatch(onSearchToggle())}
            className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
          >
            <Link className="flex justify-between items-center">
              <span>Search</span>
              <Search />
            </Link>
          </li>
          <li
            onClick={() => {
              if (isLogin) {
                localStorage.removeItem("token");
                nav("/");
                dispatch(onLogout());
              } else {
                dispatch(onRegisterToggle());
                setIsOpen(false);
              }
            }}
            className={`w-full p-2 rounded`}
          >
            {isLogin ? (
              <div className="flex justify-between items-center cursor-pointer">
                {" "}
                <p>Signout</p> <SignOut color="black" />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p>Signin</p> <SignIn color="black" />
              </div>
            )}
          </li>
        </ul>
      )}
    </Wrapper>
  );
};
export default Header;
