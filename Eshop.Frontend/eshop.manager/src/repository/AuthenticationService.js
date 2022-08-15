import { Axios } from "axios";
import axios from "../axios/axios";

const baseUrl = "/user";

const AuthenticationService = {
  register: async (user, password, firstName, lastName, email) => {
    let response = null;
    const message = JSON.stringify({
      username: user,
      password,
      firstName,
      lastName,
      email,
    });
    console.log(message);

    try {
      response = await axios.post(`${baseUrl}/register`, message, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
    } catch (error) {
      console.log(error);
      if (!error?.response) return "No Server Response!";

      if (error.response?.status === 409) return error.response.data.message;

      return "Registration Failed!";
    }

    return response;
  },
};

export default AuthenticationService;
