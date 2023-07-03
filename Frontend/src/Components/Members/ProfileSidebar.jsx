import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProfileSidebar() {
  const [selection, setSelection] = useState("");
  const handleSelection = (selection) => {
    setSelection(selection)
  };

  return (
    <div className="min-w-[150px]">
      <div className="grid grid-rows-5 gap-y-2 cursor-pointer">
        <Link to="/profile">
          <div
            onClick={() => handleSelection("profile")}
            id="personal-info"
            className={`${
              selection === "profile" ? "border-r-8" : ""
            } bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 text-sm px-4 font-semibold hover:text-white active:text-white`}
          >
            Personal info
          </div>
        </Link>
        <Link to="/checkouts">
          <div
            onClick={() => handleSelection("checkouts")}
            className={`${
              selection === "checkouts" ? "border-r-8" : ""
            } bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 text-sm px-4 font-semibold text-gray-950 hover:text-white`}
          >
            Checkouts
          </div>
        </Link>
        <Link to="/reserved-books">
          <div
            onClick={() => handleSelection("reserved-books")}
            className={` ${selection === 'reserved-books' ? 'border-r-8' : ''} bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 text-sm px-4 font-semibold text-gray-950 hover:text-white`}
          >
            Reserved Books
          </div>
        </Link>
        <Link to="/membership">
          <div
            onClick={() => handleSelection("membership")}
            className={`${selection === 'membership' ? 'border-r-8' : ''} bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 text-sm px-4 font-semibold text-gray-950 hover:text-white`}
          >
            Membership
          </div>
        </Link>
        <Link to="/book-bag">
          <div
            onClick={() => handleSelection("book-bag")}
            className={`${selection === 'book-bag' ? 'border-r-8' : ''} bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 text-sm px-4 font-semibold text-gray-950 hover:text-white`}
          >
            Book Bag
          </div>
        </Link>
        <Link to="/fines">
          <div
            onClick={() => handleSelection("fines")}
            className={`${selection === 'fines' ? 'border-r-8' : ''} bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 text-sm px-4 font-semibold text-gray-950 hover:text-white`}
          >
            Fines
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProfileSidebar;
