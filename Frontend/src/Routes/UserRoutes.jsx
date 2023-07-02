import React, { useEffect } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";

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
import PaymentPage from "../Pages/Members/PaymentPage";
import BookBagPage from "../Pages/Members/BookBagPage";

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
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/book-bag" element={<BookBagPage />} />
          <Route path="/upgrade-to-premium" element={<UpgradePage />} />
          <Route path='/checkouts' element={<CheckoutsPage />} />
          <Route path="/fines" element={<FinePage />} />
          <Route path="/fine-payment" element={<FinePaymentPage />} />
          <Route path="/reserved-books" element={<ReservedBooksPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
import UpgradePage from "../Pages/Members/UpgradePage";
import CheckoutsPage from "../Pages/Members/CheckoutsPage";
import FinePage from "../Pages/Members/FinePage";
import FinePaymentPage from "../Pages/Members/FinePaymentPage";
import ReservedBooksPage from "../Pages/Members/ReservedBooksPage";

export default UserRoutes;
