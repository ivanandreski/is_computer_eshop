const baseUrl = "/category";

export const getAllCategories = () => `${baseUrl}`;
export const getCategory = (hashId) => `${baseUrl}/${hashId}`;
export const addCategory = () => `${baseUrl}`;
export const editCategory = (hashId) => `${baseUrl}/${hashId}`;
export const deleteCategory = (hashId) => `${baseUrl}/${hashId}`;

export const getFormData = (name) => {
  let formData = new FormData();
  formData.append("name", name);

  return formData;
};
