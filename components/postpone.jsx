import { data } from "autoprefixer";
import React, { useState } from "react";
import Calendar from 'react-calendar';

export function Postpone(props) {
  const { juror } = props;
  const [value, onChange] = useState(new Date());
  const [requestStatus, setRequestStatus] = useState(null);
  const CurrentSummonsDate = juror.SummonsDate;
  console.log("postpone: " + CurrentSummonsDate);

  const handleDateChange = async (date) => {
    onChange(date);

    const currentDate = new Date();
    // const maxDate = will get from the user state once implemented
    const formattedDate = date.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    const url = `http://localhost:3000/api/postponeSummon/687056417/164523/${formattedDate}`;
    const sixtyDaysFromNow = currentDate.getDate() + 60; //will change to SummonsDate

    if (formattedDate <= currentDate.toISOString().split("T")[0]) {
        alert("Please select a date in the future.");
        setRequestStatus("failure");
        return;
    }
    if (formattedDate >= sixtyDaysFromNow) { 
        alert("Please select a date within 6 weeks of the original summon date.");
        setRequestStatus("failure");
        return;
    }
    if (date.getDay() !== 1) {
        alert("Selected date is not a Monday");
        setRequestStatus("failure");
        return;
    }
    else {
        try {
            const res = await fetch(url, { method: "PUT" });
            if (res.ok) {
              // Handle success
              setRequestStatus("success");
              console.log("PUT request successful");
            } else {
              // Handle error
              setRequestStatus("failure");
              console.log("PUT request failed");
            }
          } catch (error) {
            setRequestStatus("failure");
            console.log("error: ", error);
          }
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

Postpone.defaultProps = {
    props: {
        FirstName: "",
        LastName: "",
        BadgeNumber: 0,
        GroupNumber: 0,
        SummonsDate: "",
        ReportingLocation: "",
        CanPostpone: true,
    }
}

export default Postpone;
