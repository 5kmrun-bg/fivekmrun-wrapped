import fetch from "node-fetch";
import { writeFileSync, copyFileSync } from "fs";

const HOUR = 60 * 60 * 1000;
const YEAR = 2024;

const EVENTS_URL = "https://5kmrun.bg/api/5kmrun/results/";
const RESULTS_URL = "https://5kmrun.bg/api/5kmrun/result/";

const getEventsBatch = async (page) => {
  const param = `/${page * 50}`;

  const response = await fetch(`${EVENTS_URL}${param}`);
  const rawEvents = await response.json();

  const events = rawEvents.map((event) => ({
    id: event.e_id,
    name: event.n_name,
    date: new Date(event["e_date"] * 1000 + 12 * HOUR),
    type: event.type,
    location: event.e_location,
  }));

  return events;
};

const getResults = async (event) => {
  const response = await fetch(`${RESULTS_URL}${event.id}`);
  const rawResults = await response.json();

  return rawResults;
};

const allEvents = [];
let batch = 0;
while (
  allEvents.length === 0 ||
  allEvents[allEvents.length - 1].date.getFullYear() >= YEAR
) {
  console.log(`Fetching batch ${batch}`);
  const events = await getEventsBatch(batch);
  allEvents.push(...events);
  batch++;
}
const yearEvents = allEvents.filter(
  (event) => event.date.getFullYear() === YEAR
);

console.log(`Found ${yearEvents.length} for year ${YEAR}`);

writeFileSync(
  `${YEAR}-5kmrun-events.json`,
  JSON.stringify(yearEvents, null, 2)
);

const eventParticipation = {};
for (const event of yearEvents) {
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
  `${YEAR}-5kmrun-participation.json`,
  JSON.stringify(eventParticipation, null, 2)
);

copyFileSync(
  `${YEAR}-5kmrun-participation.json`,
  "../api/data/5kmrun-participation.json"
);
