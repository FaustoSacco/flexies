import React from "react";
import { useApp } from "../components/AppProvider";
import { shiftStatusMap } from "../utils/statusMap";

const Dashboard = () => {
  const { user, allShifts, updateData, acceptRequest } = useApp();
  const currentDate = allShifts["14th October 2022"];

  if (!user) return <p>loading</p>;

  const isRecipient =
    currentDate[0].shiftSwapDetails?.recipient &&
    user.name === currentDate[0].shiftSwapDetails?.recipient;

  return (
    <div className="page">
      {user && user.name ? <h1>Hello {user.name}</h1> : <h1>Dashboard</h1>}
      <h3>Shift swaps</h3>

      <h4>14th October 2022</h4>

      {isRecipient && (
        <p className="alert">{`${currentDate[0].shiftSwapDetails.initiator} wants to swap with you`}</p>
      )}

      <div className="shift-swap-container">
        {allShifts["14th October 2022"].map((shift, index) => {
          return (
            <div className={`row-details side-${index}`} key={index}>
              <div>Shift owner: {shift.owner}</div>
              <div>Shift start: {shift.start}</div>
              <div>Shift end: {shift.end}</div>
              <div>Status: {shift.status}</div>
            </div>
          );
        })}

        {currentDate[0].status === shiftStatusMap.PENDING ? (
          <button disabled>Pending</button>
        ) : isRecipient ? (
          <button
            disabled={currentDate[0].status === shiftStatusMap.PENDING}
            onClick={() => acceptRequest(currentDate)}
          >
            Accept
          </button>
        ) : (
          <button
            disabled={currentDate[0].status === shiftStatusMap.INITIATED}
            onClick={() => updateData(currentDate)}
          >
            {currentDate[0].status === shiftStatusMap.INITIATED
              ? "Requested"
              : "Let's swap"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
