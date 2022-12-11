import React from 'react'
import BannerProfile from '../../../components/bannerProfile'
import OwnPosts from '../../../components/ownPosts'
import Profile from '../../../components/profile'
import Footer from "../../../layout/layoutUser/footer"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const MyProfile = () => {
  const { user } = useSelector(state => state.userSlice);
  const { userId } = useParams();
  return (
    <div>
      <BannerProfile />
      <Profile />
      {/* <OwnPosts id={userId || user._id} /> */}
      <Footer />
    </div>
  )
}

export default MyProfile