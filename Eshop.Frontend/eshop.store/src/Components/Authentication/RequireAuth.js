import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import jwt_decode from "jwt-decode";

const roleProperty =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const roles =
    decoded === undefined
      ? []
      : !(roleProperty in decoded)
      ? []
      : decoded[roleProperty] instanceof Array
      ? decoded[roleProperty]
      : [decoded[roleProperty]];

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
