import axios from "../api/axios";

const baseUrl = "/store";

const StoreService = {
  fetchAll: () => {
    return axios.get(baseUrl);
  },

  fetch: (id) => {
    if (id !== undefined) return axios.get(`${baseUrl}/${id}`);
  },

  add: (object) => {
    return axios.post(baseUrl, getFormData(object));
  },

  addProduct: (hashId, quantity) => {
    let formData = new FormData();
    formData.append("quantity", quantity);

    return axios.put(`${baseUrl}/${hashId}/addProduct`, formData);
  },

  edit: (id, object) => {
    if (id !== undefined) {
      return axios.put(`${baseUrl}/${id}`, getFormData(object));
    }
  },

  delete: (id) => {
    if (id !== undefined) return axios.delete(`${baseUrl}/${id}`);
  },
};

const getFormData = (store) => {
  let formData = new FormData();
  formData.append("name", store.name);
  formData.append("city", store.city);
  formData.append("state", store.state);
  formData.append("country", store.country);
  formData.append("zipCode", store.zipCode);
  formData.append("street", store.street);

  return formData;
};

export default StoreService;
