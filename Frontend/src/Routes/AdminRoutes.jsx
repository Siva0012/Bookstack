import React from "react";
import { Route, Router, Routes } from "react-router-dom";

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

function AdminRoutes() {
  return (
    <div className="admin-side">
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
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
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default AdminRoutes;
