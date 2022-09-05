import React from "react";

import useIsLoggedIn from "../useIsLoggedIn";

const useCanAdd = () => {
  const isLoggedIn = useIsLoggedIn();

  return () => {
    return isLoggedIn();
  };
};

export default useCanAdd;
