import ChatContainer from "../../Components/Members/Chat/ChatContainer";
import MemberList from "../../Components/Members/Chat/MemberList.jsx";

function ChatPage() {
  return (
      <div className="text-white font-nunito">
      <div className="flex lg:h-[500px]">
        <div className="lg:w-[30%]">
          <MemberList />
        </div>
        <div className="lg:w-[67%] lg:ms-auto ">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
