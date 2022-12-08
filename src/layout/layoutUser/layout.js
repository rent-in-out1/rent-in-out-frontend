import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from '../../components/sideBar'


const Layout = () => {
  return (
    <div className='bg-gray-100'>

      <Header />
      <Sidebar />
      <div className='w-full bg-gray-100 lg:w-9/12 ml-auto min-h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout