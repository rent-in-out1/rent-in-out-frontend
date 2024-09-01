import { useDispatch, useSelector } from "react-redux";
import Clock from "../../../assets/icons/clock";
import FillHeart from "../../../assets/icons/fillHeart";
import Heart from "../../../assets/icons/heart";
import { Wrapper } from "../../../assets/styles/wrappers/card";
import { likePost, setIsChange } from "../../../redux/features/postsSlice";
import {
  onPostToggle,
  onRegisterShow,
} from "../../../redux/features/toggleSlice";
import { updateWishList } from "../../../redux/features/userSlice";
import { unitTimeToCreatedTimeHelper } from "../../../util/functions";
import ChatAndWhatsup from "../chat-whatsUp";
import PostHeader from "../postHeader";
import RecentLikes from "../recentLikes";

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  return (
    <Wrapper>
      <PostHeader post={post} />

      {/* post image */}
      <div
        className="relative cursor-pointer"
        onDoubleClick={() => {
          !user
            ? dispatch(onRegisterShow())
            : dispatch(likePost({ id: post._id }));
          if (post.creator_id._id !== user?._id) {
            dispatch(updateWishList(post));
          }
          dispatch(setIsChange());
        }}
      >
        <div className="overflow-hidden w-full postImg">
          <img
            className="w-full h-full object-cover"
            src={post?.img[0]?.url}
            alt="post"
          />
        </div>

        {/* like icon */}
        <div
          className="absolute top-0 right-2 p-2"
          onClick={() => {
            if (!user) dispatch(onRegisterShow());
            else {
              dispatch(likePost({ id: post._id }));
            }
            if (post.creator_id._id !== user?._id) {
              dispatch(updateWishList(post));
            }
            dispatch(setIsChange());
          }}
        >
          {post?.likes?.length > 0 &&
          post?.likes?.some((like) => like._id === user?._id) > 0 ? (
            <FillHeart color="red" width="20px" height={"20px"} />
          ) : (
            <Heart color="red" width="20px" height={"20px"} />
          )}
        </div>
      </div>

      {/* card footer */}
      <div
        onClick={() => {
          dispatch(onPostToggle(post));
        }}
        className="px-3 pt-3"
      >
        {/* post title */}
        <h4 className="mb-1 capitalize font-semibold text-gray-900 cursor-pointer">
          {post?.title}
        </h4>

        <div className="flex justify-between items-center py-1">
          {/* top 3 likes */}
          <RecentLikes key={post?._id} likes={post?.likes} />

          {/* post uploaded time */}
          <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded lg:mr-2">
            <Clock />
            {unitTimeToCreatedTimeHelper(post?.createdAt)}
          </span>
        </div>

        <div className="h-full">
          <div className="flex items-center justify-center">
            {/* post price */}
            <span className="text-xl md:text-2xl font-bold py-1 text-gray-900 mr-1">
              {post?.price}$
            </span>

            {/* price for day/week/month */}
            <span className="text-xs capitalize text-gray-400">per day</span>
          </div>
          <ChatAndWhatsup post={post} user={user} owner={post?.creator_id} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
