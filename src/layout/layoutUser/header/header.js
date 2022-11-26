
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaHome, FaBell, FaInbox, FaUser, FaStickyNote, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { Logo, Wrapper } from '../../../components/style/wrappers/navbarUser';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import { onRegisterToggle, onLogout } from '../../../redux/features/toggleSlice';
import { API_URL_CLIENT } from '../../../services/service';


const Header = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isLogin = useSelector(state => state.userSlice?.user !== null)
  const {user} = useSelector(state => state.userSlice)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <section>
        <div className='left flex flex-wrap'>
          <Link to={"/"}>
            <Logo>
              <img src="./img/LOGO.png" alt="logo" />
              <p>rentInOut</p>
            </Logo>
          </Link>
          <div className="search">
            <input type="text" placeholder='Search...' className='border-transparent focus:border-transparent focus:ring-0' />
            <div className="icon">
              <FaSearch />
            </div>
          </div>
        </div>
        <div className='right'>
          <nav>
            {isLogin &&
              <ul>
                <li>
                  <Link to={"/"} className="inline-flex items-center p-3 text-sm text-center">
                    <FaHome className='text-large' />
                  </Link>
                </li>
                <li>
                  <Link to={"/mypsots"} className="inline-flex items-center p-3 text-sm text-center">
                    <FaStickyNote className='text-large' />
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"} className="inline-flex items-center p-3 text-sm text-center">
                    <FaUser className='text-large' />
                  </Link>
                </li>
                <li>
                  <button type="button" className="inline-flex relative items-center p-3 text-sm  text-center">
                    <FaInbox />
                    <span className="sr-only">Notifications</span>
                    <div className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">1</div>
                  </button>
                </li>
                <li>
                  <button type="button" className="inline-flex relative items-center p-3 text-sm  text-center">
                    <FaBell />
                    <span className="sr-only">Notifications</span>
                    <div className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">2</div>
                  </button>
                </li>
              </ul>
            }
          </nav>
          <div className="relative avatar" onClick={() => setIsOpen(!isOpen)}>
          <img
              className="rounded-full"
              src={
               user !== null && user?.active
                  ? user.profile_img
                  : "data:image/png;base64,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"
              }
              alt=""
            />
            <span className={`${isLogin ? "bg-green-400" : "bg-red-400"} bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full`}></span>
            {/* {
              isOpen &&
              <ul className='absolute bg-white w-32 rounded right-2 -bottom-11'>
                <li onClick={()=>{
                  dispatch(onRegisterToggle())
                }} className={`w-full p-2 rounded transition ease-in-out delay-150 ${isLogin ? "hover:bg-red-300" : "hover:bg-blue-200"}`}>
                  {isLogin ? <div className='flex justify-between items-center'> <p>Signout</p> <FaSignOutAlt /></div> : <div className='flex justify-between items-center'><p>Signin</p> <FaSignInAlt /></div>}</li>
              </ul>
            } */}

          </div>
        </div>
      </section>
      {
        isOpen &&
        <ul className='absolute shadow bg-white z-50 w-full rounded right-0 -top-15 md:w-1/4 md:-bottom-30'>
          {isLogin &&
            <React.Fragment>
              <li className={`w-full p-2 rounded transition ease-in-out delay-150 hover:bg-blue-200 cursor-pointer`}>
                Home</li>
              <li className={`w-full p-2 rounded transition ease-in-out delay-150 hover:bg-blue-200 cursor-pointer`}>
                About</li>
              <li className={`w-full p-2 rounded transition ease-in-out delay-150 hover:bg-blue-200 cursor-pointer`}>
                Profile</li>
              <li className={`w-full p-2 rounded transition ease-in-out delay-150 hover:bg-blue-200 cursor-pointer`}>
                Settings</li>
            </React.Fragment>
          }
          <li onClick={() => {
            if (isLogin) {
              localStorage.removeItem('token')
              window.open(API_URL_CLIENT, "_self")
              dispatch(onLogout())
            }
            else {
              dispatch(onRegisterToggle())
              setIsOpen(false)
            }
          }} className={`w-full p-2 rounded cursor-pointer transition ease-in-out delay-150 ${isLogin ? "hover:bg-red-300" : "hover:bg-blue-200"}`}>
            {isLogin ? <div className='flex justify-between items-center'> <p>Signout</p> <FaSignOutAlt /></div> :
              <div className='flex justify-between items-center'><p>Signin</p> <FaSignInAlt /></div>}</li>
        </ul>
      }
    </Wrapper>
  )
}
export default Header
