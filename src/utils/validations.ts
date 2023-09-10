import { convertInputTimeToSeconds } from "./converters";

export const isEventTimeValid = (startTime: string, endTime: string) => {
  const startTimeInSeconds = convertInputTimeToSeconds(startTime);
  const endTimeInSeconds = convertInputTimeToSeconds(endTime);

  return endTimeInSeconds > startTimeInSeconds;
};
