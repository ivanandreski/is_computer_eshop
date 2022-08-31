const baseUrl = "/product";

export const getProducts = () => baseUrl;
export const getProduct = (hashId) => `${baseUrl}/${hashId}`;
export const getProductAvailability = (hashId) =>
  `${baseUrl}/${hashId}/availability`;
export const addProduct = () => baseUrl;
export const editProduct = (hashId) => `${baseUrl}/${hashId}`;
export const addImages = (hashId) => `${baseUrl}/${hashId}`;
export const deleteImages = (hashId) => `${baseUrl}/${hashId}`;
export const deleteProduct = (hashId) => `${baseUrl}/${hashId}`;

export const getFormData = (product) => {
  let formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("basePrice", product.basePrice);
  formData.append("categoryIdHash", product.categoryHashId);
  formData.append("manufacturer", product.manufacturer);
  formData.append("discontinued", product.discontinued);
  for (let i = 0; i < product.image[0]?.length; i++) {
    formData.append(`image`, product.image[0][i]);
  }

  return formData;
};

export const getImageFormData = (images) => {
  let formData = new FormData();
  for (let i = 0; i < images?.length; i++) {
    formData.append(`images`, images[i]);
  }

  return formData;
};
