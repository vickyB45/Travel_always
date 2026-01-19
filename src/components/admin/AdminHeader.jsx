// AdminHeader.jsx (FIXED - Redirects to admin/login after logout)
import { useState } from "react";
import { LogOut, Menu } from "lucide-react";

import { useAdminLogout } from "../../hooks/admin/mutations/adminMutate";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ onMenuClick }) => {
  const [openLogout, setOpenLogout] = useState(false);

  const {
    mutate: logout,
    isPending
  } = useAdminLogout();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        // Redirect to admin login page after successful logout
        navigate("/admin/login");
      }
    });
    setOpenLogout(false);
  };

  return (
    <>
      {/* HEADER BAR */}
      <header className="h-16 bg-white -b shadow-sm px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          {/* MENU BUTTON */}
          <button
            onClick={onMenuClick}
            className="lg:hidden block text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Admin Panel
          </h1>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => setOpenLogout(true)}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 sm:px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* LOGOUT CONFIRM MODAL */}
      <ConfirmModal
        open={openLogout}
        title="Logout"
        description="Are you sure you want to logout from admin panel?"
        confirmText={isPending ? "Logging out..." : "Logout"}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogout}
        isLoading={isPending}
      />
    </>
  );
};

export default AdminHeader;
