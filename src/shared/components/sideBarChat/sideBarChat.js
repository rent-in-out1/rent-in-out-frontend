import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import UserSingleChat from "./userSingleChat/userSingleChat";
import {getUserInbox} from "../../../redux/features/userSlice";
import {onInboxClose} from "../../../redux/features/toggleSlice";
// import Chat from "./../../../assets/icons/chat";
const SideBarChat = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const {user, inbox} = useSelector((state) => state.userSlice);
    useEffect(() => {
        dispatch(getUserInbox());
    }, []);
    return (
        <div className="chats lg:w-1/6 p-1 top-16 -right-1 fixed hidden lg:inline-block">
            <div className="overflow-y-auto py-4 w-full mt-4 text-center px-2 bg-white lg:shadow-xl rounded">
                <div className="flex justify-between">
                    <h2 className="flex items-center">
                        <span className="mx-auto text-center">Chats</span>
                    </h2>
                </div>
                {/* all users with last chat here */}
                {inbox.length > 0 ? (
                    <div className=" dropdown rounded">
                        {inbox?.map((msg) => (
                            <div
                                className="overflow-hidden"
                                key={msg.roomID}
                                onClick={() => {
                                    user.role === "admin"
                                        ? nav(`/admin/chat/${msg.roomID}/${msg.creatorID}`)
                                        : nav(`/chat/${msg.roomID}/${msg.creatorID}`);
                                    dispatch(onInboxClose());
                                }}
                            >
                                <UserSingleChat msg={msg}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2 className="w-full text-center shadow rounded py-1">Your inbox is empty</h2>
                )}
            </div>
        </div>
    );
};

export default SideBarChat;
