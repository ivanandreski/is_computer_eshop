import React from "react";

const PostDateFilter = ({ filter, setFilter }) => {
  const handleFromChange = (e) => {
    setFilter({
      ...filter,
      fromDate: e.target.value,
    });
  };

  const handleToChange = (e) => {
    setFilter({
      ...filter,
      toDate: e.target.value,
    });
  };

  const clearFilter = () => {
    setFilter({
      ...filter,
      toDate: "",
      fromDate: "",
    });
  };

  return (
    <div className="ps-4 pe-3">
      <div className="col-md-12 p-3 card post-card mt-2">
        <div className="row">
          <div className="col-md-12">
            <strong className="post-title">Date filter</strong>
          </div>
          <div className="col-md-12">
            <strong className="post-title">Start date:</strong>
          </div>
          <div className="col-md-12">
            <input
              type="date"
              className="form-control"
              onChange={handleFromChange}
            />
          </div>
          <div className="col-md-12">
            <strong className="post-title">End date:</strong>
          </div>
          <div className="col-md-12">
            <input
              type="date"
              className="form-control"
              onChange={handleToChange}
            />
          </div>
          <div className="col-md-12 mt-2">
            <button className="btn btn-secondary" onClick={clearFilter}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDateFilter;
