import React from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";
import useGetUsername from "../../Hooks/useGetUsername";
import useGetRoles from "../../Hooks/useGetRoles";
import Vote from "./Vote";

const PostComments = ({ post, setRender }) => {
  const getUsername = useGetUsername();
  const getRoles = useGetRoles();
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);

  const getDisplayDate = (dateString) => {
    const date = dateString.split("T")[0];
    const timeSplit = dateString.split("T")[1].split(":");

    return `${date} at ${timeSplit[0]}:${timeSplit[1]}`;
  };

  const renderDelete = (commentHashId) => {
    const roles = getRoles();
    if (
      post.username === getUsername() ||
      roles.includes("Admin") ||
      roles.includes("Moderator")
    ) {
      return (
        <button
          className="btn btn-danger 2-100"
          onClick={() => handleDelete(commentHashId)}
        >
          Delete
        </button>
      );
    }
  };

  const handleDelete = async (commentHashId) => {
    try {
      await forumApi.deleteComment(commentHashId);
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return post?.comments?.map((comment, key) => (
    <div key={key} className="col-md-12 p-3 mb-2 mt-1 card post-card">
      <div className="row">
        <div className="col-md-2">
          <Vote comment={comment} setRender={setRender} />
        </div>
        <div className="col-md-10">
          <pre className="post-text">{comment.text}</pre>
          <hr className="post-text" />
          <div className="row">
            <div className="col-md-4">Posted by: {comment.username}</div>
            <div className="col-md-6">
              Time of post: {getDisplayDate(post.timeOfPost)}
            </div>
            <div className="col-md-2">{renderDelete(comment.hashId)}</div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default PostComments;
