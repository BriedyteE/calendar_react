export const convertTo12HourTime = (hour: number) =>
  hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;

export const converIndexToHour = (index: number) => {
  return index <= 9 ? `0${index}` : String(index);
};
