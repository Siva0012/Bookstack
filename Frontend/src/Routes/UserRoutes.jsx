import React from "react";
import { Route, Router, Routes } from "react-router-dom";

//elements
import Home from "../Pages/Members/Home";
import RegisterPage from "../pages/Members/register";
import LoginPage from "../Pages/Members/Login";
import Profile from "../Pages/Members/Profile";
import Books from "../Pages/Members/Books";
import MembeshipPage from "../Pages/Members/MembeshipPage";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import MemberLayout from "../Layout/MemberLayout";
import { Modal } from "flowbite";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoutes role={"user"} route={"/login"} />}>
        <Route element={<MemberLayout />}>
          <Route path="/test" element={<Modal />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books/:catId" element={<Books />} />
          <Route path="/membership" element={<MembeshipPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default UserRoutes;
