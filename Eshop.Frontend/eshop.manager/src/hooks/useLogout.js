import axios from "../axios/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axios.post(
        "/user/logout",
        {
          accessToken: "",
          refreshToken: sessionStorage.getItem("refresh"),
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setAuth({});
      sessionStorage.setItem("refresh", null);
    }
  };

  return logout;
};

export default useLogout;
