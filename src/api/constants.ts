export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "https://192.168.1.6:5173/api/" // TODO: Only for testing on mobile device
    : "https://5kmrun.bg/api/";

export const YEAR = 2024;
