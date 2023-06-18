import { Outlet } from "react-router-dom";
import Navbar from "../Components/Admin/Navbar";
import Sidebar from "../Components/Admin/Sidebar";
import AdminHeader from "../Components/Admin/AdminHeader";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex bg-bg-admin-sidebar">
        <div className=" bg-bg-admin-sidebar basis-[18%]">
          <Sidebar />
        </div>
        <div className="basis-[88%] rounded-tl-3xl bg-black">
          <div>
            <AdminHeader />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
