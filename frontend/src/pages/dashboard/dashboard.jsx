import React from "react";
import { LeftNavBar } from "../../components/LeftNavBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="d-flex">
      <LeftNavBar />

      <div className="component_area">
        <Outlet />
      </div>
    </div>
  );
};


export default Dashboard;
