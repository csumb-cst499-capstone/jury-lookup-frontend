"use client";
import React, { useState } from "react";
import SearchBar from "@/components/admin/search";
import SearchResultsTable from "@/components/admin/search_results_table";

export function JurorLookup() {
  const [jurorData, setJurorData] = useState([]);

  const handleDataFetched = (data) => {
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
    <div className="bg-gray-100 flex-auto max-w-full h-screen m-auto mt-4 ">
      <div className="flex-auto rounded-full ">
        <h2 className="text-xl text-center text-slate-400 font-bold shadow-max-sm">
          To begin search for a juror
        </h2>
      </div>
      <div className="flex justify-center m-3">
        <SearchBar onDataFetched={handleDataFetched} />
      </div>
      {jurorData.length > 0 && (
        <SearchResultsTable
          jurorData={jurorData}
          onSaveJuror={handleSaveJuror}
        />
      )}
    </div>
  );
}

export default JurorLookup;
