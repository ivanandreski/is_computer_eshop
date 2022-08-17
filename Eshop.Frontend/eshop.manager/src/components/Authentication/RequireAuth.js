import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.roles?.find((role) => allowedRoles?.includes(role)))
    return <Outlet />;

  if (auth?.user)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
