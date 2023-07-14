import { BiSearch } from "react-icons/bi";

import {useState , useEffect} from "react"
import { useSelector } from "react-redux";

import { getChats } from "../../../Utils/ChatApis";

import AdminData from "./AdminData";

function MemberList() {

  const memberId = useSelector((state) => state.memberData.value._id)
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChats(memberId)
    .then((response) => {
      if(response.data.chat) {
        setChats(response.data.chat)
      }
    })
  } , [])


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
          chats && chats.map((chat , i) => {
            return (
              <AdminData data={chat} memberId={memberId} />
            )
          })
        }
      </div>
    </div>
  );
}

export default MemberList;
