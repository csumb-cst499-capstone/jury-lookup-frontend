import React from "react";
import { Button } from "@nextui-org/react";
const { google, outlook, office365, yahoo, ics } = require("calendar-link");

export function CalendarLinks({ event }) {
  const googleCalendarUrl = google(event);
  const outlookCalendarUrl = outlook(event);
  const icsCalendarUrl = ics(event);

  const handleCreateEvent = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex gap-2 mt-4">
      <p className="font-bold">Add to your calendar:</p>
      <Button
        className="text-blue-500 hover:underline"
        onPress={() => handleCreateEvent(googleCalendarUrl)}
      >
        Google
      </Button>
      <Button
        className="text-blue-500 hover:underline"
        onPress={() => handleCreateEvent(outlookCalendarUrl)}
      >
        Outlook
      </Button>
      <Button
        className="text-blue-500 hover:underline"
        onPress={() => handleCreateEvent(icsCalendarUrl)}
      >
        iCal
      </Button>
    </div>
  );
}

export default CalendarLinks;
