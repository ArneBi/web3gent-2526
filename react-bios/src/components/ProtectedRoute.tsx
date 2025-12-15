import React, { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = (props: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return isAuthenticated ? props.children : <Navigate to="/login" />;
};

export default ProtectedRoute;
