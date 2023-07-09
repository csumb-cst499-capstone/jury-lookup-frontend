import React, { useState } from "react";
import Calendar from "react-calendar";
import { Modal, Button, Text, Dropdown } from "@nextui-org/react";

export function Postpone(props) {
  const [visible, setVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState(props.SummonsDate);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const token = props.token;
  const summonDate = props.SummonsDate;
  const reportingLocation = props.ReportingLocation;
  const currentSummonsDate = new Date(props.SummonsDate);
  const sixtyDaysFromCurrentSummons = new Date(currentSummonsDate);
  sixtyDaysFromCurrentSummons.setDate(currentSummonsDate.getDate() + 60);

  const selectDateHandler = (date) => {
    setVisible(true);
    const formatSelectedDate = new Date(date);
    setSelectedValue(formatSelectedDate.toISOString().split("T")[0]);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const openCalendarHandler = () => {
    setVisible(true);
  };

  const openAlertHandler = () => {
    setAlertVisible(true);
  };

  const closeAlertHandler = () => {
    setAlertVisible(false);
  };

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
    timeZone: "UTC",
  };

  const selectedValueDate = new Date(selectedValue);
  const summonDateUTC = summonDate.toLocaleString("en-US", options);
  const selectedValueUTC = selectedValueDate.toLocaleString("en-US", options);

  const handleDateChange = async () => {
    const formattedDate = selectedValueDate.toISOString().split("T")[0];
    const url = "http://localhost:3000/api/postpone";

    const requestBody = {
      PostponeDate: formattedDate,
    };

    if (formattedDate <= currentSummonsDate.toISOString().split("T")[0]) {
      setAlertMessage("Date must be later than your original summons date.");
      openAlertHandler();
      closeHandler();
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
          props.handlePostponeSuccess();
        } else {
          setAlertMessage(
            "Error " + res.status + ": " + res.statusText + ". Please try again"
          );
          openAlertHandler();
        }
      } catch (error) {
        setAlertMessage("Error: " + error.message + ". Please try again");
        openAlertHandler();
      }
    }
    closeHandler();
  };

  return (
    <div>
      <Button onClick={ openCalendarHandler }>Edit Summons</Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={ visible }
        onClose={ closeHandler }
      >
        <Modal.Header>
          <Text id="modal-title" size={ 18 }>
            Updated Summons: <br />
            {summonDateUTC > selectedValueUTC ? summonDateUTC : selectedValueUTC} at 8:00 am PDT
            <br /> in { reportingLocation + ", CA" }
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Calendar
            tileDisabled={({ date }) => date.getUTCDay() !== 1}
            minDetail="month"
            maxDate={ sixtyDaysFromCurrentSummons }
            minDate={ currentSummonsDate }
            defaultValue={ summonDateUTC }
            name="calendar"
            onChange={ selectDateHandler }
            value={ selectedValue }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="success" onPress={ handleDateChange }>
            Confirm
          </Button>
          <Button auto flat color="black" onPress={ closeHandler }>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        closeButton
        blur
        aria-labelledby="alert-title"
        open={ alertVisible }
        onClose={ closeAlertHandler }
      >
        <Modal.Header>
          <Text id="alert-title" size={ 18 }>
            Alert
          </Text>
        </Modal.Header>
        <Modal.Body>
          <p>{alertMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={ closeAlertHandler }>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Postpone;
