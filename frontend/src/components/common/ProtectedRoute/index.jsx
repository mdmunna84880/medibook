/** @format */

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import Loading from "@/components/common/Loading";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if the data is loading then send the loading spinner
  if (loading) {
    return <Loading />;
  }

  //   If not authenticated move them to login page
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ fromProtected: true, from: location.pathname }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;
