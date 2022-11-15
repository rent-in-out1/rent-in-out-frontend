import React from 'react'
import Register from './../../auth/register/register';
import {useSelector} from "react-redux"

const Dashboard = () => {
  const isLoggedIn = useSelector(state => state.userSlice.isLoggedIn)
  return (
    <div>
      {!isLoggedIn ? <Register/> : null}
    </div>
  )
}

export default Dashboard