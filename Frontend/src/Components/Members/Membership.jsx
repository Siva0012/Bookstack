import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import {updateMembershipType} from '../../Redux/Member/MembershipPlanSlice'

function Membership() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClick = (memberShipType) => {
    dispatch(updateMembershipType(memberShipType))
    navigate('/payment')
  }

  return (
    <div className="w-[600px] h-[420px] p-3 ">
      <div className="bg-gray-100 rounded-md">
        <div className="p-4">
          <div className="text-center">
            <h1>Hi user</h1>
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
                onClick={() => handleClick('student')}
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
                onClick={() => handleClick('premium')}
               className="bg-green-600 text-white text-center py-1 mt-2 rounded-sm font-semibold hover:cursor-pointer">
                Be a Premium Member
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
