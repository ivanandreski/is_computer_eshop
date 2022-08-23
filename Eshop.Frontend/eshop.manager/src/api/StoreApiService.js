const baseUrl = "/store";

export default class StoreApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  getFormData = (store) => {
    let formData = new FormData();
    formData.append("name", store.name);
    formData.append("city", store.city);
    formData.append("state", store.state);
    formData.append("country", store.country);
    formData.append("zipCode", store.zipCode);
    formData.append("street", store.street);

    return formData;
  };

  getStores = () => {
    return this.axiosPrivate.get(baseUrl);
  };

  getStore = (hashId) => {
    return this.axiosPrivate.get(`${baseUrl}/${hashId}`);
  };

  addStore = (object) => {
    return this.axiosPrivate.post(baseUrl, this.getFormData(object), {
      withCredentials: true,
    });
  };

  addProductToStore = (hashId, quantity) => {
    let formData = new FormData();
    formData.append("quantity", quantity);

    return this.axiosPrivate.put(`${baseUrl}/${hashId}/addProduct`, formData, {
      withCredentials: true,
    });
  };

  editStore = (hashId, object) => {
    return this.axiosPrivate.put(`${baseUrl}/${hashId}`, this.getFormData(object), {
      withCredentials: true,
    });
  };

  deleteStore = (hashId) => {
    return this.axiosPrivate.delete(`${baseUrl}/${hashId}`, {
      withCredentials: true,
    });
  };
}
