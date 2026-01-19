import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";

import AdminLayout from "../../../components/admin/AdminLayout";
import Loader from "../../../components/common/Loader";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { useAdminCategories } from "../../../hooks/admin/queries/adminQuery";
import { useDeleteCategory } from "../../../hooks/admin/mutations/adminMutate";


const CategoryList = () => {
  const { data, isLoading } = useAdminCategories();
  const { mutate: deleteCategory, isPending } = useDeleteCategory();
  console.log(data)

  const categories = data?.data || [];

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    deleteCategory(selectedId);
    setOpenModal(false);
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Categories
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage package categories
          </p>
        </div>

        <Link
          to="/admin/categories/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <Loader />
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-500 mb-6">
              Create categories to organize packages
            </p>
            <Link
              to="/admin/categories/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Create Category
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {cat.name}
                    </p>
                    {cat.slug && (
                      <p className="text-xs text-gray-500">
                        {cat.slug}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        cat.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/categories/edit/${cat._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => handleDeleteClick(cat._id)}
                        disabled={isPending}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
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

          {/* FOOTER */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}
            </p>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={openModal}
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        confirmText="Delete"
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
      />
    </AdminLayout>
  );
};

export default CategoryList;
