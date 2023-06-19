import { Outlet } from "react-router-dom";
import Nav from "../Components/Members/Nav";
import Footer from "../Components/Members/Footer";

const MemberLayout = () => {
  return (
    <div className="bg-gradient-to-b from-user-from to-user-to min-h-screen">
      <header>
        <Nav />
      </header>
      <section className="">
        <div className="font-sans">
          <div id="body-background" className=" flex flex-col  ">
            <div id="main" className="mt-36">
              <div className=" lg:w-[1150px] md:w-[600px] sm:w-[50px] bg-user-from rounded-xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.09)] mx-auto py-10 px-16 mb-10">
                <Outlet />
              </div>
              <div className=" lg:w-[1150px] md:w-[600px] sm:w-[50px] mx-auto mb-10 rounded-xl">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemberLayout;
