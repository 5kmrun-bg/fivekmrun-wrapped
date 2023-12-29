export const timeInSecondsToPace = (timeInSeconds, km = 5) => {
  if (!timeInSeconds) {
    return "";
  }
  const secsPerKm = Math.round(timeInSeconds / km);
  const min = Math.floor(secsPerKm / 60);
  const sec = secsPerKm % 60;

  return `${min}:${sec < 10 ? "0" : ""}${sec}мин/км`;
};
