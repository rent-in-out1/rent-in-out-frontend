import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Chat from '../icons/chat'
import Dots from '../icons/dots'
import FillHeart from '../icons/fillHeart'
import Heart from '../icons/heart'
import { Wrapper } from '../style/wrappers/card'
const Card = () => {
    const [like, setLike] = useState(false)
    const heartClick = () => {
        setLike(!like)
    }
    return (
        <Wrapper>
            <div className='flex justify-end pr-2'>
                <Dots />
            </div>
            <Link to={"/"}>
                <img src="https://images.pexels.com/photos/819805/pexels-photo-819805.jpeg?auto=compress&cs=tinysrgb&w=600" alt="post" />
            </Link>
            <div className="px-5 pb-5">
                <Link to={"/"}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                </Link>
                <div className="flex items-center mt-2.5 mb-5">
                    <span className="text-xs font-semibold mr-1 rounded">12</span>
                    <div className='cursor-pointer' onClick={() => { heartClick() }}>{like ? <Heart /> : <FillHeart />}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div className='flex items-center'>
                        <span className="text-3xl font-bold text-gray-900 mr-1">$20</span>
                        <span className="text-sm text-gray-400">per day</span>
                    </div>
                    <Link to={"/"} className="text-white items-center flex bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                        <p className='mr-2'>Send message</p>
                        <Chat color='white' />
                    </Link>
                </div>
            </div>
        </Wrapper>

    )
}

export default Card