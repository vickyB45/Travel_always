import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Package,
  X,
  Tag,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Blogs",
    to: "/admin/blogs",
    icon: FileText,
  },
    {
    label: "Categories",   
    to: "/admin/categories",
    icon: Tag,
  },
  {
    label: "Packages",
    to: "/admin/packages",
    icon: Package,
  },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* SIDEBAR - Desktop: fixed, Mobile: slide-in */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white -r shadow-lg
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER with Close Button (Mobile only) */}
        <div className="h-16 flex items-center justify-between px-6 -b bg-black">
          <h2 className="text-lg font-bold text-white">
            Travel Admin
          </h2>
          
          {/* Close button - visible only on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:bg-white/10 cursor-pointer hover:bg-opacity-20 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="p-4 space-y-1">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={onClose} // Close sidebar on mobile after clicking
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                 ${
                   isActive
                     ? "bg-blue-50 text-blue-700 shadow-sm"
                     : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                 }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* FOOTER INFO */}
        <div className="absolute bottom-0 left-0 right-0 p-4  bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Travel Admin Panel v1.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;