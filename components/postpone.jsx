import React, { useState } from "react";
import Calendar from 'react-calendar';

export function Postpone(props) {
  const [value, onChange] = useState(new Date());
  const [requestStatus, setRequestStatus] = useState(null);

  const handleDateChange = async (date) => {
    onChange(date);

    const currentDate = new Date();
    const CurrentSummonsDate = new Date(props.SummonsDate);
    const BadgeNumber = props.BadgeNumber;
    const PinCode = props.PinCode;
    const formattedDate = date.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    const url = `http://localhost:3000/api/postponeSummon/${BadgeNumber}/${PinCode}/${formattedDate}`;
    const sixtyDaysFromNow = new Date(CurrentSummonsDate);
    sixtyDaysFromNow.setDate(CurrentSummonsDate.getDate() + 60);

    if (formattedDate <= currentDate.toISOString().split("T")[0]) {
        alert("Please select a date in the future.");
        setRequestStatus("failure");
        return;
    }
    if (formattedDate <= CurrentSummonsDate.toISOString().split("T")[0]) {
        alert("Please select a date later than your original summons date.");
        setRequestStatus("failure");
        return;
    }
    if (formattedDate > sixtyDaysFromNow.toISOString().split("T")[0]) { 
        alert("Please select a date within 6 weeks of your original summon date.");
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
            } else {
              // Handle error
              setRequestStatus("failure");
            }
          } catch (error) {
            setRequestStatus("failure");
          }
    }
  };

  return (
    <div>
      {requestStatus === "success" && (
        <p>Your summons date was successfully updated!</p>
      )}
      {requestStatus === "failure" && (
        <p>Invalid date. Please try again.</p>
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
