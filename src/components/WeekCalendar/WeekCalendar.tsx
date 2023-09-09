import Styles from "./weekCalendar.module.css";
import { v4 as uuidv4 } from "uuid";

import { getWeekColumnDayByIndex } from "../../utils/date";
import { DAY_NAMES, currentDate } from "../../config/constants";
import { CalendarEvent } from "../../types/events";

import HoursColumn from "./components/HoursColumn";
import HeaderCell from "./components/HeaderCell";
import EventSlot from "./components/EventSlot";

import { useRef } from "react";

interface WeekCalendarProps {
  weekStartDate: Date;
  onCellClick: (e: React.MouseEvent, cellIndex: number, date: string) => void;
  events?: CalendarEvent[];
  onEventSlotClick: (event: CalendarEvent) => void;
}

function Weekcalendar({
  weekStartDate,
  onCellClick,
  events,
  onEventSlotClick,
}: WeekCalendarProps) {
  const columnIndexes = [...Array(8).keys()];
  const cellIndexes = [...Array(25).keys()];

  const cellRef = useRef<HTMLDivElement>(null);

  const filterCellEvents = (columnDate: string, cellIndex: number) =>
    events?.filter((event) => {
      const eventStartHour = Number(event.startTime.split(":")[0]);
      return event.startDate === columnDate && eventStartHour === cellIndex - 1;
    });

  return (
    <div className={Styles.calendar}>
      {columnIndexes.map((columnIndex) => {
        if (columnIndex === 0) {
          return <HoursColumn cellIndexes={cellIndexes} key={uuidv4()} />;
        }

        return (
          <div className={Styles.dayColumn} key={uuidv4()}>
            {cellIndexes.map((cellIndex) => {
              const columnDate = getWeekColumnDayByIndex(
                weekStartDate,
                columnIndex
              );

              if (cellIndex === 0) {
                return (
                  <HeaderCell
                    columnIndex={columnIndex}
                    dayOfMonth={columnDate.dayOfMonth}
                    isCurrentDay={
                      columnDate.formattedDate === currentDate.formattedDate
                    }
                    key={DAY_NAMES[columnIndex]}
                  />
                );
              }

              const cellEvents = filterCellEvents(
                columnDate.formattedDate,
                cellIndex
              );

              return (
                <div
                  onClick={(e) =>
                    onCellClick(e, cellIndex, columnDate.formattedDate)
                  }
                  className={Styles.cell}
                  key={uuidv4()}
                  ref={cellRef}
                >
                  {cellEvents?.map((event) => (
                    <EventSlot
                      startTime={event.startTime}
                      endTime={event.endTime}
                      title={event.title}
                      key={event.id}
                      cellHeight={cellRef?.current?.offsetHeight || 0}
                      onClick={() => onEventSlotClick(event)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Weekcalendar;
