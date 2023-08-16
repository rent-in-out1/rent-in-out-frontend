import React from 'react';
import { useDispatch } from 'react-redux';
import { onLikesToggle } from '../../../redux/features/toggleSlice';

const RecentLikes = ({ likes }) => {
    const dispatch = useDispatch();

    return (
        <div onClick={(e) => {
            e.stopPropagation();
            dispatch(onLikesToggle(likes));
        }}
            className="flex items-center cursor-pointer">
            <span className="text-xs font-semibold mr-1 rounded">
                {likes.length || "Likes: 0"}
            </span>
            <div className="flex items-center justify-between relative">
                {likes.slice(0, 3).map((like, i) => {
                    return (
                        <div
                            key={like._id}
                            className={`w-6 h-6 bg-red-200 border rounded-full absolute -top-3 left-${i * 4}`}>
                            <img
                                title={like?.fullName?.firstName}
                                className="w-full h-full rounded-full object-cover"
                                src={like.profile_img?.url}
                                alt="profile"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentLikes;