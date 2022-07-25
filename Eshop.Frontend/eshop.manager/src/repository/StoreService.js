import axios from "../axios/axios";

const baseUrl = "/product";

const StoreService = {
  fetchAll: () => {
    return axios.get(baseUrl);
  },

  fetch: (id) => {
    if (id !== undefined) return axios.get(`${baseUrl}/${id}`);
  },

  add: (object) => {
    return axios.post(baseUrl, object);
  },

  edit: (id, object) => {
    if (id !== undefined) {
      return axios.put(`${baseUrl}/${id}`, object);
    }
  },

  delete: (id) => {
    if (id !== undefined) return axios.delete(`${baseUrl}/${id}`);
  },
};

export default StoreService;
