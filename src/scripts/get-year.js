// Get the year one month ago

const date = new Date();
date.setMonth(date.getMonth() - 1);
const YEAR = date.getFullYear();

export { YEAR };
