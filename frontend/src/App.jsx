import { BrowserRouter, Routes, Route } from "react-router-dom"; // importing react router
import Login from "./pages/Login/Login";
import Registeration from "./pages/Register/Registeration";
import Dashboard from "./pages/dashboard/dashboard";
import Assignment from "./Components/Assignment"
import { Helo } from "./Components/Helo";

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
          <Route path="dashboard" element={<Helo  />} />
          <Route path="calendar" element={<Helo  />} />
          <Route path="library" element={<Helo  />} />
          <Route path="classroom" element={<Helo  />} />
          <Route path="courses" element={<Helo  />} />
          <Route path="integration" element={<Helo />} />
          <Route path="assignment" element={<Assignment/>} />          
          <Route path="attendance" element={<Helo  />} />
          <Route path="discussion" element={<Helo  />} />
          <Route path="settings" element={<Helo  />} />
          <Route path="help" element={<Helo  />} />
        </Route>
      </Routes>


    </BrowserRouter>
  );
};

export default App;
