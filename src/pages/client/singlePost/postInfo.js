import React from "react";
import ChatAndWhatsup from "../../../shared/components/chat-whatsUp";

const PostInfo = ({post, user, owner}) => {
    return (
        <div className="h-full w-full mb-3 capitalize">
            <h2 className="text-center">Product Info</h2>
            <ul className="ml-2 leading-8 ">
                <li>product name: {post.title}</li>
                <li>posted on: {new Date(post?.createdAt).toLocaleDateString()}</li>
                <li>last update: {new Date(post?.updatedAt).toLocaleDateString()}</li>
                <li>
                    availbilty: {new Date(post?.available_from).toLocaleDateString()}
                </li>
            </ul>
            <div className="w-full text-center flex justify-center mt-7">
                {user ? <ChatAndWhatsup post={post} user={user} owner={owner}/> : null}
            </div>
        </div>
    );
};

export default PostInfo;
