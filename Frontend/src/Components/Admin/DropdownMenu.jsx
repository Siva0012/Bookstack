import { useState } from "react";
import { toast } from "react-toastify";

//admin APIs
import {changeCheckoutStatus} from '../../Utils/AdminApis'

const DropdownMenu = ({ status , lenderId , updateStatus }) => {
  const stats = ["Pending", "Approved", "Borrowed", "Returned"];
  const [isOpen, setisOpen] = useState(false);
  let filteredStats = [];

  if (status === "Pending") {
    filteredStats = stats.slice(1);
  } else if (status === "Approved") {
    filteredStats = stats.slice(2);
  } else if (status === "Borrowed") {
    filteredStats = stats.slice(3);
  } else if (status === "Returned") {
    filteredStats = ["Returned"];
  } else if (status === "Expired") {
    filteredStats = ["Expired"]
  }

  const handleStatus = (lenderId , status) => {

     updateStatus(lenderId , status)
     // changeCheckoutStatus(lenderId , status)
     // .then((response) => {
     //      if(response.data.message) {
     //           toast.success(response.data.message)
     //      }
     // })
     // .catch((err) => toast.error(err.response.data.error))
  }

  return (
    <div className="relative">
      <span
        onClick={() => {
          if (status !== "Returned") {
            setisOpen((prev) => !prev);
          } else {
            setisOpen(false);
            toast.warning("Book has been already returned");
          }
        }}
        className=" w-[100px] text-center hover:cursor-pointer relative inline-block px-3 py-1 font-semibold  bg-green-200 rounded-full text-green-900 leading-tight"
      >
        <span className="">{status}</span>
      </span>
      {isOpen && (
        <div className="absolute z-[2] top-7 block rounded-md w-[100px] bg-white">
          {filteredStats.map((data, i) => {
            return (
              <span
              onClick={() => handleStatus(lenderId , data)}
                key={i}
                className={` ${
                  i !== 0 ? "mt-2" : ""
                } block text-center border hover:border-gray-500 hover:text-red-600 hover:cursor-pointer px-3 py-1 font-semibold rounded-full text-green-900 leading-tight`}
              >
                {data}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
