import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from '../../components/sideBar'


const Layout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className='w-full bg-gray-100 lg:w-10/12 ml-auto'>
      <Outlet />
      </div>
    </div>
  )
}

export default Layout