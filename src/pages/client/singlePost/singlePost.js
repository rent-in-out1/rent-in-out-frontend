import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doGetApiMethod } from "../../../services/axios-service/axios-service";
import Loader from "../../../shared/components/loader/loader";
import { Wrapper } from "../../../assets/styles/wrappers/singlePost";
import PostHeader from "../../../shared/components/postHeader/postHeader";
import { useSelector } from "react-redux";
import UserRating from "./userRating";
import ImgController from "./imgController";
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
        <div className="w-full flex justify-center items-center min-h-12">
          <Loader width={"150px"} height={"100%"} />
        </div>
      ) : (
        // images
        <section>
          <ImgController post={post} />
          {/* post context */}
          <main>
            {post && <PostHeader post={post} />}
            <hr />
            <div className="user-header capitalize shadow-xl mb-2 p-2">
              <div className="">
                <ul >
                  <li>
                    {owner?.country}, {owner?.city}
                  </li>
                  <li>
                    active since:
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </li>
                  <li>
                    email: <span className="lowercase">{owner?.email}</span>
                  </li>
                </ul>
                <ul>
                  
                </ul>
              </div>
              <UserRating
                rank={rank}
                post={post}
                isChange={isChange}
                setIsChange={setIsChange}
              />
            </div>
            <div className="post-info"></div>
            <div className="post-likes"></div>
            <div className="contact"></div>
          </main>
        </section>
      )}
    </Wrapper>
  );
};

export default SinglePost;
