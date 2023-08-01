"use client";
import React, { useState } from "react";
import SearchBar from "@/components/admin/search";
import SearchResultsTable from "@/components/admin/search_results_table";

export function JurorLookup() {
  const [jurorData, setJurorData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDataFetched = (data) => {
    setShowResults(true);
    setJurorData(data);
    setLoading(false);
    setError(null);
  };

  const handleDataFetchError = (error) => {
    setError(error);
    setLoading(false);
  };

  const handleSaveJuror = (updatedJuror) => {
    // Update the jurorData array in the parent component
    const updatedData = jurorData.map((juror) => {
      if (juror._id === updatedJuror._id) {
        return updatedJuror;
      }
      return juror;
    });
    setJurorData(updatedData);
  };

  return (
    <div className="bg-custom-color flex-auto max-w-full h-screen m-auto mt-4 ">
      <div className="flex-auto rounded-full ">
        <hr className="mb-8" />
        <h2 className="text-xl text-center text-violet-800 font-bold shadow-max-sm">
          To begin, search for a juror
        </h2>
        <div className="divider"></div>
      </div>
      <div className="flex justify-center m-3">
        <hr className="mb-8" />
        <SearchBar onDataFetched={handleDataFetched} setLoading={setLoading} />
      </div>
      <div className="flex-auto rounded-full">
        {loading && (
          <h2 className="text-xl text-center text-slate-400 font-bold shadow-max-sm">
            Loading...
          </h2>
        )}
        {error && (
          <h2 className="text-xl text-center text-red-500 font-bold shadow-max-sm">
            Something went wrong
          </h2>
        )}
        {showResults && jurorData.length === 0 && (
          <h2 className="text-xl text-center text-slate-400 font-bold shadow-max-sm">
            No results found
          </h2>
        )}
        {showResults && jurorData.length > 0 && (
          <SearchResultsTable
            className="flex-auto h-screen"
            jurorData={jurorData}
            onSaveJuror={handleSaveJuror}
          />
        )}
      </div>
    </div>
  );
}

export default JurorLookup;
