import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import moment from "moment/moment";

//admin APIs
import { getSingleMember } from "../../Utils/AdminApis";

function SingleMember() {
  const { memberId } = useParams();
  const location = useLocation();
  const member = location.state || {};
  const [memberData, setMemberData] = useState(member.data);

  useEffect(() => {
    if (!memberData) {
      getSingleMember(memberId)
        .then((response) => {
          console.log(response.data);
          setMemberData(response.data.memberData);
        })
        .catch((err) => console.log(err));
    }
  }, [memberData]);

  if (!memberData) {
    return null;
  }

  return (
    <div className="bg-bg-admin-sidebar flex flex-col items-center px-5 py-10 rounded-3xl">
      <div className="bg-white text-black min-w-[700px] p-3 rounded-2xl">
        <div id="second" className="grid grid-cols-2">
          <div id="thirda" className="p-3 grid grid-rows-5 gap-y-4">
            <div className=" bg-white px-3 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)] rounded-lg">
              <p className=" text-sm text-gray-400">Name</p>
              <p className="text-lg">{memberData.name}</p>
            </div>
            <div className=" bg-white px-3 py-2 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)] rounded-lg">
              <p className=" text-sm text-gray-400">email</p>
              <p className="text-lg">{memberData.email}</p>
            </div>
            <div className=" bg-white px-3 py-2 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)] rounded-lg">
              <p className=" text-sm text-gray-400">phone</p>
              <p className="text-lg">{memberData.phone}</p>
            </div>
            <div className=" bg-white px-3 py-2 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)] rounded-lg">
              <p className=" text-sm text-gray-400">date of join</p>
              <p className="text-lg">
                {moment(memberData.dateOfJoin).format("MMM Do YY")}
              </p>
            </div>
          </div>
          <div id="thirdb" className="p-3">
            <img
              className="w-[220px] h-[250px] mx-auto drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)] "
              src="../../../public/public-images/image.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMember;
