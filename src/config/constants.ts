import { getDateData, getFirstDateOfMonth } from "../utils/date";

export const DAY_NAMES: { [day: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

export const MONTHS: { [month: number]: string } = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const currentDate = getDateData(new Date());

export const defaultDates = {
  miniCalMonthStart: getFirstDateOfMonth(currentDate.date),
  selectedDate: currentDate.date,
};
