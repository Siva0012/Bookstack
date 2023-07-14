import { useState , useEffect } from "react";
import { getChatMember } from "../../../Utils/AdminApis";

function MemberData({data , adminId}) {

  const [memberData, setMemberData] = useState({});

  useEffect(() => {
    const memberId = data.members.find((id) => id !== adminId)
    getChatMember(memberId)
    .then((response) => {
      if(response.data.memberData) {
        setMemberData(response.data.memberData)
      }
    })

  } , [])

  return (
      <div className="flex items-center mb-2 py-2 px-3 bg-black text-white shadow-[0px_0px_3px_rgba(255,255,255,0.8)] rounded-xl">
        <div className="lg:w-12 lg:h-12">
          <img
            className="h-full w-full rounded-full object-contain"
            src={memberData ? memberData.profilePicture : '../../../../public/public-images/image.jpg'}
            alt=""
          />
        </div>
        <div className="lg:ms-4">
          <h2>{memberData.name}</h2>
          <span className="text-sm capitalize text-green-600">Online</span>
        </div>
      </div>
  );
}

export default MemberData;
