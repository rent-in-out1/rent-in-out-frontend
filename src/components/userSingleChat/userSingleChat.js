import React from "react";
import { useSelector } from "react-redux";

const UserSingleChat = ({ msg }) => {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className="cursor-pointer mt-2 p-1 hover:bg-gray-100">
        <div className="info flex items-center">
          <div className="profile w-5 h-5 mr-1">
            <img
              className="h-full w-full object-cover rounded-full"
              src={user._id === msg.creatorID ? msg.userImg : msg.ownerImg}
              alt={user._id === msg.creatorID ? msg.userName :msg.ownerName}
            />
          </div>
          <div className="firstName text-sm capitalize">
            {/* {user.fullName.firstName} */}
            {user._id === msg.creatorID ? msg.userName : msg.ownerName}
          </div>
        </div>
      <div className="chatOverView bg-gray-50 text-xs mt-2 p-1">
        {msg?.messagesArr[msg?.messagesArr.length - 1].message}
      </div>
    </div>
  );
};

export default UserSingleChat;
