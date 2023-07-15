import ChatContainer from "../../Components/Members/Chat/ChatContainer";
import MemberList from "../../Components/Members/Chat/MemberList.jsx";
import {useState , useEffect, useRef} from "react"
import { useSelector } from "react-redux";

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

  const memberId = useSelector((state) => state.memberData.value._id)
  const [chats, setChats] = useState([]);
  const [chatId, setchatId] = useState(null);
  
  useEffect(() => {
    socket.current = io(baseUrl)
    socket.current.emit('add-new-user' , memberId)
    socket.current.on('get-users' , (users) => {
      setOnlineUsers(users)
    })
  } , [memberId])

  
  useEffect(() => {
    getChats(memberId)
    .then((response) => {
      if(response.data.chat) {
        setChats(response.data.chat)
        setchatId(response.data.chat[0]._id)
      }
    })
  } , [])

  //sending message to socket server
  useEffect(() => {
    if(sendMessage !== null) {
      socket.current.emit('send-message' , sendMessage)
    }
  } , [sendMessage])

  //receive message from the socket server
  useEffect(() => {
    socket.current.on("receive-message" , (data) => {
      setReceivedMessages(data)
    })
  } , [])

  return (
      <div className="text-white font-nunito">
      <div className="flex lg:h-[500px]">
        <div className="lg:w-[30%]">
          <MemberList/>
        </div>
        <div className="lg:w-[67%] lg:ms-auto ">
          <ChatContainer currentChat={chats[0]} memberId={memberId} setSendMessage={setSendMessage} receivedMessages={receivedMessages} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
