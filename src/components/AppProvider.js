import { createContext, useState, useContext, useEffect } from "react";
import { weekShifts } from "../data/weekShifts";
import { useNavigate } from "react-router-dom";
import { users } from "../config/users";
import {
  requestNewShiftSwap,
  acceptedShiftSwap,
  requestApproval,
} from "../utils/requestNewShiftSwap";

export const AppContext = createContext(null);

function sortedByDay(weekShifts) {
  return weekShifts.reduce(
    (allShifts, currentShift, index) => ({
      ...allShifts,
      [currentShift.date]: [
        ...weekShifts.filter((shift) => shift.date === currentShift.date),
      ],
    }),
    {}
  );
}

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allShifts, setAllShifts] = useState(() => {
    let updatedData = window.sessionStorage.getItem("flexies");

    if (updatedData) {
      updatedData = JSON.parse(window.sessionStorage.getItem("flexies"));
    } else {
      updatedData = sortedByDay(weekShifts);
    }

    return updatedData;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("flexiesUser")) {
      const userItem = JSON.parse(window.sessionStorage.getItem("flexiesUser"));
      handleUpdateUser(userItem);
    } else {
      navigate("/");
    }
  }, [user]);

  function handleUpdateUser(newUser) {
    const currentLoggedInUser = users.find(
      (user) => user.email === newUser.email
    );

    window.sessionStorage.setItem(
      "flexiesUser",
      JSON.stringify(currentLoggedInUser)
    );

    setUser(currentLoggedInUser);

    if (window.sessionStorage.getItem("flexies")) {
      return;
    } else {
      window.sessionStorage.setItem("flexies", JSON.stringify(allShifts));
    }
  }

  function logOut() {
    window.sessionStorage.setItem("flexies", JSON.stringify(allShifts));
    window.sessionStorage.removeItem("flexiesUser");
    setUser(null);
  }

  function updateData(shiftsToSwap) {
    const newData = {
      ...allShifts,
      ...requestNewShiftSwap(user, shiftsToSwap),
    };

    setAllShifts(newData);
  }

  function acceptRequest(shiftsToSwap) {
    const newData = {
      ...allShifts,
      ...acceptedShiftSwap(user, shiftsToSwap),
    };

    setAllShifts(newData);
  }

  function updateApprovedData(shiftsToSwap) {
    const newData = {
      ...allShifts,
      ...requestApproval(shiftsToSwap),
    };

    setAllShifts(newData);
  }

  return (
    <AppContext.Provider
      value={{
        allShifts,
        user,
        handleUpdateUser,
        updateData,
        updateApprovedData,
        acceptRequest,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// This is the useApp custom hook

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "You are trying to use the useApp hook outside of the AppProvider"
    );
  }

  return context;
}

export default AppProvider;
