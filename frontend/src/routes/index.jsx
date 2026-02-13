import { Route, Routes } from "react-router";

import Dashboard from "@/pages/dashboard";
import MainLayout from "@/layouts/MainLayout";
import Profile from "@/pages/profile";
import BookAppointment from "@/pages/book-appointment";
import MyAppointment from "@/pages/my-appointment";
import AuthLayout from "@/layouts/AuthLayout";
import SignUp from "@/pages/signup";
import Login from "@/pages/login";
import NotFound from "@/NotFound";
import Services from "@/pages/services";
import PublicRoute from "@/components/common/PublicRoute";
import ProtectedRoute from "@/components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>} >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="my-appointment" element={<MyAppointment />} />
        <Route path="services" element={<Services />} />
      </Route>

      <Route path="/auth" element={<PublicRoute><AuthLayout /></PublicRoute>} >
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
