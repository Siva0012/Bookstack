import React from "react";
import { Link } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import { useState } from "react";

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="hidden sm:block">
      <Link to="/admin">
        <div
          onClick={() => setSelectedOption("dashboard")}
          className={`bg-bg-admin-sidebar-button/50  w-[200px] hover:ring-[1px] hover:ring-white px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1 ${
            selectedOption === "dashboard"
              ? ` bg-black ring-[1px] ring-white`
              : ""
          }`}
        >
          <p className="text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer ">
            Dashboard
          </p>
        </div>
      </Link>
      <Link to="/admin/members">
        <div
          onClick={() => setSelectedOption("members")}
          className={`bg-bg-admin-sidebar-button/50  w-[200px] hover:ring-[1px] hover:ring-white px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1 ${
            selectedOption === "members"
              ? ` bg-black ring-[1px] ring-white`
              : ""
          }`}
        >
          <p className="text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer">
            Members
          </p>
        </div>
      </Link>
      <Link to="/admin/books">
        <div
          onClick={() => setSelectedOption("books")}
          className={`bg-bg-admin-sidebar-button/50  w-[200px] hover:ring-[1px] hover:ring-white px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1 ${
            selectedOption === "books" ? ` bg-black ring-[1px] ring-white` : ""
          }`}
        >
          <p className="text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer">
            Books
          </p>
        </div>
      </Link>
      <Link to="/admin/categories">
        <div
          onClick={() => setSelectedOption("categories")}
          className={`bg-bg-admin-sidebar-button/50  w-[200px] hover:ring-[1px] hover:ring-white px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1 ${
            selectedOption === "categories"
              ? ` bg-black ring-[1px] ring-white`
              : ""
          }`}
        >
          <p className="text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer">
            <Link to="/admin/categories">Categories</Link>
          </p>
        </div>
      </Link>
      <Link to="/admin/lender-history">
        <div
          onClick={() => setSelectedOption("lender-history")}
          className={`bg-bg-admin-sidebar-button/50  w-[200px] hover:ring-[1px] hover:ring-white px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1 ${
            selectedOption === "lender-history"
              ? ` bg-black ring-[1px] ring-white`
              : ""
          }`}
        >
          <p className="text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer">
            <Link to="/admin/lender-history">Lender history</Link>
          </p>
        </div>
      </Link>
      <Link to="/admin/banners">
        <div
          onClick={() => setSelectedOption("banners")}
          className={`bg-bg-admin-sidebar-button/50  w-[200px] hover:ring-[1px] hover:ring-white px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1 ${
            selectedOption === "banners"
              ? ` bg-black ring-[1px] ring-white`
              : ""
          }`}
        >
          <p className="text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer">
            <Link to="/admin/banners">Banners</Link>
          </p>
        </div>
      </Link>
      <Link to="/admin/chat">
        <div
          onClick={() => setSelectedOption("chats")}
          className={`bg-bg-admin-sidebar-button/50 w-[200px] hover:ring-[1px] hover:ring-white px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1 ${
            selectedOption === "chats" ? ` bg-black ring-[1px] ring-white` : ""
          }`}
        >
          <p className="text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer">
            <Link to="/admin/chat">Chats</Link>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
