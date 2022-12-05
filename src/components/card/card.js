import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doApiMethod, doGetApiMethod } from "../../services/service";
import Chat from "../icons/chat";
import Dots from "../icons/dots";
import Send from "../icons/send";
import FillHeart from "../icons/fillHeart";
import Heart from "../icons/heart";
import { Wrapper } from "../style/wrappers/card";
import { useDispatch, useSelector } from "react-redux";
import { onLikesToggle, onRegisterShow } from "../../redux/features/toggleSlice";
import Clock from "../icons/clock";
const Card = ({ post, setIsChange }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const [like, setLike] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [owner, setOwner] = useState({});

  const heartClick = async () => {
    // check if the user is logged in
    if (!user) {
      dispatch(onRegisterShow());
      return;
    }
    setLike(!like);
    let url = "/posts/likePost/" + post._id;
    const data = await doApiMethod(url, "POST");
    setIsChange(true);
  };
  useEffect(() => {
    getPostCreatorInfo(post?.creator_id);
  }, [like]);
  const getPostCreatorInfo = async (id) => {
    const { data } = await doGetApiMethod("/users/info/" + id);
    setOwner(data.userInfo);
  };
  return (
    <Wrapper>
      <div className="card">
        <div className="flex justify-between items-center pr-2 p-1">
          <div
            onClick={() => nav(`/profile/${owner._id}`)}
            className="flex items-center cursor-pointer"
          >
            <div className="profile overflow-hidden w-8 h-8 lg:w-10 lg:h-10">
              <img
                className="w-full h-full rounded-full object-cover"
                src={owner?.profile_img?.url}
                alt=""
              />
            </div>
            <span className="pl-1 flex">
              {owner.fullName?.firstName}{" "}
              <span className="ml-1 hidden md:flex">
                {" "}
                {owner.fullName?.lastName}
              </span>
            </span>
          </div>
          <div
            className="z-10"
            onMouseOver={() => setDisplayOptions(true)}
            onClick={() => setDisplayOptions(true)}
          >
            <Dots />
          </div>
          {displayOptions && (
            <ul onMouseLeave={() => setDisplayOptions(false)} className="w-2/3 md:w-1/3 absolute bg-white shadow-xl rounded-b-xl top-10 md:top-12 z-10 right-0">
              <li className="transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between items-center hover:bg-gray-200">
                <p>Share</p>
                <Send />
              </li>
              {user?._id === post?.creator_id && (
                <React.Fragment>
                  <li className="transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between rounded-b-xl hover:bg-gray-200">
                    <p>Edit</p>
                    <p>icon</p>
                  </li>
                  <li className="transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between rounded-b-xl hover:bg-gray-200">
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
          onDoubleClick={() => heartClick()}
        >
          <div className="overflow-hidden w-full postImg">
            <img
              className="w-full h-full object-cover"
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
            {!post.likes.some((el) => el.user_id === user?._id) ? (
              <Heart color="red" width="20px" height={"20px"} />
            ) : (
              <FillHeart color="red" width="20px" height={"20px"} />
            )}
          </div>
        </div>
        <div className="px-5 pb-5 pt-2 md:pt-4">
          <div>
            <h5 className="text-sm capitalize text-lg lg:text-3xl font-semibold sm:tracking-tight text-gray-900">
              {post?.title}
            </h5>
          </div>
          <div className="lg:flex lg:justify-between lg:items-center ">
            <div className="flex items-center mt-2.5 mb-5 cursor-pointer ">
              <span className="text-xs font-semibold mr-1 rounded">
                {post?.likes.length || "Likes: 0"}
              </span>
              <div
                onClick={() => {
                  // console.log(post?._id)
                  dispatch(onLikesToggle(post?.likes))
                }}
                className="flex items-center justify-between relative "
              >
                {post?.likes.slice(0, 3).map((like, i) => {
                  return (
                    <div
                      key={i}
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
              3 days ago
            </span>
          </div>

          <div className="md:flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl md:text-3xl font-bold text-gray-900 mr-1">
                {post?.price}$
              </span>
              <span className="text-xs capitalize text-gray-400">per day</span>
            </div>
            <Link
              to={"/"}
              className="text-white justify-center items-center flex bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5"
            >
              <p className="mr-2 text-xs capitalize lg:text-lg">Rent now</p>
              <Chat color="white" />
            </Link>
          </div>
        </div>
      </div>
      
    </Wrapper>
  );
};

export default Card;
