import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";

const UserComments = () => {
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await forumApi.getCommentsFromUser();
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDisplayDate = (dateString) => {
    const date = dateString.split("T")[0];
    const timeSplit = dateString.split("T")[1].split(":");

    return `${date} at ${timeSplit[0]}:${timeSplit[1]}`;
  };

  const handlePostClick = (postHashId) => {
    navigate(`/forum/post/${postHashId}`);
  };

  const renderOrders = () => {
    return comments?.map((comment, key) => (
      <tr key={key} onClick={() => handlePostClick(comment.postHashId)}>
        <th>{key + 1}</th>
        <td>
          <div className="crop">{comment.text}</div>
        </td>
        <td>{comment.score}</td>
        <td>{getDisplayDate(comment.timeOfPost)}</td>
      </tr>
    ));
  };

  return (
    <div className="card p-4">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Text</th>
            <th>Score</th>
            <th>Time of post</th>
          </tr>
        </thead>
        <tbody>{renderOrders()}</tbody>
      </table>
    </div>
  );
};

export default UserComments;
