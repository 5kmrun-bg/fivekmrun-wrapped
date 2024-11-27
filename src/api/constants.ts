export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "https://172.20.10.2:5173/api/" // TODO: Only for testing on mobile device
    : "https://5kmrun.bg/api/";

export const YEAR = 2024;
