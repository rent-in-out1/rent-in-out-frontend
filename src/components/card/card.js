import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Chat from '../icons/chat'
import Dots from '../icons/dots'
import FillHeart from '../icons/fillHeart'
import Heart from '../icons/heart'
import { Wrapper } from '../style/wrappers/card'
const Card = () => {
    const [like, setLike] = useState(false)
    const [displayOptions, setDisplayOptions] = useState(false)
    const heartClick = () => {
        setLike(!like)
    }
    return (
        <Wrapper>
            <div className='card relative'>
                {/* header */}
                <div className='flex justify-between items-center pr-2 p-1'>
                    <div className='flex items-center cursor-pointer'>
                        <div className="profile overflow-hidden w-8 h-8 lg:w-10 lg:h-10">
                            <img className='w-full h-full rounded-full object-cover' src="http://res.cloudinary.com/dpmpi8dwb/image/upload/v1669812257/profile/f1g9jbu5utwmesrkddeg.jpg" alt="" />
                        </div>
                        <span className='pl-1'>Yoav Grinwald</span>
                    </div>
                    <div className='z-10' onClick={() => setDisplayOptions(!displayOptions)}>
                        <Dots />
                    </div>
                    { displayOptions &&
                        <ul className='w-1/2 absolute bg-white shadow-xl rounded-b-xl top-12 z-10 right-0'>
                            <li className='transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between hover:bg-gray-200'>
                                <p>Share</p>
                                <p>icon</p>
                            </li>
                            <li className='transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between hover:bg-gray-200'>
                                <p>Share</p>
                                <p>icon</p>
                            </li>
                            <li className='transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between rounded-b-xl hover:bg-gray-200'>
                                <p>Share</p>
                                <p>icon</p>
                            </li>
                        </ul>
                    }
                </div>
                {/* main picture */}
                <div className='relative cursor-pointer' onDoubleClick={() => heartClick()}>
                    <img src="https://images.pexels.com/photos/819805/pexels-photo-819805.jpeg?auto=compress&cs=tinysrgb&w=600" alt="post" />
                    <div className='absolute top-0 right-4 p-2' onClick={() => { heartClick() }}>
                        {like ? <FillHeart color='#333' width="35px" height={"35px"} /> :   <Heart color='#333' width="35px" height={"35px"} />}
                    </div>
                </div>
                {/* Title of post */}
                <div className="px-5 pb-5">
                    <Link to={"/"}>
                        <h5 className="text-sm sm:text-lg font-semibold sm:tracking-tight text-gray-900">Bikes best price ever!</h5>
                    </Link>
                    {/* Three pictures in same line and count of likes */}
                    <div className="flex items-center mt-2.5 mb-5 cursor-pointer">
                        <span className="text-xs font-semibold mr-1 rounded">12</span>
                        <div className='flex items-center relative'>
                            <div className='w-6 h-6 bg-red-200 rounded-full absolute -top-3 left-0'>
                                <img className='w-full h-full rounded-full object-cover' src="http://res.cloudinary.com/dpmpi8dwb/image/upload/v1669812257/profile/f1g9jbu5utwmesrkddeg.jpg" alt="" />
                            </div>
                            <div className='w-6 h-6 bg-red-200 rounded-full absolute -top-3 left-4'>
                                <img className='w-full h-full rounded-full object-cover' src="https://i.ibb.co/JpBtXjD/Whats-App-Image-2022-11-22-at-20-54-43.jpg" alt="" />
                            </div>
                            <div className='w-6 h-6 bg-red-200 rounded-full absolute -top-3 left-8'>
                                <img className='w-full h-full rounded-full object-cover' src="https://images.pexels.com/photos/5774802/pexels-photo-5774802.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                            </div>
                        </div>
                    </div>
                    {/* more details */}
                    <div className="more flex items-center justify-between">
                        <div className='flex items-center'>
                            <span className="text-xl md:text-3xl font-bold text-gray-900 mr-1">$20</span>
                            <span className="text-xs text-gray-400">per day</span>
                        </div>
                        <Link to={"/"} className="text-white items-center flex bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5">
                            <p className='mr-2 text-xs md:text-base'>Send message</p>
                            <Chat color='white' />
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>

    )
}

export default Card