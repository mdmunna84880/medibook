/** @format */

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import Loading from "@/components/common/Loading";
import { toast } from "react-toastify";
import { clearAuthMsgErr } from "@/store/auth/authSlice";

function PublicRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, message } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading while data is being fetched.
  if (loading) {
    return <Loading />;
  }

  //  Check if authenticated then move them to dashboard
  if (isAuthenticated) {
    // If there is message then the user logged or registered just now, show the toast
    if(message) {
      toast.success(message);
      dispatch(clearAuthMsgErr());
    }
    return <Navigate to="/" replace state={{fromPublic: true, from: location.pathname}}/>;
  }

  // Return the login or signup page if that is not authenticated after loading.
  return children;
}

export default PublicRoute;
