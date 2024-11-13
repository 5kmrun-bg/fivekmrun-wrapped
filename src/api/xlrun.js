import { BASE_URL, YEAR } from "./constants";
import { timeInSecondsToPace } from "../utils";
import eventParticipation from "./data/xlrun-participation.json";

const URL = `${BASE_URL}xlrun/user/`;

const parseRun = (json) => {
  const id = json["r_eventid"];
  const distance = parseFloat(json["e_len"]);
  const participationData = eventParticipation[id];

  return {
    id,
    isSelfie: false,
    eventId: json["r_eventid"],
    location: json["n_name"],
    date: new Date(json["e_date"] * 1000),
    distance,

    time: json["r_time"],
    pace: timeInSecondsToPace(json["r_time"], distance),
    position: json["r_finish_pos"],
    totalRunners: participationData?.runnersCount ?? 0,
  };
};

export const getXLRuns = async (userID) => {
  try {
    const response = await fetch(`${URL}${userID}`);
    const data = await response.json();
    // console.log("RAW XLRUN DATA");
    // console.log(data);

    const runsData =
      data.years.find((year) => year.yr === `${YEAR}`)?.results ?? [];
    const runs = runsData.map(parseRun);
    return runs;
  } catch (error) {
    console.log(error);
    return [];
  }
};
