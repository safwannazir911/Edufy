import { BrowserRouter, Routes, Route } from "react-router-dom"; // importing react router

// imports for pages
import Login from "./pages/Login/Login";
import Registeration from "./pages/Register/Registeration";

const App = () => {
  return (
    // added Routes

    <BrowserRouter>
      {/* <Link to="/login" className="btn btn-primary m-4" >
        Login
      </Link>

      <Link to="/register" className="btn btn-primary m-4" >
        Register
      </Link> */}

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Registeration />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
