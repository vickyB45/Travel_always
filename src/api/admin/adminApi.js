

/**
 * ===============================
 * ADMIN AUTH APIS
 * ===============================
 */

import axiosBaseUrl from "../axios";

// Admin Login
export const handleAdminLogin = async (loginData) => {
  const res = await axiosBaseUrl.post(
    "/auth/login",
    loginData,
    { withCredentials: true }
  );
  return res.data;
};

// Admin Logout
export const handleAdminLogout = async () => {
  const res = await axiosBaseUrl.post("/auth/logout");
  return res.data;
};

// Get Admin Session (ME)
export const getAdminMe = async () => {
  const res = await axiosBaseUrl.get("/auth/me");
  return res.data;
};

/**
 * ===============================
 * BLOG MANAGEMENT APIS (ADMIN)
 * ===============================
 */

// Get All Blogs (draft + public)
export const getAllBlogsAdmin = async () => {
  const res = await axiosBaseUrl.get("/blogs");
  return res.data;
};

// Create Blog
export const createBlogAdmin = async (blogData) => {
  const res = await axiosBaseUrl.post("/blogs", blogData);
  return res.data;
};

// Update Blog
export const updateBlogAdmin = async ({ id, data }) => {
  const res = await axiosBaseUrl.put(`/blogs/${id}`, data);
  return res.data;
};

// Delete Blog
export const deleteBlogAdmin = async (id) => {
  const res = await axiosBaseUrl.delete(`/blogs/${id}`);
  return res.data;
};

/**
 * ===============================
 * PACKAGE MANAGEMENT APIS (ADMIN)
 * ===============================
 */

// Get All Packages (draft + public)
export const getAllPackagesAdmin = async () => {
  const res = await axiosBaseUrl.get("/packages");
  return res.data;
};

// Create Package
export const createPackageAdmin = async (packageData) => {
  const res = await axiosBaseUrl.post("/packages", packageData);
  return res.data;
};

// Update Package
export const updatePackageAdmin = async ({ id, data }) => {
  const res = await axiosBaseUrl.put(`/packages/${id}`, data);
  return res.data;
};

// Delete Package
export const deletePackageAdmin = async (id) => {
  const res = await axiosBaseUrl.delete(`/packages/${id}`);
  return res.data;
};



 /* ===============================
 * CATEGORY MANAGEMENT APIS (ADMIN)
 * ===============================
 */

// Get All Categories (admin – active + inactive)
export const getAllCategoriesAdmin = async () => {
  const res = await axiosBaseUrl.get("/category/admin");
  return res.data;
};

// Create Category
export const createCategoryAdmin = async (categoryData) => {
  const res = await axiosBaseUrl.post("/category", categoryData);
  return res.data;
};

// Update Category
export const updateCategoryAdmin = async ({ id, data }) => {
  const res = await axiosBaseUrl.put(`/category/${id}`, data);
  return res.data;
};

// Delete Category
export const deleteCategoryAdmin = async (id) => {
  const res = await axiosBaseUrl.delete(`/category/${id}`);
  return res.data;
};
