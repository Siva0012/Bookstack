import ChatContainer from "../../Components/Members/Chat/ChatContainer";
import MemberList from "../../Components/Members/Chat/MemberList.jsx";
import {useState , useEffect} from "react"
import { useSelector } from "react-redux";
import { getChats } from "../../Utils/ChatApis";

function ChatPage() {
  const memberId = useSelector((state) => state.memberData.value._id)
  const [chats, setChats] = useState([]);
  const [chatId, setchatId] = useState(null);

  useEffect(() => {
    getChats(memberId)
    .then((response) => {
      if(response.data.chat) {
        setChats(response.data.chat)
        setchatId(response.data.chat[0]._id)
      }
    })
  } , [])
  return (
      <div className="text-white font-nunito">
      <div className="flex lg:h-[500px]">
        <div className="lg:w-[30%]">
          <MemberList/>
        </div>
        <div className="lg:w-[67%] lg:ms-auto ">
          <ChatContainer currentChat={chats[0]} memberId={memberId} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
