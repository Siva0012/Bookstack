import React, { useEffect } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";

//elements
import AdminLogin from "../Pages/Admin/Login";
import AdminHome from "../Pages/Admin/Home";
import AdminBooks from "../Pages/Admin/Books";
import MembersPage from "../Pages/Admin/Members";
import ViewMember from "../Pages/Admin/ViewMember";
import AddBook from "../Pages/Admin/AddBooks";
import AdminCategories from "../Pages/Admin/Categories";
import AddCategoryPage from "../Pages/Admin/AddCategoryPage";
import SingleBookPage from "../Pages/Admin/SingleBookPage";

import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import AdminLayout from "../Layout/AdminLayout";
import LenderHistory from "../Pages/Admin/LenderHistory";
import BannersPage from "../Pages/Admin/BannersPage";
import EditBookPage from "../Pages/Admin/EditBookPage";
import ErrorPage from "../Pages/Admin/ErrorPage";
import ChatPage from "../Pages/Admin/ChatPage";
import InternalErrorPage from "../Pages/Admin/InternalErrorPage";

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
          <Route path="/" element={<AdminHome />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/view-member/:memberId" element={<ViewMember />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/books" element={<AdminBooks />} />
          <Route path="/categories" element={<AdminCategories />} />
          <Route path="/add-category" element={<AddCategoryPage />} />
          <Route path="/view-book/:bookId" element={<SingleBookPage />} />
          <Route path="/lender-history" element={<LenderHistory />} />
          <Route path="/banners" element={<BannersPage />} />
          <Route path="/edit-book/:bookId" element={<EditBookPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
