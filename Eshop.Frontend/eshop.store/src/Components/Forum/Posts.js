import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";

import AddPost from "./AddPost";
import TrustedUserIcon from "../Core/TrustedUserIcon";

import "./style.css";

const Posts = () => {
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    currentPage: 1,
    pageSze: 20,
    searchParams: "",
    // TODO: add from and to date
  });
  const [render, setRender] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await forumApi.getPosts();
        console.log(response.data);
        setPosts(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const getDisplayDate = (dateString) => {
    const date = dateString.split("T")[0];
    const timeSplit = dateString.split("T")[1].split(":");

    return `${date} at ${timeSplit[0]}:${timeSplit[1]}`;
  };

  const renderPosts = () => {
    return posts?.map((post, key) => (
      <div key={key} className="col-md-12 p-3 card post-card mb-2">
        <Link to={`/forum/post/${post.hashId}`} className="post-title-link">
          {post.title}
        </Link>
        <hr className="post-text" />
        <div className="row d-flex">
          <div className="col-md-4 justify-content-start">
            <span>
              <TrustedUserIcon username={post.username} />
              {post.username}
            </span>
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
          <AddPost setRender={setRender} />
          {renderPosts()}
        </div>
      </div>
    </div>
  );
};

export default Posts;
