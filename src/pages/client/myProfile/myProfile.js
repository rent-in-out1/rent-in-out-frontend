import React from 'react'
import BannerProfile from '../../../components/bannerProfile'
import OwnPosts from '../../../components/ownPosts'
import Profile from '../../../components/profile'
import Footer from "../../../layout/layoutUser/footer"
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const { user } = useSelector(state => state.userSlice)
  return (
    <div>
      <BannerProfile />
      <Profile />
      <OwnPosts id={user._id}/>
      <Footer />
    </div>
  )
}

export default MyProfile