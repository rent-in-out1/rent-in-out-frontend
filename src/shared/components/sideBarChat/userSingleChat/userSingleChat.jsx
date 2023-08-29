import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import ExitFill from "../../../../assets/icons/exitFill";
import ExitNoFill from "../../../../assets/icons/exitNoFill";
import { getUserInbox } from "../../../../redux/features/userSlice";
import { doApiMethod } from "../../../../services/axios-service/axios-service";

const UserSingleChat = ({ msg }) => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { roomID } = useParams();
    const { user } = useSelector((state) => state.userSlice);
    const [over, setOver] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const deleteChat = async () => {
        let url = `/users/deleteChat/${msg._id}`;
        await doApiMethod(url, "DELETE");
        dispatch(getUserInbox());
        if (roomID === msg.roomID) {
            user.role === "admin"
                ? nav(`/admin`)
                : nav(`/`);
        }
    };
    return (
        <div
            onMouseOver={() => setShowDel(true)}
            onMouseLeave={() => setShowDel(false)}
            className="cursor-pointer mt-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-xl shadow transition ease-out delay-150 "
        >
            <div className="info flex items-center justify-between">
                <div className="flex">
                    <div className="profile w-5 h-5 mr-1">
                        <img
                            className="h-full w-full object-cover rounded-full"
                            src={user?._id === msg.creatorID ? msg?.userImg : msg?.ownerImg}
                            alt={user?._id === msg.creatorID ? msg?.userName : msg?.ownerName}
                        />
                    </div>
                    <div className="firstName text-sm capitalize rounded">
                        {user._id === msg.creatorID ? msg.userName : msg.ownerName}
                    </div>
                </div>
                {showDel ? (<span
                    className="mr-1 rounded-full"
                    onMouseOver={() => setOver(true)}
                    onMouseLeave={() => setOver(false)}
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteChat();
                    }}
                >
                    {over ? (
                        <ExitFill className="icon" width={16} height={16} />
                    ) : (
                        <ExitNoFill className="icon" width={16} height={16} />
                    )}
                </span>) : null}
            </div>
            <div className="chatOverView bg-gray-50 text-xs mt-2 p-1">
                {msg?.messagesArr[msg?.messagesArr?.length - 1]?.message}
            </div>
        </div>
    );
};

export default UserSingleChat;
