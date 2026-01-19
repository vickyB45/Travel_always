// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// import {
//   handleAdminLogin,
//   handleAdminLogout,
//   createBlogAdmin,
//   updateBlogAdmin,
//   deleteBlogAdmin,
//   createPackageAdmin,
//   updatePackageAdmin,
//   deletePackageAdmin
// } from "../../../api/admin/adminApi";

// /**
//  * ===============================
//  * ADMIN AUTH MUTATIONS
//  * ===============================
//  */

// // Admin Login
// export const useAdminLogin = () => {
//   return useMutation({
//     mutationFn: handleAdminLogin,
//     onSuccess: (data) => {
//       toast.success(data?.message || "Login successful");
//     },
//     onError: (err) => {
//       toast.error(
//         err?.response?.data?.message || "Invalid email or password"
//       );
//     }
//   });
// };

// // Admin Logout
// export const useAdminLogout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: handleAdminLogout,
//     onSuccess: (data) => {
//       queryClient.clear();
//       toast.success(data?.message || "Logged out successfully");
//     }
//   });
// };

// /**
//  * ===============================
//  * BLOG MUTATIONS (ADMIN)
//  * ===============================
//  */

// // Create Blog
// export const useCreateBlog = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createBlogAdmin,
//     onSuccess: (res) => {
//       // 🔥 instant UI update
//       queryClient.setQueryData(["admin-blogs"], (old) => {
//         if (!old?.data) return old;
//         return {
//           ...old,
//           data: [res.data, ...old.data]
//         };
//       });

//       // 🔁 backend sync safety
//       queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });

//       toast.success(res?.message || "Blog created successfully");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to create blog");
//     }
//   });
// };

// // Update Blog
// export const useUpdateBlog = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateBlogAdmin,
//     onSuccess: (res) => {
//       queryClient.setQueryData(["admin-blogs"], (old) => {
//         if (!old?.data) return old;
//         return {
//           ...old,
//           data: old.data.map((blog) =>
//             blog._id === res.data._id ? res.data : blog
//           )
//         };
//       });

//       queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });

//       toast.success(res?.message || "Blog updated successfully");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to update blog");
//     }
//   });
// };

// // Delete Blog
// export const useDeleteBlog = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteBlogAdmin,
//     onSuccess: (res, deletedId) => {
//       queryClient.setQueryData(["admin-blogs"], (old) => {
//         if (!old?.data) return old;
//         return {
//           ...old,
//           data: old.data.filter((blog) => blog._id !== deletedId)
//         };
//       });

//       queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });

//       toast.success(res?.message || "Blog deleted successfully");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to delete blog");
//     }
//   });
// };

// /**
//  * ===============================
//  * PACKAGE MUTATIONS (ADMIN)
//  * ===============================
//  */

// // Create Package
// export const useCreatePackage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createPackageAdmin,
//     onSuccess: (res) => {
//       queryClient.setQueryData(["admin-packages"], (old) => {
//         if (!old?.data) return old;
//         return {
//           ...old,
//           data: [res.data, ...old.data]
//         };
//       });

//       queryClient.invalidateQueries({ queryKey: ["admin-packages"] });

//       toast.success(res?.message || "Package created successfully");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to create package");
//     }
//   });
// };

// // Update Package
// export const useUpdatePackage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updatePackageAdmin,
//     onSuccess: (res) => {
//       queryClient.setQueryData(["admin-packages"], (old) => {
//         if (!old?.data) return old;
//         return {
//           ...old,
//           data: old.data.map((pkg) =>
//             pkg._id === res.data._id ? res.data : pkg
//           )
//         };
//       });

//       queryClient.invalidateQueries({ queryKey: ["admin-packages"] });

//       toast.success(res?.message || "Package updated successfully");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to update package");
//     }
//   });
// };

// // Delete Package
// export const useDeletePackage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deletePackageAdmin,
//     onSuccess: (res, deletedId) => {
//       queryClient.setQueryData(["admin-packages"], (old) => {
//         if (!old?.data) return old;
//         return {
//           ...old,
//           data: old.data.filter((pkg) => pkg._id !== deletedId)
//         };
//       });

//       queryClient.invalidateQueries({ queryKey: ["admin-packages"] });

//       toast.success(res?.message || "Package deleted successfully");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to delete package");
//     }
//   });
// };


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  handleAdminLogin,
  handleAdminLogout,
  createBlogAdmin,
  updateBlogAdmin,
  deleteBlogAdmin,
  createPackageAdmin,
  updatePackageAdmin,
  deletePackageAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin
} from "../../../api/admin/adminApi";

/**
 * ===============================
 * ADMIN AUTH MUTATIONS
 * ===============================
 */

// Admin Login
export const useAdminLogin = () => {
  return useMutation({
    mutationFn: handleAdminLogin,
    onSuccess: (data) => {
      toast.success(data?.message || "Login successful");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
      );
    }
  });
};

// Admin Logout
export const useAdminLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAdminLogout,
    onSuccess: (data) => {
      queryClient.clear();
      toast.success(data?.message || "Logged out successfully");
    }
  });
};

/**
 * ===============================
 * BLOG MUTATIONS (ADMIN)
 * ===============================
 */

// Create Blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogAdmin,
    onSuccess: (res) => {
      // instant UI update
      queryClient.setQueryData(["admin-blogs"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: [res.data, ...old.data]
        };
      });

      // backend sync safety (keep as you had)
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });

      toast.success(res?.message || "Blog created successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create blog");
    }
  });
};

// Update Blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlogAdmin,
    onSuccess: (res) => {
      queryClient.setQueryData(["admin-blogs"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((blog) =>
            blog._id === res.data._id ? res.data : blog
          )
        };
      });

      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });

      toast.success(res?.message || "Blog updated successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update blog");
    }
  });
};

// Delete Blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlogAdmin,
    onSuccess: (res, blogId) => {
      // 🔧 FIX: blogId = mutation variable
      queryClient.setQueryData(["admin-blogs"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((blog) => blog._id !== blogId)
        };
      });

      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });

      toast.success(res?.message || "Blog deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete blog");
    }
  });
};

/**
 * ===============================
 * PACKAGE MUTATIONS (ADMIN)
 * ===============================
 */

// Create Package
export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPackageAdmin,
    onSuccess: (res) => {
      queryClient.setQueryData(["admin-packages"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: [res.data, ...old.data]
        };
      });

      queryClient.invalidateQueries({ queryKey: ["admin-packages"] });

      toast.success(res?.message || "Package created successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create package");
    }
  });
};

// Update Package
export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePackageAdmin,
    onSuccess: (res) => {
      queryClient.setQueryData(["admin-packages"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((pkg) =>
            pkg._id === res.data._id ? res.data : pkg
          )
        };
      });

      queryClient.invalidateQueries({ queryKey: ["admin-packages"] });

      toast.success(res?.message || "Package updated successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update package");
    }
  });
};

// Delete Package
export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePackageAdmin,
    onSuccess: (res, packageId) => {
      // 🔧 FIX: packageId = mutation variable
      queryClient.setQueryData(["admin-packages"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((pkg) => pkg._id !== packageId)
        };
      });

      queryClient.invalidateQueries({ queryKey: ["admin-packages"] });

      toast.success(res?.message || "Package deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete package");
    }
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryAdmin,
    onSuccess: (res) => {
      queryClient.setQueryData(["admin-categories"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: [res.data, ...old.data]
        };
      });

      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });

      toast.success(res?.message || "Category created successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to create category"
      );
    }
  });
};


export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryAdmin,
    onSuccess: (res) => {
      queryClient.setQueryData(["admin-categories"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((cat) =>
            cat._id === res.data._id ? res.data : cat
          )
        };
      });

      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });

      toast.success(res?.message || "Category updated successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to update category"
      );
    }
  });
};


export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryAdmin,
    onSuccess: (res, categoryId) => {
      queryClient.setQueryData(["admin-categories"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((cat) => cat._id !== categoryId)
        };
      });

      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });

      toast.success(res?.message || "Category deleted successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to delete category"
      );
    }
  });
};
