import React, { useState } from "react";
import Calendar from "react-calendar";
import { Modal, Button, Text, Dropdown } from "@nextui-org/react";

export function Postpone(props) {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.SummonsDate);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const token = props.token;
  const summonDate = props.SummonsDate;
  const currentSummonsDate = new Date(props.SummonsDate);
  const sixtyDaysFromCurrentSummons = new Date(currentSummonsDate);
  sixtyDaysFromCurrentSummons.setDate(currentSummonsDate.getDate() + 60);
  const reportingLocation = props.ReportingLocation;
  const [reportingLocations, setReportingLocations] = useState([]);
  const [selectedReportingLocation, setReportingLocation] = useState(props.ReportingLocation);

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
    const postponeUrl = "http://localhost:3000/api/editSummons";

    const postponeRequestBody = {
      PostponeDate: formattedDate,
      ReportingLocation: selectedReportingValue !== undefined ? selectedReportingValue : reportingLocation,
    };

    try {
      const postponeRes = await fetch(postponeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify( postponeRequestBody ),
      });
      if (postponeRes.ok) {
        props.handlePostponeSuccess();
      } else {
        setAlertMessage(
          "Error " + postponeRes.status + ": " + postponeRes.statusText + ". Please try again"
        );
        openAlertHandler();
      }
    } catch (error) {
      setAlertMessage("Error: " + error.message + ". Please try again");
      openAlertHandler();
    }
    closeHandler();
  };

  return (
    <div>
      <Button onPress={ openCalendarHandler }>Edit Summons</Button>
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
            {summonDateUTC > selectedValueUTC ? summonDateUTC : selectedValueUTC} at 8:00 am PDT at:
            <br></br> { selectedReportingValue }, CA
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
            { selectedReportingValue && reportingLocation ? selectedReportingValue : reportingLocation }, CA.
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedReportingLocation}
              onSelectionChange={setReportingLocation}
            >
              { reportingLocations.map((location) => (
                <Dropdown.Item 
                  key={ location } 
                  >
                  { location }
                </Dropdown.Item>
              )) }
            </Dropdown.Menu>
          </Dropdown>
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
          <Button auto flat color="success" onPress={ handleChange }>
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

export async function GetReportingLocations () {
  const url = "http://localhost:3000/api/getReportingLocations";
  const res = await fetch(url, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  if (res.ok) {
    const locations = await res.json();
    const filteredLocations = locations.slice(1); // Remove the first element
    return filteredLocations;
  } else {
      console.error("Error fetching reporting locations");
  }
}

export default Postpone;
