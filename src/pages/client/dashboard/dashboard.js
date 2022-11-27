
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Dashboard = () => {
  const nav = useNavigate();
  const user = useSelector(state => state.userSlice.user)
  useEffect(() => {
    if(user?.role === "admin") nav("/admin")
  }, [user])
  return (
    <div>

    </div>
  );
};

export default Dashboard;
