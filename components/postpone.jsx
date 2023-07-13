import React, { useState } from "react";
import Calendar from "react-calendar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import "react-calendar/dist/Calendar.css";

export function Postpone(props) {
  const [visible, setVisible] = useState(false);
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
    closeHandler();
  };

  const isMonday = (date) => date.getDay() === 1;

  return (
    <>
      <Button onPress={openCalendarHandler}>Edit Summons</Button>
      <Modal isOpen={visible} onOpenChange={closeHandler}>
        <ModalContent className="flex flex-col items-center">
          <ModalHeader className="flex flex-col gap-1">
            Request Postponement:
          </ModalHeader>
          <ModalBody>
            <p className="text-center">
              You have selected: <br />
              {summonDateUTC > selectedValueUTC
                ? summonDateUTC
                : selectedValueUTC}{" "}
              at 8:00 am PDT
              <br /> in {reportingLocation + ", CA"}
            </p>
            <Calendar
              tileDisabled={({ date }) => !isMonday(date)}
              minDetail="month"
              maxDate={sixtyDaysFromCurrentSummons}
              minDate={currentSummonsDate}
              defaultValue={summonDateUTC}
              name="calendar"
              onChange={selectDateHandler}
              value={selectedValue}
              className="mx-auto"
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={closeHandler}>Close</Button>
            <Button onPress={handleDateChange}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={alertVisible} onOpenChange={closeAlertHandler}>
        <ModalContent className="flex flex-col items-center">
          <ModalHeader className="flex flex-col gap-1">Alert</ModalHeader>
          <ModalBody>
            <p>{alertMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={closeAlertHandler}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
