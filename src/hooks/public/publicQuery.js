import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleBlogById, handleCategoryById, handlePackageById, handlePublicBlog, handlePublicCategories, handlePublicPackage } from "../../api/public/publicApi";


/**
 * ===============================
 * COMMON PUBLIC QUERY OPTIONS
 * ===============================
 */

const commonPublicQueryOptions = {
  staleTime: 1000 * 60 * 5,      // 5 minutes
  cacheTime: 1000 * 60 * 10,     // 10 minutes
  refetchOnWindowFocus: false,
  retry: 1
};

/**
 * ===============================
 * BLOG QUERIES (PUBLIC)
 * ===============================
 */

// Get all public blogs
export const usePublicBlogs = () => {
  return useQuery({
    queryKey: ["public-blogs"],
    queryFn: handlePublicBlog,
    ...commonPublicQueryOptions,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Failed to load blogs"
      );
    }
  });
};

// Get single public blog
export const usePublicBlogById = (id) => {
  return useQuery({
    queryKey: ["public-blog", id],
    queryFn: () => handleBlogById(id),
    enabled: !!id,               // id ho tabhi fire ho
    ...commonPublicQueryOptions,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Failed to load blog"
      );
    }
  });
};

/**
 * ===============================
 * PACKAGE QUERIES (PUBLIC)
 * ===============================
 */

// Get all public packages
export const usePublicPackages = () => {
  return useQuery({
    queryKey: ["public-packages"],
    queryFn: handlePublicPackage,
    ...commonPublicQueryOptions,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Failed to load packages"
      );
    }
  });
};

// Get single public package
export const usePublicPackageById = (id) => {
  return useQuery({
    queryKey: ["public-package", id],
    queryFn: () => handlePackageById(id),
    enabled: !!id,
    ...commonPublicQueryOptions,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Failed to load package"
      );
    }
  });
};



/**
 * ===============================
 * CATEGORY QUERIES (PUBLIC)
 * ===============================
 */

// Get all public categories
export const usePublicCategories = () => {
  return useQuery({
    queryKey: ["public-categories"],
    queryFn: handlePublicCategories,
    ...commonPublicQueryOptions,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to load categories"
      );
    },
  });
};

// Get single public category (with packages)
export const usePublicCategoryById = (id) => {
  return useQuery({
    queryKey: ["public-category", id],
    queryFn: () => handleCategoryById(id),
    enabled: !!id,
    ...commonPublicQueryOptions,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Failed to load category"
      );
    },
  });
};