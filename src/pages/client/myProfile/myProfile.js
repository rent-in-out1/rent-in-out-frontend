import React from 'react'
import BannerProfile from '../../../components/bannerProfile'
import OwnPosts from '../../../components/ownPosts'
import ProfileEdit from '../../../components/profileEdit'
import Footer from "../../../layout/layoutUser/footer"

const MyProfile = () => {
  return (
    <div>
      <BannerProfile/>
      <ProfileEdit/>
      <OwnPosts />
      <Footer/>
     
    </div>
  )
}

export default MyProfile