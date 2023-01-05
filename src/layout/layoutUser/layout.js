import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from '../../shared/components/sideBar'
import { useSelector } from 'react-redux'
import SideBarChat from '../../shared/components/sideBarChat/sideBarChat'
import Footer from './footer/footer';


const Layout = () => {
  let { user } = useSelector((state) => state.userSlice);
  return (
    <React.Fragment>
      <Header />
      <div className='bg-gray-100 flex'>
        <div className='lg:w-3/12 hidden lg:flex'>
          <Sidebar />
        </div>
        <div className='bg-gray-100 md:w-9/12 lg:w-7/12 w-full'>
          <Outlet />
        </div>
        {user ? (
          <div className="hidden md:flex md:w-3/12 lg:w-2/12">
            <SideBarChat />
          </div>
        ) : null}
      </div>
      <Footer className="mt-7"/>
    </React.Fragment>
  )
}

export default Layout