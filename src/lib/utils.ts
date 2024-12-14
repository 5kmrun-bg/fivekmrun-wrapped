import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeInSecondsToPace = (timeInSeconds: number, km = 5) => {
  if (!timeInSeconds) {
    return "";
  }
  const secsPerKm = Math.round(timeInSeconds / km);
  const min = Math.floor(secsPerKm / 60);
  const sec = secsPerKm % 60;

  return `${min}:${sec < 10 ? "0" : ""}${sec}мин/км`;
};

export const formatDistance = (distance: number) => {
  if (!distance) {
    return "";
  }
  return `${Math.round((distance / 1000) * 10) / 10}`;
};

export const formatTimeShort = (timeInSeconds: number) => {
  if (!timeInSeconds) {
    return "";
  }
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds - hours * 3600 - minutes * 60;

  return `${hours ? `${hours}h ` : ""}${minutes ? `${minutes}’ ` : ""}${
    seconds ? `${seconds}’’` : ""
  }`;
};

export const formatTime = (timeInSeconds: number) => {
  if (!timeInSeconds) {
    return "";
  }
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds - hours * 3600 - minutes * 60;

  return `${hours ? `${hours}ч ` : ""}${minutes ? `${minutes}мин ` : ""}${
    seconds ? `${seconds}сек` : ""
  }`;
};

export const downloadImage = (blob: Blob, fileName: string) => {
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(blob);

  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  a.click();

  window.URL.revokeObjectURL(url);
};
