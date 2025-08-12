import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, role } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.map(r => r.toLowerCase()).includes(role.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return children;
}



