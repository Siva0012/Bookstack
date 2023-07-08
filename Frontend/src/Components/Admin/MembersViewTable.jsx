import { useNavigate, Link } from "react-router-dom";

//Admin APIs
import { getMembers, blockMember } from "../../Utils/AdminApis";

import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { updateMembers } from "../../Redux/Admin/MemberSlice";
import { updateSingleMember } from "../../Redux/Admin/SingleMemberSlice";
import { toast } from "react-toastify";

function MembersViewTable() {
  const [members, setmembers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getMembersData = async () => {
    try {
      getMembers()
        .then((response) => {
          setmembers(response.data.members);
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      console.log("axios error in members component", err);
    }
  };
  const handleSubmit = (id, member) => {
    navigate(`/admin/view-member/${id}`);
  };

  const handleAction = (memberId, data) => {
    blockMember({ memberId: memberId, isBlocked: data })
      .then((response) => {
        if (response.data.isBlocked) {
          toast.success(`Blocked "${response.data.memberName}"`);
        } else if (!response.data.isBlocked) {
          toast.success(`Unblocked "${response.data.memberName}"`);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMembersData();
  }, [handleAction]);

  return (
    <>
      <div className="text-white">
        <div className="container mx-auto ">
          <div className="py-8">
            <h2 className="text-2xl font-semibold leading-tight">Members</h2>
            <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Profile picture
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date of Join
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Membership type
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                      {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" /> */}
                    </tr>
                  </thead>
                  <tbody>
                    {members &&
                      members.map((member) => {
                        return (
                          <tr key={member._id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex">
                                <div className="flex-shrink-0 w-28 h-28">
                                  <img
                                    className="w-full h-full object-contain"
                                    src={
                                      member.profilePicture
                                        ? member.profilePicture
                                        : "../../../public/public-images/image.jpg"
                                    }
                                    alt=""
                                  />
                                </div>
                                {/* <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {moment(banner.udpatedAt).format(
                                      "MMM Do YY"
                                    )}
                                  </p>
                                </div> */}
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {member.name}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {member.email}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {moment(member.dateOfJoin).format("MMM Do YY")}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {member.isMember
                                  ? member.membershipType
                                  : "Not a member"}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span
                                onClick={() =>
                                  handleAction(member._id, member.isBlocked)
                                }
                                className="relative inline-block px-3 py-1 font-semibold min-w-[90px] text-center  text-green-900 leading-tight hover:cursor-pointer"
                              >
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                />
                                {member.isBlocked ? (
                                  <span className="relative min-w-[90px] mx-auto text-center">
                                    Unblock
                                  </span>
                                ) : (
                                  <span className="relative min-w-[90px] mx-auto text-center">
                                    Block
                                  </span>
                                )}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MembersViewTable;
