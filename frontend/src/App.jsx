import { BrowserRouter, Routes, Route } from "react-router-dom"; // importing react router
import Login from "./pages/Login/Login";
import Registeration from "./pages/Register/Registeration";
import Dashboard from "./pages/Dashboard/Dashboard";
import Assignment from "./components/Assignment"
import { DashboardMain } from "./components/DashboardMain";
import { Calendar } from "./components/Calender";
import { Library } from "./components/Library";
import { Classroom } from "./components/Classroom";
import { Courses } from "./components/Courses";
import { Integration } from "./components/Integration";
import { Attendance } from "./components/Attendance";
import { Discussion } from "./components/Discussion";
import Settings from "./components/Settings";
import Help from "./components/Help";

const App = () => {
  return (
    // added Routes

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/app" element={<Dashboard  />}>
          <Route path="dashboard" element={<DashboardMain  />} />
          <Route path="calendar" element={<Calendar  />} />
          <Route path="library" element={<Library  />} />
          <Route path="classroom" element={<Classroom  />} />
          <Route path="courses" element={<Courses  />} />
          <Route path="integration" element={<Integration />} />
          <Route path="assignment" element={<Assignment/>} />          
          <Route path="attendance" element={<Attendance  />} />
          <Route path="discussion" element={<Discussion  />} />
          <Route path="settings" element={<Settings  />} />
          <Route path="help" element={<Help  />} />
        </Route>
      </Routes>


    </BrowserRouter>
  );
};

export default App;
