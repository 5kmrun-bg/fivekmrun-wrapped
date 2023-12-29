import { BASE_URL } from "./constants";
import { timeInSecondsToPace } from "./utils";

const URL = `${BASE_URL}xlrun/user/`;
const CURRENT_YEAR = "2023";

const parseRun = (json) => {
  const distance = parseFloat(json["e_len"]);
  return {
    id: json["r_id"],
    isSelfie: false,
    eventId: json["r_eventid"],
    location: json["n_name"],
    date: new Date(json["e_date"]),
    distance,

    time: json["r_time"],
    pace: timeInSecondsToPace(json["r_time"], distance),
    position: json["r_finish_pos"],
  };
};

export const getXLRuns = async (userID) => {
  try {
    const response = await fetch(`${URL}${userID}`);
    const data = await response.json();
    console.log("RAW XLRUN DATA");
    console.log(data);

    const runsData =
      data.years.find((year) => year.yr === CURRENT_YEAR)?.results ?? [];
    const runs = runsData.map(parseRun);
    return runs;
  } catch (error) {
    console.log(error);
    return [];
  }
};
