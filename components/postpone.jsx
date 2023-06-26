import React, { useState } from "react";
import Calendar from "react-calendar";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import SummonDetails from "./summon_details";

export function Postpone(props) {
  const [visible, setVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const token = props.token;

  const handler = (date) => {
    setVisible(true);
    const formatSelectedDate = new Date(date);
    setSelectedValue(formatSelectedDate.toISOString().split("T")[0]);
  };
  const closeHandler = () => {
    setVisible(false);
  };

  const handleDateChange = async () => {
    const date = new Date(selectedValue);
    const currentSummonsDate = new Date(props.SummonsDate);
    const badgeNumber = props.BadgeNumber;
    const formattedDate = date.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    const url = "http://localhost:3000/api/postpone";
    const sixtyDaysFromNow = new Date(currentSummonsDate);
    sixtyDaysFromNow.setDate(currentSummonsDate.getDate() + 60);

    const requestBody = {
      PostponeDate: formattedDate,
    };

    if (formattedDate <= currentSummonsDate.toISOString().split("T")[0]) {
      setAlertMessage(
        "Please select a date later than your original summons date."
      );
      closeHandler();

      return;
    }
    if (formattedDate > sixtyDaysFromNow.toISOString().split("T")[0]) {
      setAlertMessage(
        "Please select a date within 6 weeks of your original summon date."
      );
      closeHandler();

      return;
    }
    if (date.getDay() !== 1) {
      setAlertMessage("Selected date is not a Monday");
      closeHandler();

      return;
    } else {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(requestBody),
        });
        if (res.ok) {
          // Handle success
          handlePostponeSuccess();
        } else {
          // Handle error
          setAlertMessage(
            "Error" + res.status + ": " + res.statusText + ". Please try again"
          );
          setAlertVisible(true);
        }
      } catch (error) {
        setAlertMessage("Error: " + error.message + ". Please try again");
        setAlertVisible(true);
      }
    }
    closeHandler();
  };

  const closeAlertHandler = () => {
    setAlertVisible(false);
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
