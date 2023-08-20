import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FillChat from "../../../assets/icons/fillChat";
import { onInboxClose } from "../../../redux/features/toggleSlice";
import { getUserInbox } from "../../../redux/features/userSlice";
import UserSingleChat from "./userSingleChat/userSingleChat";
const SideBarChat = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { user, inbox } = useSelector((state) => state.userSlice);

    useEffect(() => {
        dispatch(getUserInbox());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="lg:w-3/12 xl:w-2/12 p-1 top-16 -right-1 lg:fixed">
            <div className="overflow-y-auto py-4 w-full mt-4 text-center px-2 bg-white lg:shadow-xl rounded">
                <div className="flex justify-between">
                    <h3 className="flex items-center">
                            <span className="pr-1">Chats</span> <FillChat width={20}/>
                    </h3>
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
                                <UserSingleChat msg={msg} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-sm text-center rounded py-1">No messages</div>
                )}
            </div>
        </div>
    );
};

export default SideBarChat;
