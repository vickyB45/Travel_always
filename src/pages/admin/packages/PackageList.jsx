// PackageList.jsx (Updated with Image + metaData/points display)
import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";

import AdminLayout from "../../../components/admin/AdminLayout";
import Loader from "../../../components/common/Loader";
import ConfirmModal from "../../../components/common/ConfirmModal";

import { useAdminPackages } from "../../../hooks/admin/queries/adminQuery";
import { useDeletePackage } from "../../../hooks/admin/mutations/adminMutate";

const PackageList = () => {
  const { data: packages, isLoading } = useAdminPackages();
  const { mutate: deletePackage, isPending } = useDeletePackage();

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    deletePackage(selectedId);
    setOpenModal(false);
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Packages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your packages
          </p>
        </div>

        <Link
          to="/admin/packages/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Package
        </Link>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <Loader />
      ) : !packages || packages.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No packages found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first package
            </p>
            <Link
              to="/admin/packages/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Create Package
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
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
  Category
</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Popular
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {pkg.img && (
                          <img
                            src={pkg.img}
                            alt={pkg.title}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {pkg.title}
                          </p>
                          {pkg.desc && (
                            <p className="text-xs text-gray-500 truncate max-w-xs">
                              {pkg.desc}
                            </p>
                          )}
                          {pkg.metaData && pkg.metaData.length > 0 && (
                            <p className="text-xs text-gray-500 truncate max-w-xs mt-1">
                              Tags: {pkg.metaData.slice(0, 2).join(", ")}
                              {pkg.metaData.length > 2 && "..."}
                            </p>
                          )}
                          {pkg.points && pkg.points.length > 0 && (
                            <p className="text-xs text-indigo-600 truncate max-w-xs mt-1">
                              Points: {pkg.points.slice(0, 2).join(", ")}
                              {pkg.points.length > 2 && "..."}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{pkg.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
  {pkg.category ? (
    typeof pkg.category === "object" && pkg.category.name ? (
      <span className="text-sm font-medium text-gray-800">
        {pkg.category.name}
      </span>
    ) : (
      <span className="text-xs text-gray-500 italic">
        Category linked
      </span>
    )
  ) : (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
      Category not set yet
    </span>
  )}
</td>


                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          pkg.isActive === "public"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {pkg.isActive === "public" ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>
                            Public
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-1.5"></span>
                            {pkg.isActive}
                          </>
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          pkg.isPopular
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {pkg.isPopular ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-1.5"></span>
                             true
                          </>
                        ) : (
                          "false"
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/packages/edit/${pkg._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          onClick={() => handleDeleteClick(pkg._id)}
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
              Showing {packages.length} {packages.length === 1 ? "package" : "packages"}
            </p>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      <ConfirmModal
        open={openModal}
        title="Delete Package"
        description="Are you sure you want to delete this package? This action cannot be undone."
        confirmText="Delete"
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
      />
    </AdminLayout>
  );
};

export default PackageList;
