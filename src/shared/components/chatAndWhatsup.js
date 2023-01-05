import React from 'react'
import WebChat from '../../assets/icons/webChat';
import { onRegisterShow } from '../../redux/features/toggleSlice';
import Chat from './../../assets/icons/chat';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatAndWhatsup = ({user, owner, post}) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
  return (
    <React.Fragment>
    {user?._id !== owner?._id ? (
        <div className="flex h-8 overflow-hidden">
          <div className="h-full mr-1">
            <a
              href={`https://wa.me/+972${owner?.phone}?text=Hello ${owner?.fullName?.firstName} ${owner?.fullName?.lastName} i saw your item ${post.title} from rentInOut. \n i would like to rent it !`}
              target={"_blank"}
              rel="noreferrer"
              onClick={(e)=>e.stopPropagation()}
              style={{ background: "	#25D366" }}
              className="h-full mb-1 items-center md:mb-0 flex font-small rounded-lg text-xs px-2 py-2 md:px-2.5 md:py-1.5"
            >
              <Chat color="white" />
            </a>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()
              !user
                ? dispatch(onRegisterShow())
                : user.role === "admin"
                  ? nav(`/admin/chat/${owner._id}${user._id}/${owner._id}`)
                  : nav(`/chat/${owner._id}${user._id}/${owner._id}`);
            }}
            className="h-full cursor-pointer text-white justify-center items-center flex bg-blue-400 hover:bg-blue-800 font-small rounded-lg text-xs px-2 py-2 md:px-2.5 md:py-1 lg:py-1.5"
          >
            <p className="mr-1  text-xs capitalize lg:text-lg">Chat</p>
            <WebChat color="white" />
          </div>
        </div>
      ) : null}
      </React.Fragment>
  )
}

export default ChatAndWhatsup