import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';

export function Postpone({ data = [] }) {
  const [value, onChange] = useState(new Date());
  const [requestStatus, setRequestStatus] = useState(null); // Track the request status

  const handleDateChange = async (date) => {
    const currentDate = new Date();
    const summonDate = new Date(apiData.summonDate);
  
    // Check if selected date is before the summon date
    if (date < summonDate) {
      console.log("Selected date is before the summon date");
      // You can display an error message or take appropriate action here
      return;
    }
  
    // Calculate the maximum allowed date (6 weeks after the summon date)
    const maxDate = new Date(summonDate.getTime() + 6 * 7 * 24 * 60 * 60 * 1000);
  
    // Check if selected date is more than 6 weeks past the summon date
    if (date > maxDate) {
      console.log("Selected date is more than 6 weeks past the summon date");
      // You can display an error message or take appropriate action here
      return;
    }
  
    // Check if selected date is not a Monday (day number 1)
    if (date.getDay() !== 1) {
      console.log("Selected date is not a Monday");
      // You can display an error message or take appropriate action here
      return;
    }
  
    onChange(date);
  
    const formattedDate = date.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    const url = `http://localhost:3000/api/postponeSummon/322976632/489062/${formattedDate}`;
  
    try {
      const res = await fetch(url, { method: "PUT" });
      if (res.ok) {
        // Handle success
        setRequestStatus("success");
        console.log("PUT request successful");
      } else {
        // Handle failure
        setRequestStatus("failure");
        console.log("PUT request failed");
      }
    } catch (error) {
      console.log("error: ", error);
      setRequestStatus("failure");
    }
  };  

  return (

    <div>
      {requestStatus === "success" && (
        <p>Request successful!</p>
      )}
      {requestStatus === "failure" && (
        <p>Request failed. Please try again.</p>
      )}
      <Calendar onChange={handleDateChange} value={value} />
    </div>
  );
}

export default Postpone;
