import React from "react";

import useAuth from "./useAuth";

const useIsLoggedIn = () => {
  const { auth } = useAuth();

  return () => {
    return auth?.accessToken ? true : false;
  };
};

export default useIsLoggedIn;
