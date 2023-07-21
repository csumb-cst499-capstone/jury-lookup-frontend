import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export function SearchBar({ onDataFetched }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === "") {
      return; // Exit early if the query is empty or contains only whitespace
    }

    try {
      const response = await fetch(
        `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/api/admin/search?query=${query}`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log("Search results fetched successfully");
        onDataFetched(data);
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="bg-custom-colorBox border-2 border-gray-400 dark:border-gray-700 rounded-lg px-3 py-2 flex items-center shadow-admin">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-black w-full focus:outline-none"
          placeholder="Type to search..."
        />
        <button
          className="ml-2 text-purple-600 dark:text-red-300 focus:outline-none "
          onClick={handleSearch}
        >
          <BsSearch className="w-8 h-5" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;