const baseUrl = "/pcBuild";

export default class PCBuildApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  getUserPcBuild = () => {
    return this.axiosPrivate.get(`${baseUrl}`, {
      withCredentials: true,
    });
  };

  updateProduct = (productType, productHashId, count) => {
    const payload = {
      productType: productType,
      productHashId: productHashId,
      count: count || 1,
    };

    return this.axiosPrivate.post(`${baseUrl}`, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };
}
