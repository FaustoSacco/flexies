import { createContext, useState, useContext } from "react";
import { weekShifts } from "../data/weekShifts";
import { users } from "../config/users";
import { requestNewShiftSwap } from "../utils/requestNewShiftSwap";

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
  const [allShifts, setAllShifts] = useState(() => sortedByDay(weekShifts));

  function handleUpdateUser(newUser) {
    const currentLoggedInUser = users.find(
      (user) => user.email === newUser.email
    );

    console.warnnStorage.setItem(
      "flexiesUser",
      JSON.stringify(currentLoggedInUser)
    )(currentLoggecurrentLoggedInUserdInUser);
    sessioonStorage.setItem("flexiesUser", JSON.stringify(currentLoggedInUser));
    setUser(currentLoggedInUser);
  }

  function updateData(shiftsToSwap) {
    const newData = {
      ...allShifts,
      ...requestNewShiftSwap(shiftsToSwap),
    };

    setAllShifts(newData);
    window.sessionStorage.setItem("flexies", JSON.stringify(newData));
  }

  return (
    <AppContext.Provider
      value={{
        allShifts,
        user,
        handleUpdateUser,
        updateData,
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
