import React, { useEffect , lazy , Suspense } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";

//components
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import MemberLayout from "../Layout/MemberLayout";

import Home from "../Pages/Members/Home";
import RegisterPage from "../pages/Members/register";
import LoginPage from "../Pages/Members/Login";
import Profile from "../Pages/Members/Profile";
import Books from "../Pages/Members/Books";
import MembeshipPage from "../Pages/Members/MembeshipPage";
import PaymentPage from "../Pages/Members/PaymentPage";
import BookBagPage from "../Pages/Members/BookBagPage";
import UpgradePage from "../Pages/Members/UpgradePage";
import CheckoutsPage from "../Pages/Members/CheckoutsPage";
import FinePage from "../Pages/Members/FinePage";
import FinePaymentPage from "../Pages/Members/FinePaymentPage";
import ReservedBooksPage from "../Pages/Members/ReservedBooksPage";
import EmailVerification from "../Pages/Members/EmailVerification";
import SingleBookPage from "../Pages/Members/SingleBookPage";
import ErrorPage from "../Pages/Members/ErrorPage";
import ChatPage from "../Pages/Members/ChatPage";
import InternalErrorPage from "../Pages/Members/InternalErrorPage";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:memberId/verify/:token" element={<EmailVerification />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/error" element={<InternalErrorPage />} />
      <Route element={<ProtectedRoutes role={"user"} route={"/login"} />}>
        <Route element={<MemberLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books/:catId" element={<Books />} />
          <Route path="/membership" element={<MembeshipPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/book-bag" element={<BookBagPage />} />
          <Route path="/upgrade-to-premium" element={<UpgradePage />} />
          <Route path="/checkouts" element={<CheckoutsPage />} />
          <Route path="/fines" element={<FinePage />} />
          <Route path="/fine-payment" element={<FinePaymentPage />} />
          <Route path="/reserved-books" element={<ReservedBooksPage />} />
          <Route path="/book/:bookId" element={<SingleBookPage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Route>
        {/* chats */}
      </Route>
    </Routes>
  );
}

export default UserRoutes;
