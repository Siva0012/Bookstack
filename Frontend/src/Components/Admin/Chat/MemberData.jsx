import { useState, useEffect } from "react";
import { getChatMember } from "../../../Utils/AdminApis";
import { useSelector } from "react-redux";

function MemberData({
  data,
  adminId,
  checkOnlineStatus,
  sendMessage,
  receivedMessages,
  order,
  unreadCount,
}) {
  const [memberData, setMemberData] = useState({});
  const adminID = useSelector((state) => state.adminData?.value?._id);
  const memberId = data.members.find((id) => id !== adminId);
  useEffect(() => {
    if (memberId) {
      getChatMember(memberId).then((response) => {
        if (response.data.memberData) {
          setMemberData(response.data.memberData);
        }
      });
    }
  }, [memberId, sendMessage, receivedMessages]);

  return (
    <div className="flex relative items-center mb-2 py-2 px-3 bg-black text-white shadow-[0px_0px_3px_rgba(255,255,255,0.8)] rounded-xl">
      <div className="lg:w-12 lg:h-12">
        {checkOnlineStatus(data) ? (
          <div className="absolute left-3 z-[2] w-2 h-2 rounded-full bg-green-500"></div>
        ) : (
          ""
        )}
        <img
          className="h-full w-full rounded-full object-contain"
          src={
            memberData.profilePicture
              ? memberData.profilePicture
              : "/public-images/image.jpg"
          }
          alt=""
        />
      </div>
      <div className="lg:ms-4">
        <h2>{memberData.name}</h2>
        <span className="text-[13px] capitalize">
          {checkOnlineStatus(data) ? (
            <span className="text-green-600">Online</span>
          ) : (
            <span className="text-gray-600 italic">Offline</span>
          )}
        </span>
        {unreadCount > 0 && (
          <div className="bg-gray-600 ring-[1px] flex items-center justify-center ring-white rounded-full w-4 h-4">
            <span className="text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberData;
