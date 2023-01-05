
import { useNavigate } from "react-router-dom";
import Chat from "../../../assets/icons/chat";
import FillHeart from "../../../assets/icons/fillHeart";
import Heart from "../../../assets/icons/heart";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../../assets/styles/wrappers/card";
import { useDispatch, useSelector } from "react-redux";
import {
  onLikesToggle,
  onRegisterShow,
} from "../../../redux/features/toggleSlice";
import Clock from "../../../assets/icons/clock";
import { likePost } from "../../../redux/features/postsSlice";
import { updateWishList } from "../../../redux/features/userSlice";
import WebChat from "../../../assets/icons/webChat";
import PostHeader from "../postHeader/postHeader";
import { usePostCreator } from "../../../hooks/usePostCreator";
import ChatAndWhatsup from "../chatAndWhatsup";

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user, wishList } = useSelector((state) => state.userSlice);
  const [owner] = usePostCreator(post?.creator_id)
  return (
    <Wrapper>
      <div className="card">
        <PostHeader post={post}/>
        <div
          className="relative cursor-pointer"
          onDoubleClick={() => {
            !user
              ? dispatch(onRegisterShow())
              : dispatch(likePost({ id: post._id }));
            if (post.creator_id !== user._id) {
              dispatch(updateWishList(post));
            }
          }}
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
              !user
                ? dispatch(onRegisterShow())
                : dispatch(likePost({ id: post._id }));
            }}
          >
            {post?.likes?.some((el) => el.user_id === user?._id) ||
              user?.wishList?.some((el) => el._id === post?._id) ||
              wishList?.some((el) => el._id === post?._id) ? (
              <FillHeart color="red" width="20px" height={"20px"} />
            ) : (
              <Heart color="red" width="20px" height={"20px"} />
            )}
          </div>
        </div>

        {/* card footer */}
        <div onClick={() => {
          nav("/singlePost/" + post._id)
        }} className="px-5 pt-2 md:pt-4">
          <div>

            {/* post title */}
            <h5
              className="text-sm capitalize text-lg lg:text-3xl font-semibold sm:tracking-tight text-gray-900 cursor-pointer">
              {post?.title}
            </h5>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex items-center mt-2.5 mb-5 cursor-pointer ">
              <span className="text-xs font-semibold mr-1 rounded">
                {post?.likes.length || "Likes: 0"}
              </span>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(onLikesToggle(post?.likes));
                }}
                className="flex items-center justify-between relative "
              >
                {post?.likes.slice(0, 3).map((like, i) => {
                  return (
                    <div
                      key={uuidv4()}
                      className={`w-6 h-6 bg-red-200 border rounded-full absolute -top-3 left-${i * 4
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

          <div className="md:flex items-center justify-around h-full">
            <div className="flex items-center justify-center mb-2 md:mb-0">
              <span className="text-xl md:text-2xl font-bold py-1 text-gray-900 mr-1">
                {post?.price}$
              </span>
              <span className="text-xs capitalize text-gray-400">per day</span>
            </div>
            {/* {user?._id !== owner?._id ? (
              <div className="flex h-8 overflow-hidden">
                <div className="h-full mr-1">
                  <a
                    href={`https://wa.me/+972${owner?.phone}?text=Hello ${owner?.fullName?.firstName} ${owner?.fullName?.lastName} i saw your item ${post.title} from rentInOut. \n i would like to rent it !`}
                    target={"_blank"}
                    rel="noreferrer"
                    onClick={(e)=>e.stopPropagation()}
                    style={{ background: "	#25D366" }}
                    className="h-full mb-1 items-center md:mb-0 flex font-small rounded-lg text-xs px-2 py-2 md:px-2.5 md:py-1.5"
                  >
                    <Chat color="white" />
                  </a>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    !user
                      ? dispatch(onRegisterShow())
                      : user.role === "admin"
                        ? nav(`/admin/chat/${owner._id}${user._id}/${owner._id}`)
                        : nav(`/chat/${owner._id}${user._id}/${owner._id}`);
                  }}
                  className="h-full cursor-pointer text-white justify-center items-center flex bg-blue-400 hover:bg-blue-800 font-small rounded-lg text-xs px-2 py-2 md:px-2.5 md:py-1 lg:py-1.5"
                >
                  <p className="mr-1  text-xs capitalize lg:text-lg">Chat</p>
                  <WebChat color="white" />
                </div>
              </div>
            ) : null} */}
            <ChatAndWhatsup post={post} user={user} owner={owner}/>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
