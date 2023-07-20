import ChatContainer from "../../Components/Admin/Chat/ChatContainer";
import MemberList from "../../Components/Admin/Chat/MemberList";
import {useState , useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'

//socket 
import {io} from 'socket.io-client'
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL

//chat APIs
import { getChats } from "../../Utils/ChatApis";

function ChatPage() {

  const socket = useRef()

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState(null);

  const adminId = "647dc525dccb0c01b947eef4" //store in redux
  // const adminId = useSelector(state => state.adminData.value._id)
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    socket.current = io(baseUrl)
    socket.current.emit('add-new-user' , adminId)
    socket.current.on('get-users' , (users) => {
      setOnlineUsers(users)
    })

  } , [adminId])

  useEffect(() => {
    getChats(adminId)
    .then((response) => {
      if(response.data.chat) {
        setChats(response.data.chat)
      }
    })
  } , [onlineUsers , receivedMessages])

  //sending message to socket server
  useEffect(() => {
    if(sendMessage != null) {
      socket.current.emit('send-message' , sendMessage) 
    }
  } , [sendMessage])

  //receive message from the socket server
  useEffect(() => {
    socket.current.on('receive-message' , (data) => {
      setReceivedMessages(data)
    })
  } , [])

  //check online users
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== adminId)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false
  }

  return (
    <div className="text-white px-14 mt-6 font-nunito">
      <div className="flex lg:h-[500px]">
        <div className="lg:w-[30%]">
          <MemberList setCurrentChat={setCurrentChat} chats={chats} adminId={adminId} checkOnlineStatus={checkOnlineStatus} />
        </div>
        <div className="lg:w-[67%] lg:ms-auto ">
          <ChatContainer currentChat={currentChat} adminId={adminId} setSendMessage={setSendMessage} receivedMessages={receivedMessages} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
