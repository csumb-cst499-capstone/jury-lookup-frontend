import React, { useState } from "react";
import Calendar from "react-calendar";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import "react-calendar/dist/Calendar.css";


export function Postpone(props) {
  const { t } = useTranslation();
  // modal
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.SummonsDate);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  // auth
  const token = props.token;
  //date
  const summonDate = props.SummonsDate;
  const currentSummonsDate = new Date(props.SummonsDate);
  const sixtyDaysFromCurrentSummons = new Date(currentSummonsDate);
  sixtyDaysFromCurrentSummons.setDate(currentSummonsDate.getDate() + 60);
  //dropdown
  const reportingLocation = props.ReportingLocation;
  const [reportingLocations, setReportingLocations] = useState([]);
  const [selectedReportingLocation, setReportingLocation] = useState(
    props.ReportingLocation
  );

  const selectedReportingValue = React.useMemo(
    () => Array.from(selectedReportingLocation).join("").replaceAll("_", " "),
    [selectedReportingLocation]
  );

  React.useEffect(() => {
    GetReportingLocations().then((locations) => {
      setReportingLocations(locations);
    });
  }, []);

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

  const handleChange = async () => {
    const formattedDate = selectedValueDate.toISOString().split("T")[0];
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/editSummons`;

    const requestBody = {
      PostponeDate: formattedDate,
      ReportingLocation:
        selectedReportingValue !== undefined
          ? selectedReportingValue
          : reportingLocation,
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
    <div className="divider"></div>
      <Button
        className="text-sm px-3 py-1 rounded-xl bg-purple-500 text-white hover:bg-purple-300"
        onPress={openCalendarHandler}
      >
        {t("postpone.editSummons")}
      </Button>
      <Modal isOpen={visible} onOpenChange={closeHandler}>
        <ModalContent className="flex flex-col items-center">
          <ModalHeader className="flex flex-col gap-1">
            {t("postpone.requestPostponement")}
          </ModalHeader>
          <ModalBody>
            <p className="text-center">
            {t("postpone.youHaveSelected")} <br />
              {summonDateUTC > selectedValueUTC
                ? summonDateUTC
                : selectedValueUTC}{" "}
              at 8:00 am PDT
              <br /> in{" "}
              {selectedReportingValue && reportingLocation
                ? selectedReportingValue
                : reportingLocation}
              , CA.
            </p>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  color="secondary"
                  css={{ tt: "capitalize" }}
                >
                  {selectedReportingValue && reportingLocation
                    ? selectedReportingValue
                    : reportingLocation}
                  , CA.
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedReportingLocation}
                onSelectionChange={setReportingLocation}
              >
                {reportingLocations.map((location) => (
                  <DropdownItem key={location} {...location}>
                    {location}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Calendar
              tileDisabled={({ date }) => !isMonday(date)}
              minDetail="month"
              maxDate={sixtyDaysFromCurrentSummons}
              minDate={currentSummonsDate}
              defaultValue={summonDateUTC}
              name="calendar"
              onChange={selectDateHandler}
              value={selectedValueUTC}
              className="mx-auto"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="text-sm px-3 py-1 rounded-xl bg-red-500 text-white hover:bg-red-300"
              onPress={closeHandler}
            >
              {t("postpone.closeButton")}
            </Button>
            <Button
              className="text-sm px-3 py-1 rounded-xl bg-green-500 text-white hover:bg-green-300"
              onPress={handleChange}
            >
              {t("postpone.confirmButton")}
            </Button>
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

export async function GetReportingLocations() {
  const url = `${
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
  }/api/getReportingLocations`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const locations = await res.json();
    return locations;
  } else {
    console.error("Error fetching reporting locations");
  }
}

export default Postpone;
