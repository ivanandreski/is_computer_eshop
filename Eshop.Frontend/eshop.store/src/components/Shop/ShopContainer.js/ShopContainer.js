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
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
        <div className="pagination-search">
          Search:{" "}
          <input
            className="search"
            type="text"
            onChange={handleQueryChange}
          ></input>
        </div>
        <div className="pagination-right">
          <span>Display on site:</span>
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
      {products.length == 0 ? (
        <div className="no-products">
          Ooops looks like we do not have any products that match the search
          criteria...Try searching for something else.
        </div>
      ) : (
        <div className="cards-container">
          {products.map((product) => (
            <ProductCard item={product}></ProductCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopContainer;
