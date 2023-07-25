import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

//member APIs
import { getCategories } from "../../Utils/MemberApis";

function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [catData, setCatData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((response) => {
      setCatData(response.data.catData);
    });
  }, []);


  return (
    <div className="relative flex flex-col items-start rounded-lg">
      <p
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between"
      >
        Books
        {!isOpen ? (
          <BsFillCaretDownFill className="ms-3" />
        ) : (
          <BsFillCaretUpFill className="ms-3" />
        )}
      </p>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute top-10 w-[175px] rounded-lg"
        >
          {catData &&
            catData.map((catData , i) => {
              return (
                  <div
                    key={i}
                    className="w-full border-t-2 border-t-gray-300 py-1 hover:font-bold bg-user-nav text-user-from hover:bg-white"
                  >
                    <Link
                      to={`/books/${catData._id}`}
                      className="p-2 items-start hover:text-black capitalize "
                    >
                      {catData.name}
                    </Link>
                  </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default NavDropdown;
