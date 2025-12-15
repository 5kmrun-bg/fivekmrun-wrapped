import "./scrape-xlrun-events.js";
import "./scrape-5kmrun-events.js";
import { YEAR } from "./get-year.js";
import { readFileSync, writeFileSync } from "fs";

const constantsPath = "../api/constants.ts";
const constantsContent = readFileSync(constantsPath, "utf-8");
const updatedContent = constantsContent.replace(
  /export const YEAR = \d+;/,
  `export const YEAR = ${YEAR};`
);
writeFileSync(constantsPath, updatedContent);

console.log(`Updated constants.ts to YEAR = ${YEAR}`);
