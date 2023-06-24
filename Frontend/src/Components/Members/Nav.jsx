import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import NavDropdown from "../../Pages/Members/NavDropdown";
import {GiPaperBagOpen} from 'react-icons/gi'

function Nav() {
  const navigate = useNavigate();

  const logout = () => {
    console.log("logout called");
    localStorage.removeItem("userJwt");
    navigate("/login");
  };


  return (
    <>
      <div className="bg-user-nav w-full py-5 fixed top-0 z-10">
        <div className="px-6 bg-gray-50 py-2 border-1 rounded-3xl mx-auto lg:w-[1150px]">
          <div className="flex justify-between items-center">
            <div id="logo">
              <h1 className="font-nunito text-2xl">BOOKSTACK</h1>
            </div>
            <div id="list">
              <ul className="flex">
                <Link
                  to={"/"}
                  className="ms-10 hover:cursor-pointer hover:text-user-to"
                >
                  Home
                </Link>
                <Link className="ms-10 hover:cursor-pointer hover:text-user-to">
                  {" "}
                  <NavDropdown />{" "}
                </Link>
                <Link
                  to={"/profile"}
                  className="ms-10 hover:cursor-pointer hover:text-user-to"
                >
                  Profile
                </Link>
                <Link className="ms-10 hover:cursor-pointer hover:text-user-to">
                  About Us
                </Link>
              </ul>
            </div>
            <div onClick={() => navigate('/book-bag')}>
              <GiPaperBagOpen className="hover:-translate-y-1 duration-150"  size={19}/>
            </div>

            <div id="search" className="flex items-center">
              <input
                className="py-1 rounded-2xl"
                type="text"
                placeholder="search"
              />
              <FaRegUser
                className="ms-6 hover:cursor-pointer hover:text-red-600 "
                onClick={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
