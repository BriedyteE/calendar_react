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
