import { Outlet } from "react-router-dom";
import Nav from "../Components/Members/Nav";
import Footer from "../Components/Members/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import GoogleBooksScriptLoader from '../Components/Members/GoogleBooksScriptLoader'
import { getMember } from "../Utils/MemberApis";
import { useDispatch } from "react-redux";
import { updateMemberData } from "../Redux/Member/MemberDataSlice";


const MemberLayout = () => {

  const dispatch = useDispatch()
  const fetchMemberData = async () => {
    try{
      const response = await getMember()
      if(response) {
        dispatch(updateMemberData(response.data.memberData))
      }
    }catch(err) {

    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("userJwt");
      if (!token) {
        navigate("/login");
      } else {
        fetchMemberData()
      }
    };
    checkToken();
  }, [navigate]);
  return (
    <div className="bg-gradient-to-b from-user-from to-user-to min-w-screen min-h-screen pb-10 pt-24">
      <header className="fixed top-0 w-full z-[5]">
        <Nav />
      </header>
      <section className="mt-10 font-nunito">
        <div className="w-full lg:w-[1150px] md:w-[680px] bg-user-from rounded-xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.09)] mx-auto px-4 md:px-4 lg:px-10 mb-10 py-12 lg:py-14 ">
          <Outlet />
        </div>
        <div className="lg:w-[1150px] md:w-[600px] sm:w-[100px] mx-auto rounded-xl">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default MemberLayout;
