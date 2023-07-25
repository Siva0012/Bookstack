import React, { useEffect , lazy , Suspense } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";

//components
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import MemberLayout from "../Layout/MemberLayout";
import LoginPage from "../Pages/Members/Login";
import RegisterPage from "../pages/Members/register";
import ErrorPage from '../Pages/Members/ErrorPage'
import InternalErrorPage from '../Pages/Members/InternalErrorPage'
import LoaderComp from "../Components/Loader/LoaderComp";

const Home = lazy(() => import("../Pages/Members/Home"));
const Profile = lazy(() => import("../Pages/Members/Profile"));
const Books = lazy(() => import("../Pages/Members/Books"));
const MembeshipPage = lazy(() => import("../Pages/Members/MembeshipPage"));
const PaymentPage = lazy(() => import("../Pages/Members/PaymentPage"));
const BookBagPage = lazy(() => import("../Pages/Members/BookBagPage"));
const UpgradePage = lazy(() => import("../Pages/Members/UpgradePage"));
const CheckoutsPage = lazy(() => import("../Pages/Members/CheckoutsPage"));
const FinePage = lazy(() => import("../Pages/Members/FinePage"));
const FinePaymentPage = lazy(() => import("../Pages/Members/FinePaymentPage"));
const ReservedBooksPage = lazy(() => import("../Pages/Members/ReservedBooksPage"));
const EmailVerification = lazy(() => import ("../Pages/Members/EmailVerification"));
const SingleBookPage = lazy(() => import("../Pages/Members/SingleBookPage"));
const ChatPage = lazy(() => import("../Pages/Members/ChatPage"));

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
          <Route path="/" element={<Suspense fallback={<LoaderComp/>}> <Home /> </Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<LoaderComp/>}> <Profile /> </Suspense>} />
          <Route path="/books/:catId" element={<Suspense fallback={<LoaderComp/>}> <Books /> </Suspense>} />
          <Route path="/membership" element={<Suspense fallback={<LoaderComp/>}> <MembeshipPage /> </Suspense>} />
          <Route path="/payment" element={<Suspense fallback={<LoaderComp/>}> <PaymentPage /> </Suspense>} />
          <Route path="/book-bag" element={<Suspense fallback={<LoaderComp/>}> <BookBagPage /> </Suspense>} />
          <Route path="/upgrade-to-premium" element={<Suspense fallback={<LoaderComp/>}> <UpgradePage /> </Suspense>} />
          <Route path="/checkouts" element={<Suspense fallback={<LoaderComp/>}> <CheckoutsPage /> </Suspense>} />
          <Route path="/fines" element={<Suspense fallback={<LoaderComp/>}> <FinePage /> </Suspense>} />
          <Route path="/fine-payment" element={<Suspense fallback={<LoaderComp/>}> <FinePaymentPage /> </Suspense>} />
          <Route path="/reserved-books" element={<Suspense fallback={<LoaderComp/>}> <ReservedBooksPage /> </Suspense>} />
          <Route path="/book/:bookId" element={<Suspense fallback={<LoaderComp/>}> <SingleBookPage /> </Suspense>} />
          <Route path='/chat' element={<Suspense fallback={<LoaderComp/>}> <ChatPage /> </Suspense>} />
        </Route>
        {/* chats */}
      </Route>
    </Routes>
  );
}

export default UserRoutes;
