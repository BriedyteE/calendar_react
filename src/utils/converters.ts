export const convertTo12HourTime = (hour: number) =>
  hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;

export const converIndexToHour = (index: number) => {
  const hour = index - 1;
  return hour <= 9 ? `0${hour}` : String(hour);
};
