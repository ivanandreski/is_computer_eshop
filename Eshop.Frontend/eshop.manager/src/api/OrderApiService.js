const baseUrl = "/order";

export default class OrderApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  getOrders = (filter) => {
    return this.axiosPrivate.get(
      `${baseUrl}/manager`,
      { params: filter },
      {
        withCredentials: true,
      }
    );
  };

  updateStatus = (hashId) => {
    return this.axiosPrivate.post(`${baseUrl}/manager/${hashId}`, {
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
