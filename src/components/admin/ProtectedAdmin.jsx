import { Navigate } from "react-router-dom";

import { useAdminMe } from "../../hooks/admin/queries/adminQuery";
import Loader from "../../components/common/Loader";
import { toast } from "sonner";

const ProtectedAdmin = ({ children }) => {
  const {
    data,
    isLoading,
    isError
  } = useAdminMe();
  

  // ⏳ jab tak admin session check ho raha hai
  if (isLoading) {
    return <Loader />;
  }

  // ❌ session invalid / expired
  if (isError || !data?.isAuthenticated) {
    toast.error("You are unauthorized. Please login to continue.")
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ admin authenticated
  return children;
};

export default ProtectedAdmin;
