import React from "react";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Cari berita berdasarkan kata kunci..."
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
