import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function RedirectIfAuth({ children }) {
  const { user, role } = useContext(AuthContext);

  if (user) {
    if (role?.toLowerCase() === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}



