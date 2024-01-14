import { BrowserRouter, Routes, Route } from "react-router-dom"; // importing react router
import Login from "./pages/Login/Login";
import Registeration from "./pages/Register/Registeration";
import Dashboard from "./pages/Dashboard/Dashboard";
import Assignment from "./components/Assignment"
import { Dashboardd } from "./Components/Dashboardd"
import { Helo } from "./components/Helo";
import { Calendar } from "./Components/Calender";
import { Library } from "./Components/Library";
import { Classroom } from "./Components/Classroom";
import { Courses } from "./Components/Courses";
import { Integration } from "./Components/Integration";
import { Attendance } from "./Components/Attendance";
import { Discussion } from "./Components/Discussion";

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
          <Route path="dashboard" element={<Dashboardd  />} />
          <Route path="calendar" element={<Calendar  />} />
          <Route path="library" element={<Library  />} />
          <Route path="classroom" element={<Classroom  />} />
          <Route path="courses" element={<Courses  />} />
          <Route path="integration" element={<Integration />} />
          <Route path="assignment" element={<Assignment/>} />          
          <Route path="attendance" element={<Attendance  />} />
          <Route path="discussion" element={<Discussion  />} />
          <Route path="settings" element={<Helo  />} />
          <Route path="help" element={<Helo  />} />
        </Route>
      </Routes>


    </BrowserRouter>
  );
};

export default App;
