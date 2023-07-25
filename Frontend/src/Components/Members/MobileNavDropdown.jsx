import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

//member APIs
import { getCategories } from "../../Utils/MemberApis";

function MobileNavDropdown() {
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
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative top-6 w-full rounded-lg mb-3"
        >
          {catData &&
            catData.map((catData , i) => {
              return (
                <>
                  <div
                    key={i}
                    className="w-full py-1 border-t-[1px] border-t-gray-500 text-sm hover:font-bold text-white hover:bg-white"
                  >
                    <Link
                      to={`/books/${catData._id}`}
                      className="p-2 items-start hover:text-black "
                    >
                      {catData.name}
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default MobileNavDropdown;
