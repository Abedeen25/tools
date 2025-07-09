import React, { useState, useEffect } from "react";
import events from "../../data/timeline_events.json";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "#ffffff000",
  outline: "none",
};

const AdCalender = () => {
  const [noOfDays, setNoOfDays] = useState([]);
  const [EventStacks, setEventStacks] = useState([]);
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  // Utility variables
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

  const countDown = (endsAt) => {
    const countDownDate = endsAt.getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    return (
      <div className="count-down">{`Ending in: ${days}d ${hours}h ${minutes}m`}</div>
    );
  };

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
              onClick={() => {
                handleOpen();
                setSelectedEvent(span.post);
              }}
            >
              <div className="title">{span.post.title}</div>
              <div className="end-date">
                {Math.floor(
                  (new Date(span.post["end-date"]) - new Date()) / dayval
                ) + " days remaining"}
              </div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-container">
            <img
              src={selectedEvent.logo}
              alt="Univ Logo"
              className="univ-logo"
            />
            <h2>{selectedEvent.title}</h2>
            <h4>{selectedEvent.description}</h4>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
              </svg>
              {" " +
                new Date(selectedEvent["start-date"]).toDateString() +
                " - " +
                new Date(selectedEvent["end-date"]).toDateString()}
            </p>
            <b>Country:</b>
            {" " + selectedEvent.country}
            <p className="reqs">
              <b># Requirements:</b>
              {selectedEvent.Requirements.map((i, k) => {
                return <div className="req-chips">{i}</div>;
              })}
            </p>
            <div className="bottm-mod">
              <b>Visit: </b>
              <a
                href={selectedEvent.postlink}
                target="_blank"
                rel="noopener noreferrer"
              >
                See more
              </a>
              {countDown(new Date(selectedEvent["end-date"]))}
            </div>
          </div>
        </Box>
      </Modal>
      <div
        className="timeline-container"
        style={{ height: `${EventStacks.length * 3.6 + 2.6}em` }}
      >
        <div className="timeline-days">
          {noOfDays.map((i, ind) =>
            i.getDate() !== 1 ? (
              <div
                key={ind}
                className={
                  i.toDateString() === new Date().toDateString()
                    ? "day-mark its-today"
                    : "day-mark"
                }
              >
                {i.getDate()}
              </div>
            ) : (
              <div
                key={ind}
                className={
                  i.toDateString() === new Date().toDateString()
                    ? "day-mark month-name its-today"
                    : "day-mark month-name"
                }
              >
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
