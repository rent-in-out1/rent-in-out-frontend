import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from '../../components/sideBar'
import SidebarChat from "../../components/sideBarChat"


const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <div className='bg-gray-100 flex'>
        <div className='lg:w-3/12 hidden lg:flex'>
          <Sidebar />
        </div>
        <div className='bg-gray-100 md:w-9/12 lg:w-7/12 min-h-screen'>
          <Outlet />
        </div>
        <div className='hidden md:flex md:w-3/12 lg:w-2/12'>
          <SidebarChat />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout