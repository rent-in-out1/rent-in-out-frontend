import React, { useEffect, useState } from "react";
import { Wrapper } from "../../../assets/styles/wrappers/singlePost";
import { onPostToggle } from "../../../redux/features/toggleSlice";
import { doGetApiMethod } from "../../../services/axios-service/axios-service";
import PostHeader from "../../../shared/components/postHeader/postHeader";
import PopUPModel from "../../../shared/UI/popup/popUpSinglePost";
import BallTriangleLoader from "../../../shared/components/loader/ballTriangle/ballTriangle";
import Likes from "../posts-likes/likes";
import ImgController from "./imgController";
import MapBylocation from "./mapBylocation";
import PostInfo from "./postInfo";
import UserInfo from "./userInfo";

import { useSelector } from "react-redux";

const SinglePost = ({ post }) => {
    const { user } = useSelector((state) => state.userSlice);
    const [isLoading, setIsLoading] = useState(true);
    const [isChange, setIsChange] = useState(false);
    const [rank, setRank] = useState({});
    useEffect(() => {
        getUserRating();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChange]);
    /** get rating from api */
    const getUserRating = async () => {
        let url = `/users/getRank/${post?.creator_id._id}?rankingUser=${user?._id}`;
        const { data } = await doGetApiMethod(url);
        setRank(data);
        setIsLoading(false);
    };
    return (
        <PopUPModel action={onPostToggle}>
            <Wrapper>
                {isLoading ? (
                    <div className="loader w-full flex justify-center items-center h-full">
                        <BallTriangleLoader width={"150px"} height={"150px"} />
                    </div>
                ) : (
                    // images
                    <section className="flex flex-wrap">
                        <ImgController post={post} />
                        {/* post context */}
                        <main className="overflow-y-scroll">
                            <hr />
                            {post && <PostHeader post={post} />}
                            <hr />
                            <div className="flex flex-wrap mt-2">
                                <div className="post-info md:w-1/2 border w-full">
                                    <PostInfo post={post} owner={post.creator_id} user={user} />
                                </div>
                                <div className="post-likes md:w-1/2 border w-full">
                                    <Likes likes={post?.likes} action={onPostToggle} />
                                </div>
                            </div>
                            <UserInfo
                                owner={post.creator_id}
                                rank={rank}
                                post={post}
                                isChange={isChange}
                                setIsChange={setIsChange}
                            />
                            <div className="p-2 overflow-hidden">
                                <MapBylocation results={post?.collect_points} center={post?.collect_points[0]} />
                            </div>
                        </main>
                    </section>
                )}
            </Wrapper>
        </PopUPModel>
    );
};

export default SinglePost;
