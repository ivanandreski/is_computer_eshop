import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";
import useCanAdd from "../../Hooks/Forum/useCanAdd";

import "./style.css";

const AddComment = ({ setRender, postHashId }) => {
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);
  const canAdd = useCanAdd();

  const clearForm = () => {
    return {
      postHashId: postHashId,
      text: "",
    };
  };

  const [comment, setComment] = useState(clearForm());

  const handleCommentClick = async () => {
    try {
      await forumApi.createComment(comment);
      setComment(clearForm());
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return canAdd() ? (
    <div className="card post-card p-3 mb-2 mt-3">
      <div className="row mb-2">
        <div className="col-md-12">
          <textarea
            type="text"
            className="form-control"
            placeholder="Type something..."
            value={comment.text}
            onChange={(e) => setComment({ ...comment, text: e.target.value })}
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8"></div>
        <div className="col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={handleCommentClick}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="card post-card p-3 mb-2 mt-3">
      <strong className="post-title">Log in to post a comment</strong>
    </div>
  );
};

export default AddComment;
