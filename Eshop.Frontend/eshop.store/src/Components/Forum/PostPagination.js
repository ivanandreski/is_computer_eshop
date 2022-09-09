import React from "react";
import ReactPaginate from "react-paginate";

const PostPagination = ({ filter, setFilter }) => {
  const handlePageSizeChange = (e) => {
    setFilter({
      ...filter,
      pageSize: e.target.value,
    });
  };

  const handlePageClick = (e) => {
    setFilter({
      ...filter,
      currentPage: e.selected + 1,
    });
  };

  return (
    <>
      <div className="col-md-12 p-3 card post-card mb-2">
        <div className="row">
          <div className="col-md-2">
            <select
              className="form-select"
              value={filter.pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value={64}>64</option>
            </select>
          </div>
          <div className="col-md-10">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={filter.totalPages ? filter.totalPages : 0}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName={"pagination"}
              pageClassName="page-item"
              nextClassName="page-item"
              previousClassName="page-item"
              pageLinkClassName="page-link"
              nextLinkClassName="page-link"
              previousLinkClassName="page-link"
              activeClassName="active"
              disabledClassName="disabled"
              breakClassName="page-item"
              breakLinkClassName="page-link"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPagination;
