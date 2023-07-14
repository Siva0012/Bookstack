import { BiSearch } from "react-icons/bi";

import AdminData from "./AdminData";

function MemberList() {
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
        <div>
          <AdminData />
        </div>
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
