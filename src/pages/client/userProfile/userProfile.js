import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doGetApiMethod } from '../../../services/service'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../../components/loader/loader'
import { Wrapper } from '../../../components/style/wrappers/userProfile'
const UserProfile = () => {
    const nav = useNavigate();
    const { user } = useSelector(state => state.userSlice)
    const [userDetails, setUserDetails] = useState({})
    const { userId } = useParams()
    useEffect(() => {
        getUser();
    }, [userId]);
    const getUser = async () => {
        // if user id same as search user send him to his profile
        if (user._id === userId) {
            nav("/profile")
        }
        const url = "/users/info/" + userId;
        const { data } = await doGetApiMethod(url);
        console.log(data.userInfo)
        setUserDetails(data.userInfo);
    }
    return (
        <Wrapper>
            {userDetails.cover_img ?
                <React.Fragment>
                    <div className='w-full h-72 relative' style={{ backgroundImage: `url(${userDetails.cover_img.url})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <span className='w-24 h-24 border-4 rounded-lg drop-shadow-lg border-white absolute -bottom-7 left-2 z-4 overflow-hidden lg:-bottom-10 lg:left-32 lg:h-32 lg:w-32'>
                            <img className='w-full h-full object-cover' src={userDetails.profile_img ? userDetails.profile_img.url : "https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
                        </span>
                    </div>
                </React.Fragment>
                :
                <div className='flex min-h-10 justify-center items-center'><Loader /></div>
            }
            <nav>
                <div>
                    <ul>
                        <li>Posts</li>
                        <li>Info</li>
                    </ul>
                    <div>
                        rank
                    </div>
                </div>
            </nav>
            <main>
                <aside className='bg-red-200'>
                    <h3>{userDetails.fullName?.firstName} {userDetails.fullName?.lastName}</h3>
                </aside>
                <section className='bg-green-200'>

                </section>
                <aside className='bg-blue-200'>

                </aside>
            </main>
        </Wrapper>
    )
}

export default UserProfile