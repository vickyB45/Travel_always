// EditBlog.jsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, X, Image as ImageIcon, Plus, Trash2 } from "lucide-react";

import AdminLayout from "../../../components/admin/AdminLayout";
import FormSkeleton from "../../../components/common/FormSkeleton";
import ButtonLoader from "../../../components/common/ButtonLoader";

import { blogSchema } from "../../../schemas/admin.schema";
import { useAdminBlogs } from "../../../hooks/admin/queries/adminQuery";
import { useUpdateBlog } from "../../../hooks/admin/mutations/adminMutate";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useAdminBlogs();
  const { mutate: updateBlog, isPending } = useUpdateBlog();

  const blogs = data || [];
  const currentBlog = blogs.find((b) => b._id === id);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      isActive: "draft",
      metaData: [""]
    }
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "metaData"
  });

  const imageUrl = watch("img");

  // Prefill form when blog data arrives - SIMPLIFIED like CreateBlog
  useEffect(() => {
    if (currentBlog) {
      const metaArray = Array.isArray(currentBlog.metaData) 
        ? currentBlog.metaData.filter(Boolean) 
        : [];
      
      replace(metaArray.length > 0 ? metaArray : [""]);

      // Set other fields
      // Other fields get set via defaultValues or form control
    }
  }, [currentBlog, replace]);

  const onSubmit = (formData) => {
    const transformedData = {
      ...formData,
      metaData: formData.metaData.filter(Boolean)
    };

    updateBlog(
      { id, data: transformedData },
      {
        onSuccess: () => {
          navigate("/admin/blogs");
        }
      }
    );
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/blogs")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog</h1>
          <p className="text-sm text-gray-600">Update your blog post details</p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-4xl">
        {isLoading ? (
          <div className="p-6">
            <FormSkeleton />
          </div>
        ) : !currentBlog ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Blog not found</p>
            <button
              onClick={() => navigate("/admin/blogs")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Blogs
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 space-y-6">
              {/* Image Preview */}
              {imageUrl ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Invalid image URL</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Image preview will appear here</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TITLE */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("title", { value: currentBlog?.title || "" })}
                    placeholder="Enter blog title"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.title.message}
                    </p>
                  )}
                </div>

                {/* HIGHLIGHT */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Highlight <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("highlight", { value: currentBlog?.highlight || "" })}
                    placeholder="e.g., Cash Back, Trending"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  {errors.highlight && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.highlight.message}
                    </p>
                  )}
                </div>

                {/* IMAGE URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("img", { value: currentBlog?.img || "" })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  {errors.img && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.img.message}
                    </p>
                  )}
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("desc", { value: currentBlog?.desc || "" })}
                    rows={5}
                    placeholder="Write a detailed description of your blog post..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  />
                  {errors.desc && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.desc.message}
                    </p>
                  )}
                </div>

                {/* META DATA - ARRAY (EXACTLY LIKE CREATEBLOG) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Tags
                  </label>
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-end">
                        <input
                          {...register(`metaData.${index}`)}
                          placeholder="Enter meta tag"
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          disabled={fields.length === 1}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {errors.metaData?.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠</span> {errors.metaData.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => append("")}
                    className="mt-2 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm"
                  >
                    <Plus size={16} />
                    Add Meta Tag
                  </button>
                </div>

                {/* STATUS */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("isActive", { value: currentBlog?.isActive || "draft" })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  >
                    <option value="draft">📝 Draft</option>
                    <option value="public">🌐 Public</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <ButtonLoader />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Update Blog
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/blogs")}
                className="flex-1 sm:flex-initial border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default EditBlog;
