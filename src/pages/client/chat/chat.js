import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  API_URL,
  doApiMethod,
  doGetApiMethod,
  errorHandler,
} from "../../../services/axios-service/axios-service";
import { io } from "socket.io-client";
import { Button } from "../../../assets/styles/wrappers/registerPage";
import { Wrapper } from "../../../assets/styles/wrappers/chat";
import LoadingButton from "../../../shared/components/spinner-button/spinnerButton";
import { getUserInbox } from "../../../redux/features/userSlice";
import SingleMessage from './singleMessage';

const Chat = ({ post }) => {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector(
    (state) => state.userSlice.user.fullName
  );
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [owner, setOwner] = useState({});
  const [typingTimeOut, setTypingTimeOut] = useState(null);
  const { roomID, creatorID } = useParams();
  useEffect(() => {
    setSocket(io(API_URL));
    const getChatHistory = async () => {
      let { data } = await doGetApiMethod(`/users/getChat/${roomID}`);
      if (data[0]?.messagesArr) setChat(data[0]?.messagesArr);
    };
    getChatHistory();
    getPostCreatorInfo(creatorID);
    return () => {
      dispatch(getUserInbox());
    };
  }, [roomID]);
  const getPostCreatorInfo = async (id) => {
    const { data } = await doGetApiMethod("/users/info/" + id);
    setOwner({
      name: data.userInfo.fullName,
      img: data.userInfo.profile_img?.url,
    });
  };
  const deleteMsg =(location) => {
    setChat(chat.splice(location , 1))
    if(chat.length  < 1 ) {
      user.role === "admin"
      ? nav(`/admin`)
      : nav(`/`);
    }
  }
  const messageSave = async () => {
    let url = "/users/chatUpdate";
    let messageObj = {
      ownerName: owner?.name?.firstName + " " + owner?.name?.lastName,
      ownerImg: owner?.img,
      userName: firstName + " " + lastName,
      userImg: user?.profile_img.url,
      roomID,
      creatorID,
      userID:user._id,
      messagesArr: [
        ...chat,
        {
          message: message,
          userName: firstName + " " + lastName,
          sender: user._id,
        },
      ],
    };
    await doApiMethod(url, "PATCH", {
      messageObj,
      userID: user._id,
      creatorID: creatorID,
    });
    dispatch(getUserInbox())
  };
  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", { roomID });
    socket.on("messege-back", (data) => {
      setChat((prev) => [
        ...prev,
        { message: data.message, userName: data.userName, sender: data.sender },
      ]);
    });
    socket.on("recieve-typing", () => setTyping(true));
    socket.on("notRecieve-typing", () => setTyping(false));
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length < 1)
      return errorHandler("Please enter at least one letter");
    socket.emit("send-messege", {
      message,
      roomID,
      userName: firstName + " " + lastName,
      sender: user._id,
    });
    setChat((prev) => [
      ...prev,
      {
        message: message,
        userName: firstName + " " + lastName,
        sender: user._id,
      },
    ]);
    messageSave();
    setMessage("");
  };
  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit("typing-start", { roomID });
    if (typingTimeOut) clearTimeout(typingTimeOut);

    setTypingTimeOut(
      setTimeout(() => {
        socket.emit("typing-end", { roomID });
      }, 1000)
    );
  };
  return (
    <Wrapper>
      <h1>{post?.title}</h1>
      <div className="w-8/12 flex flex-col items-center justify-center text-center mx-auto shadow-xl p-3 bg-gray-300 rounded-xl">
        {chat.length > 0 && (
          <ul className="mb-5 w-full flex flex-col bg-gray-200 p-4 rounded">
            {chat.map((msg, i) => (
              <SingleMessage key={i} roomID={roomID} user={user} msg={msg} location={i} deleteMsg={deleteMsg}/>
            ))}
          </ul>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-8/12 md:w-full text-center mt-3"
        >
          <div className="flex flex-col justify-center">
            <small className={`self-start ${!typing ? "hidden" : ""}`}>
              Typing...
            </small>
            <input
              className="w-full rounded"
              type="text"
              onChange={handleInput}
              value={message}
              min="1"
            />
            <Button className="w-4/12">
              <LoadingButton type="submit">Send</LoadingButton>
            </Button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Chat;
