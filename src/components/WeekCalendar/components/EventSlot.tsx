import Styles from "../weekCalendar.module.css";

interface EventSlotProps {
  startTime: string;
  endTime: string;
  title: string;
  cellHeight: number;
  onClick?: () => void;
  isSelected?: boolean;
}

function EventSlot({
  startTime,
  endTime,
  title,
  cellHeight,
  onClick,
  isSelected,
}: EventSlotProps) {
  const [startHour, startMinute] = startTime
    .split(":")
    .map((item) => Number(item));
  const [endHour, endMinutes] = endTime.split(":").map((item) => Number(item));

  const eventDuration =
    endHour * 60 + endMinutes - (startHour * 60 + startMinute);

  const height = `${(eventDuration * 100) / 60}%`;
  const top = `${(startMinute * 100) / cellHeight}%`;

  return (
    <div
      className={`${Styles.eventSlot} ${isSelected ? Styles.selected : ""}`}
      style={{ top, height }}
      onClick={onClick}
    >
      {title} ({startTime})
    </div>
  );
}

export default EventSlot;
