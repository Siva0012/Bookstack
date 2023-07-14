import ChatContainer from "../../Components/Admin/Chat/ChatContainer";
import MemberList from "../../Components/Admin/Chat/MemberList";
import {useState , useEffect} from 'react'


//chat APIs
import { getChats } from "../../Utils/ChatApis";

function ChatPage() {

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const adminId = "647dc525dccb0c01b947eef4" //store in redux
  useEffect(() => {
    getChats(adminId)
    .then((response) => {
      if(response.data.chat) {
        setChats(response.data.chat)
      }
    })
  } , [])

  return (
    <div className="text-white px-14 mt-6 font-nunito">
      <div className="flex lg:h-[500px]">
        <div className="lg:w-[30%]">
          <MemberList setCurrentChat={setCurrentChat} chats={chats} adminId={adminId}  />
        </div>
        <div className="lg:w-[67%] lg:ms-auto ">
          <ChatContainer currentChat={currentChat} adminId={adminId} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
