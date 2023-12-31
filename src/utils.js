export const timeInSecondsToPace = (timeInSeconds, km = 5) => {
  if (!timeInSeconds) {
    return "";
  }
  const secsPerKm = Math.round(timeInSeconds / km);
  const min = Math.floor(secsPerKm / 60);
  const sec = secsPerKm % 60;

  return `${min}:${sec < 10 ? "0" : ""}${sec}мин/км`;
};

export const formatDistance = (distance) => {
  if (!distance) {
    return "";
  }
  return `${Math.round((distance / 1000)*10)/10}`;
}

export const formatTime = (timeInSeconds) => {
  if (!timeInSeconds) {
    return "";
  }
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds - hours * 3600 - minutes * 60;

  return `${hours ? `${hours}ч ` : ""}${minutes ? `${minutes}мин ` : ""}${
    seconds ? `${seconds}сек` : ""
  }`;
}