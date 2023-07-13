import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Button } from "@nextui-org/react";
import { Postpone } from "./postpone";
const { google, outlook, office365, yahoo, ics } = require("calendar-link");
import { AiOutlineGoogle, AiOutlineCalendar } from "react-icons/ai";
import { BiCalendarEvent } from "react-icons/bi";

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
      fetchData();
    }
  }, [postponeSuccess]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
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
        const data = await response.json();
        setJurorData(data);
        setPostponeSuccess(false);
      } else {
        console.error("Error fetching summon details");
      }
    } catch (error) {
      console.error("Error fetching summon details", error);
    }
  };

  if (!jurorData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const formattedSummonDate = formatDate(jurorData.SummonsDate);

  const event = {
    title: "Jury Service",
    description: "Summoned for jury service",
    start: new Date(jurorData.SummonsDate),
    duration: [8, "hour"],
    location: jurorData.ReportingLocation,
  };

  const googleCalendarUrl = google(event);
  const outlookCalendarUrl = outlook(event);
  const office365CalendarUrl = office365(event);
  const icsCalendarUrl = ics(event);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h4 className="text-red-600 text-2xl font-bold mb-4">
          YOU HAVE BEEN SUMMONED FOR JURY SERVICE
        </h4>
        <p className="font-bold text-left">
          Name: {jurorData.FirstName} {jurorData.LastName}
        </p>
        <p className="font-bold text-left">
          Badge Number: {jurorData.BadgeNumber}
        </p>
        <p className="font-bold text-left">
          Group Number: {jurorData.GroupNumber}
        </p>
        <p className="text-left">
          Please report to {jurorData.ReportingLocation} on{" "}
          {formattedSummonDate} at 8:00 AM
        </p>
        <div className="my-6"></div>
        {jurorData.CanPostpone ? (
          <div>
            <p className="font-bold text-left">
              You may edit your summons by postponing to a later date and/or
              changing locations.
              <br />
              Court is held every Monday at 8:00 AM. PDT excluding holidays.
            </p>
            <Postpone
              token={token}
              {...jurorData}
              handlePostponeSuccess={handlePostponeSuccess}
            />
            <div className="my-6"></div>
            <Button
              as="a"
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              startContent={<AiOutlineGoogle />}
              shape="square"
              fullWidth
            >
              Add to Google Calendar
            </Button>
            <Button
              as="a"
              href={outlookCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4"
              startContent={<AiOutlineCalendar />}
              shape="square"
              fullWidth
            >
              Add to Outlook
            </Button>
            <Button
              as="a"
              href={office365CalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4"
              startContent={<AiOutlineCalendar />}
              shape="square"
              fullWidth
            >
              Add to Office 365
            </Button>
            <Button
              as="a"
              href={icsCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4"
              startContent={<BiCalendarEvent />}
              shape="square"
              fullWidth
            >
              Add to iCal
            </Button>
          </div>
        ) : (
          <div>
            <p className="font-bold" id="cannot-postpone">
              You are no longer able to postpone this summon.
            </p>
            <Button
              as="a"
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4"
              startContent={<AiOutlineGoogle />}
              shape="square"
              fullWidth
            ></Button>
            <Button
              as="a"
              href={outlookCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4"
              startContent={<AiOutlineCalendar />}
              shape="square"
              fullWidth
            >
              Add to Outlook
            </Button>
            <Button
              as="a"
              href={office365CalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4"
              startContent={<AiOutlineCalendar />}
              shape="square"
              fullWidth
            ></Button>
            <Button
              as="a"
              href={icsCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4"
              startContent={<BiCalendarEvent />}
              shape="square"
              fullWidth
            ></Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummonDetails;
