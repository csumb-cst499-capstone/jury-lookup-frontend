import React, { useState } from "react";
import Calendar from "react-calendar";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export function Postpone(props) {
  const [value, onPress] = useState(new Date());
  const [requestStatus, setRequestStatus] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handler = (date) => {
    setVisible(true);
    const formatSelectedDate = new Date(date);
    setSelectedValue(formatSelectedDate.toISOString().split("T")[0]);
    console.log("opened");
    console.log("formatted date from handler " + formatSelectedDate.toISOString().split("T")[0]);
  };
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleDateChange = async () => {
    console.log("made it to handleDateChange selectedValue: " + selectedValue);
    const date = new Date(selectedValue);
    console.log("check date: " + date);
    const CurrentSummonsDate = new Date(props.SummonsDate);
    const BadgeNumber = props.BadgeNumber;
    const formattedDate = date.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    const url = "http://localhost:3000/api/postpone";
    const sixtyDaysFromNow = new Date(CurrentSummonsDate);
    sixtyDaysFromNow.setDate(CurrentSummonsDate.getDate() + 60);

    const requestBody = {
        BadgeNumber: BadgeNumber,
        PostponeDate: formattedDate
      };

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
    if (selectedValue.getDay() !== 1) {
        alert("Selected date is not a Monday");
        setRequestStatus("failure");
        return;
    }
    else {
      try { const res = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody)
          });
          if (res.status === 404) {
              // Handle 404 response
              alert("You have already postponed your summons date.");
              setRequestStatus("dupe entry");
              return;
          } else if (res.ok) {
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
    closeHandler();
  };

  return (
    <div>
      <div>
      {requestStatus === "success" && (
        <p>Your summons date was successfully updated!</p>
      )}
      {requestStatus === "failure" && (
        <p>Invalid date. Please try again.</p>
      )}
      {requestStatus === "dupe entry" && (
        <p>You have already postponed your summons date.</p>
      )}
    </div>
      {/* handleDateChange */}
      <Calendar onChange={handler}  value={selectedValue} />
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Confirm date: {selectedValue}
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={handleDateChange}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
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
