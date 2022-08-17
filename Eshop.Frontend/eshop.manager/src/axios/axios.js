import axios from "axios";

const { REACT_APP_ESHOP_API } = process.env;

export default axios.create({
  baseURL: REACT_APP_ESHOP_API,
});

// export default instance;

export const axiosPrivate = axios.create({
  baseURL: REACT_APP_ESHOP_API,
  //   headers: {

  //   }
  withCredentials: true,
});
