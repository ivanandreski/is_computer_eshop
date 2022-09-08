const baseUrl = "/admin";

export default class AdminApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  getUsers = (params) => {
    if (params === undefined) params = "";

    return this.axiosPrivate.get(`${baseUrl}/users?param=${params}`, {
      withCredentials: true,
    });
  };

  getRoles = () => {
    return this.axiosPrivate.get(`${baseUrl}/roles`, {
      withCredentials: true,
    });
  };

  setRoles = (username, roles) => {
    return this.axiosPrivate.put(
      `${baseUrl}/setRoles`,
      {
        username,
        roles,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  };
}
