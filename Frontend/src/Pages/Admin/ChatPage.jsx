import ChatContainer from "../../Components/Admin/Chat/ChatContainer";
import MemberList from "../../Components/Admin/Chat/MemberList";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import socketInstance from "../../Socket/socket";

//socket
// import { io } from "socket.io-client";
// const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

//chat APIs
import { getChats } from "../../Utils/ChatApis";

function ChatPage() {
  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState(null);

  const adminId = "647dc525dccb0c01b947eef4"; //store in redux
  // const adminId = useSelector(state => state.adminData.value._id)
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    socket.current = socketInstance;
    socket.current.emit("add-new-user", adminId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    socket.current.on("receive-message", (data) => {
      setReceivedMessages(data);
      handleReceivedMessages(data, currentChat);
    });
  }, [adminId, currentChat]);

  useEffect(() => {
    getChats(adminId).then((response) => {
      if (response.data.chat) {
        setChats(response.data.chat);
      }
    });
  }, [onlineUsers, receivedMessages, sendMessage]);

  //sending message to socket server
  useEffect(() => {
    if (sendMessage != null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //receive message from the socket server

  //handle received messages
  const handleReceivedMessages = async (data, currentChat) => {
    // setReceivedMessages(data)
    const { chatId } = data;
    setUnreadMessages((prevState) => {
      const currentChatId = currentChat?._id.toString();
      if (prevState[chatId]) {
        if (prevState[chatId] && currentChatId !== chatId.toString()) {
          return {
            ...prevState,
            [chatId]: prevState[chatId] + 1,
          };
        } else if (currentChatId === chatId.toString()) {
          return {
            ...prevState,
            [chatId]: 0,
          };
        }
      } else if (!prevState[chatId]) {
        return {
          ...prevState,
          [chatId]: 1,
        };
      }
    });
  };

  //check online users
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== adminId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="text-white px-14 mt-6 font-nunito">
      <div className="flex lg:h-[500px]">
        <div className="lg:w-[30%]">
          <MemberList
            setCurrentChat={setCurrentChat}
            chats={chats}
            adminId={adminId}
            checkOnlineStatus={checkOnlineStatus}
            sendMessage={sendMessage}
            receivedMessages={receivedMessages}
            unreadMessages={unreadMessages}
          />
        </div>
        <div className="lg:w-[67%] lg:ms-auto ">
          <ChatContainer
            currentChat={currentChat}
            adminId={adminId}
            setSendMessage={setSendMessage}
            receivedMessages={receivedMessages}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
