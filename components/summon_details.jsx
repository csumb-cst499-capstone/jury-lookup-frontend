import React, { useState, useEffect } from "react";

import { Container, Grid, Button, Text, Spacer, Link } from "@nextui-org/react";
import { Loading, Modal, Input } from "@nextui-org/react";
import { Postpone } from "./postpone";
import AddToCalendar from "./add_to_calendar";

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
    return <Loading color="currentColor" size="sm" />;
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
            <Postpone
              token={token}
              {...jurorData}
              handlePostponeSuccess={handlePostponeSuccess}
            />
            <Container>
              <AddToCalendar {...jurorData} />
            </Container>
          </Container>
        ) : (
          <Container>
            <Text weight="bold">
              You are no longer able to postpone this summon.
            </Text>
            <Container>
              <AddToCalendar {...jurorData} />
            </Container>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default SummonDetails;
