import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ roles, children }) => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) return <div>Loading...</div>;
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

  const authRolesArray = Object.values(auth.roles).flat();
  const rolesArray = Object.values(roles).flat();

  const isAuthorized = authRolesArray.some((role) => rolesArray.includes(role));

  if (!isAuthorized) return <Navigate to="/unauthorized" replace />;

  return children || <Outlet />;
};

export default PrivateRoute;
