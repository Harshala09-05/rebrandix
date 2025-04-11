import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// `roles` will be the allowed roles for a specific route.
const AuthRoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.role);
  // Redirect to login only if there's no role
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AuthRoute;