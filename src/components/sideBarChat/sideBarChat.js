import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { doGetApiMethod } from "../../services/service";
import Chat from "../icons/chat";
import UserSingleChat from "../userSingleChat/userSingleChat";
import { getUserInbox } from "./../../redux/features/userSlice";
const SideBarChat = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { user, inbox } = useSelector((state) => state.userSlice);
  useEffect(() => {
    dispatch(getUserInbox());
  }, []);
  return (
    <div className="md:w-3/12 lg:w-2/12 p-2 fixed top-16 hidden md:flex">
      <div className="overflow-y-auto py-4 w-full mt-4 px-2 bg-white shadow-xl rounded">
        <div className="flex justify-between">
          <h2 className="flex items-center">
            <span className="mx-auto text-center mr-1">Chats</span>
            <hr/>
            <span>
              <Chat />
            </span>
          </h2>
        </div>
        {/* all users with last chat here */}
        <div className="overflow-y-auto ">
        {inbox.map((msg) => (
          <div
            key={msg.roomID}
            onClick={() => {
              user.role === "admin"
                ? nav(`/admin/chat/${msg.roomID}/${msg.creatorID}`)
                : nav(`/chat/${msg.roomID}/${msg.creatorID}`);
            }}
          >
            <UserSingleChat msg={msg} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SideBarChat;
