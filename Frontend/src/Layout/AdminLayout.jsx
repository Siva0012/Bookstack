import { Outlet } from "react-router-dom";
import Navbar from "../Components/Admin/Navbar";
import Sidebar from "../Components/Admin/Sidebar";
import AdminHeader from "../Components/Admin/AdminHeader";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = () => {

  const navigate = useNavigate()
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("adminJwt");
      if (!token) {
        navigate("/admin/login");
      }
    };
    checkToken();
  }, [navigate]);
  return (
      <div id="body" className=" bg-[#140005] min-w-screen min-h-screen">
        <Navbar />
        <section className="mt-9">
          <div className="flex sm:flex-row">
            <div className="">
              <Sidebar />
            </div>
            <div className="relative right-8 top-2 sm:hidden">
              <RxHamburgerMenu color="white" />
            </div>
            <div className="ms-20 w-full">
              <AdminHeader />
              <Outlet />
            </div>
          </div>
        </section>
      </div>
  );
};

export default AdminLayout;
