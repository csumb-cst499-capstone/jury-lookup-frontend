import React from "react";
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
      <button
        className="text-blue-500 hover:underline"
        onClick={() => handleCreateEvent(googleCalendarUrl)}
      >
        Google
      </button>
      <button
        className="text-blue-500 hover:underline"
        onClick={() => handleCreateEvent(outlookCalendarUrl)}
      >
        Outlook
      </button>
      <button
        className="text-blue-500 hover:underline"
        onClick={() => handleCreateEvent(icsCalendarUrl)}
      >
        iCal
      </button>
    </div>
  );
}

export default CalendarLinks;
