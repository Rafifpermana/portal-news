import React from "react";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-6">
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-rich-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for AI news"
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full pl-12 pr-4 py-4 text-lg bg-white border-2 border-rich-black rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 hover:shadow-xl"
        />
      </div>
    </div>
  );
};

export default SearchBar;
