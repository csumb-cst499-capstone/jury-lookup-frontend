import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Postpone } from "./postpone";
import CalendarLinks from "./calendar-links";
import { API } from "../constants/api_constants";

export function SummonDetails({ token }) {
  const { t } = useTranslation();
  const [jurorData, setJurorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postponeSuccess, setPostponeSuccess] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = API.summon_details;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const response = await fetch(url, options);

      if (response.status === 200) {
        const data = await response.json();
        setJurorData(data);
        setPostponeSuccess(false);
      } else {
        setError("Error fetching data. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching data. Please check your internet connection.");
    } finally {
      setLoading(false);
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
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };

  const handlePostponeSuccess = () => {
    setPostponeSuccess(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  if (!jurorData) {
    return (
      <div className="flex justify-center items-center h-screen">
        No data available.
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
            ? t("summonDetails.juryServiceCompleted")
            : t("summonDetails.summonedForJuryService")}
        </h4>
        <p className="font-bold">
          {t("summonDetails.name")}: {jurorData.FirstName} {jurorData.LastName}
        </p>
        <p className="font-bold">
          {t("summonDetails.badgeNumber")}: {jurorData.BadgeNumber}
        </p>
        <p className="font-bold">
          {t("summonDetails.groupNumber")}: {jurorData.GroupNumber}
        </p>

        {isSummonDatePassed && isMoreThanAWeekPassed && (
          <p className="text-center text-green-500 font-bold my-4">
            {t("summonDetails.thankYouForService")}
          </p>
        )}

        {!isMoreThanAWeekPassed && (
          <>
            <p>
              {t("summonDetails.reportTo")} {jurorData.ReportingLocation} {t("summonDetails.on")} {formattedSummonDate} {t("summonDetails.at")} 8:00 AM
            </p>

            <hr className="my-6" />
            {jurorData.CanPostpone ? (
              <div>
                <p className="font-bold">
                  {t("summonDetails.postponeInstructions")}
                  <br />
                  {t("summonDetails.courtSchedule")}
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
                  {t("summonDetails.cannotPostpone")}
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
