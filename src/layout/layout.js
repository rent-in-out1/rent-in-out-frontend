import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './layoutUser/header'
import Footer from './layoutUser/footer'
const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout