import { useNavigate } from "react-router-dom";
import { Eye, Mail, Search, Filter, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

import AdminLayout from "../../../components/admin/AdminLayout";

import { useGetAllEnquiriesAdmin } from "../../../hooks/admin/queries/adminQuery";

const EnquiryList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllEnquiriesAdmin();

  const enquiries = data?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter enquiries
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || enquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    const styles = {
      new: "bg-blue-100 text-blue-700 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
      quoted: "bg-purple-100 text-purple-700 border-purple-200",
      closed: "bg-green-100 text-green-700 border-green-200",
    };

    const dots = {
      new: "bg-blue-600",
      contacted: "bg-yellow-600",
      quoted: "bg-purple-600",
      closed: "bg-green-600",
    };

    const labels = {
      new: "New",
      contacted: "Contacted",
      quoted: "Quoted",
      closed: "Closed",
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.new}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dots[status] || dots.new}`} />
        {labels[status] || status}
      </span>
    );
  };

  // Stats
  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    quoted: enquiries.filter((e) => e.status === "quoted").length,
    closed: enquiries.filter((e) => e.status === "closed").length,
  };

  return (
    <AdminLayout>
      <div className=" bg-gray-50 min-h-screen">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-gray-600 mt-1">
            Manage customer travel enquiries and requests
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-blue-600 mb-1">New</p>
            <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-yellow-600 mb-1">Contacted</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.contacted}</p>
          </div>
          <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-purple-600 mb-1">Quoted</p>
            <p className="text-2xl font-bold text-purple-700">{stats.quoted}</p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-green-600 mb-1">Closed</p>
            <p className="text-2xl font-bold text-green-700">{stats.closed}</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, email, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            {/* Table Skeleton */}
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4 pb-4 border-b border-gray-200">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 py-4">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="h-10 bg-gray-100 rounded animate-pulse"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={36} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || statusFilter !== "all"
                  ? "No enquiries found"
                  : "No enquiries yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Customer enquiries will appear here"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Arrival
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/enquiries/${enquiry._id}`)}
                    >
                      {/* CUSTOMER */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-indigo-700 font-semibold text-sm">
                              {enquiry.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {enquiry.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {enquiry.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* DESTINATION */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-purple-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700">
                            {enquiry.destination}
                          </span>
                        </div>
                      </td>

                      {/* CONTACT */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{enquiry.phone}</p>
                      </td>

                      {/* ARRIVAL */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-orange-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {new Date(enquiry.arrival_date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        {getStatusBadge(enquiry.status)}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/enquiries/${enquiry._id}`);
                            }}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredEnquiries.length}</span> of{" "}
                <span className="font-semibold text-gray-900">{enquiries.length}</span>{" "}
                {enquiries.length === 1 ? "enquiry" : "enquiries"}
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EnquiryList;