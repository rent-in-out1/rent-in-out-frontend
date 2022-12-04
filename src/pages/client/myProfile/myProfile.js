import React from 'react'
import BannerProfile from '../../../components/bannerProfile'
import OwnPosts from '../../../components/ownPosts'
import Profile from '../../../components/profile'
import Footer from "../../../layout/layoutUser/footer"

const MyProfile = () => {
  return (
    <div>
      <BannerProfile/>
      <Profile/>
      <OwnPosts />
      <Footer/>
     
    </div>
  )
}

export default MyProfile