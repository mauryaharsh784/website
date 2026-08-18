import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // Token nahi hai to login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Token hai to dashboard
  return children;
}