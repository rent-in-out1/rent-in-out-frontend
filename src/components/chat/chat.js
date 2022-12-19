import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "../style/wrappers/registerPage";
import LoadingButton from "./../UI/spinnerButton";
import { Wrapper } from "./../style/wrappers/chat";
import { errorHandler } from './../../services/service';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const Chat = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { firstName , lastName } = useSelector((state) => state.userSlice.user.fullName);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState(null);
  const {roomID} = useParams();
  useEffect(() => {
    setSocket(io("http://localhost:3001"));
    return () =>{
      let url ="messages/"+roomID
    }
  }, [roomID]);
  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room" , {roomID})
    socket.on("messege-back", (data) => {
      setChat((prev) => [...prev, { message: data.message , userName: data.userName, received: true }]);
    });
    socket.on("recieve-typing" , ()=> setTyping(true))
    socket.on("notRecieve-typing" , ()=> setTyping(false))
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(message.length < 1) return errorHandler("Please enter at least one letter")
    socket.emit("send-messege", { message , roomID , userName: firstName +" " + lastName });
    setChat((prev) => [...prev, { message: message, userName: firstName +" " + lastName, received: false }]);
    setMessage("");
  };
  const handleInput = (e) => { 
    setMessage(e.target.value)
    socket.emit("typing-start" , {roomID})
    if(typingTimeOut) clearTimeout(typingTimeOut)

    setTypingTimeOut(setTimeout(()=>{
        socket.emit("typing-end" , { roomID })
    },1000))
  }
  return (
    <Wrapper>
      <div className="w-8/12 flex flex-col items-center justify-center text-center mx-auto shadow-xl p-3 bg-gray-300 rounded-xl">
        {chat.length > 0 && (
          <ul className="mb-5 w-full flex flex-col bg-gray-200 p-4 rounded">
            {chat.map((data, i) => (
              <li
                key={i}
                className={`shadow-xl mt-3 ${
                  !data.received ? "self-start" : "self-end"
                } py-1 px-4 bg-white rounded`}
              >
                <div className="flex flex-col">
                <small className={`p-0 capitalize ${!data.received ? "self-start" : "self-end"}`}>{data.userName}</small>
                <hr/>
                <p className={`p-0 ${data.received ? "self-start" : "self-end"}`}>{data.message}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-8/12 md:w-full text-center mt-3"
        >
          <div className="flex flex-col justify-center">
            <small className={`self-start ${!typing ? "hidden": ""}`}>Typing...</small>
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
