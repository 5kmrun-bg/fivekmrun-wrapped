import { getYear } from "date-fns";
import { BASE_URL, YEAR } from "./constants";
import { timeInSecondsToPace } from "../utils";
import _ from "lodash";

const URL = `${BASE_URL}selfie/user/`;

const parseUserData = (userID, data) => ({
  id: userID,
  name: `${data.u_name} ${data.u_surname}`,
  status: data.u_runs > 50 || data.u_runs_s > 50 ? "Почетен Легионер" : null,
  avatarUrl: data.pic,
  bestTime: data.u_best_time_s,
  bestTimeEver: data.u_best_time_ever_s,
  runsCount: data.u_runs,
  runsCountEver: data.u_runs_s,
});

const parseSelfieRun = (json) => ({
  id: json["s_id"],
  isSelfie: true,
  userId: json["s_uid"],
  time: json["s_time"],
  totalTime: json["s_total_elapsed_time"],
  pace: timeInSecondsToPace(json["s_time"]),
  position: json["s_finish_pos"],
  startDate: new Date(Date.parse(json["s_start_date"])),
  distance: json["s_distance"],
  totalDistance: json["s_total_distance"],

  status: json["s_type"],
  isDisqualified: json["s_type"] > 3,

  totalRuns: json["u_runs_s"],
  mapPolyline: json["s_map"],
  stravaLink: json["s_strava_link"],
});

export const getSelfieRuns = async (userID) => {
  try {
    const response = await fetch(`${URL}${userID}`);
    const data = await response.json();
    // console.log("RAW Selfie DATA");
    // console.log(data);

    const user = parseUserData(userID, data.user[0]);
    const allRuns = data.runs.map(parseSelfieRun);
    const fastestRunEver = _.minBy(allRuns, "time");

    const runs = allRuns.filter((run) => getYear(run.startDate) === YEAR);
    runs.fastestRunEver = fastestRunEver;

    return { user, runs };
  } catch (error) {
    console.log(error);
    return { user: {}, runs: [] };
  }
};
