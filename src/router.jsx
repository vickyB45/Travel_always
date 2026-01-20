import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Enquiry from "./pages/Enquiry";

/**
 * ADMIN PAGES
 */
import AdminLogin from "./pages/admin/login/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogList from "./pages/admin/blogs/BlogList";
import CreateBlog from "./pages/admin/blogs/CreateBlog";
import EditBlog from "./pages/admin/blogs/EditBlog";
import PackageList from "./pages/admin/packages/PackageList";
import CreatePackage from "./pages/admin/packages/CreatePackage";
import EditPackage from "./pages/admin/packages/EditPackage";
import EditCategory from "./pages/admin/category/EditCategory";
import CreateCategory from "./pages/admin/category/CreateCategory";
import CategoryList from "./pages/admin/category/CategoryList";
import EnquiryList from "./pages/admin/enquery/EnquiryList";
import EnquiryDetails from "./pages/admin/enquery/EnquiryDetails";

import PageNotFound from "./pages/PageNotFound";

/**
 * PROTECTION
 */
import ProtectedAdmin from "./components/admin/ProtectedAdmin";


export default function Router() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/enquiry" element={<Enquiry />} />

      {/* ================= ADMIN AUTH ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ================= ADMIN PROTECTED ROUTES ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdmin>
            <AdminDashboard />
          </ProtectedAdmin>
        }
      />

      {/* BLOGS */}
      <Route
        path="/admin/blogs"
        element={
          <ProtectedAdmin>
            <BlogList />
          </ProtectedAdmin>
        }
      />
      <Route
        path="/admin/blogs/create"
        element={
          <ProtectedAdmin>
            <CreateBlog />
          </ProtectedAdmin>
        }
      />
      <Route
        path="/admin/blogs/edit/:id"
        element={
          <ProtectedAdmin>
            <EditBlog />
          </ProtectedAdmin>
        }
      />

      {/* PACKAGES */}
      <Route
        path="/admin/packages"
        element={
          <ProtectedAdmin>
            <PackageList />
          </ProtectedAdmin>
        }
      />
      <Route
        path="/admin/packages/create"
        element={
          <ProtectedAdmin>
            <CreatePackage />
          </ProtectedAdmin>
        }
      />
      <Route
        path="/admin/packages/edit/:id"
        element={
          <ProtectedAdmin>
            <EditPackage />
          </ProtectedAdmin>
        }
      />
        {/* CATEGORIES */}
      <Route
        path="/admin/categories"
        element={
          <ProtectedAdmin>
            <CategoryList />
          </ProtectedAdmin>
        }
      />
      <Route
        path="/admin/categories/create"
        element={
          <ProtectedAdmin>
            <CreateCategory />
          </ProtectedAdmin>
        }
      />
      <Route
        path="/admin/categories/edit/:id"
        element={
          <ProtectedAdmin>
            <EditCategory />
          </ProtectedAdmin>
        }
      />

       {/* ENQUIRIES */}
      <Route
        path="/admin/enquiries"
        element={
          <ProtectedAdmin>
            <EnquiryList />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/enquiries/:id"
        element={
          <ProtectedAdmin>
            <EnquiryDetails />
          </ProtectedAdmin>
        }
      />


      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
