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

  console.log("admindata", admin);

  return (
    <div className="flex relative items-center mb-2 py-2 px-3 bg-user-nav text-black shadow-[0px_0px_3px_rgba(0,0,0,0.5)] rounded-xl">
      <div className="lg:w-10 lg:h-10">
        {checkOnlineStatus(admin.id) ? (
          <div className="absolute left-3 z-[2] w-2 h-2 rounded-full bg-green-500"></div>
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
            <span className="text-green-600">Online</span>
          ) : (
            <span className="text-gray-600 italic">Offline</span>
          )}
        </span>
      </div>
    </div>
  );
}

export default AdminData;
