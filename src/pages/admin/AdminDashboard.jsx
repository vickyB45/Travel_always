import { 
  FileText, 
  Package, 
  CheckCircle, 
  TrendingUp,
  Eye,
  Calendar,
  Activity,
  FolderOpen,
  Mail,
  Clock,
  AlertCircle,
  BarChart3
} from "lucide-react";

import { useAdminBlogs } from "../../hooks/admin/queries/adminQuery";
import { useAdminPackages } from "../../hooks/admin/queries/adminQuery";
import { useAdminCategories } from "../../hooks/admin/queries/adminQuery";
import { useGetAllEnquiriesAdmin } from "../../hooks/admin/queries/adminQuery";

import AdminLayout from "../../components/admin/AdminLayout";
import DashboardSkeleton from "../../components/common/DashboardSkeleton";

const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    red: "bg-red-50 text-red-600 border-red-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{value}</h2>
          {trend && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp size={14} />
              <span>{trend}</span>
            </div>
          )}
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const RecentItem = ({ title, date, status, type }) => {
  const getStatusColor = () => {
    if (type === 'enquiry') {
      switch(status) {
        case 'pending': return 'bg-yellow-100 text-yellow-700';
        case 'contacted': return 'bg-blue-100 text-blue-700';
        case 'closed': return 'bg-gray-100 text-gray-700';
        default: return 'bg-yellow-100 text-yellow-700';
      }
    }
    return status === 'public' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-yellow-100 text-yellow-700';
  };

  const getIcon = () => {
    switch(type) {
      case 'blog': return <FileText size={16} />;
      case 'package': return <Package size={16} />;
      case 'enquiry': return <Mail size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getIconBg = () => {
    switch(type) {
      case 'blog': return 'bg-blue-50 text-blue-600';
      case 'package': return 'bg-purple-50 text-purple-600';
      case 'enquiry': return 'bg-orange-50 text-orange-600';
      default: return 'bg-blue-50 text-blue-600';
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-gray-50 px-2 rounded transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${getIconBg()}`}>
          {getIcon()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{title}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor()}`}>
        {status}
      </span>
    </div>
  );
};

const QuickAction = ({ title, description, icon: Icon, onClick, color }) => {
  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    orange: "bg-orange-600 hover:bg-orange-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} text-white rounded-xl p-4 text-left hover:shadow-lg transition-all`}
    >
      <Icon size={24} className="mb-2" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
};

const AdminDashboard = () => {
  const { data: blogs, isLoading: blogLoading } = useAdminBlogs();
  const { data: packages, isLoading: packageLoading } = useAdminPackages();
  const { data: categories, isLoading: categoryLoading } = useAdminCategories();
  const { data: enquiries, isLoading: enquiryLoading } = useGetAllEnquiriesAdmin();

  const isLoading = blogLoading || packageLoading || categoryLoading || enquiryLoading;

  // Calculate stats
  const totalBlogs = blogs?.length || 0;
  const totalPackages = packages?.length || 0;
  const totalCategories = categories?.data?.length || 0;
  const totalEnquiries = enquiries?.data?.length || 0;
  
  const activePackages = packages?.filter(pkg => pkg.isActive === "public").length || 0;
  const activeBlogs = blogs?.filter(blog => blog.isActive === "public").length || 0;
  
  const pendingEnquiries = enquiries?.data?.filter(enq => enq.status === "new").length || 0;
  const contactedEnquiries = enquiries?.data?.filter(enq => enq.status === "contacted").length || 0;

  // Get recent items (sorted by date)
  const recentBlogs = blogs?.slice(0, 3) || [];
  const recentPackages = packages?.slice(0, 3) || [];
  const recentEnquiries = enquiries?.data?.slice(0, 3) || [];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your travel business.</p>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Blogs"
              value={totalBlogs}
              icon={FileText}
              color="blue"
              subtitle={`${activeBlogs} published`}
            />
            <StatCard
              title="Total Packages"
              value={totalPackages}
              icon={Package}
              color="purple"
              subtitle={`${activePackages} active`}
            />
            <StatCard
              title="Categories"
              value={totalCategories}
              icon={FolderOpen}
              color="indigo"
              subtitle="All categories"
            />
            <StatCard
              title="Enquiries"
              value={totalEnquiries}
              icon={Mail}
              color="orange"
              subtitle={`${pendingEnquiries} pending`}
            />
          </div>

          {/* Enquiry Alert */}
          {pendingEnquiries > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="text-orange-600 mt-0.5" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-1">
                  {pendingEnquiries} Pending {pendingEnquiries === 1 ? 'Enquiry' : 'Enquiries'}
                </h3>
                <p className="text-sm text-orange-700">
                  You have unattended enquiries that need your attention.
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/admin/enquiries'}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                View All
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickAction
                title="Create Blog"
                description="Write a new blog post"
                icon={FileText}
                color="blue"
                onClick={() => window.location.href = '/admin/blogs/create'}
              />
              <QuickAction
                title="Add Package"
                description="Create a new travel package"
                icon={Package}
                color="purple"
                onClick={() => window.location.href = '/admin/packages/create'}
              />
              <QuickAction
                title="Add Category"
                description="Create a new category"
                icon={FolderOpen}
                color="green"
                onClick={() => window.location.href = '/admin/categories/create'}
              />
              <QuickAction
                title="View Enquiries"
                description="Check customer enquiries"
                icon={Mail}
                color="orange"
                onClick={() => window.location.href = '/admin/enquiries'}
              />
            </div>
          </div>

          {/* Recent Activity - 3 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Blogs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Blogs</h2>
                <a href="/admin/blogs" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all →
                </a>
              </div>
              <div className="space-y-1">
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((blog) => (
                    <RecentItem
                      key={blog._id}
                      title={blog.title}
                      date={new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      status={blog.isActive}
                      type="blog"
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">No blogs yet</p>
                )}
              </div>
            </div>

            {/* Recent Packages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Packages</h2>
                <a href="/admin/packages" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all →
                </a>
              </div>
              <div className="space-y-1">
                {recentPackages.length > 0 ? (
                  recentPackages.map((pkg) => (
                    <RecentItem
                      key={pkg._id}
                      title={pkg.title}
                      date={new Date(pkg.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      status={pkg.isActive}
                      type="package"
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">No packages yet</p>
                )}
              </div>
            </div>

            {/* Recent Enquiries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Enquiries</h2>
                <a href="/admin/enquiries" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all →
                </a>
              </div>
              <div className="space-y-1">
                {recentEnquiries.length > 0 ? (
                  recentEnquiries.map((enq) => (
                    <RecentItem
                      key={enq._id}
                      title={enq.name}
                      date={new Date(enq.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      status={enq.status}
                      type="enquiry"
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">No enquiries yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <BarChart3 className="mb-3" size={32} />
              <h3 className="text-2xl font-bold mb-2">{totalBlogs + totalPackages}</h3>
              <p className="text-blue-100">Total Content</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <CheckCircle className="mb-3" size={32} />
              <h3 className="text-2xl font-bold mb-2">{activeBlogs + activePackages}</h3>
              <p className="text-green-100">Published</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <Clock className="mb-3" size={32} />
              <h3 className="text-2xl font-bold mb-2">{pendingEnquiries}</h3>
              <p className="text-orange-100">Pending Enquiries</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <Activity className="mb-3" size={32} />
              <h3 className="text-2xl font-bold mb-2">
                {Math.round(((activeBlogs + activePackages) / (totalBlogs + totalPackages || 1)) * 100)}%
              </h3>
              <p className="text-purple-100">Publish Rate</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;