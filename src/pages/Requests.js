import React from "react";
import { useApp } from "../components/AppProvider";
import { getPendingShifts } from "../utils/sorting";

function Requests() {
  const { allShifts, updateApprovedData } = useApp();
  const pendingShifts = getPendingShifts(allShifts);

  return (
    <div className="page">
      <h3>Pending Requests</h3>

      <div className="shift-swap-container">
        {pendingShifts.map((day, index) => (
          <div key={index}>
            <p>Date: {day.date}</p>
            {day.requests.map((request, requestNumber) => (
              <div key={requestNumber} className="request">
                <p>Request: {requestNumber + 1}</p>
                <p>{`${request.details[0].owner} wants to swap with ${request.details[1].owner}`}</p>
                <button onClick={() => updateApprovedData(request.details)}>
                  Approve
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;
