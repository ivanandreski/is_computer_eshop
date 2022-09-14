const baseUrl = "/product";

export default class ProductApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  getFormData = (object) => {
    let formData = new FormData();
    formData.append("name", object.name);
    formData.append("description", object.description);
    formData.append("basePrice", object.basePrice);
    formData.append("categoryIdHash", object.categoryHashId);
    formData.append("manufacturer", object.manufacturer);
    formData.append("discontinued", object.discontinued);
    if (object.image) {
      for (let i = 0; i < object?.image[0]?.length || 0; i++) {
        formData.append(`image`, object.image[0][i]);
      }
    }

    return formData;
  };

  getProducts = (queryString) => {
    return this.axiosPrivate.get(baseUrl, { params: queryString });
  };

  getProduct = (id) => {
    return this.axiosPrivate.get(`${baseUrl}/${id}`);
  };

  getProductAvailability = (id) => {
    return this.axiosPrivate.get(`${baseUrl}/${id}/availability`);
  };

  addProduct = (object) => {
    const formData = this.getFormData(object);

    return this.axiosPrivate.post(baseUrl, formData, {
      withCredentials: true,
    });
  };

  editProduct = (id, object) => {
    const formData = this.getFormData(object);

    return this.axiosPrivate.put(`${baseUrl}/${id}`, formData, {
      withCredentials: true,
    });
  };

  deleteImageForProduct = (imageId) => {
    return this.axiosPrivate.delete(`${baseUrl}/${imageId}/deleteImage`, {
      withCredentials: true,
    });
  };

  addImagesToProduct = (productId, images) => {
    let formData = new FormData();
    for (let i = 0; i < images?.length; i++) {
      formData.append(`images`, images[i]);
    }

    return this.axiosPrivate.post(
      `${baseUrl}/${productId}/addImages`,
      formData,
      {
        withCredentials: true,
      }
    );
  };

  deleteProduct = (id) => {
    return this.axiosPrivate.delete(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
  };

  getItemsForType = (type) => {
    return this.axiosPrivate.get(`${baseUrl}/pcBuild/${type}`, {
      withCredentials: true,
    });
  };
}
