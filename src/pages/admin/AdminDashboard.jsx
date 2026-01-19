import { 
  FileText, 
  Package, 
  CheckCircle, 
  TrendingUp,
  Eye,
  Calendar,
  Activity
} from "lucide-react";

import { useAdminBlogs } from "../../hooks/admin/queries/adminQuery";
import { useAdminPackages } from "../../hooks/admin/queries/adminQuery";

import AdminLayout from "../../components/admin/AdminLayout";
import DashboardSkeleton from "../../components/common/DashboardSkeleton";

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
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
        </div>
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const RecentItem = ({ title, date, status, type }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-gray-50 px-2 rounded transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          type === 'blog' 
            ? 'bg-blue-50 text-blue-600' 
            : 'bg-purple-50 text-purple-600'
        }`}>
          {type === 'blog' ? <FileText size={16} /> : <Package size={16} />}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        status === 'public' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-yellow-100 text-yellow-700'
      }`}>
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
  const {
    data: blogs,
    isLoading: blogLoading
  } = useAdminBlogs();

  const {
    data: packages,
    isLoading: packageLoading
  } = useAdminPackages();

  const isLoading = blogLoading || packageLoading;


  // Calculate stats
  const totalBlogs = blogs?.length;
  const totalPackages = packages?.length;
  const activePackages = packages?.filter(pkg => pkg.isActive === "public").length;
  const activeBlogs = blogs?.filter(blog => blog.isActive === "public").length;

  // Get recent items
  const recentBlogs = blogs?.slice(0, 3);
  const recentPackages = packages?.slice(0, 3);


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
              trend="+12% this month"
            />
            <StatCard
              title="Active Blogs"
              value={activeBlogs}
              icon={Eye}
              color="green"
              trend={`${activeBlogs} published`}
            />
            <StatCard
              title="Total Packages"
              value={totalPackages}
              icon={Package}
              color="purple"
              trend="+8% this month"
            />
            <StatCard
              title="Active Packages"
              value={activePackages}
              icon={CheckCircle}
              color="orange"
              trend={`${activePackages} available`}
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                title="View Analytics"
                description="Check your performance"
                icon={Activity}
                color="green"
                onClick={() => alert('Analytics coming soon!')}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <Calendar className="mb-3" size={32} />
              <h3 className="text-2xl font-bold mb-2">{totalBlogs + totalPackages}</h3>
              <p className="text-blue-100">Total Content Items</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <CheckCircle className="mb-3" size={32} />
              <h3 className="text-2xl font-bold mb-2">{activeBlogs + activePackages}</h3>
              <p className="text-green-100">Published Items</p>
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