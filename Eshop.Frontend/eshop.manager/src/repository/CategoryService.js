// import axios from "../api/axios";

const baseUrl = "/category";

const CategoryService = {
  fetchAll: async (axiosPrivate) => {
    let response = [];
    try {
      response = await axiosPrivate.get(baseUrl);
    } catch (error) {
      console.log(error);
      return response;
    }
    return response.data;
  },

  fetch: async (axiosPrivate, id) => {
    let response = {};
    try {
      response = await axiosPrivate.get(`${baseUrl}/${id}`);
    } catch (error) {
      console.log(error);
      return response;
    }
    return response.data;
  },

  add: async (axiosPrivate, name) => {
    let formData = new FormData();
    formData.append("name", name);

    let response = {};
    try {
      response = await axiosPrivate.post(baseUrl, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
      return response;
    }
    return response.data;
  },

  edit: async (axiosPrivate, id, name) => {
    let formData = new FormData();
    formData.append("name", name);

    let response = {};
    try {
      response = await axiosPrivate.put(`${baseUrl}/${id}`, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
      return response;
    }
    return response.data;
  },

  delete: async (axiosPrivate, id) => {
    let response = {};
    try {
      response = await axiosPrivate.delete(`${baseUrl}/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
      return response;
    }
    return response.data;
  },
};

export default CategoryService;
