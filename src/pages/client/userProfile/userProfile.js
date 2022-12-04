import React from 'react'
import Footer from '../../../layout/layoutUser/footer'
import { useParams,useNavigate } from 'react-router-dom'
import { doGetApiMethod } from '../../../services/service'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../../components/loader/loader'
const UserProfile = () => {
    const nav = useNavigate();
    const {user} = useSelector(state=>state.userSlice)
    const [userDetails, setUserDetails] = useState({})
    const { userId } = useParams()
    useEffect(() => {
        getUser();
    }, [userId]);
    const getUser = async () => {
        // if user id same as search user send him to his profile
        if(user._id === userId){
            nav("/profile")
        }
        const url = "/users/info/" + userId;
        const { data } = await doGetApiMethod(url);
        console.log(data.userInfo)
        setUserDetails(data.userInfo);
    }
    return (
        <div>
            {userDetails.cover_img ?
                        <React.Fragment>
                        <div className='w-full h-72 relative' style={{ backgroundImage: `url(${userDetails.cover_img.url})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                            <span className='w-24 h-24 rounded-full absolute -bottom-7 left-2 z-4 overflow-hidden md:-bottom-10 md:left-24 md:h-32 md:w-32'>
                                <img className='w-full h-full object-cover' src={userDetails.profile_img ? userDetails.profile_img.url : "https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
                            </span>
                        </div>
                    </React.Fragment>
                    :
                    <Loader/>
        }

            <Footer />
        </div>
    )
}

export default UserProfile