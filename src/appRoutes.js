import React from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import HomeAdmin from './components/admin/homeAdmin'
import Users from './components/admin/users'
import Register from './components/auth/register/register'
import About from './components/client/about'
import Home from './components/client/home'
import Layout from './layout/layout'
import LayoutAdmin from './layoutAdmin/layoutAdmin'
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
            {/* outLet */}
            <Route index element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/register'  element={<Register />}/>
        </Route>
        <Route path='/admin' element={<LayoutAdmin/>}>
            {/* OutLet */}
            <Route path='/admin' element={<HomeAdmin/>}/>
            <Route path='/admin/users' element={<Users/>}/>
        </Route>

        <Route path='*' element={<div className='bg-red-500'>Not found</div>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes