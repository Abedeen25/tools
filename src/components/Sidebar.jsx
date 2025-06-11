import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.scss";
import ThemeToggle from "../components/ThemeToggle";

function Sidebar() {
  const [calenderVisible, setCalenderVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    console.log(sidebarVisible);
  };
  const showDroplist = (setter) => {
    setter(true);
  };
  const hideDroplist = (setter) => {
    setter(false);
  };

  return (
    <nav id="sidebar" className={sidebarVisible ? "" : "close"}>
      <ul>
        <li>
          <span className="main-logo">
            <svg
              className="Hero-icon"
              width="600"
              height="600"
              viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_118_2)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M285.513 -73.0858L307.821 -63.6167L315.791 -67L319.295 -58.7462L393.3 -27.3326L389.34 -18.0012H209.377L208 -21.2454L275.707 -49.9854L285.513 -73.0858ZM231.569 53.997L127 300.347V191H4.57764e-05V599.54L-36.5933 685.748L71.1945 731.501L126.165 602H127V600.032L299.358 193.981L531.765 741.498L639.557 695.743L367.151 53.997H231.569ZM127 600.032L126.165 602H4.57764e-05V599.54L127 300.347V600.032ZM62.9985 125.997C97.7916 125.997 125.997 97.7915 125.997 62.9984C125.997 28.2054 97.7916 0 62.9985 0C28.2054 0 4.57764e-05 28.2054 4.57764e-05 62.9984C4.57764e-05 97.7915 28.2054 125.997 62.9985 125.997Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_118_2">
                  <rect width="600" height="600" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <button id="toggle-btn" onClick={() => toggleSidebar()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
              >
                <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
              </svg>
            </button>
          </span>
        </li>
        <li className="active">
          {/* <li> */}
          <Link to="/tools/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
            </svg>
            <span>Dashboard</span>
          </Link>
        </li>
        <li
          className="active dropdown-btn"
          onMouseLeave={() => hideDroplist(setCalenderVisible)}
        >
          <Link to="/tools/admission-calender">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M240-280h240v-80H240v80Zm120-160h240v-80H360v80Zm120-160h240v-80H480v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
            </svg>
            <span>Admission</span>
            <div
              className="dropdown"
              onMouseEnter={() => showDroplist(setCalenderVisible)}
            >
              <svg
                className={calenderVisible ? "drop-icon rotated" : "drop-icon"}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </div>
          </Link>
          <ul className={calenderVisible ? "sub-menu show" : "sub-menu"}>
            <div>
              <li>
                <Link to="/tools/admission-calender">Timeline</Link>
              </li>
              <li>
                <Link to="/tools/dashboard">Finder</Link>
              </li>
            </div>
          </ul>
        </li>
        <li className="">
          {/* <li> */}
          <Link to="/tools/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
            </svg>
            <span>Dashboard</span>
          </Link>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  );
}

export default Sidebar;
