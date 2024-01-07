import fetch from "node-fetch";
import { writeFileSync, readFileSync } from "fs";

const RESULTS_URL = "https://5kmrun.bg/api/5kmrun/result/";
const YEAR = 2023;

const events = JSON.parse(readFileSync(`${YEAR}-events.json`));

const getResults = async (event) => {
  const response = await fetch(`${RESULTS_URL}${event.id}`);
  const rawResults = await response.json();

  return rawResults;
};

const eventParticipation = {};
for (const event of events) {
  const results = await getResults(event);
  console.log(
    `Event: ${event.id}-${event.name} date:${event.date} runners: ${results.length}`
  );
  eventParticipation[event.id] = {
    ...event,
    runnersCount: results.length,
  };
}

writeFileSync(
  `${YEAR}-participation.json`,
  JSON.stringify(eventParticipation, null, 2)
);
