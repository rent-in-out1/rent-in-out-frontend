import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

const Layout = () => {
  return (
    <div>
      <Header />
      <div className='pt-10'>
      <Outlet />
      </div>
    </div>
  )
}

export default Layout