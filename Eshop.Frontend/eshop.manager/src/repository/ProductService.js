import axios from "../axios/axios";

const baseUrl = "/product";

const ProductService = {
  fetchAll: () => {
    return axios.get(baseUrl);
  },

  fetch: (id) => {
    if (id !== undefined) return axios.get(`${baseUrl}/${id}`);
  },

  fetchAvailability: (id) => {
    if (id !== undefined) return axios.get(`${baseUrl}/${id}/availability`);
  },

  add: (object) => {
    let formData = getFormData(object);

    return axios.post(baseUrl, formData);
  },

  edit: (id, object) => {
    if (id !== undefined) {
      let formData = getFormData(object);

      return axios.put(`${baseUrl}/${id}`, formData);
    }
  },

  delete: (id) => {
    if (id !== undefined) return axios.delete(`${baseUrl}/${id}`);
  },
};

const getFormData = (object) => {
  let formData = new FormData();
  formData.append("name", object.name);
  formData.append("description", object.description);
  formData.append("basePrice", object.basePrice);
  formData.append("categoryIdHash", object.categoryHashId);
  formData.append("image", object.image);
  formData.append("manufacturer", object.manufacturer);
  formData.append("discontinued", object.discontinued);

  return formData;
};

export default ProductService;
