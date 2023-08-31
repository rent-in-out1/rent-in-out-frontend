import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from '../../../assets/icons/calendar';
import Location from '../../../assets/icons/location';
import Mail from '../../../assets/icons/mail';
import Telephone from '../../../assets/icons/telephone';
import { Wrapper } from '../../../assets/styles/wrappers/userProfile';
import { doGetApiMethod } from '../../../api/services/axios-service/axios-service';
import Loader from '../../../shared/components/loader/loader';
import OwnPosts from '../myProfile/components/ownPosts';

const UserProfile = () => {
    const nav = useNavigate();
    const { user } = useSelector(state => state.userSlice);
    const [userDetails, setUserDetails] = useState({});
    const { userId } = useParams();
    
    // get user rank 
    const userRank = useMemo(() => {
        if(userDetails?.rank){
            const { totalRank, totalUsers } = userDetails.rank.reduce(
                (total, rankItem) => {
                    const { rank } = rankItem;
                    total.totalRank += rank;
                    total.totalUsers++;
    
                    return total;
                },
                {
                    totalRank: 0,
                    totalUsers: 0
                }
            );
            return (totalRank / totalUsers).toFixed(2);
        }
        return 0
    }, [userDetails]);

    useMemo(() => {
        async function getUser() {
            // if user id same as search user send him to his profile
            if (user?._id === userId) {
                user?.role === "admin" ? nav("/admin/profile") : nav("/profile");
            }
            const url = `/users/info/${userId}`;
            const { data } = await doGetApiMethod(url);
            setUserDetails(data.userInfo);
        }
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    
    return (
        <Wrapper>
            {userDetails.cover_img ?
                <React.Fragment>
                    <div className='h-72 relative' style={{
                        backgroundImage: `url(${userDetails.cover_img.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}>
                        <span
                            className='w-24 h-24 border-4 rounded-full drop-shadow-lg border-white absolute -bottom-7 left-2 z-4 overflow-hidden lg:-bottom-10 lg:left-32 lg:h-32 lg:w-32'>
                            <img className='w-full h-full object-cover'
                                src={userDetails.profile_img ? userDetails.profile_img.url : "https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                alt="" />
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
                        rank - {userRank}
                    </div>
                </div>
            </nav>

            <main>
                {/* user details */}
                <aside id='details' className='p-1 pb-0'>
                    <div className='flex items-center justify-center'>
                        <div className="userDetails bg-white w-full overflow-hidden min-h-20 rounded-xl p-3 shadow-xl">
                            <h3>{userDetails.fullName?.firstName} {userDetails.fullName?.lastName}</h3>
                            <h5 className='flex items-center mb-1'>
                                <Location /> {userDetails?.country} {userDetails?.city}</h5>
                            <h5 className='flex items-center mb-1'><Telephone /> {userDetails?.phone}</h5>
                            <h5 className='flex items-center mb-1'><Mail /> {userDetails?.email}</h5>
                            {userDetails.birthdate && <h5 className='flex items-center'><Calendar /> Birthdate
                                : {userDetails?.birthdate?.split("T")[0]}</h5>}
                        </div>
                    </div>
                    <div className='activity mt-4'>
                        <div className='bg-white w-full overflow-hidden min-h-20 rounded-xl p-3 shadow-xl'>
                            <span
                                className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Activation</span>
                            <h5>{userDetails.fullName?.firstName} Liked shimon post</h5>
                            <h5>Rent skateboard from Ido</h5>
                        </div>
                    </div>
                </aside>

                {/* own posts list */}
                <section id='main' className='p-1 mt-4 md:mt-0'>
                    <div className="userDetails bg-white w-full overflow-hidden min-h-20 rounded-xl p-3 shadow-xl">
                        <OwnPosts id={userId} />
                    </div>
                </section>

                {/* aside ads */}
                <aside id='ads' className='hidden justify-center p-2 xl:flex'>
                    <div id='ad' className='ads'>
                        <header
                            className='bg-white w-full overflow-hidden h-10/12 rounded-xl p-3 shadow-xl header cursor-pointer'
                            onClick={() => window.open("https://www.youtube.com/watch?v=XxXyfkrP298", "_blank")}>
                            <div className="container">
                                <p className='text-mute text-sm text-gray-400 mb-1'>adv.</p>
                                <div className='mb-2'>
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/255716/acme.svg" alt='ads' />
                                </div>
                                <div className="ad leaderboard">
                                    <img className='h-full w-full'
                                        src="https://images.pexels.com/photos/10875046/pexels-photo-10875046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt="ads" />
                                </div>
                            </div>
                        </header>
                    </div>
                </aside>
            </main>
        </Wrapper>
    );
};

export default UserProfile;
