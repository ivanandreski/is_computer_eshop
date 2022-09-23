import React from "react";

const Sidebar = ({ categories, handleCategoryChange, setShowBuilds }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">Categories:</div>
      <ul>
        {categories &&
          categories.map((category) => (
            <li key={category.hashId} className="sidebar-items">
              <button
                id={category.hashId}
                className="sidebar-items-buttons"
                onClick={handleCategoryChange}
              >
                {category.name}
              </button>
            </li>
          ))}
      </ul>
      <div className="builds" onClick={() => setShowBuilds(true)}>Builds</div>
    </div>
  );
};

export default Sidebar;
