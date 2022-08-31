const baseUrl = "/category";

export default class CategoryApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
    // this.baseUrl = "/category"
  }

  getFormData = (name) => {
    let formData = new FormData();
    formData.append("name", name);

    return formData;
  };

  getCategories = () => {
    return this.axiosPrivate.get(baseUrl);
  };

  getCategory = (hashId) => {
    return this.axiosPrivate.get(`${baseUrl}/${hashId}`);
  };

  addCategory = (name) => {
    const formData = this.getFormData(name);

    return this.axiosPrivate.post(baseUrl, formData, {
      withCredentials: true,
    });
  };

  editCategory = (hashId, name) => {
    const formData = this.getFormData(name);

    return this.axiosPrivate.put(`${baseUrl}/${hashId}`, formData, {
      withCredentials: true,
    });
  };

  deleteCategory = (hashId) => {
    return this.axiosPrivate.delete(`${baseUrl}/${hashId}`, {
      withCredentials: true,
    });
  };
}
