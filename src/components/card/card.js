import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doGetApiMethod } from "../../services/service";
import { deletePost } from "../../redux/features/postsSlice";
import Chat from "../icons/chat";
import Dots from "../icons/dots";
import Send from "../icons/send";
import FillHeart from "../icons/fillHeart";
import Heart from "../icons/heart";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../style/wrappers/card";
import { useDispatch, useSelector } from "react-redux";
import {
  onLikesToggle,
  onRegisterShow,
} from "../../redux/features/toggleSlice";
import Clock from "../icons/clock";
import { likePost } from "../../redux/features/postsSlice";
import LazyLoad from "react-lazy-load";
import { updateWishList } from "../../redux/features/userSlice";

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [owner, setOwner] = useState({});
  let timeOut;
  const openNav = () => {
    clearTimeout(timeOut);
    setDisplayOptions(true);
  };
  const closeNav = () => {
    timeOut = setTimeout(() => {
      setDisplayOptions(false);
    }, 100);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => closeNav());
    getPostCreatorInfo(post?.creator_id);
  }, []);
  const getPostCreatorInfo = async (id) => {
    const { data } = await doGetApiMethod("/users/info/" + id);
    setOwner(data.userInfo);
  };
  return (
    <Wrapper>
      <div className="card">
        <div className="flex justify-between items-center pr-2 p-1">
          <div
            onClick={() => {
              user?.role === "admin"
                ? nav(`/admin/profile/${owner._id}`)
                : nav(`/profile/${owner._id}`);
            }}
            className="flex items-center cursor-pointer"
          >
            <LazyLoad className="profile overflow-hidden w-8 h-8 lg:w-10 lg:h-10">
              <img
                className="w-full h-full rounded-full object-cover"
                src={owner?.profile_img?.url}
                alt="avatar"
              />
            </LazyLoad>
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
                className={`transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between items-center hover:bg-gray-200 ${
                  user?._id !== post?.creator_id &&
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
        <div
          className="relative cursor-pointer"
          // onDoubleClick={() => heartClick()}
          onDoubleClick={() => {
            !user ? dispatch(onRegisterShow()) :
            dispatch(likePost({id : post._id}))
            if(post.creator_id !== user._id){
              dispatch(updateWishList(post))

            }
          }}
        >
          <LazyLoad className="overflow-hidden w-full postImg">
            <img
              className="w-full h-full object-cover"
              src={post.img[0]?.url}
              alt="post"
            />
          </LazyLoad>
          <div
            className="absolute top-0 right-4 p-2"
            onClick={() => {
              !user ? dispatch(onRegisterShow()) :
              dispatch(likePost({id : post._id}))
            }}
          >
            {(post?.likes?.some((el) => el.user_id === user?._id) || user?.wishList?.some((el) => el._id === post?._id)) ? (
              <FillHeart color="red" width="20px" height={"20px"} />
              ) : (
                <Heart color="red" width="20px" height={"20px"} />
                )}
          </div>
        </div>
        <div className="px-5 pb-5 pt-2 md:pt-4">
          <div>
            <h5 className="text-sm capitalize text-lg lg:text-3xl font-semibold sm:tracking-tight text-gray-900">
              {post?.title}
            </h5>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex items-center mt-2.5 mb-5 cursor-pointer ">
              <span className="text-xs font-semibold mr-1 rounded">
                {post?.likes.length || "Likes: 0"}
              </span>
              <div
                onClick={() => {
                  dispatch(onLikesToggle(post?.likes));
                }}
                className="flex items-center justify-between relative "
              >
                {post?.likes.slice(0, 3).map((like, i) => {
                  return (
                    <div
                      key={uuidv4()}
                      className={`w-6 h-6 bg-red-200 border rounded-full absolute -top-3 left-${
                        i * 4
                      }`}
                    >
                      <img
                        title={like.fullName.firstName}
                        className="w-full h-full rounded-full object-cover"
                        src={like.profile_img}
                        alt="profile"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded lg:mr-2">
              <Clock />
              3d
            </span>
          </div>

          <div className="md:flex items-center justify-between">
            <div className="flex items-center justify-center mb-2 md:mb-0">
              <span className="text-xl md:text-2xl font-bold text-gray-900 mr-1">
                {post?.price}$
              </span>
              <span className="text-xs capitalize text-gray-400">per day</span>
            </div>
            <a href={`https://wa.me/+972${owner?.phone}?text=Hello ${owner?.fullName?.firstName} ${owner?.fullName?.lastName} i saw your item ${post.title} from rentInOut. \n i would like to rent it !`} target={"_blank"} rel="noreferrer" className="text-white justify-center items-center flex bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5">
              <p className="mr-2 text-xs capitalize lg:text-lg">Rent now</p>
              <Chat color="white" />
            </a>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
