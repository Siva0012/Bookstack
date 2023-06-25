import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMembershipType } from "../../Redux/Member/MembershipPlanSlice";
import { useEffect, useState } from "react";
import moment from "moment";
import Typed from "react-typed";

//member APIs
import { getMember } from "../../Utils/MemberApis";

function Membership() {
  const [memberData, setMemberData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (memberShipType) => {
    dispatch(updateMembershipType(memberShipType));
    navigate("/payment");
  };

  useEffect(() => {
    getMember().then((response) => {
      setMemberData(response.data.memberData);
    });
  }, []);

  console.log(memberData);

  const renewDate = moment(memberData.memberUpto).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
  return (
    <div className="w-[600px] h-[420px] p-3  ">
      {memberData.isMember ? (
        <div>
          <h1 className="text-green-700 tracking-wide rounded-md shadow-[0px_0px_10px_rgba(0,0,0,0.12)] py-4 text-center">
            Hi{" "}
            <span className="font-semibold tracking-wide">
              {memberData.name}
            </span>
          </h1>
          <div className="rounded-md shadow-[0px_0px_10px_rgba(0,0,0,0.12)] mt-4 p-2">
            <div className="grid grid-rows-3 gap-y-2 p-2">
              <div className="flex justify-between py-3">
                <h2>Membership Id</h2>
                <h2 className="text-start font-bold">
                  {memberData.membershipId}
                </h2>
              </div>
              <div className="flex justify-between py-3">
                <h2>Membership Type</h2>
                <h2 className="uppercase font-bold">
                  {memberData.membershipType}
                </h2>
              </div>
              <div className="flex justify-between bg-transparent py-3 ">
                <h2>Renew on</h2>
                <h2 className="font-bold justify-center text-green-700 drop-shadow-[10px_10px_5px_rgba(0,0,0,0.4)]">
                  <Typed
                    strings={[renewDate]}
                    typeSpeed={120}
                    backSpeed={130}
                  />
                </h2>
              </div>
            </div>
            {memberData.membershipType === "student" ? (
                <div className="flex flex-col w-[250px] bg-[#EBEAE5] rounded-md mt-3 mb-2 mx-auto shadow-[0px_5px_10px_rgba(0,0,0,0.15)] p-4">
                  <div className="">
                    <div className="bg-green-600 w-fit px-2 py-1 text-center text-white rounded-md inline">
                      Upgrade
                    </div>{" "}
                    <span>to our</span>{" "}
                    <span className="uppercase font-bold tracking-wide font-ubuntu italic">
                      premium
                    </span>
                  </div>
                  <div className="mt-1">
                    <h2>
                      membership and{" "}
                      <span className="italic">avail additional benefits</span>{" "}
                    </h2>
                  </div>
                </div>
            ) : (
              <h1></h1>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-md">
          <div className="p-4">
            <div className="text-center">
              <h1>{memberData.name}</h1>
              <p>Please select a membership plan</p>
            </div>
            <div
              id="cards-container"
              className="flex justify-around items-center mt-3"
            >
              <div
                id="student-card"
                className="w-[220px] h-[300px] bg-gray-100 p-3 rounded-md drop-shadow-[0px_3px_5px_rgba(0,0,0,0.1)]"
              >
                <div className="border">
                  <h1 className="text-center">
                    Student plan{" "}
                    <span className="text-green-700 font-semibold">Rs.999</span>
                  </h1>
                  <ul className="ms-2">
                    <li className="mb-2 ">Access to all Books</li>
                    <li className="mb-2">1 Book reservation at a time</li>
                    <li className="mb-2">
                      Checkout maximum of 3 books at a time
                    </li>
                    <li className="mb-2">
                      Get a reading period of up to{" "}
                      <span className="font-bold">7 days</span>
                    </li>
                  </ul>
                </div>
                <div
                  onClick={() => handleClick("student")}
                  className="bg-green-600 text-white text-center py-1 mt-2 rounded-sm font-semibold hover:cursor-pointer"
                >
                  Be a Student Member
                </div>
              </div>
              <div
                id="student-card"
                className="w-[220px] h-[300px] bg-gray-100 p-3 rounded-md drop-shadow-[0px_3px_5px_rgba(0,0,0,0.1)]"
              >
                <div className="border">
                  <h1 className="text-center">
                    Premium plan{" "}
                    <span className="text-green-700 font-semibold">Rs.999</span>
                  </h1>
                  <ul className="ms-2">
                    <li className="mb-2">Access to all Books</li>
                    <li className="mb-2">1 Book reservation at a time</li>
                    <li className="mb-2">
                      Checkout maximum of 3 books at a time
                    </li>
                    <li className="mb-2">
                      Get a reading period of up to{" "}
                      <span className="font-bold">7 days</span>
                    </li>
                  </ul>
                </div>
                <div
                  onClick={() => handleClick("premium")}
                  className="bg-green-600 text-white text-center py-1 mt-2 rounded-sm font-semibold hover:cursor-pointer"
                >
                  Be a Premium Member
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Membership;
