// lib/components/Auth/RoleProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

// Nhận vai trò cho phép và vai trò thực tế từ hệ thống (localStorage, context, ...).
const RoleProtectedRoute = ({ allowedRoles }) => {
  const role = localStorage.getItem("VaiTro"); // "lecturer" hoặc "student"

  if (!role) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Không có quyền thì về trang chủ
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
