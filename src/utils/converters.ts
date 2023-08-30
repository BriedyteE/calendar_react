export const convertTo12HourTime = (hour: number) =>
  hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
