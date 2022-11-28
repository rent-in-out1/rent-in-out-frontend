
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideBar from '../../../components/sideBar'
import Main from '../../../components/main'
const Dashboard = () => {
  const nav = useNavigate();
  const user = useSelector(state => state.userSlice.user)
  useEffect(() => {
    if (user?.role === "admin") nav("/admin")
  }, [user])
  return (
    <div className='flex'>
        <SideBar/>
        <Main/>
      </div>
  )
}


export default Dashboard;
