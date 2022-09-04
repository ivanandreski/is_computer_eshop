import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "../../Hooks/useRefreshToken";
import useAuth from "../../Hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // mesto <p>loading</p> stavi spinner
  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
