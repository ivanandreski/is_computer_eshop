import jwt_decode from "jwt-decode";

import useAuth from "./useAuth";

const roleProperty =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const useGetRoles = () => {
  const { auth } = useAuth();

  return () => {
    const decoded = auth?.accessToken
      ? jwt_decode(auth.accessToken)
      : undefined;
    if (decoded === undefined) return [];

    if (!(roleProperty in decoded)) return [];

    if (!(decoded[roleProperty] instanceof Array))
      return [decoded[roleProperty]];

    return decoded[roleProperty];
  };
};

export default useGetRoles;
