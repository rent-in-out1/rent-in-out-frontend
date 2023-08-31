import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import ExitFill from "../../../../assets/icons/exitFill";
import ExitNoFill from "../../../../assets/icons/exitNoFill";
import { getUserInbox } from "../../../../redux/features/userSlice";
import { doApiMethod } from "../../../../api/services/axios-service/axios-service";
import { contains_heb } from "../../../../util/functions";

const UserSingleChat = ({ msg }) => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { roomID } = useParams();
    const { user } = useSelector((state) => state.userSlice);
    const [over, setOver] = useState(false);

    const deleteChat = async () => {
        let url = `/users/deleteChat/${msg._id}`;
        if (confirm(`Are you sure you want to delete chat with - ${msg.ownerName}`))
            await doApiMethod(url, "DELETE");
        dispatch(getUserInbox());
        if (roomID === msg.roomID) {
            user.role === "admin"
                ? nav(`/admin`)
                : nav(`/`);
        }
    };

    return (
        <div className="cursor-pointer mb-3 bg-gray-100 hover:bg-gray-200 rounded-xl shadow transition ease-out delay-150">
            {/* message header */}
            <div className="info flex items-center justify-between px-1">
                {/* profile */}
                <div className="flex items-center py-1 px-1">
                    {/* profile image */}
                    <div className="profile w-5 h-5 mr-1">
                        <img
                            className="h-full w-full object-cover rounded-full"
                            src={user?._id === msg.creatorID ? msg?.userImg : msg?.ownerImg}
                            alt={user?._id === msg.creatorID ? msg?.userName : msg?.ownerName}
                        />
                    </div>
                    {/* profile name */}
                    <div className="firstName text-sm capitalize rounded">
                        {user._id === msg.creatorID ? msg.userName : msg.ownerName}
                    </div>
                </div>
                <span
                    className="ml-1 rounded-full"
                    onMouseOver={(e) => {
                        e.stopPropagation();
                        setOver(true);
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        setOver(false);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteChat();
                    }}
                >
                    {over ? (
                        <ExitFill className="icon" color="#6B7280" width={18} height={18} />
                    ) : (
                        <ExitNoFill className="icon" inLineFill="#6B7280" width={18} height={18} />
                    )}
                </span>
            </div>
            {/* message body */}
            <div className="bg-gray-50 text-start py-2 px-1">
                <div className="text-slate-400 mt-1 py-1 px-2 bg-white text-xs" dir={contains_heb(msg?.messagesArr.at(-1)?.message) ? "rtl" : "ltr"}>{msg?.messagesArr.at(-1).userName} : {msg?.messagesArr.at(-1)?.message}</div>
            </div>
        </div>
    );
};

export default UserSingleChat;
