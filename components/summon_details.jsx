import React, { useState, useEffect } from "react";

import { Container, Text, Spacer, Link } from "@nextui-org/react";

import { Postpone } from "./postpone";
const { google, outlook, office365, yahoo, ics } = require("calendar-link");

export function SummonDetails({ token }) {
  const [jurorData, setJurorData] = useState(null);
  const [postponeSuccess, setPostponeSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/summon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ token: token }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setJurorData(data);
        } else {
          console.error("Error fetching summon details");
        }
      } catch (error) {
        console.error("Error fetching summon details", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (postponeSuccess) {
      // Perform any necessary actions or fetch updated juror data
      fetchData();
    }
  }, [postponeSuccess]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: 'UTC'
    };

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handlePostponeSuccess = () => {
    setPostponeSuccess(true);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/summon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status === 200) {
        // wait for the response to be parsed as JSON
        const data = await response.json();
        // Update the juror data state
        setJurorData(data);
        // Reset the postpone success status
        setPostponeSuccess(false); // Reset the postpone success status
      } else {
        console.error("Error fetching summon details");
      }
    } catch (error) {
      console.error("Error fetching summon details", error);
    }

  };

  if (!jurorData) {
    return <div>Loading...</div>;
  }
  // Format the date for display
  const formattedSummonDate = formatDate(jurorData.SummonsDate);

  // Set event as an object
  const event = {
    title: "Jury Service",
    description: "Summoned for jury service",
    start: new Date(jurorData.SummonsDate),
    duration: [8, "hour"],
    location: jurorData.ReportingLocation,
  };

  return (
    <Container
      justify="center"
      align="center"
      css={{ height: "100vh", paddingTop: "2rem" }}
    >
      <Container
        css={{
          maxWidth: "700px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <Text h4 css={{ color: "$red600" }}>
          YOU HAVE BEEN SUMMONED FOR JURY SERVICE
        </Text>
        <Text weight="bold" align="left">
          Name: {jurorData.FirstName} {jurorData.LastName}
        </Text>
        <Text weight="bold" align="left">
          Badge Number: {jurorData.BadgeNumber}
        </Text>
        <Text weight="bold" align="left">
          Group Number: {jurorData.GroupNumber}
        </Text>
        <Text align="left">
          Please report to {jurorData.ReportingLocation} on{" "}
          {formattedSummonDate} at 8:00 AM
        </Text>
        <Spacer y={1} />
        {jurorData.CanPostpone ? (
          <Container>
            <Text weight="bold" align="left">
              You may edit your summons by postponing to a later date and/or changing locations. 
              <br></br> Court is held every Monday at 8:00 AM. PDT excluding holidays.
            </Text>
            <Postpone
              token={token}
              {...jurorData}
              handlePostponeSuccess={handlePostponeSuccess}
            />
            <Spacer y={1} />
            <Link href={google(event)}>Add to Google Calendar</Link>
            <Link href={outlook(event)}>Add to Outlook</Link>
            <Link href={ics(event)}>Add to iCal</Link>

          </Container>
        ) : (
          <div>
            <Text weight="bold" id="cannot-postpone">
              You are no longer able to postpone this summon.
            </Text>

            <Link href={google(event)}>Add to Google Calendar</Link>
            <Link href={outlook(event)}>Add to Outlook</Link>
            <Link href={office365(event)}>Add to Office 365</Link>
            <Link href={ics(event)}>Add to iCal</Link>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default SummonDetails;
