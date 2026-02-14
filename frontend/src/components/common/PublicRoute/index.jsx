/** @format */

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import Loading from "@/components/common/Loading";

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading while data is being fetched.
  if (loading) {
    return <Loading />;
  }

  //  Check if authenticated then move them to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace state={{fromPublic: true, from: location.pathname}}/>;
  }

  // Return the login or signup page if that is not authenticated after loading.
  return children;
}

export default PublicRoute;
