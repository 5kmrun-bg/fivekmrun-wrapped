import { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./api";
import _ from "lodash";

const loadData = async (userID) => {
  const data = await getData(userID);

  console.log("PARSED DATA:");
  console.log(data);

  console.log("OFFICIAL RUNS Stats:");
  console.log(getOfficialRunsStats(data));

  console.log("SELFIE RUNS Stats:");
  console.log(getSelfieRunsStats(data));

  console.log("XL RUNS Stats:");
  console.log(getXLRunsStats(data));
};

const getOfficialRunsStats = (data) => {
  const { runs } = data;

  if (!runs) {
    return null;
  }

  return {
    activeWeeks: runs.length,
    totalDistance: _.sumBy(runs, "distance"),
    totalTime: _.sumBy(runs, "time"),
    fastestRun: _.minBy(runs, "time"),
    bestPositionRun: _.minBy(runs, "position"),
    locationBreakdown: _.chain(runs)
      .countBy("location")
      .toPairs()
      .sortBy(1)
      .reverse()
      .value(),
  };
};

const getSelfieRunsStats = (data) => {
  const { selfieRuns } = data;

  if (!selfieRuns) {
    return null;
  }

  return {
    activeWeeks: selfieRuns.length,
    totalDistance: _.sumBy(selfieRuns, "distance"),
    totalTime: _.sumBy(selfieRuns, "time"),
    fastestRuns: _.chain(selfieRuns).sortBy("time").take(3).value(),
    bestPositionRun: _.chain(selfieRuns).sortBy("position").take(3).value(),
  };
};

const getXLRunsStats = (data) => {
  const { xlRuns } = data;

  if (!xlRuns) {
    return null;
  }

  return {
    numRaces: xlRuns.length,
    totalDistance: _.sumBy(xlRuns, "distance"),
    bestPositionRun: _.chain(xlRuns).sortBy("position").take(3).value(),
  };
}

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadData("13731");
  }, []);

  return (
    <>
      <h1>5kmrun Wrapped</h1>
      <div className="card">
        <input
          type="text"
          placeholder="ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={() => loadData(userId)}>Get</button>
      </div>
    </>
  );
};

export default App;
