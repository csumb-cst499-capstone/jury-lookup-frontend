import React, { useState, useEffect } from "react";
import { Container, Text, Spacer } from "@nextui-org/react";
import { Postpone } from "./postpone";

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
        body: JSON.stringify({ token: token }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setJurorData(data);
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

  const formattedSummonDate = formatDate(jurorData.SummonsDate);

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
            <Postpone
              token={token}
              handlePostponeSuccess={handlePostponeSuccess}
              {...jurorData}
            />
            <Spacer y={1} />
          </Container>
        ) : (
          <div>
            <Text weight="bold">
              You are no longer able to postpone this summon.
            </Text>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default SummonDetails;
