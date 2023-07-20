import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from "./NavDropdown";
import { FaRegUser } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { GiPaperBagOpen } from "react-icons/gi";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import MobileNavDropdown from "./MobileNavDropdown";
import moment from "moment";
import {updateMemberData} from '../../Redux/Member/MemberDataSlice'

//member API
import { searchBooks, getNotifications } from "../../Utils/MemberApis";
import SearchCard from "../Cards/SearchCard";

//socket
import { io } from "socket.io-client";
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

function Nav() {
  const dispatch = useDispatch()
  const memberName = useSelector((state) => state.memberData.value.name);
  const isMember = useSelector((state) => state.memberData.value.isMember);
  const [searchBookData, setSearchBookData] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  //for notification
  const memberId = useSelector((state) => state.memberData.value._id);
  const socket = useRef();
  const [showNotifications, setShowNotifications] = useState(null);
  const [notificationData, setNotificationData] = useState([]);
  const [newNotification, setNewNotification] = useState(null);

  useEffect(() => {
    // socket.current = io(baseUrl);
    // socket.current.emit("add-new-user", memberId);
    // socket.current.on("receive-notification", (notificationData) => {
    //   console.log("notification data", notificationData);
    //   setNewNotification(true);
    //   // setNotificationData(notificationData);
    // });
  }, [memberId]);

  const handleNotificationClick = async () => {
    setNewNotification(false);
    setShowNotifications((prev) => !prev);
    // if(showNotifications) {
    getNotifications().then((response) => {
      if (response.data.notifications) {
        setNotificationData(response.data.notifications);
      }
    });
    // }
  };

  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const logout = () => {
    dispatch(updateMemberData({}))
    localStorage.removeItem("userJwt");
    navigate("/login");
  };

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
    searchBooks(searchKey).then((response) => {
      console.log(response.data.bookData);
      setSearchBookData(response.data.bookData);
    });
  };

  const [mobileSearch, setMobileSearch] = useState(null);

  return (
    <>
      <div className="text-black bg-user-nav flex justify-between items-center px-3 lg:px-5 md:px-5 h-20">
        <h1 className="text-lg lg:text-3xl font-bold text-black font-nunito uppercase">
          bookstack
        </h1>
        <div className="md:mx-auto">
          <ul className="hidden md:flex">
            <li className="p-4">
              <Link to="/">Home</Link>
            </li>
            <li className="p-4">
              <Link>
                <NavDropdown />
              </Link>
            </li>
            <li className="p-4">
              <Link to="/book-bag">Bookbag</Link>
            </li>
            <li className="p-4">
              <Link
                to="/profile"
                className="capitalize text-blue-600 font-semibold"
              >
                {memberName}
              </Link>
            </li>
            {isMember && (
              <>
                <li className="p-4">
                  <Link to="/chat" className="">
                    <span>
                      <CiChat1 size={24} />
                    </span>
                  </Link>
                </li>
                <li className="p-4">
                  <Link>
                    {newNotification ? (
                      <span
                        onClick={handleNotificationClick}
                        className="text-blue-500"
                      >
                        <IoIosNotifications size={24} />
                      </span>
                    ) : (
                      <span
                        onClick={handleNotificationClick}
                        className=""
                      >
                        <IoIosNotificationsOutline size={24} />
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="mr-10">
          {" "}
          <input
            onChange={handleSearch}
            className="rounded-md hidden sm:block"
            type="text"
            placeholder="Search books or authors"
          />
        </div>
        <div>
          <input
            onChange={handleSearch}
            placeholder="Search books or authors"
            type="text"
            className=" w-[11rem] h-[25px] text-[12px] sm:hidden"
          />
        </div>
        {searchKey && searchBookData.length ? (
          <div className=" w-[500px] rounded-md bg-white/50 px-4 py-5 absolute right-[110px] top-[90px] ">
            <div className="overflow-auto max-h-[500px]">
              {searchBookData &&
                searchBookData.map((bookData) => {
                  return <SearchCard key={bookData._id} bookData={bookData} />;
                })}
            </div>
          </div>
        ) : searchKey && !searchBookData.length ? (
          <div className=" w-[600px] rounded-md bg-white/50 px-4 py-5 absolute right-[110px] top-[90px] ">
            <div className="overflow-auto max-h-[500px] text-center">
              <h1>No books found !!</h1>
            </div>
          </div>
        ) : (
          ""
        )}

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
      {showNotifications && (
        <div className="absolute z-[1] lg:top-[95px] w-screen h-screen bg-transparent">
          <div className="relative lg:mx-auto rounded-md bg-white/50 w-[600px] lg:max-h-[350px] overflow-y-auto p-2">
            {notificationData &&
              notificationData.length > 0 ? 
              notificationData.map((notification, i) => {
                return (
                  <div
                    key={i}
                    className="p-2 bg-white/50 mb-2 flex items-center rounded-md"
                  >
                    <h1 className="text-sm lg:max-w-[420px] break-words">{notification.message}</h1>
                    <span className="text-[11px] ms-auto self-end">
                      {moment(notification.notificationDate).format('MMMM Do YYYY, h:mm:ss a')}
                    </span>
                  </div>
                );
              }) : (
                <div className="p-1 bg-white/50 rounded-md">
                  <h1 className="text-sm">No notifications ..</h1>
                </div>
              )
              }
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
