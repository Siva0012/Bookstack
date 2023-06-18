import React from "react";
import Login from "../../Components/Members/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userJwt")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="h-screen font-sans">
        <div
          id="body-background"
          className=" flex flex-col justify-center bg-gradient-to-b from-user-from to-user-to min-h-full"
        >
          <div className="w-3/4 bg-gradient-to-b from-user-sign-from to-user-sign-to rounded-2xl box-shadow-[0_0px_1px_rgba(0,0,0,0.5)] mx-auto py-10 px-16">
            <div className="rounded-md mx-auto">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
