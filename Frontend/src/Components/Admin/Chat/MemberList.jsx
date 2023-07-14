import { BiSearch } from "react-icons/bi";
import MemberData from "./MemberData";
import {useState , useEffect} from 'react'

//chat APIs
import { getChats } from "../../../Utils/ChatApis";

function MemberList() {

  const [chats, setChats] = useState([]);
  const adminId = "647dc525dccb0c01b947eef4"
  useEffect(() => {
    getChats(adminId)
    .then((response) => {
      if(response.data.chat) {
        console.log(response.data.chat);
        setChats(response.data.chat)
      }
    })
  } , [])
  

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
              <MemberData key={i} data={chat} adminId={adminId} />
            )
          })
        }
      </div>
    </div>
  );
}

export default MemberList;
