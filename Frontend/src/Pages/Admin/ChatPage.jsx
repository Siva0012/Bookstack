import ChatContainer from "../../Components/Admin/Chat/ChatContainer";
import MemberList from "../../Components/Admin/Chat/MemberList";

function ChatPage() {
  return (
    <div className="text-white px-14 mt-6 font-nunito">
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
