import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  FileText,
  Clock
} from "lucide-react";

import AdminLayout from "../../../components/admin/AdminLayout";
import Loader from "../../../components/common/Loader";

import { useGetSingleEnquiryAdmin } from "../../../hooks/admin/queries/adminQuery";
import { useUpdateEnquiryStatus } from "../../../hooks/admin/mutations/adminMutate";

const EnquiryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleEnquiryAdmin(id);
  const { mutate, isPending } = useUpdateEnquiryStatus();

  const enquiry = data?.data;

  const [status, setStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  // Set initial values
  useEffect(() => {
    if (enquiry) {
      setStatus(enquiry.status || "new");
      setAdminNotes(enquiry.adminNotes || "");
    }
  }, [enquiry]);

  // Loader - Skeleton UI
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Header Skeleton */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info Skeleton */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Details Skeleton */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Requests Skeleton */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="h-6 w-44 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
                
                {/* Status Skeleton */}
                <div className="mb-5">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-11 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                {/* Admin Notes Skeleton */}
                <div className="mb-6">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mt-2"></div>
                </div>

                {/* Button Skeleton */}
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>

                {/* Last Updated Skeleton */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="h-3 w-40 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Not found
  if (!enquiry) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Enquiry Not Found
            </h3>
            <p className="text-gray-500 mb-6">
              The enquiry you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Update handler - Fixed payload structure
  const handleUpdate = () => {
    mutate({
      id: enquiry._id,
      data: {
        status,
        adminNotes,
      },
    });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    const styles = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      quoted: "bg-purple-100 text-purple-800 border-purple-200",
      closed: "bg-green-100 text-green-800 border-green-200",
    };

    const labels = {
      new: "New",
      contacted: "Contacted",
      quoted: "Quoted",
      closed: "Closed",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.new}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-white border border-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-800">
                  Enquiry Details
                </h1>
                {getStatusBadge(enquiry.status)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>
                  Submitted on{" "}
                  {new Date(enquiry.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE – DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            {/* CUSTOMER INFO */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={18} className="text-indigo-600" />
                Customer Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-800">{enquiry.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                    <p className="font-semibold text-gray-800 break-all">{enquiry.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                    <p className="font-semibold text-gray-800">{enquiry.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TRAVEL INFO */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-purple-600" />
                Travel Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Destination</p>
                    <p className="font-semibold text-gray-800">{enquiry.destination}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Arrival Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(enquiry.arrival_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users size={18} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Number of Guests</p>
                    <p className="font-semibold text-gray-800">{enquiry.guests || 2} Guests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SPECIAL REQUESTS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-teal-600" />
                Special Requests
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {enquiry.special_requests || "No special requests"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – ADMIN UPDATE */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Admin Actions
              </h3>

              {/* STATUS */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* ADMIN NOTES */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Notes
                </label>
                <textarea
                  rows={6}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes here (not visible to customer)..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">
                  These notes are for internal use only
                </p>
              </div>

              {/* UPDATE BUTTON */}
              <button
                onClick={handleUpdate}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                <Save size={18} />
                {isPending ? "Updating..." : "Update Enquiry"}
              </button>

              {/* Last Updated Info */}
              {enquiry.updatedAt && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Last updated:{" "}
                    {new Date(enquiry.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EnquiryDetails;