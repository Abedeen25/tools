import React, { useState, useEffect } from "react";
import events from "../../data/timeline_events.json";

const AdCalender = () => {
  const [noOfDays, setNoOfDays] = useState([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayval = 1000 * 3600 * 24;
  const weekval = dayval * 7;

  useEffect(() => {
    // Find the event with the smallest start date
    const earliestEvent = events.reduce((prev, curr) =>
      prev["start-date"] < curr["start-date"] ? prev : curr
    );

    // Find the event with the largest end date
    const latestEvent = events.reduce((prev, curr) =>
      prev["end-date"] > curr["end-date"] ? prev : curr
    );

    // Calculate the number of days between the earliest start date and the latest end date
    const startDate = new Date(earliestEvent["start-date"]);
    const endDate = new Date(latestEvent["end-date"]);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = Math.ceil(timeDiff / dayval);
    const days = Array.from(
      { length: dayDiff },
      (_, index) => new Date(startDate.getDate() + dayval * index)
    );
    console.log(days);
    setNoOfDays(days);
  }, []);

  return (
    <div className="calender-content">
      <h1>Timeline</h1>
      <div className="form">form</div>
      <div className="timeline-container">
        <div className="timeline-days">
          {noOfDays.map((i, ind) =>
            i.getDate() !== 1 ? (
              <div className="day-mark">{i.getDate()}</div>
            ) : (
              <div className="day-mark month-name">
                {monthNames[i.getMonth()]}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCalender;
