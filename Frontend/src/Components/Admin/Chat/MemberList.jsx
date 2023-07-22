import { BiSearch } from "react-icons/bi";
import MemberData from "./MemberData";
import { useEffect } from "react";

//chat APIs

function MemberList({chats , adminId , setCurrentChat  , checkOnlineStatus , sendMessage , receivedMessages , unreadCount , unreadMessages}) {

 const handleClick = (chat , unreadMessages) => {
  setCurrentChat(chat)
  unreadMessages[chat?._id] = 0
 }

  return (
    <div className="rounded-lg p-2 h-full">
      <div
        id="search-div"
        className="rounded-lg flex items-center justify-between"
      >
        <input
          className="rounded-md lg:h-[2rem] w-full"
          type="text"
          name="members"
          placeholder="Members"
        />
        {/* <label className="ms-2" htmlFor="members">
          <BiSearch size={28} />
        </label> */}
      </div>
      <div id="user-div" className="mt-4">
        {
          chats && 
          chats.map((chat , i) => {
            return(
              <div
              className="cursor-pointer"
              onClick={() => handleClick(chat , unreadMessages) }
               key={i}>
                <MemberData data={chat} adminId={adminId} checkOnlineStatus={checkOnlineStatus} sendMessage={sendMessage} receivedMessages={receivedMessages} order={i} unreadCount={unreadMessages[chat?._id] || 0} />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default MemberList;
