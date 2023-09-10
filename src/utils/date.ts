import { MONTHS } from "../config/constants";

interface GetAdjecentDate {
  date: Date;
  isPrevious: boolean;
}

export const getDateData = (date: Date) => {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const formattedDate = [
    year,
    month + 1 > 9 ? month + 1 : `0${month + 1}`,
    dayOfMonth > 9 ? dayOfMonth : `0${dayOfMonth}`,
  ].join("-");

  return {
    dayOfWeek: dayOfWeek === 0 ? 7 : dayOfWeek,
    dayOfMonth,
    month,
    year,
    formattedDate,
    date,
  };
};

export const getAdjecentMonth = ({ date, isPrevious }: GetAdjecentDate) => {
  const month = date.getMonth();
  return new Date(date.getFullYear(), isPrevious ? month - 1 : month + 1, 1);
};

export const getDayCountingFromDate = (
  date: Date,
  daysCountFromDate: number
) => {
  const day = date.getDate();
  return new Date(date.getFullYear(), date.getMonth(), day + daysCountFromDate);
};

export const getFirstDateOfWeek = (date: Date) => {
  const { year, month, dayOfMonth, dayOfWeek } = getDateData(date);
  return new Date(year, month, dayOfMonth - dayOfWeek + 1);
};

export const getFirstDateOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getWeekDateRange = (firstDateOfWeek: Date) => {
  const lastDateOfWeek = getDayCountingFromDate(firstDateOfWeek, 6);

  const endOfWeek = [
    MONTHS[lastDateOfWeek.getMonth()],
    lastDateOfWeek.getFullYear(),
  ];

  const startOfWeek = [
    MONTHS[firstDateOfWeek.getMonth()],
    firstDateOfWeek.getFullYear(),
  ].filter((value) => !endOfWeek.includes(value));

  return startOfWeek.length
    ? `${startOfWeek.join(" ")}-${endOfWeek.join(" ")}`
    : endOfWeek.join(" ");
};
