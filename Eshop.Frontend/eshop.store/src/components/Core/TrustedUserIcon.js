import React from "react";
import { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import UserApiService from "../../api/UserApiService";

import trustedUser from "../../resources/images/trustedUser.png";

const TrustedUserIcon = ({ username }) => {
  const axiosPrivate = useAxiosPrivate();
  const userApi = new UserApiService(axiosPrivate);

  const [isTrusted, setIsTrusted] = useState(false);

  useEffect(() => {
    const fetchTrust = async () => {
      try {
        const response = await userApi.isUserTrusted(username);
        setIsTrusted(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrust();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return isTrusted ? (
    <img className="trusted-user-icon" src={trustedUser} alt="" />
  ) : (
    <></>
  );
};

export default TrustedUserIcon;
