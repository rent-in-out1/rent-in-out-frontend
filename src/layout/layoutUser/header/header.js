
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { FaSearch, FaHome, FaBell, FaInbox, FaUser, FaStickyNote, FaSignInAlt, FaSignOutAlt, FaCog, FaCogs } from "react-icons/fa"
import { Logo, Wrapper } from '../../../components/style/wrappers/navbarUser';
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import { onRegisterToggle, onLogout } from '../../../redux/features/toggleSlice';
import { API_URL_CLIENT } from '../../../services/service';


const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.userSlice?.user !== null)
  const { user } = useSelector(state => state.userSlice)
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
                  <Link to={"/"} className="inline-flex items-center p-3 text-sm text-center md:hidden">
                    <FaHome className='text-large' />
                  </Link>
                </li>
                <li>
                  <Link to={"/mypsots"} className="inline-flex items-center p-3 text-sm text-center md:hidden">
                    <FaStickyNote className='text-large' />
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"} className="inline-flex items-center p-3 text-sm text-center md:hidden">
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
                  : "https://freesvg.org/img/Male-Avatar.png"
              }
              alt=""
            />
            <span className={`${isLogin ? "bg-green-400" : "bg-red-400"} bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full`}></span>

          </div>
        </div>
      </section>
      {
        isOpen &&
        <ul className='absolute dropdown shadow bg-white z-50 w-full rounded right-0 -top-15 md:w-1/4 md:-bottom-30'>
          {isLogin &&
            <React.Fragment>
              <li onClick={()=>{
                setIsOpen(false)
                nav("/")
                }} className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}>
                <div className='flex justify-between items-center'><p>Home</p> <FaHome /></div>
              </li>
              <li onClick={()=>{
                setIsOpen(false)
                nav("/profile")
                }} className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}>
                <div className='flex justify-between items-center'> <p>Profile</p> <FaUser /></div>
              </li>
              <li onClick={()=>{
                setIsOpen(false)
                nav("/profile1")
                }} className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}>
                <div className='flex justify-between items-center'> <p>Settings</p> <FaCogs /></div>
              </li>
            </React.Fragment>
          }
          <li onClick={() => {
            if (isLogin) {
              localStorage.removeItem('token')
              window.open(API_URL_CLIENT, "_self")
              dispatch(onLogout())
              setIsOpen(false)
            }
            else {
              dispatch(onRegisterToggle())
              setIsOpen(false)
            }
          }} className={`w-full p-2 rounded cursor-pointer`}>
            {isLogin ? <div className='flex justify-between items-center'> <p>Signout</p> <FaSignOutAlt /></div> :
              <div className='flex justify-between items-center'><p>Signin</p> <FaSignInAlt /></div>}</li>
        </ul>
      }
    </Wrapper>
  )
}
export default Header
