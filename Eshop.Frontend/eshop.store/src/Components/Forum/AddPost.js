import React, { useState } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";
import PCBuildApiService from "../../api/PCBuildApiService";
import useCanAdd from "../../Hooks/Forum/useCanAdd";

import "./style.css";

const AddPost = ({ setRender }) => {
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);
  const pcBuildApi = new PCBuildApiService(axiosPrivate);
  const canAdd = useCanAdd();

  const clearForm = () => {
    return {
      title: "",
      text: "",
    };
  };

  const [post, setPost] = useState(clearForm());

  const handleAddPcClick = async () => {
    try {
      const response = await pcBuildApi.getPCBuildForForumQuestion();
      setPost({
        ...post,
        text: `${post.text}\n\nPC Build:\n${response.data}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostClick = async () => {
    try {
      await forumApi.createPost(post);
      setPost(clearForm());
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return canAdd() ? (
    <div className="card post-card p-3 mb-2">
      <div className="row mb-2">
        <div className="col-md-3">
          <strong>TITLE: </strong>
        </div>
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            placeholder="Type something..."
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-3">
          <strong>TEXT: </strong>
        </div>
        <div className="col-md-9">
          <textarea
            type="text"
            className="form-control"
            placeholder="Type something..."
            value={post.text}
            onChange={(e) => setPost({ ...post, text: e.target.value })}
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <button className="btn btn-danger w-100" onClick={handleAddPcClick}>
            Add PC Build
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={handlePostClick}>
            Post
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="card post-card p-3 mb-2 mt-3">
      <strong className="post-title">Log in to make a post</strong>
    </div>
  );
};

export default AddPost;
