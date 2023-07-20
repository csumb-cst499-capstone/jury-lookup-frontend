import React, { useState, useEffect } from "react";
import { Postpone } from "./postpone";
import CalendarLinks from "./calendar-links";

export function SummonDetails({ token }) {
  const [jurorData, setJurorData] = useState(null);
  const [postponeSuccess, setPostponeSuccess] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/summon`, {
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

  useEffect(() => {
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

  const isSummonDatePassed = new Date(jurorData.SummonsDate) < new Date();
  const isMoreThanAWeekPassed =
    new Date(jurorData.SummonsDate) < new Date() - 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-custom">
        <h4 className="text-red-600 text-2xl text-center font-bold mb-4">
          {isMoreThanAWeekPassed
            ? "Jury Service Completed"
            : "YOU HAVE BEEN SUMMONED FOR JURY SERVICE"}
        </h4>
        <p className="font-bold">
          Name: {jurorData.FirstName} {jurorData.LastName}
        </p>
        <p className="font-bold">Badge Number: {jurorData.BadgeNumber}</p>
        <p className="font-bold">Group Number: {jurorData.GroupNumber}</p>

        {isSummonDatePassed && isMoreThanAWeekPassed && (
          <p className="text-center text-green-500 font-bold my-4">
            Thank you for your service.
          </p>
        )}
        {!isMoreThanAWeekPassed && (
          <>
            <p>
              Please report to {jurorData.ReportingLocation} on{" "}
              {formattedSummonDate} at 8:00 AM
            </p>

            <hr className="my-6" />
            {jurorData.CanPostpone ? (
              <div>
                <p className="font-bold">
                  You may edit your summons by postponing to a later date and/or
                  changing locations.
                  <br />
                  Court is held every Monday at 8:00 AM PDT, excluding holidays.
                </p>
                <Postpone
                  token={token}
                  {...jurorData}
                  handlePostponeSuccess={handlePostponeSuccess}
                />
                <hr className="my-6" />
                <CalendarLinks event={event} />
              </div>
            ) : (
              <div>
                <p className="font-bold" id="cannot-postpone">
                  You are no longer able to postpone this summon.
                </p>
                <CalendarLinks event={event} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SummonDetails;
