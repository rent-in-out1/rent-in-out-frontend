import React from 'react'
import { Wrapper } from "../../components/style/wrappers/profiledit";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProfileEdit = () => {
  const {user} = useSelector(state=>state.userSlice)
  useEffect(()=>{
    console.log(user)
  },[])
  return (
    <Wrapper>
      <main>
      <h3>{user.fullName.firstName} {user.fullName.lastName}</h3>
      <button><i className="fa fa-pencil" aria-hidden="true"></i></button>
    </main>
    </Wrapper>
  )
}

export default ProfileEdit