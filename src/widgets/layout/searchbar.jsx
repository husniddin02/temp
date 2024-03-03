import React from "react";

function SearchBar({ isOpen, onClose }) {
  const handleSearch = (e) => {
    // Здесь можно добавить логику поиска
    console.log("Searching...");
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 mt-12 mr-4 bg-white rounded-lg shadow-lg p-4 z-10">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />
      <button
        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 focus:outline-none"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
