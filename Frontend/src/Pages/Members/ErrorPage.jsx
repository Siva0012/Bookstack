import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="w-screen h-screen bg-[#35322F] flex flex-col justify-center items-center">
      <div className="  lg:w-[950px] lg:h-[450px] lg:rounded-2xl bg-[#424242]/25 flex flex-col items-center justify-center">
        <h1 className="drop-shadow-[0_5px_0px_rgba(0,0,0,0.5)] text-[#C5905F] font-nunito text-8xl font-bold">
          404 Not found !!
        </h1>
        <Link to={"/"}>
          <button className=" mt-3 font-semibold tracking-wide text-[#424532] bg-[#F2E5C7] text-bold px-2 py-1 rounded-md">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
