import jwt_decode from "jwt-decode";

import useAuth from "./useAuth";

const usernameProperty =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

const useGetUsername = () => {
  const { auth } = useAuth();

  return () => {
    const decoded = auth?.accessToken
      ? jwt_decode(auth.accessToken)
      : undefined;
    if (decoded === undefined) return "";

    if (!(usernameProperty in decoded)) return "";

    return decoded[usernameProperty];
  };
};

export default useGetUsername;
