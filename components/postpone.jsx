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
          props.handlePostponeSuccess(); // Invoke the prop function
        } else {
          // Handle error
          setAlertMessage(
            "Error " + res.status + ": " + res.statusText + ". Please try again"
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
      {/* handleDateChange */}
      <Calendar onChange={handler} value={selectedValue} />
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Confirm date:{" "}
            {selectedValue && new Date(selectedValue).toLocaleDateString()}
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="success" onPress={handleDateChange}>
            Confirm
          </Button>
          <Button auto flat color="black" onPress={closeHandler}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        closeButton
        blur
        aria-labelledby="alert-title"
        open={alertVisible}
        onClose={closeAlertHandler}
      >
        <Modal.Header>
          <Text id="alert-title" size={18}>
            Alert
          </Text>
        </Modal.Header>
        <Modal.Body>
          <p>{alertMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeAlertHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Postpone;
