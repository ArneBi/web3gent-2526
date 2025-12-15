import React, { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props: PropsWithChildren) => {
  const isAuthenticated = true;

  return isAuthenticated ? props.children : <Navigate to="/login" />;
};

export default ProtectedRoute;
