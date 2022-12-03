import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { doApiMethod, doGetApiMethod } from "../../services/service";
import Chat from "../icons/chat";
import Dots from "../icons/dots";
import Send from "../icons/send"
import FillHeart from "../icons/fillHeart";
import Heart from "../icons/heart";
import { Wrapper } from "../style/wrappers/card";
import { useSelector } from "react-redux";
const Card = ({ post, setIsChange }) => {
  const nav = useNavigate();
  const {user} = useSelector(state =>state.userSlice)
  const [like, setLike] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false)
  const [owner, setOwner] = useState({});

  const heartClick = async () => {
    // check if the user is logged in
    if(!user){
      nav("/register");
      return;
    }
    setLike(!like);
    let url = "/posts/likePost/" + post._id
    const data = await doApiMethod(url, "POST")
    setIsChange(true);
  };
  useEffect(() => {
    getPostCreatorInfo(post?.creator_id)
  }, [like])
  const getPostCreatorInfo = async (id) => {
    const { data } = await doGetApiMethod("/users/info/" + id)
    setOwner(data.userInfo)
  }
  return (
    <Wrapper>
      <div className="card">
        <div className="flex justify-between items-center pr-2 p-1">
          <div className="flex items-center cursor-pointer">
            <div className="profile overflow-hidden w-8 h-8 lg:w-10 lg:h-10">
              <img
                className="w-full h-full rounded-full object-cover"
                src={owner?.profile_img?.url}
                alt=""
              />
            </div>
            <span className="pl-1">{owner.fullName?.firstName} {owner.fullName?.lastName}</span>
          </div>
          <div className='z-10' onClick={() => setDisplayOptions(!displayOptions)}>
            <Dots />
          </div>
          {displayOptions &&
            <ul className='w-1/3 absolute bg-white shadow-xl rounded-b-xl top-12 z-10 right-0'>
              <li className='transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between items-center hover:bg-gray-200'>
                <p>Share</p>
                <Send />
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
        <div
          className="relative cursor-pointer"
          onDoubleClick={() => heartClick()}
        >
          <div className="overflow-hidden w-full" style={{ height: "500px" }}>
            <img className="w-full h-full object-cover"
              src={post.img[0]?.url}
              alt="post"
            />
          </div>
          <div
            className="absolute top-0 right-4 p-2"
            onClick={() => {
              heartClick();
            }}
          >
            {!post.likes.some(el => el.user_id === user?._id) ? (
              <Heart color="red" width="35px" height={"35px"} />
            ) : (
              <FillHeart color="red" width="35px" height={"35px"} />
            )}
          </div>
        </div>
        <div className="px-5 pb-5">
          <Link to={"/"}>
            <h5 className="text-sm sm:text-lg font-semibold sm:tracking-tight text-gray-900">
              {post?.title}
            </h5>
          </Link>
          <div className="flex items-center mt-2.5 mb-5 cursor-pointer">
            <span className="text-xs font-semibold mr-1 rounded">{post?.likes.length || "Likes: 0"}</span>
            <div className="flex items-center relative">
              {post?.likes.slice(0,3).map((like, i) => {
                return (
                  <div key={i} className={`w-6 h-6 bg-red-200 border rounded-full absolute -top-3 left-${i * 4}`}>
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={like.profile_img}
                      alt="profile"
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl md:text-3xl font-bold text-gray-900 mr-1">
                {post?.price}$
              </span>
              <span className="text-xs text-gray-400">per day</span>
            </div>
            <Link
              to={"/"}
              className="text-white items-center flex bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5"
            >
              <p className="mr-2 text-xs md:text-base">Send message</p>
              <Chat color="white" />
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
