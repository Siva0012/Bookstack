import { Link } from "react-router-dom";

function InternalErrorPage() {
  return (
    <div className=" font-nunito w-screen h-screen bg-[#35322F] flex flex-col justify-center items-center backdrop-blur-lg">
      <div className="ring-[3px] ring-white/10 lg:w-[950px] text-center lg:h-[450px] lg:rounded-2xl bg-[#292929] flex flex-col items-center justify-center">
        <h1 className="drop-shadow-[0_8px_0px_rgba(0,0,0,0.5)] text-[#a7a7a7] font-nunito text-8xl font-bold">
          Oops....Something went wrong !!
        </h1>
        <h2 className="text-black text-lg mt-3 tracking-wider bg-white/10 py-1 rounded-md ring-[1px] ring-white px-3">
          Internal server Error
        </h2>
        <Link to={"/"}>
          <button className=" mt-5 hover:text-[#F2E5C7] hover:bg-[#424532] hover:ring-white hover:ring-[1px] font-semibold tracking-wide text-[#424532] bg-[#F2E5C7] text-bold px-2 py-1 rounded-md">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InternalErrorPage;
