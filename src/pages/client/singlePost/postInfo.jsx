import React from "react";
import { availableTimeStampHelper, checkIfPostAvailableHelper, unitTimeToCreatedTimeHelper } from "../../../services/extra-services/extra-services";
import ChatAndWhatsup from "../../../shared/components/chat-whatsUp";

const PostInfo = ({ post, user, owner }) => {
    return (
        <div className="h-full w-full mb-3">
            <h2 className="text-center">Product Info</h2>
            <ul className="ml-2 leading-8 ">
                <li>Product name: {post.title}</li>
                <li>Posted {unitTimeToCreatedTimeHelper(post?.createdAt)}</li>
                <li>Last update {unitTimeToCreatedTimeHelper(post?.updatedAt)}</li>
                <li className="text-center">
                    {checkIfPostAvailableHelper(post?.available_from) ?
                        <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400">Available</span> :
                        <div>Will be available in {availableTimeStampHelper(post.available_from)}</div>}
                </li>
            </ul>
            <div className="w-full text-center flex justify-center mt-7">
                {user ? <ChatAndWhatsup post={post} user={user} owner={owner} /> : null}
            </div>
        </div>
    );
};

export default PostInfo;
