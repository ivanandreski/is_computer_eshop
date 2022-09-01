const baseUrl = "/user";

export default class UserApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  getDetails = () => {
    return this.axiosPrivate.get(`${baseUrl}/details`, {
      withCredentials: true,
    });
  };

  editDetails = (details) => {
    return this.axiosPrivate.put(`${baseUrl}/details`, details, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };

  changePassword = (changePassword) => {
    return this.axiosPrivate.post(`${baseUrl}/changePassword`, changePassword, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };
}
