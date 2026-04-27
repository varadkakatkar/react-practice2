import React, { useState, useMemo } from "react";

function UseMemoOnly() {
  const [name, setName] = useState("");
  const [year, setYear] = useState(2023);

  // INDEPENDENT USE: There are no child components here!
  // We just don't want to re-run this 5-second loop every time the user types their name.
  const massiveReportData = useMemo(() => {
    console.log("Running massive database calculation...");
    let total = 0;
    for (let i = 0; i < 10000000; i++) {
      total += i * year;
    }
    return total;
  }, [year]); // Only recalculate if the year changes

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setYear(year + 1)}>Next Year</button>
      <p>Report Total: {massiveReportData}</p>
    </div>
  );
}

export default UseMemoOnly;
