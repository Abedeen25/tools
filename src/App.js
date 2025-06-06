import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashborad from "./pages/dashboard";
import AdCalender from "./pages/AdmissionCalender/AdCalender";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashborad</Link>
          </li>
          <li>
            <Link to="/admission-calender">AdCalender</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashborad />} />
        <Route path="/admission-calender" element={<AdCalender />} />
      </Routes>
    </Router>
  );
}

export default App;
