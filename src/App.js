import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashborad from "./pages/dashboard";
import AdCalender from "./pages/AdmissionCalender/AdCalender";
import Sidebar from "./components/Sidebar";
import "./index.scss";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="" element={<Navigate to="/tools/dashboard" />} />
            <Route path="/tools/dashboard" element={<Dashborad />} />
            <Route path="/tools/admission-calender" element={<AdCalender />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
