import Styles from "../weekCalendar.module.css";

interface EventSlotProps {
  startTime: string;
  endTime: string;
  title: string;
  cellHeight: number;
}

function EventSlot({ startTime, endTime, title, cellHeight }: EventSlotProps) {
  const [startHour, startMinute] = startTime
    .split(":")
    .map((item) => Number(item));
  const [endHour, endMinutes] = endTime.split(":").map((item) => Number(item));

  const eventDuration =
    endHour * 60 + endMinutes - (startHour * 60 + startMinute);

  const height = `${(eventDuration * 100) / 60}%`;
  const top = `${(startMinute * 100) / cellHeight}%`;

  return (
    <div className={Styles.eventSlot} style={{ top, height }}>
      {title} ({startTime})
    </div>
  );
}

export default EventSlot;
