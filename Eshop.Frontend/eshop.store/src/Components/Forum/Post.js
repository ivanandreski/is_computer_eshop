import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";

import AddComment from "./AddComment";

import "./style.css";

const Post = () => {
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);

  const { hashId } = useParams();

  const [post, setPost] = useState({});
  const [render, setRender] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await forumApi.getPost(hashId);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const getDisplayDate = (dateString) => {
    const date = dateString.split("T")[0];
    const timeSplit = dateString.split("T")[1].split(":");

    return `${date} at ${timeSplit[0]}:${timeSplit[1]}`;
  };

  const renderComments = () => {
    return post?.comments?.map((comment, key) => (
      <div key={key} className="col-md-12 p-3 mb-2 mt-1 card post-card">
        <pre className="post-text">{comment.text}</pre>
        <hr className="post-text" />
        <div className="row d-flex">
          <div className="col-md-4 justify-content-start">
            Posted by: {comment.username}
          </div>
          <div className="col-md-8 justify-content-end">
            Time of post: {getDisplayDate(post.timeOfPost)}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-12 p-3 mb-1 mt-2 card post-card">
            <strong className="post-title">{post.title}</strong>
          </div>
          <div className="col-md-12 p-3 mb-2 mt-1 card post-card">
            <pre className="post-text">{post.text}</pre>
          </div>
          <AddComment setRender={setRender} postHashId={hashId} />
          {renderComments()}
        </div>
      </div>
    </div>
  );
};

export default Post;
