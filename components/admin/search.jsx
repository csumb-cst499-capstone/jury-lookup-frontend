import React, { useState } from "react";

export function SearchBar({ onDataFetched }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/search?query=${query}`
      );
      if (response.status === 200) {
        const data = await response.json();
        onDataFetched(data);
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
