import { getData } from "../api";
import _ from "lodash";

export const loadStats = async (userID) => {
  const data = await getData(userID);

  // console.log("PARSED DATA:");
  // console.log(data);

  return {
    user: data.user,
    officialRuns: getOfficialRunsStats(data),
    selfieRuns: getSelfieRunsStats(data),
    xlRuns: getXLRunsStats(data),
  };
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
    fastestRun: _.minBy(selfieRuns, "time"),
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
    totalTime: _.sumBy(xlRuns, "time"),
    bestPositionRun: _.chain(xlRuns).sortBy("position").take(3).value(),
  };
};
