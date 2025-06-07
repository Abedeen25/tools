import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.scss";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admission-calender">Admission Calender</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
