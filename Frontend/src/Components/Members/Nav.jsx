import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import NavDropdown from "./NavDropdown";
import { GiPaperBagOpen } from "react-icons/gi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import MobileNavDropdown from './MobileNavDropdown'

function Nav() {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const logout = () => {
    console.log("logout called");
    localStorage.removeItem("userJwt");
    navigate("/login");
  };

  return (
    <div className="text-black bg-user-nav flex justify-between items-center px-3 h-20">
      <h1 className="text-3xl font-bold text-black font-nunito uppercase">
        bookstack
      </h1>
      <div className="md:mx-auto">
        <ul className="hidden md:flex">
          <li className="p-4">
            <Link to="/" >Home</Link>
          </li>
          <li className="p-4">
            <Link>
              <NavDropdown />
            </Link>
          </li>
          <li className="p-4"><Link to='/profile'>Profile</Link></li>
          <li className="p-4">About</li>
        </ul>
      </div>
      <div className="hidden md:block hover:cursor-pointer hover:text-red-600">
        <span onClick={logout}>Logout</span>
      </div>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose className="cursor-pointer" />
        ) : (
          <AiOutlineMenu className="cursor-pointer" />
        )}
      </div>
      <div
        id="mobile-menu"
        className={
          nav
            ? " md:hidden fixed left-0 top-0 w-[60%] border-r border-gray-800 h-full overflow-x-hidden bg-user-from ease-in-out duration-500"
            : "fixed left-[-100%] w-[60%] border-r border-gray-800 h-full bg-user-from ease-in-out duration-500"
        }
      >
        <h1 className="w-fit text-3xl font-bold m-7 font-nunito text-white uppercase">
          bookstack
        </h1>
        <ul className="p-4 uppercase text-white">
          <li className="p-4 border-b border-gray-600">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link className={""}>
              <MobileNavDropdown />
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link>Profile</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link>About</Link>
          </li>
          <li onClick={logout} className="p-4 ">
            <Link>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className="bg-user-nav w-full py-5 fixed top-0 z-[5]">
  //       <div className="px-6 bg-gray-50 py-2 border-1 rounded-3xl mx-auto lg:w-[1150px]">
  //         <div className="flex justify-between items-center">
  //           <div id="logo">
  //             <h1 className="font-nunito text-2xl">BOOKSTACK</h1>
  //           </div>
  //           <div id="list">
  //             <ul className="flex">
  //               <Link
  //                 to={"/"}
  //                 className="ms-10 hover:cursor-pointer hover:text-user-to"
  //               >
  //                 Home
  //               </Link>
  //               <Link className="ms-10 hover:cursor-pointer hover:text-user-to">
  //                 {" "}
  //                 <NavDropdown />{" "}
  //               </Link>
  //               <Link
  //                 to={"/profile"}
  //                 className="ms-10 hover:cursor-pointer hover:text-user-to"
  //               >
  //                 Profile
  //               </Link>
  //               <Link className="ms-10 hover:cursor-pointer hover:text-user-to">
  //                 About Us
  //               </Link>
  //             </ul>
  //           </div>
  //           <div onClick={() => navigate('/book-bag')}>
  //             <GiPaperBagOpen className="hover:-translate-y-1 duration-150"  size={19}/>
  //           </div>

  //           <div id="search" className="flex items-center">
  //             <input
  //               className="py-1 rounded-2xl"
  //               type="text"
  //               placeholder="search"
  //             />
  //             <FaRegUser
  //               className="ms-6 hover:cursor-pointer hover:text-red-600 "
  //               onClick={logout}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}

export default Nav;
