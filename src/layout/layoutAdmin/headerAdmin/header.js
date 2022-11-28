import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onRegisterToggle } from '../../../redux/features/toggleSlice';
import {
  FaUsers,
  FaUser,
  FaListAlt,
  FaUpload,
  FaBell,
  FaHome,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { Logo, Wrapper } from "../../../components/style/wrappers/navbarAdmin";
import { useSelector, useDispatch } from "react-redux";
import { onLogout } from "../../../redux/features/userSlice";
const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.userSlice?.user !== null)
  const user = useSelector(state => state.userSlice.user)
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
                  <FaBell />
                  <span className="sr-only">Notifications</span>
                  <div className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    2
                  </div>
                </button>
              </li>
            </ul>
          </nav>
          <div className="relative avatar" onClick={() => setIsOpen(!isOpen)}>
            <img
              className="rounded-full"
              src={
                isLogin
                  ? user.profile_img
                  : "https://freesvg.org/img/Male-Avatar.png"
              }
              alt=""
            />
            <span
              className={`${isLogin ? "bg-green-400" : "bg-red-400"
                } bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full`}
            ></span>
          </div>
        </div>
      </section>
      {
        isOpen &&
        <ul className='absolute shadow dropdown z-50 bg-white w-full rounded right-0 -top-15 md:w-1/4 md:-bottom-30'>
          <li onClick={() => {
            setIsOpen(false)
            nav("/admin")
          }} className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}>
            <div className='flex justify-between items-center'> <p>Home</p> <FaHome /></div>
            </li>
          <li onClick={()=>{
                setIsOpen(false)
                nav("/admin/users")
                }} className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}>
            <div className='flex justify-between items-center'> <p>Users</p> <FaUsers /></div>
            </li>
          <li onClick={()=>{
                setIsOpen(false)
                nav("/admin/posts")
                }} className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}>
                  <div className='flex justify-between items-center'> <p>Posts</p> <FaUpload /></div>
            </li>
          <li onClick={()=>{
                setIsOpen(false)
                nav("/admin/categories")
                }} className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}>
                  <div className='flex justify-between items-center'> <p>Categories</p> <FaListAlt /></div>
            </li>
          <li onClick={()=>{
                setIsOpen(false)
                nav("/admin/profile")
                }} className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}>
                  <div className='flex justify-between items-center'> <p>Profile</p> <FaUser /></div>
            </li>
          <li onClick={() => {
            if (isLogin) {
              localStorage.removeItem('token')
              nav("/")
              dispatch(onLogout())
            }
            else {
              dispatch(onRegisterToggle())
              setIsOpen(false)
            }
          }} className={`w-full p-2 rounded`}>
            {isLogin ? <div className='flex justify-between items-center cursor-pointer'> <p>Signout</p> <FaSignOutAlt /></div> :
              <div className='flex justify-between items-center'><p>Signin</p> <FaSignInAlt /></div>}</li>
        </ul>
      }
    </Wrapper>
  );
};
export default Header;
