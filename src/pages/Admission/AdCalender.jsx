import React, { useState, useEffect } from "react";

const AdCalender = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./src/data/timeline_events.json");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="calender-content">
      <h1>Timeline</h1>
      <div className="form">form</div>
      <div className="timeline-container">
        {events.map((item, index) => (
          <div>{index}</div>
        ))}
      </div>
    </div>
  );
};

export default AdCalender;
