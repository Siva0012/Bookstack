import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import success from "../../../public/public-images/success.png";
import { verifyEmail } from "../../Utils/MemberApis";

function Verification() {
  const [validUrl, setValidUrl] = useState(true);
  const params = useParams();

  useEffect(() => {
    verifyEmail(params.memberId , params.token)
    .then((response) => {
         if(response.data.verified) {
              setValidUrl(true)
         }
    })
    .catch((err) => {
         setValidUrl(false)
    })
//     setValidUrl(true);
  }, [params]);

  return (
    <>
      {validUrl ? (
        <div className="w-screen h-screen flex flex-col space-y-4 items-center justify-center">
          <div className=" w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
            <img className="w-full h-full" src={success} alt="" />
          </div>
          <h1 className=" text-lg md:text-xl lg:text-2xl" >Email verified Successfully</h1>
          <Link to={"/login"}>
            <button className="bg-blue-700 text-white py-1 px-3 md:py-1 md:px-4 lg:px-6 lg:text-md rounded-md hover:shadow-[0px_0px_15px_rgba(0,0,255,0.5)] hover:text-blue-700 hover:bg-white ">Login</button>
          </Link>
        </div>
      ) : (
          <div className="w-screen h-screen flex justify-center items-center">
               <h1 className="font-nunito text-2xl md:text-3xl lg:text-4xl tracking-wide font-semibold ">404 Not found</h1>
          </div>
      )}
    </>
  );
}

export default Verification;
