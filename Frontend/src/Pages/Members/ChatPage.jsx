import ChatContainer from "../../Components/Members/Chat/ChatContainer";
import MemberList from "../../Components/Members/Chat/MemberList.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

//socket
import { io } from "socket.io-client";
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

//chat APIs
import { getChats , createChat } from "../../Utils/ChatApis";

function ChatPage() {
  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState(null);

  const memberId = useSelector((state) => state.memberData.value._id);
  const [chats, setChats] = useState([]);
  const [chatId, setchatId] = useState(null);

  //creating a new chat
  const handleCreateChat = useCallback(() => {
    createChat({senderId : memberId})
    .then((response) => {
      if(response.data.result) {
        const newChatId = response.data.result._id
        setchatId(newChatId)
      }
    })
  } , [memberId])

  useEffect(() => {
    socket.current = io(baseUrl);
    socket.current.emit("add-new-user", memberId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [memberId]);

  useEffect(() => {
    getChats(memberId).then((response) => {
      if (response.data.chat.length) {
        setChats(response.data.chat);
        setchatId(response.data.chat[0]._id);
      }
    });
  }, [handleCreateChat , chatId]);

  //sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //receive message from the socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceivedMessages(data);
    });
  }, []);

  //check online users
  const checkOnlineStatus = (adminId) => {
    const online = onlineUsers.find((user) => user.userId === adminId)
    return online ? true : false
  }
  console.log(onlineUsers , "onlineusers");

  return (
    <div className="text-white font-nunito">
      <div className="flex lg:h-[500px] ">
        <div className="lg:w-[30%] ">
          <MemberList chatId={chatId} handleCreateChat={handleCreateChat} checkOnlineStatus={checkOnlineStatus} />
        </div>
        <div className="lg:w-[67%] lg:ms-auto ">
          <ChatContainer
            currentChat={chats[0]}
            memberId={memberId}
            setSendMessage={setSendMessage}
            receivedMessages={receivedMessages}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
