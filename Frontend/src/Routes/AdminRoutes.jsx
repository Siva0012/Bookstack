import React, { useEffect, lazy, Suspense } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";

//components
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import AdminLayout from "../Layout/AdminLayout";
import LoaderComp from "../Components/Loader/LoaderComp";
import AdminLogin from '../Pages/Admin/Login'
import ErrorPage from "../Pages/Admin/ErrorPage";
import InternalErrorPage from "../Pages/Admin/InternalErrorPage";

const AdminHome = lazy(() => import("../Pages/Admin/Home"));
const AdminBooks = lazy(() => import("../Pages/Admin/Books"));
const MembersPage = lazy(() => import("../Pages/Admin/Members"));
const ViewMember = lazy(() => import("../Pages/Admin/ViewMember"));
const AddBook = lazy(() => import("../Pages/Admin/AddBooks"));
const AdminCategories = lazy(() => import("../Pages/Admin/Categories"));
const AddCategoryPage = lazy(() => import("../Pages/Admin/AddCategoryPage"));
const SingleBookPage = lazy(() => import("../Pages/Admin/SingleBookPage"));

const LenderHistory = lazy(() => import("../Pages/Admin/LenderHistory"));
const BannersPage = lazy(() => import("../Pages/Admin/BannersPage"));
const EditBookPage = lazy(() => import("../Pages/Admin/EditBookPage"));
const ChatPage = lazy(() => import("../Pages/Admin/ChatPage"));

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/error" element={<InternalErrorPage />} />
      <Route
        element={<ProtectedRoutes role={"admin"} route={"/admin/login"} />}
      >
        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoaderComp />}>
                <AdminHome />
              </Suspense>
            }
          />
          <Route
            path="/members"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <MembersPage />
              </Suspense>
            }
          />
          <Route
            path="/view-member/:memberId"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <ViewMember />
              </Suspense>
            }
          />
          <Route
            path="/add-book"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <AddBook />
              </Suspense>
            }
          />
          <Route
            path="/books"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <AdminBooks />
              </Suspense>
            }
          />
          <Route
            path="/categories"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <AdminCategories />
              </Suspense>
            }
          />
          <Route
            path="/add-category"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <AddCategoryPage />
              </Suspense>
            }
          />
          <Route
            path="/view-book/:bookId"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <SingleBookPage />
              </Suspense>
            }
          />
          <Route
            path="/lender-history"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <LenderHistory />
              </Suspense>
            }
          />
          <Route
            path="/banners"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <BannersPage />
              </Suspense>
            }
          />
          <Route
            path="/edit-book/:bookId"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <EditBookPage />
              </Suspense>
            }
          />
          <Route
            path="/chat"
            element={
              <Suspense fallback={<LoaderComp />}>
                {" "}
                <ChatPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
