import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExitFill from "../icons/exitFill";
import ExitNoFill from "../icons/exitNoFill";

const UserSingleChat = ({ msg }) => {
  const { user } = useSelector((state) => state.userSlice);
  const [over, setOver] = useState(false);
  return (
    <div className="cursor-pointer mt-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-xl shadow transition ease-out delay-150 ">
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
            {/* {user.fullName.firstName} */}
            {user._id === msg.creatorID ? msg.userName : msg.ownerName}
          </div>
        </div>
        <span
          className="mr-1 rounded-full"
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
          onClick={() => {
            // dispatch(action());
          }}
        >
          {over ? (
            <ExitFill className="icon" width={16} height={16} />
          ) : (
            <ExitNoFill className="icon" width={16} height={16} />
          )}
        </span>
      </div>
      <div className="chatOverView bg-gray-50 text-xs mt-2 p-1">
        {msg?.messagesArr[msg?.messagesArr?.length - 1].message}
      </div>
    </div>
  );
};

export default UserSingleChat;
