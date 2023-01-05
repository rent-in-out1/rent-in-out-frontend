import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { doGetApiMethod } from "../../../services/axios-service/axios-service";
import Loader from "../../../shared/components/loader/loader";
import { Wrapper } from "../../../assets/styles/wrappers/singlePost";
import PostHeader from "../../../shared/components/postHeader/postHeader";
import { useSelector } from "react-redux";
import ImgController from "./imgController";
import Likes from "./../posts-likes/likes";
import UserInfo from "./userInfo";
import PostInfo from "./postInfo";
import Home from "./../../../assets/icons/home";
import Map from "./map";
const SinglePost = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [owner, setOwner] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChange, setIsChange] = useState(false);
  const [rank, setRank] = useState({});
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    getPostByID();
  }, [isChange]);

  /** get post from api */
  const getPostByID = async () => {
    let url = "/posts/getPostByID/" + params.postID;
    const { data } = await doGetApiMethod(url);
    setPost(data);
    await getUserRating(data?.creator_id);
    await getPostCreatorInfo(data?.creator_id);
    setIsLoading(false);
  };
  /** get rating from api */
  const getUserRating = async (id) => {
    let url = `/users/getRank/${id}?rankingUser=${post?._id}`;
    const { data } = await doGetApiMethod(url);
    setRank(data);
  };
  /** get creator from api */
  const getPostCreatorInfo = async (id) => {
    const { data } = await doGetApiMethod(`/users/info/${id}`);
    setOwner(data.userInfo);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <div className="w-full flex justify-center border items-center min-h-12 ">
          <Loader width={"150px"} height={"100%"} />
        </div>
      ) : (
        // images
        <section>
          <ImgController post={post} />
          {/* post context */}
          <main>
            <div className="flex justify-center my-2">
              <Link
                className="flex"
                to={user.role === "admin" ? "/admin" : "/"}
              >
                Home{" "}
                <span className="ml-2">
                  <Home color="gray" />
                </span>
              </Link>
            </div>
            <hr />
            {post && <PostHeader post={post} />}
            <hr />
            <div className="flex flex-wrap mt-2">
              <div className="post-info md:w-1/2 border w-full">
                <PostInfo post={post} owner={owner} />
              </div>
              <div className="post-likes md:w-1/2 border w-full">
                <Likes post={post} />
              </div>
            </div>
            <UserInfo
              owner={owner}
              rank={rank}
              post={post}
              isChange={isChange}
              setIsChange={setIsChange}
            />
            <Map />
          </main>
        </section>
      )}
    </Wrapper>
  );
};

export default SinglePost;
