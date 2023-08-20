import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doGetApiMethod } from "../../../../services/axios-service/axios-service";
import Card from "../../../../shared/components/card/card";
import LoadingCard from "../../../../shared/components/loadingComponents/loadingCard/loadingCard";

const OwnPosts = ({ id }) => {
    const [posts, setPosts] = useState([]);
    const { isChange } = useSelector(state => state.postsSlice);
    useEffect(() => {
        getUserPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChange, id]);

    const getUserPosts = async () => {
        let url = `/posts/userPosts/${id}`;
        const { data } = await doGetApiMethod(url);
        setPosts(data);
    };
    return (
        <React.Fragment>
            {posts.length > 0 ?
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-4 mx-auto mt-3">
                    {posts ?
                        posts?.map((post) => (
                            <Card post={post} key={post._id} />
                        )) :
                        <React.Fragment>
                            {Array.from(Array(8)).map(() => (
                                <LoadingCard key={crypto.randomUUID()} />
                            ))}
                        </React.Fragment>
                    }


                </div> : <h4 className=" flex justify-center">No posts yet</h4>}
        </React.Fragment>
    );
};

export default OwnPosts;
