import React from "react";
import { useEffect, useState } from "react";
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
          setMemberData(response.data.memberData);
        })
    }
  }, [memberData]);

  if (!memberData) {
    return null;
  }

  return (
    <div className="bg-bg-admin-sidebar flex flex-col items-center px-5 py-10 rounded-3xl">
      <div className="bg-white text-black min-w-[700px] p-3 rounded-2xl">
        <div id="second" className="grid grid-cols-2">
          <div id="third" className="p-3 grid grid-rows-5 gap-y-4">
            <div className=" bg-white px-3 py-2 shadow-[0px_0px_6px_rgba(0,0,0,0.2)] rounded-lg">
              <p className=" text-sm text-gray-400">Name</p>
              <p className="text-md">{memberData.name}</p>
            </div>
            <div className=" bg-white px-3 py-2 shadow-[0px_0px_6px_rgba(0,0,0,0.2)] rounded-lg">
              <p className=" text-sm text-gray-400">email</p>
              <p className="text-md">{memberData.email}</p>
            </div>
            <div className=" bg-white px-3 py-2 shadow-[0px_0px_6px_rgba(0,0,0,0.2)] rounded-lg">
              <p className=" text-sm text-gray-400">phone</p>
              <p className="text-md">{memberData.phone}</p>
            </div>
            <div className=" bg-white px-3 py-2 shadow-[0px_0px_6px_rgba(0,0,0,0.2)] rounded-lg">
              <p className=" text-sm text-gray-400">date of join</p>
              <p className="text-md">
                {moment(memberData.dateOfJoin).format("MMM Do YY")}
              </p>
            </div>
            {memberData.isMember ? (
              <>
              <div className=" bg-white px-3 py-2 shadow-[0px_0px_6px_rgba(0,0,0,0.2)] rounded-lg">
                <p className=" text-sm text-gray-400">Membership</p>
                <p className="text-md uppercase">{memberData.membershipType}</p>
              </div>
              <div className=" bg-white px-3 py-2 shadow-[0px_0px_6px_rgba(0,0,0,0.2)] rounded-lg">
                <p className=" text-sm text-gray-400">Membership date</p>
                <p className="text-md">{moment(memberData.memberSince).format("MMM Do YY")}</p>
              </div>
              <div className=" bg-white px-3 py-2 shadow-[0px_0px_6px_rgba(0,0,0,0.2)] rounded-lg">
                <p className=" text-sm text-gray-400">Renew date</p>
                <p className="text-md">{moment(memberData.memberUpto).format("MMM Do YY")}</p>
              </div>
              </>
              
            ) : (
              <div className=" bg-white px-3 py-2 shadow-[0px_0px_6px_rgba(0,0,0,0.2)] rounded-lg">
                <p className=" text-sm text-gray-400">Membership</p>
                <p className="text-md">Not a member</p>
              </div>
            )}
          </div>
          <div className="mx-auto mt-3">
            <div
              id="third"
              className="p-3 w-[300px] h-[380px] shadow-[0px_0px_15px_rgba(0,0,0,0.3)]"
            >
              <img
                className="w-[100%] h-[100%] mx-auto shadow-[0px_0px_15px_rgba(0,0,0,0.3)] "
                src={
                  memberData.profilePicture
                    ? memberData.profilePicture
                    : "../../../public/public-images/image.jpg"
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMember;
