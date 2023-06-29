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
    <>
      {/* <Navbar />
      <div className="flex bg-bg-admin-sidebar py-16 w-screen">
        <div className=" bg-bg-admin-sidebar basis-[18%]">
          <Sidebar />
        </div>
        <div className="basis-[88%] rounded-tl-3xl bg-black w-screen">
          <div>
            <AdminHeader />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div> */}
      <div id="body" className=" bg-[#140005] min-w-screen min-h-screen">
        <Navbar />
        <section className="mt-9">
          <div className="flex justify-between sm:flex-row">
            <div className=" sm:basis-[20%] ">
              <Sidebar />
            </div>
            <div className="relative right-8 top-2 sm:hidden">
              <RxHamburgerMenu color="white" />
            </div>
            <div className=" sm:basis-[80%]">
              <AdminHeader />
              <Outlet />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminLayout;
