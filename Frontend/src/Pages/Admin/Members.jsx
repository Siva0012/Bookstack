import React from "react";

import Navbar from "../../Components/Admin/Navbar";
import Sidebar from "../../Components/Admin/Sidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import { Link } from "react-router-dom";

import MembersViewTable from "../../Components/Admin/MembersViewTable";

function Members() {
  return (
    <div className="text-white px-14">
      <MembersViewTable />
    </div>
  );
}

export default Members;
