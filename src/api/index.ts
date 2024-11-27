import { getRunsData } from "./5kmrun";
import { getXLRuns } from "./xlrun";
import { getSelfieRuns } from "./selfie";

export const getData = async (userID: number) => {
  const runs = await getRunsData(userID);
  const xlRuns = await getXLRuns(userID);
  const { user, runs: selfieRuns } = await getSelfieRuns(userID);
  return { user, runs, xlRuns, selfieRuns };
};
