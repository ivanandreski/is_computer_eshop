import axios from "../axios/axios";

const baseUrl = "/category";

const CategoryService = {
  fetchAll: () => {
    return axios.get(baseUrl);
  },

  fetch: (id) => {
    if (id !== undefined) return axios.get(`${baseUrl}/${id}`);
  },

  add: (name) => {
    let formData = new FormData();
    formData.append("name", name);

    return axios.post(baseUrl, formData);
  },

  edit: (id, name) => {
    if (id !== undefined) {
      let formData = new FormData();
      formData.append("name", name);

      return axios.put(`${baseUrl}/${id}`, formData);
    }
  },

  delete: (id) => {
    if (id !== undefined) return axios.delete(`${baseUrl}/${id}`);
  },
};

export default CategoryService;
