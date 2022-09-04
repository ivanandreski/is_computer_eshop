import axios, { axiosPrivate } from "./axios";

const baseUrl = "/forum";

export default class ForumApiService {
  constructor(axiosPrivate) {
    this.axiosPrivate = axiosPrivate;
  }

  //   getPosts = () => {
  //     return axios.get(`${baseUrl}/post/${hashId}`);
  //   };

  createPost = (post) => {
    return axiosPrivate.post(`${baseUrl}/post`, post, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  };

  editPost = (text, hashId) => {
    return axiosPrivate.put(
      `${baseUrl}/post`,
      { text, hashId },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  deletePost = (hashId) => {
    return axiosPrivate.delete(`${baseUrl}/post/${hashId}`, {}, {
      withCredentials: true,
    });
  };

  getPost = (hashId) => {
    return axios.get(`${baseUrl}/post/${hashId}`);
  };

  createComment = (comment) => {
    return axiosPrivate.post(`${baseUrl}/comment`, comment, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  };

  editComment = (text, hashId) => {
    return axiosPrivate.put(
      `${baseUrl}/comment`,
      { text, hashId },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  deleteComment = (hashId) => {
    return axiosPrivate.delete(`${baseUrl}/comment/${hashId}`, {}, {
      withCredentials: true,
    });
  };

  getPostsFromUser = () => {
    return this.axiosPrivate.get(`${baseUrl}/post/user`, {
      withCredentials: true,
    });
  };

  getCommentsFromUser = () => {
    return this.axiosPrivate.get(`${baseUrl}/post/user`, {
      withCredentials: true,
    });
  };
}
