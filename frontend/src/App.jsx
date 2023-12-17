import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // importing react router

// imports for pages
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
