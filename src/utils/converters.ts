export const convertTo12HourTime = (hour: number) =>
  hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;

export const converIndexToHour = (index: number) => {
  const hour = index - 1;
  return hour <= 9 ? `0${hour}` : String(hour);
};

export const convertInputTimeToSeconds = (time: string) => {
  const [hour, seconds] = time.split(":");
  return Number(hour) * 60 + Number(seconds);
};
