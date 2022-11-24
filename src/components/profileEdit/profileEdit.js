import React from 'react'
import { Wrapper } from "../../components/style/wrappers/profiledit";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

const ProfileEdit = () => {
  const {user} = useSelector(state=>state.userSlice)
  useEffect(()=>{
    console.log(user)
  },[])
  return (
    <Wrapper>
      <main>
      <h3>{user.fullName.firstName} {user.fullName.lastName}</h3>
      <Link to={"/details"} > <i className="fa fa-pencil" aria-hidden="true"></i></Link>
      
    </main>
    </Wrapper>
  )
}

export default ProfileEdit