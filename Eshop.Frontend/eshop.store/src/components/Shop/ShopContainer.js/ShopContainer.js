import React from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard.js/ProductCard";

const ShopContainer = ({
  products,
  itemsPerPage,
  page,
  pageCount,
  handlePageClick,
  handlePerPageChange,
  handleQueryChange,
  handleSearchSubmit,
}) => {
  return (
    <div>
      <div className="pagination-container">
        <ReactPaginate
          forcePage={page - 1}
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination-paginate justify-content-center"
          pageClassName="page-item-paginate"
          pageLinkClassName="page-link-paginate"
          previousClassName="page-item-paginate"
          previousLinkClassName="page-link-paginate"
          nextClassName="page-item-paginate"
          nextLinkClassName="page-link-paginate"
          breakClassName="page-item-paginate"
          breakLinkClassName="page-link-paginate"
          activeClassName="active-paginate"
        />
        <form onSubmit={handleSearchSubmit} style={{ display: "inline-block" }}>
          <div className="pagination-search row">
            <div className="col-md-10">
              <input
                className="form-control"
                type="text"
                onChange={handleQueryChange}
                placeholder="Search..."
              ></input>
            </div>
            <div className="col-md-2">
              <button className="btn btn-danger">Search</button>
            </div>
          </div>
        </form>
        <div className="pagination-right">
          <span>Page size:</span>
          <select
            className="per-page-select"
            onChange={(e) => handlePerPageChange(e)}
            value={itemsPerPage}
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>
      {products.length === 0 ? (
        <div className="no-products">
          Ooops looks like we do not have any products that match the search
          criteria...Try searching for something else.
        </div>
      ) : (
        <div className="cards-container">
          {products.map((product, key) => (
            <ProductCard key={key} item={product}></ProductCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopContainer;
