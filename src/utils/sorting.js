function filterByStatus(shifts) {
  const matched = shifts.find((shift) => shift.status === "pending approval");

  if (!matched) {
    return null;
  }

  return shifts;
}

export function getPendingShifts(allShifts) {
  const dates = Object.keys(allShifts);
  const sortedShifts = dates.reduce(
    (allData, currentDate, index) =>
      filterByStatus(allShifts[currentDate])
        ? [
            ...allData,
            {
              date: currentDate,
              requests: [
                {
                  index,
                  details: [...filterByStatus(allShifts[currentDate])],
                },
              ],
            },
          ]
        : [...allData],
    []
  );

  return sortedShifts;
}
