import { Skeleton, Button, Input, kbd } from "@nextui-org/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { API } from "../../constants/api_constants";

export function SearchBar({ onDataFetched, onError, setLoading }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") {
      return; // Exit early if the query is empty or contains only whitespace
    }

    try {
      setLoading(true); // Set loading to true before making the API call
      let url = API.search(query);
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Search results fetched successfully");
        onDataFetched(data);
      } else {
        onError("Error fetching search results");
      }
    } catch (error) {
      onError("Error fetching search results");
    } finally {
      setLoading(false); // Set loading to false after the API call is completed
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }

    if (event.key === "Escape") {
      setQuery("");
    }
  };

  return (
    <div className="w-[600px] h-[250px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-purple-200 to-violet-500 text-white shadow-custom">
      <Input
        label="Search"
        isClearable
        radius="lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            //"bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        variant="filled"
        startContent={
          <BsSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        onClear={() => {
          setQuery("");
        }}
      />
    </div>
  );
}

export default SearchBar;
