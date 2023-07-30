import { Outlet } from "react-router-dom";
import Navbar from "../Components/Admin/Navbar";
import Sidebar from "../Components/Admin/Sidebar";
import AdminHeader from "../Components/Admin/AdminHeader";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAdmin } from "../Utils/AdminApis";
import { useDispatch } from "react-redux";
import { updateAdminData } from "../Redux/Admin/AdminDataSlice";

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const fetchAdminData = async () => {
    try {
      const response = await getAdmin()
      if(response) {
        dispatch(updateAdminData(response.data?.adminData))
      }
    }catch(err) {

    }
  }

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("adminJwt");
      if (!token) {
       return navigate("/admin/login");
      }
      if(token) {
        fetchAdminData()
      }
    };
    checkToken();
  }, [navigate]);
  return (
    <div id="body" className="font-nunito bg-[#140005] min-w-screen min-h-screen">
      <Navbar />
      <section className="mt-9">
        <div className="flex sm:flex-row lg:p-3">
          <div className="">
            <Sidebar />
          </div>
          <div className="relative right-8 top-2 sm:hidden">
            <RxHamburgerMenu color="white" />
          </div>
          <div className="w-full bg-white/10 rounded-2xl lg:ms-[3rem]">
            <div className=" bg-white/10 rounded-t-2xl py-2">
            <AdminHeader />
            </div>
            <div className="py-4">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLayout;
