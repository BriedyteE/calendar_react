import Styles from "./weekCalendar.module.css";

import { getDateData, getDayCountingFromDate } from "../../utils/date";
import { DAY_NAMES, currentDate } from "../../config/constants";
import { CalendarEvent, SelectedEvent } from "../../types/events";

import HoursColumn from "./components/HoursColumn";
import HeaderCell from "./components/HeaderCell";
import EventSlot from "./components/EventSlot";

import { useRef } from "react";

interface WeekCalendarProps {
  firstDateOfWeek: Date;
  onCellClick: (e: React.MouseEvent, cellIndex: number, date: string) => void;
  events?: CalendarEvent[];
  selectedEvent: SelectedEvent | null;
  onEventSlotClick: (event: CalendarEvent) => void;
}

function Weekcalendar({
  firstDateOfWeek,
  onCellClick,
  events,
  selectedEvent,
  onEventSlotClick,
}: WeekCalendarProps) {
  const columnIndexes = [...Array(7).keys()];
  const cellIndexes = [...Array(25).keys()];

  const cellRef = useRef<HTMLDivElement>(null);

  const isCurrentCellEvent = (
    event: CalendarEvent | SelectedEvent,
    columnDate: string,
    cellIndex: number
  ) => {
    const eventStartHour = Number(event.startTime.split(":")[0]);
    return event.startDate === columnDate && eventStartHour === cellIndex - 1;
  };

  return (
    <div className={Styles.calendar}>
      <HoursColumn cellIndexes={cellIndexes} />

      {columnIndexes.map((columnIndex) => {
        const columnDate = getDayCountingFromDate(firstDateOfWeek, columnIndex);
        const { formattedDate, dayOfMonth } = getDateData(columnDate);

        return (
          <div className={Styles.dayColumn} key={formattedDate}>
            {cellIndexes.map((cellIndex) => {
              if (cellIndex === 0) {
                return (
                  <HeaderCell
                    dayNameKey={columnIndex + 1}
                    dayOfMonth={dayOfMonth}
                    isCurrentDay={formattedDate === currentDate.formattedDate}
                    key={DAY_NAMES[columnIndex + 1]}
                  />
                );
              }

              const cellEvents = events?.filter((event) =>
                isCurrentCellEvent(event, formattedDate, cellIndex)
              );

              return (
                <div
                  onClick={(e) => onCellClick(e, cellIndex, formattedDate)}
                  className={Styles.cell}
                  ref={cellRef}
                  key={cellIndex}
                >
                  {cellEvents?.map((event) => {
                    if (event.id !== selectedEvent?.id) {
                      return (
                        <EventSlot
                          startTime={event.startTime}
                          endTime={event.endTime}
                          title={event.title}
                          cellHeight={cellRef?.current?.offsetHeight || 0}
                          onClick={() => onEventSlotClick(event)}
                          key={event.id}
                        />
                      );
                    }
                  })}

                  {selectedEvent &&
                    isCurrentCellEvent(
                      selectedEvent,
                      formattedDate,
                      cellIndex
                    ) && (
                      <EventSlot
                        startTime={selectedEvent.startTime}
                        endTime={selectedEvent.endTime}
                        title={selectedEvent.title}
                        cellHeight={cellRef?.current?.offsetHeight || 0}
                        isSelected={true}
                      />
                    )}
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
