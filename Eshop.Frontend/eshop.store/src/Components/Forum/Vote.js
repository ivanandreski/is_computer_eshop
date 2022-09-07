import React from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";
import useGetUsername from "../../Hooks/useGetUsername";

import "./style.css";

const Vote = ({ comment, setRender }) => {
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);
  const getUsername = useGetUsername();

  const hasVoted = () => {
    const username = getUsername();
    const vote = comment?.userVotes.filter(
      (vote) => vote.username === username
    );
    const voted = vote.length > 0;

    return { voted: voted && vote.score !== 0, score: vote[0]?.score || 0 };
  };

  const getClassUpvote = () => {
    const response = hasVoted();
    if (!response.voted) return "btn btn-secondary";

    if (response.score === 1) return "btn btn-primary";

    return "btn btn-secondary";
  };

  const getClassDownvote = () => {
    const response = hasVoted();
    if (!response.voted) return "btn btn-secondary";

    if (response.score === -1) return "btn btn-danger";

    return "btn btn-secondary";
  };

  const handleVoteClick = async (e) => {
    const score = e.target.value;
    try {
      await forumApi.voteComment(comment.hashId, score);
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row " style={{ marginTop: "10px" }}>
        <div className="col-md-12 d-flex justify-content-center">
          <button
            className={getClassUpvote()}
            onClick={handleVoteClick}
            value={1}
          >
            ↑
          </button>
        </div>
        <div className="col-md-12 d-flex justify-content-center">
          <strong className="score-count">{comment.score}</strong>
        </div>
        <div className="col-md-12 d-flex justify-content-center">
          <button
            className={getClassDownvote()}
            onClick={handleVoteClick}
            value={-1}
          >
            ↓
          </button>
        </div>
      </div>
    </>
  );
};

export default Vote;
