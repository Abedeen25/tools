import React, { useState, useEffect } from "react";
import events from "../../data/timeline_events.json";

const AdCalender = () => {
  const [noOfDays, setNoOfDays] = useState([]);
  const [EventStacks, setEventStacks] = useState([]);
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();
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
  const dayval = 1000 * 60 * 60 * 24;

  const showStacks = (list) => {
    let eventNumber = list.posts.length;
    let spans = [];
    spans.push({
      days: (new Date(list.start) - new Date(startDate)) / dayval,
      eventType: 0, //filler
    });
    for (let i = 0; i < eventNumber - 1; i++) {
      spans.push({
        days:
          (new Date(list.posts[i]["end-date"]) -
            new Date(list.posts[i]["start-date"])) /
          dayval,
        eventType: 1, //event
        post: list.posts[i],
      });

      spans.push({
        days:
          (new Date(list.posts[i + 1]["start-date"]) -
            new Date(list.posts[i]["end-date"])) /
          dayval,
        eventType: 0, //filler
      });
    }
    spans.push({
      days:
        (new Date(list.posts[eventNumber - 1]["end-date"]) -
          new Date(list.posts[eventNumber - 1]["start-date"])) /
        dayval,
      eventType: 1, //event
      post: list.posts[eventNumber - 1],
    });
    spans.push({
      days: (new Date(endDate) - new Date(list.ends)) / dayval,
      eventType: 0, //filler
    });
    return (
      <div className="event-stack">
        {spans.map((span, index) =>
          span.eventType === 0 ? (
            <div
              key={index}
              className="filler"
              style={{
                width: `${span.days * 35}px`,
              }}
            />
          ) : (
            <div
              key={index}
              className="event"
              style={{
                color: "black",
                width: `${span.days * 35 - 20}px`,
              }}
            >
              <div className="title">{span.post.description}</div>
              <div className="end-date">{span.post["end-date"]}</div>
            </div>
          )
        )}
      </div>
    );
  };
  useEffect(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    let fltrdEvents = events.filter(
      (event) => new Date(event["end-date"]) >= thirtyDaysAgo
    );
    fltrdEvents.sort(
      (a, b) => new Date(a["end-date"]) - new Date(b["end-date"])
    );

    if (fltrdEvents.length > 0) {
      const earliestEvent = fltrdEvents.reduce((prev, curr) =>
        new Date(prev["start-date"]) < new Date(curr["start-date"])
          ? prev
          : curr
      );

      const latestEvent = fltrdEvents.reduce((prev, curr) =>
        new Date(prev["end-date"]) > new Date(curr["end-date"]) ? prev : curr
      );

      setstartDate(new Date(earliestEvent["start-date"]));
      setendDate(new Date(latestEvent["end-date"]));
      const timeDiff =
        new Date(latestEvent["end-date"]).getTime() -
        new Date(earliestEvent["start-date"]).getTime();
      const dayDiff = Math.ceil(timeDiff / dayval) + 1;

      const days = Array.from(
        { length: dayDiff },
        (_, index) =>
          new Date(
            new Date(earliestEvent["start-date"]).getTime() + dayval * index
          )
      );
      console.log(days);

      setNoOfDays(days);
      let ES = [];
      for (let event of fltrdEvents) {
        let placed = false;
        for (let stack of ES) {
          if (new Date(event["start-date"]) > stack.ends) {
            stack.posts.push(event);
            stack.ends =
              stack.ends < new Date(event["end-date"])
                ? new Date(event["end-date"])
                : stack.ends;
            placed = true;
            break;
          }
        }
        if (!placed) {
          ES.push({
            start: new Date(event["start-date"]),
            ends: new Date(event["end-date"]),
            posts: [event],
          });
        }
      }
      setEventStacks(ES);
    } else {
      setNoOfDays([]);
    }
  }, []);

  return (
    <div className="calender-content">
      <h1>Timeline</h1>
      <div className="form">form</div>
      <div
        className="timeline-container"
        style={{ height: `${EventStacks.length * 3.6 + 2.6}em` }}
      >
        <div className="timeline-days">
          {noOfDays.map((i, ind) =>
            i.getDate() !== 1 ? (
              <div key={ind} className="day-mark">
                {i.getDate()}
              </div>
            ) : (
              <div key={ind} className="day-mark month-name">
                {monthNames[i.getMonth()]} <br /> {i.getDate()}
              </div>
            )
          )}
        </div>
        <div className="timeline-events">
          {EventStacks.map((i, ind) => (
            <div key={ind}>{showStacks(i)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdCalender;
