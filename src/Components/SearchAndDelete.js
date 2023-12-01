// SearchAndDelete.js
import React from 'react';

const SearchAndDelete = ({
  searchTerm1,
  handleSearch,
  handleDeleteSelected,
  setSearchTerm1,
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        id="searchInput"
        placeholder="Search..."
        value={searchTerm1}
        onChange={(e) => setSearchTerm1(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? handleSearch() : console.log("wrong key press"))}
      />
      <button className="search-icon" onClick={handleSearch}>Search</button>
    </div>
    <button style={{ marginBottom: "12px" }} className="delete-selected" onClick={handleDeleteSelected}>
      Delete Selected <img style={{ height: "10px", paddingLeft: "5px", marginTop: "5px" }} src={process.env.PUBLIC_URL + '/Icons/bin.png'} alt="Delete" />
    </button>
  </div>
);

export default SearchAndDelete;
