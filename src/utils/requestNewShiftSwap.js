import { shiftStatusMap } from "./statusMap";

export function requestNewShiftSwap(loggedInUser, shiftArray) {
  const [shift1, shift2] = shiftArray;

  const updatedShift1 = {
    ...shift1,
    status: shiftStatusMap.INITIATED,
    shiftSwapDetails: {
      initiator: loggedInUser.name,
      recipient: shift2.owner,
    },
  };

  const updatedShift2 = {
    ...shift2,
    status: shiftStatusMap.INITIATED,
    shiftSwapDetails: {
      initiator: loggedInUser.name,
      recipient: shift2.owner,
    },
  };

  const shiftDate = shift1.date;

  return {
    [shiftDate]: [updatedShift1, updatedShift2],
  };
}

export function acceptedShiftSwap(loggedInUser, shiftArray) {
  const [shift1, shift2] = shiftArray;

  const updatedShift1 = {
    ...shift1,
    start: shift2.start,
    end: shift2.end,
    status: shiftStatusMap.PENDING,
  };

  const updatedShift2 = {
    ...shift2,
    start: shift1.start,
    end: shift1.end,
    status: shiftStatusMap.PENDING,
  };

  const shiftDate = shift1.date;

  return {
    [shiftDate]: [updatedShift1, updatedShift2],
  };
}

export function requestApproval(shiftArray) {
  const [shift1, shift2] = shiftArray;

  const updatedShift1 = {
    ...shift1,
    status: "approved",
  };

  const updatedShift2 = {
    ...shift2,
    status: "approved",
  };

  const shiftDate = shift1.date;

  return {
    [shiftDate]: [updatedShift1, updatedShift2],
  };
}
