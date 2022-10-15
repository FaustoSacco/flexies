import React from "react";
import { useApp } from "../components/AppProvider";

const Dashboard = () => {
  const { user, allShifts, updateData } = useApp();

  return (
    <div className="page">
      {user && user.name ? <h1>Hello {user.name}</h1> : <h1>Dashboard</h1>}
      <h3>Shift swaps</h3>

      <h4>14th October 2022</h4>
      <div className="shift-swap-container">
        {allShifts["14th October 2022"].map((shifts, index) => (
          <div className={`row-details side-${index}`} key={index}>
            <div>Shift owner: {shifts.owner}</div>
            <div>Shift start: {shifts.start}</div>
            <div>Shift end: {shifts.end}</div>
            <div>Status: {shifts.status}</div>
          </div>
        ))}
        <button onClick={() => updateData(allShifts["14th October 2022"])}>
          Let's swap
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
