import { z } from "zod";

/**
 * ===============================
 * ADMIN AUTH
 * ===============================
 */

export const adminLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});

/**
 * ===============================
 * BLOG SCHEMA (ADMIN)
 * ===============================
 */

export const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),

  highlight: z.string().min(2, "Highlight is required"),

  desc: z.string().min(10, "Description is too short"),

  img: z.string().url("Invalid image URL"),

  metaData: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
      }
      return Array.isArray(val) ? val : [];
    },
    z.array(z.string()).optional()
  ),

  isActive: z.enum(["public", "draft"])
});

/**
 * ===============================
 * PACKAGE SCHEMA (ADMIN)
 * ===============================
 */

export  const packageSchema = z.object({
  title: z.string().min(3, "Title is required"),

  img: z.string().min(1, "Image is required"),

  desc: z.string().min(10, "Description is required"),

  price: z.string().min(1, "Price is required"),

  // 🔥 THIS WAS MISSING
  category: z.string().min(1, "Category is required"),

  points: z
    .array(z.string().min(1, "Point cannot be empty"))
    .min(1, "At least one point is required"),

  metaData: z.array(z.string()).optional(),

  isPopular: z.boolean().optional(),

  isActive: z.enum(["public", "draft"], {
    required_error: "Status is required"
  })
});

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});
