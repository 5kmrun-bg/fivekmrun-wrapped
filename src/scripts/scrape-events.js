import fetch from "node-fetch";
import { writeFileSync } from "fs";

const HOUR = 60 * 60 * 1000;
const YEAR = 2023;

const PAST_EVENTS_URL = "https://5kmrun.bg/api/5kmrun/results/";

const getEventsBatch = async (page) => {
  const param = `/${page * 50}`;

  const response = await fetch(`${PAST_EVENTS_URL}${param}`);
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

console.log(await getEventsBatch(0));
console.log(await getEventsBatch(1));

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

writeFileSync(`${YEAR}-events.json`, JSON.stringify(yearEvents, null, 2));
