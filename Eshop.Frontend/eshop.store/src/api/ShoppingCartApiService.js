const baseUrl = "/shoppingCart";

export default class ShoppingCartApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  getUserCart = () => {
    return this.axiosPrivate.get(`${baseUrl}`, {
      withCredentials: true,
    });
  };

  clearCart = () => {
    return this.axiosPrivate.put(`${baseUrl}/clear`, {
      withCredentials: true,
    });
  };

  addProductToCart = (productHashId) => {
    let formData = new FormData();
    formData.append("productHashId", productHashId);

    return this.axiosPrivate.post(`${baseUrl}`, formData, {
      withCredentials: true,
    });
  };

  changeProductQuantity = (productInCartHashId, quantity) => {
    let formData = new FormData();
    formData.append("productInCartHashId", productInCartHashId);
    formData.append("quantity", quantity);

    return this.axiosPrivate.put(`${baseUrl}`, formData, {
      withCredentials: true,
    });
  };

  removeProduct = (productInCartHashId) => {
    let formData = new FormData();
    formData.append("productInCartHashId", productInCartHashId);

    return this.axiosPrivate.put(`${baseUrl}/removeProduct`, formData, {
      withCredentials: true,
    });
  };
}
