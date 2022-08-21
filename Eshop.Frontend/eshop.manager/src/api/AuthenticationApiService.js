import axios from "./axios";

const baseUrl = "/user";

const AuthenticationApiService = {
  register: async (user, password, firstName, lastName, email) => {
    let response = null;
    const message = JSON.stringify({
      username: user,
      password,
      firstName,
      lastName,
      email,
    });

    try {
      response = await axios.post(`${baseUrl}/register`, message, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
      if (!error?.response) return "No Server Response!";

      if (error.response?.status === 409) return error.response.data.message;

      return "Registration Failed!";
    }

    return response;
  },

  login: async (user, password) => {
    const message = JSON.stringify({
      username: user,
      password,
    });

    let response = null;
    try {
      response = await axios.post(`${baseUrl}/login`, message, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      if (!error?.response) {
        return "No Server Response";
      } else if (error.response?.status === 400) {
        return "Missing Username or Password";
      } else if (error.response?.status === 401) {
        return "Unauthorized";
      } else {
        return "Login Failed";
      }
    }
  },
};

export default AuthenticationApiService;
