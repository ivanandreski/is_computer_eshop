import axios from "../axios/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axios.post(
        "/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setAuth({});
    }
  };

  return logout;
};

export default useLogout;
