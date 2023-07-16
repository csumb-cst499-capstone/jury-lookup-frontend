"use client";
import React, { useState } from "react";
import SearchBar from "@/components/admin/search";
import SearchResultsTable from "@/components/admin/search_results_table";

export default function Page() {
  const [jurorData, setJurorData] = useState([]);

  const handleDataFetched = (data) => {
    setJurorData(data);
  };

  return (
    <div className="flex-auto shadow-sm max-w-full h-screen m-auto mt-4">
      <h1 className="text-3xl text-center font-bold shadow-max-sm m-5">
        Welcome Jury Duty Admin
      </h1>
      <div className="flex-auto rounded-full">
        <h2 className="text-xl text-center text-slate-400 font-bold shadow-max-sm">
          To begin search for a juror
        </h2>
      </div>
      <div className="flex justify-center m-3">
        <SearchBar onDataFetched={handleDataFetched} />
      </div>
      {jurorData.length > 0 && <SearchResultsTable jurorData={jurorData} />}
    </div>
  );
}
