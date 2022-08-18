import axios from "../axios/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/user/refreshToken",
      {
        accessToken: "",
        refreshToken: sessionStorage.getItem("refresh"),
      },
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
