import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* SIDEBAR */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
      />

      {/* OVERLAY for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1 w-full lg:ml-64 overflow-hidden">
        {/* HEADER */}
        <AdminHeader onMenuClick={toggleSidebar} />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;