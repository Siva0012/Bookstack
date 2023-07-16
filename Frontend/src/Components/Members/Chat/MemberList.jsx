import { BiSearch } from "react-icons/bi";
import {AiOutlinePlusCircle} from 'react-icons/ai'

import AdminData from "./AdminData";

function MemberList({chatId , handleCreateChat , checkOnlineStatus}) {
  return (
    <div className="rounded-lg p-2 h-full bg-user-nav shadow-[0px_0px_3px_rgba(255,255,255,0.2)]">
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
          chatId ? 
          <div>
            <AdminData checkOnlineStatus={checkOnlineStatus} />
          </div> : 
          <div 
          onClick={handleCreateChat}
          className="outline outline-gray-400 rounded-md p-2 text-black flex items-center justify-center hover:cursor-pointer hover:bg-blue-500">
            <p>Start a conversation with Admin</p>
            <span className="ms-2"><AiOutlinePlusCircle size={22} /></span>
          </div>
        }
        {/* <div>
          <AdminData />
        </div> */}
        {/* {
          chats && chats.map((chat , i) => {
            return (
              <div onClick={() => setCurrentChat(chat)}>
                <AdminData data={chat} memberId={memberId} />
              </div>
            )
          })
        } */}
      </div>
    </div>
  );
}

export default MemberList;
