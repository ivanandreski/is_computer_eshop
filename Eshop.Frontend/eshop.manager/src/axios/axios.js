import axios from "axios";

const { REACT_APP_ESHOP_API } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_ESHOP_API,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
});

export default instance;
