import { useState, useEffect } from "react";
import { getAdmin } from "../../../Utils/MemberApis";

function AdminData({ checkOnlineStatus }) {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    getAdmin().then((response) => {
      if (response.data.admin) {
        setAdmin(response.data.admin);
      }
    });
  }, []);


  return (
    // <div className="flex relative items-center mb-2 py-2 px-3 bg-[#471b00]/30 text-white rounded-xl">
    <div className={`flex relative items-center mb-2 py-2 px-3 bg-[#471b00]/30 text-white rounded-xl ${checkOnlineStatus(admin.id) ? "ring-[2px] ring-[#007667]" : ""}`}>
      <div className="lg:w-10 lg:h-10">
        {checkOnlineStatus(admin.id) ? (
          <div className="absolute left-[7px] z-[2] w-2 h-2 rounded-full bg-[#007667]"></div>
        ) : (
          ""
        )}
        <img
          className="h-full w-full rounded-full"
          src="../../../../public/public-images/image.jpg"
          alt=""
        />
      </div>
      <div className="lg:ms-4">
        <h2 className="capitalize">{admin && admin.name}</h2>
        <span className="text-sm">
          {checkOnlineStatus(admin.id) ? (
            <span className="text-white italic">Online</span>
          ) : (
            <span className="text-gray-300 italic">Offline</span>
          )}
        </span>
      </div>
    </div>
  );
}

export default AdminData;
