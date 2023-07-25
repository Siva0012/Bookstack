import React from "react";

//components
import Register from "../../Components/Members/Register";

function RegisterPage() {
  return (
    <div
      id=""
      className="font-sans bg-gradient-to-b from-user-from to-user-to h-screen flex felx-col items-center"
    >
      <div className="sm:px-10 md:px-16 lg:px-24 mx-auto max-w-[800px] max-h-[1000px]  bg-gradient-to-b from-user-sign-from to-user-sign-to rounded-2xl box-shadow-[0_0px_1px_rgba(0,0,0,0.5)]">
        <Register />
      </div>
    </div>
  );
}

export default RegisterPage;
