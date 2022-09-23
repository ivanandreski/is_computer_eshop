const baseUrl = "/order";

export default class OrderApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  getOrdersForUser = () => {
    return this.axiosPrivate.get(`${baseUrl}`, {
      withCredentials: true,
    });
  };

  createPaymentIntent = () => {
    return this.axiosPrivate.post(`${baseUrl}/create-payment-intent`, {
      withCredentials: true,
    });
  };

  createOrder = () => {
    return this.axiosPrivate.post(`${baseUrl}/createOrder`, {
      withCredentials: true,
    });
  };

  getOrder = (hashId) => {
    return this.axiosPrivate.get(`${baseUrl}/${hashId}`, {
      withCredentials: true,
    });
  };
}
