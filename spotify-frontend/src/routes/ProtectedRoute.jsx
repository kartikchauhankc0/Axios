import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AuthLoader from "../components/AuthLoader"; // ✅ IMPORT

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // ⏳ Show loader instead of text
  if (loading) {
    return <AuthLoader />;
  }

  // 🔐 Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}