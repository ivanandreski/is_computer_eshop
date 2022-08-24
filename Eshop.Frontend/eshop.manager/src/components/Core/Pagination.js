import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ queryString, setQueryString, totalPages }) => {
  const handlePageSizeChange = (e) => {
    const { value } = e.target;
    setQueryString({ ...queryString, pageSize: value });
  };

  const handlePageClick = (e) => {
    setQueryString({ ...queryString, currentPage: e.selected + 1 });
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <select className="form-control" onChange={handlePageSizeChange}>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="48">48</option>
        </select>
      </div>
      <div className="col-md-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages ? totalPages : 0}
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
  );
};

export default Pagination;
