import React from 'react'
import { Wrapper } from "../../components/style/wrappers/profiledit";
import { useSelector } from 'react-redux';

const ProfileEdit = () => {
  const user= useSelector(state=>state.userSlice)
  return (
    <Wrapper>
      <main className='container mx-auto'>
      <h3>{user.fullName.firstname}</h3>
      <button><i class="fa fa-pencil" aria-hidden="true"></i></button>
    </main>
    </Wrapper>
  )
}

export default ProfileEdit