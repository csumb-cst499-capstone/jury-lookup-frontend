import { Skeleton, Button, Input, kbd } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import useApi from "@/hooks/use_api";

export function SearchBar({ onDataFetched }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useApi(); // Call the hook at the top level

  const handleSearch = async () => {
    if (query.trim() === "") {
      return;
    }

    try {
      let url = new URL(
        `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/api/admin/search`
      );
      url.searchParams.append("query", query);

      const { response, error, isLoading } = api(url); // Use the hook

      if (isLoading) {
        setLoading(true);
      }

      if (error) {
        console.error(error);
      }

      if (response) {
        setLoading(false);
        onDataFetched(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch(); // Perform the initial search on component mount
  }, []); // Empty dependency array to run only once

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }

    if (event.key === "Escape") {
      setQuery("");
    }

    // if double escape is pressed, clear the search bar
  };

  return (
    <div className="w-[600px] h-[240px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
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
            "bg-default-200/50",
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
