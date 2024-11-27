/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import { BASE_URL, YEAR } from "./constants";
import { timeInSecondsToPace } from "../lib/utils";
import rawEventParticipation from "./data/5kmrun-participation.json";

const URL = `${BASE_URL}5kmrun/user/`;

const eventParticipation = rawEventParticipation as Record<
  string,
  { runnersCount: number }
>;

const parseRun = (json: any) => {
  const id: string = json["r_eventid"];
  const participationData = eventParticipation[id];

  return {
    id,
    isSelfie: false,
    eventId: json["r_eventid"],
    location: json["n_name"],
    date: new Date(json["e_date"] * 1000),

    time: json["r_time"],
    pace: timeInSecondsToPace(json["r_time"]),
    position: json["r_finish_pos"],

    distance: 5000,
    totalRunners: participationData?.runnersCount ?? 0,
  };
};

export const getRunsData = async (userID: number) => {
  try {
    const response = await fetch(`${URL}${userID}`);
    const data = await response.json();
    // console.log("RAW Runs DATA");
    // console.log(data);

    const runsData =
      data.years.find((year: any) => year.yr === `${YEAR}`)?.results ?? [];

    const fastestRunEverRaw = parseRun(
      _.minBy(data.years.map((year: any) => year.results).flat(), "r_time")
    );
    const fastestRunEver = parseRun(fastestRunEverRaw);
    // console.log("FASTEST RUN EVER");
    // console.log(fastestRunEver);
    const runs = runsData.map(parseRun);
    runs.fastestRunEver = fastestRunEver;

    return runs;
  } catch (error) {
    console.log(error);
    return [];
  }
};
