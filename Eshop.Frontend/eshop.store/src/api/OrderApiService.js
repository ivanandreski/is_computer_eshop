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
}
