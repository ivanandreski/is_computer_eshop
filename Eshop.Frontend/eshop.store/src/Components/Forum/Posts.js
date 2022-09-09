import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";

import AddPost from "./AddPost";
import TrustedUserIcon from "../Core/TrustedUserIcon";
import PostPagination from "./PostPagination";

import "./style.css";
import PostDateFilter from "./PostDateFilter";

const Posts = () => {
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    currentPage: 1,
    pageSize: 20,
    searchParams: "",
    totalPages: 0,
    fromDate: {},
    toDate: {},
  });
  const [render, setRender] = useState(0);

  const fetchPosts = async () => {
    try {
      const response = await forumApi.getPosts(filter);
      setPosts(response.data.items);
      setFilter({
        ...filter,
        totalPages: response.data.totalPages,
        pageSize: response.data.pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    render,
    filter.currentPage,
    filter.pageSize,
    filter.toDate,
    filter.fromDate,
  ]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="row">
          <PostDateFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-12 p-3 card post-card mb-2 mt-2">
            <form style={{ display: "inline-block" }} onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control w-100"
                    placeholder="Search"
                    value={filter.searchParams}
                    onChange={(e) =>
                      setFilter({ ...filter, searchParams: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-secondary w-100">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <AddPost setRender={setRender} />
          {renderPosts()}
        </div>
        <div className="row">
          <PostPagination filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
