// BlogList.jsx (FIXED - Correct variable names)
import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";

import AdminLayout from "../../../components/admin/AdminLayout";
import Loader from "../../../components/common/Loader";
import ConfirmModal from "../../../components/common/ConfirmModal";

import { useAdminBlogs } from "../../../hooks/admin/queries/adminQuery";
import { useDeleteBlog } from "../../../hooks/admin/mutations/adminMutate";

const BlogList = () => {
  const { data: blogs, isLoading } = useAdminBlogs();
  const { mutate: deleteBlog, isPending } = useDeleteBlog();

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    deleteBlog(selectedId);
    setOpenModal(false);
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your blog posts
          </p>
        </div>

        <Link
          to="/admin/blogs/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Blog
        </Link>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <Loader />
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first blog post
            </p>
            <Link
              to="/admin/blogs/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Create Blog
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Blog
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Highlight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.img && (
                          <img
                            src={blog.img}
                            alt={blog.title}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {blog.title}
                          </p>
                          {blog.desc && (
                            <p className="text-xs text-gray-500 truncate max-w-xs">
                              {blog.desc}
                            </p>
                          )}
                          {blog.metaData && blog.metaData.length > 0 && (
                            <p className="text-xs text-purple-600 truncate max-w-xs mt-1">
                              Tags: {blog.metaData.slice(0, 2).join(", ")}
                              {blog.metaData.length > 2 && "..."}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {blog.highlight && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          {blog.highlight}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          blog.isActive === "public"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.isActive === "public" ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>
                            Public
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-1.5"></span>
                            {blog.isActive}
                          </>
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          onClick={() => handleDeleteClick(blog._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer with count */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {blogs.length} {blogs.length === 1 ? "blog" : "blogs"}
            </p>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      <ConfirmModal
        open={openModal}
        title="Delete Blog"
        description="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Delete"
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
      />
    </AdminLayout>
  );
};

export default BlogList;
