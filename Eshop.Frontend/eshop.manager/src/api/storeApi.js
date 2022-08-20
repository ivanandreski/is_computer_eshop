const baseUrl = "/store";

export const getStores = () => baseUrl;
export const getStore = (hashId) => `${baseUrl}/${hashId}`;
export const addStore = () => baseUrl;
export const editStore = (hashId) => `${baseUrl}/${hashId}`;
export const addProductToStore = (hashId) => `${baseUrl}/${hashId}/addProduct`;
export const deleteStore = (hashId) => `${baseUrl}/${hashId}`;

export const getFormData = (store) => {
  let formData = new FormData();
  formData.append("name", store.name);
  formData.append("city", store.city);
  formData.append("state", store.state);
  formData.append("country", store.country);
  formData.append("zipCode", store.zipCode);
  formData.append("street", store.street);

  return formData;
};

export const getQuantityFormData = (quantity) => {
  let formData = new FormData();
  formData.append("quantity", quantity);

  return formData;
};
