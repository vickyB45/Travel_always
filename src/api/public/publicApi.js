import axiosBaseUrl from "../axios";


export const handlePublicBlog = async () => {
  const res = await axiosBaseUrl.get(
    "/blogs/public",
    { withCredentials: true }
  );
  return res.data;
};


export const handleBlogById = async (id) => {
  const res = await axiosBaseUrl.get(
    `/blogs/${id}`,
    { withCredentials: true }
  );
  return res.data;
};



export const handlePublicPackage = async () => {
  const res = await axiosBaseUrl.get(
    "/packages/public",
    { withCredentials: true }
  );
  return res.data;
};


export const handlePackageById = async (id) => {
  const res = await axiosBaseUrl.get(
    `/packages/${id}`,
    { withCredentials: true }
  );
  return res.data;
};




/* =====================
   CATEGORIES (PUBLIC)
===================== */

export const handlePublicCategories = async () => {
  const res = await axiosBaseUrl.get(
    "/category",
    { withCredentials: true }
  );
  return res.data;
};

export const handleCategoryById = async (id) => {
  const res = await axiosBaseUrl.get(
    `/category/${id}`,
    { withCredentials: true }
  );
  return res.data;
};