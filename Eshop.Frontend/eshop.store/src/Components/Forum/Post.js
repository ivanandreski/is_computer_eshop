import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";
import useGetUsername from "../../Hooks/useGetUsername";
import useGetRoles from "../../Hooks/useGetRoles";

import AddComment from "./AddComment";
import EditPost from "./EditPost";
import TrustedUserIcon from "../Core/TrustedUserIcon";
import PostComments from "./PostComments";

import "./style.css";

const Post = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);
  const getUsername = useGetUsername();
  const getRoles = useGetRoles();

  const { hashId } = useParams();

  const [post, setPost] = useState({});
  const [render, setRender] = useState(0);

  const [show, setShow] = useState(false);

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

  const renderComments = () => {
    return <PostComments post={post} setRender={setRender} />;
  };

  const renderEdit = () => {
    if (post.username === getUsername()) {
      return (
        <button className="btn btn-primary w-100" onClick={() => setShow(true)}>
          Edit post
        </button>
      );
    }
  };

  const renderDelete = () => {
    const roles = getRoles();
    if (
      post.username === getUsername() ||
      roles.includes("Admin") ||
      roles.includes("Moderator")
    ) {
      return (
        <button className="btn btn-danger w-100" onClick={handleDelete}>
          Delete post
        </button>
      );
    }
  };

  const handleDelete = async () => {
    try {
      await forumApi.deletePost(post.hashId);
      navigate("/forum/post");
    } catch (error) {
      console.log(error);
    }
  };

  const getDisplayDate = (dateString) => {
    if (dateString === undefined || "") return "";

    const date = dateString.split("T")[0];
    const timeSplit = dateString.split("T")[1].split(":");

    return `${date} at ${timeSplit[0]}:${timeSplit[1]}`;
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
            <hr />
            <div className="row d-flex">
              <div className="col-md-6 justify-content-start">
                <span>
                  <TrustedUserIcon username={post.username} />
                  <strong>{post.username}</strong>
                </span>
              </div>
              <div className="col-md-6 justify-content-end">
                Time of post: {getDisplayDate(post.timeOfPost)}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">{renderEdit()}</div>
              <div className="col-md-6">{renderDelete()}</div>
            </div>
          </div>
          <EditPost
            post={post}
            show={show}
            setShow={setShow}
            setRender={setRender}
          />
          <AddComment setRender={setRender} postHashId={hashId} />
          {renderComments()}
        </div>
      </div>
    </div>
  );
};

export default Post;
