"use client";
import React, { useState } from "react";
import SearchBar from "@/components/admin/search";
import SearchResultsTable from "@/components/admin/search_results_table";

export function JurorLookup() {
  const [jurorData, setJurorData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleDataFetched = (data) => {
    setShowResults(true);
    setJurorData(data);
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
        <h2 className="text-xl text-center text-slate-400 font-bold shadow-max-sm">
          To begin search for a juror
        </h2>
      </div>
      <div className="flex justify-center m-3">
        <SearchBar onDataFetched={handleDataFetched} />
      </div>
      <div className="flex-auto rounded-full">
        {jurorData.length === 0 &&
          showResults && ( // if there is no data, show the message
            <h2 className="text-xl text-center text-slate-400 font-bold shadow-max-sm">
              No results found
            </h2>
          )}
        {jurorData.length > 0 && showResults && (
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
