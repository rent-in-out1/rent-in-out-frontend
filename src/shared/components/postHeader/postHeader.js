import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dots from '../../../assets/icons/dots';
import Send from '../../../assets/icons/send';
import { usePostCreator } from '../../../hooks/usePostCreator';
import { deletePost } from '../../../redux/features/postsSlice';
import { doGetApiMethod } from '../../../services/axios-service/axios-service';

const PostHeader = ({ post }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userSlice);
  // const [owner, setOwner] = useState({})
  const [owner] = usePostCreator(post?.creator_id)
  const [displayOptions, setDisplayOptions] = useState(false);
  const nav = useNavigate();
  let timeOut;
  useEffect(() => {
    window.addEventListener("scroll", () => closeNav());
  }, []);

  const openNav = () => {
    clearTimeout(timeOut);
    setDisplayOptions(true);
  };
  const closeNav = () => {
    timeOut = setTimeout(() => {
      setDisplayOptions(false);
    }, 100);
  };
  return (
    <div className="flex justify-between items-center pr-2 p-1">
      <div
        onClick={() => {
          user?.role === "admin"
            ? nav(`/admin/profile/${owner._id}`)
            : nav(`/profile/${owner._id}`);
        }}
        className="flex items-center cursor-pointer capitalize"
      >
        <div className="profile overflow-hidden w-8 h-8 lg:w-10 lg:h-10">
          <img
            className="w-full h-full rounded-full object-cover"
            src={owner?.profile_img?.url}
            alt="avatar"
          />
        </div>
        <span className="pl-1 flex">
          {owner.fullName?.firstName}
          <span className="ml-1 hidden md:flex">
            {owner.fullName?.lastName}
          </span>
        </span>
      </div>
      <div
        className="z-10"
        onMouseLeave={() => closeNav()}
        onClick={() => {
          displayOptions ? closeNav() : openNav();
        }}
      >
        <Dots />
      </div>
      {displayOptions && (
        <ul
          onTouchCancel={() => closeNav()}
          onMouseOver={() => openNav()}
          onMouseLeave={() => closeNav()}
          className="w-2/3 md:w-1/3 absolute bg-white shadow-xl rounded-b-xl hover:rounded-b-xl top-10 md:top-12 z-10 right-0"
        >
          <li
            onClick={() => closeNav()}
            className={`transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between items-center hover:bg-gray-200 ${user?._id !== post?.creator_id &&
              "rounded-b-xl hover:rounded-b-xl"
              }`}
          >
            <p>Share</p>
            <Send />
          </li>
          {(user?._id === post?.creator_id || user?.role === "admin") && (
            <React.Fragment>
              <li
                onClick={() => closeNav()}
                className="transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between hover:bg-gray-200"
              >
                <p>Edit</p>
                <p>icon</p>
              </li>
              <li
                onClick={() => {
                  dispatch(deletePost({ id: post._id, name: post.title }));
                  closeNav();
                }}
                className="transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between rounded-b-xl hover:rounded-b-xl hover:bg-gray-200"
              >
                <p>Delete</p>
                <p>icon</p>
              </li>
            </React.Fragment>
          )}
        </ul>
      )}
    </div>
  )
}

export default PostHeader