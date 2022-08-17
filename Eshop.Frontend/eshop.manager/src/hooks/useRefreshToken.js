import axios from "../axios/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/user/refresh-token",
      { accessToken: auth.accessToken, refreshToken: auth.refreshToken },
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
