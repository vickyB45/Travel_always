import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getAdminMe,
  getAllBlogsAdmin,
  getAllCategoriesAdmin,
  getAllEnquiriesAdmin,
  getAllPackagesAdmin,
  getSingleEnquiryAdmin
} from "../../../api/admin/adminApi";

/**
 * ===============================
 * COMMON QUERY OPTIONS
 * ===============================
 */

const commonQueryOptions = {
  staleTime: 1000 * 60 * 5,          // 5 minutes
  cacheTime: 1000 * 60 * 10,         // 10 minutes
  refetchOnWindowFocus: false,
  retry: 1
};

/**
 * ===============================
 * ADMIN AUTH QUERY
 * ===============================
 */

export const useAdminMe = () => {
  return useQuery({
    queryKey: ["admin-me"],
    queryFn: getAdminMe,
    staleTime: 0,                    // always fresh
    cacheTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    onError: (err) => {
      const message =
        err?.response?.data?.message || "Session expired";
      toast.error(message);
    }
  });
};

/**
 * ===============================
 * BLOG QUERIES (ADMIN)
 * ===============================
 */

export const useAdminBlogs = () => {
  return useQuery({
    queryKey: ["admin-blogs"],
    queryFn: getAllBlogsAdmin,
    ...commonQueryOptions,
    onSuccess: (data) => {
      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to fetch blogs"
      );
    }
  });
};

/**
 * ===============================
 * PACKAGE QUERIES (ADMIN)
 * ===============================
 */

export const useAdminPackages = () => {
  return useQuery({
    queryKey: ["admin-packages"],
    queryFn: getAllPackagesAdmin,
    ...commonQueryOptions,
    onSuccess: (data) => {
      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to fetch packages"
      );
    }
  });
};


 /* ===============================
 * CATEGORY QUERIES (ADMIN)
 * ===============================
 */

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: getAllCategoriesAdmin,
    ...commonQueryOptions,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to fetch categories"
      );
    }
  });
};


/**
 * ===============================
 * ENQUIRY QUERIES (ADMIN)
 * ===============================
 */

// Get all enquiries
export const useGetAllEnquiriesAdmin = () => {
  return useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: getAllEnquiriesAdmin,
    staleTime: 1000 * 30,
  });
};

// Get single enquiry by ID
export const useGetSingleEnquiryAdmin = (id) => {
  return useQuery({
    queryKey: ["admin-enquiry", id],
    queryFn: () => getSingleEnquiryAdmin(id),
    enabled: !!id,
  });
};