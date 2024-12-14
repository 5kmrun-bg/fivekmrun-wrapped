/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import { getData } from "../api";

export const loadStats = async (userID: number) => {
  const data = await getData(userID);

  // console.log("PARSED DATA:");
  // console.log(data);

  return {
    user: data.user!,
    officialRuns: getOfficialRunsStats(data),
    selfieRuns: getSelfieRunsStats(data),
    xlRuns: getXLRunsStats(data),
    totals: getTotalStats(data),
  };
};

const toBase64Image = async (url: string) => {
  try {
    return await fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((res) => {
          reader.onloadend = () => {
            res(reader.result);
          };
        });
      });
  } catch (error) {
    console.error("Error fetching image", error);
    return undefined;
  }
};

const getTotalStats = (data: any) => {
  const runs = getOfficialRunsStats(data);
  const selfieRuns = getSelfieRunsStats(data);
  const xlRuns = getXLRunsStats(data);

  const userProfileImg = data.user?.avatarUrl as string | undefined;
  const userProfileImgEncoded = userProfileImg
    ? toBase64Image(userProfileImg)
    : undefined;
  console.log("userProfileImgEncoded", userProfileImgEncoded);

  return {
    userProfileImg,
    userProfileImgEncoded,
    runs: runs?.activeWeeks ?? 0,
    selfieRuns: selfieRuns?.activeWeeks ?? 0,
    xlRuns: xlRuns?.numRaces ?? 0,
    kms:
      (runs?.totalDistance ?? 0) +
      (selfieRuns?.totalDistance ?? 0) +
      (xlRuns?.totalDistance ?? 0),
    time:
      (runs?.totalTime ?? 0) +
      (selfieRuns?.totalTime ?? 0) +
      (xlRuns?.totalTime ?? 0),
  };
};

const getOfficialRunsStats = (data: any) => {
  const { runs } = data;

  if (!runs) {
    return null;
  }

  return {
    activeWeeks: runs.length,
    totalDistance: _.sumBy(runs, "distance"),
    totalTime: _.sumBy(runs, "time"),
    fastestRun: _.minBy(runs, "time"),
    fastestRunEver: runs.fastestRunEver,
    bestPositionRun: _.minBy(runs, "position"),
    bestRelativePosition: _.minBy(
      runs,
      (run: any) => run.position / run.totalRunners
    ),
    locationBreakdown: _.chain(runs)
      .countBy("location")
      .toPairs()
      .sortBy(1)
      .reverse()
      .value(),
  };
};

const getSelfieRunsStats = (data: any) => {
  const { selfieRuns } = data;

  if (!selfieRuns) {
    return null;
  }

  return {
    activeWeeks: selfieRuns.length,
    totalDistance: _.sumBy(selfieRuns, "distance"),
    totalTime: _.sumBy(selfieRuns, "time"),
    fastestRun: _.minBy(selfieRuns, "time"),
    fastestRunEver: selfieRuns.fastestRunEver,
    bestPositionRun: _.minBy(selfieRuns, "position"),
  };
};

const getXLRunsStats = (data: any) => {
  const { xlRuns } = data;

  if (!xlRuns) {
    return null;
  }

  return {
    numRaces: xlRuns.length,
    totalDistance: _.sumBy(xlRuns, "distance"),
    totalTime: _.sumBy(xlRuns, "time"),
    bestPositionRun: _.minBy(xlRuns, "position"),
  };
};
