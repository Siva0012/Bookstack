import { Outlet } from "react-router-dom";
import Nav from "../Components/Members/Nav";
import Footer from "../Components/Members/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MemberLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("userJwt");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);
  return (
    <div className="bg-gradient-to-b from-user-from to-user-to min-w-screen min-h-screen pb-10 pt-24">
      <header className="fixed top-0 w-full z-[5]">
        <Nav />
      </header>
      <section className="mt-10">
            <div className=" lg:w-[1150px] md:w-[600px] sm:w-[100px] bg-user-from rounded-xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.09)] mx-auto px-16 mb-10 py-12">
              <Outlet />
            </div>
            <div className=" lg:w-[1150px] md:w-[600px] sm:w-[50px] mx-auto rounded-xl">
              <Footer />
            </div>
      </section>
    </div>
  );
};

export default MemberLayout;
