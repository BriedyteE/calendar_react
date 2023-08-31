import Styles from "./weekCalendar.module.css";

import { getWeekColumnDayByIndex } from "../../utils/date";
import { v4 as uuidv4 } from "uuid";
import { CalendarEvent } from "../../services/events";
import { DAY_NAMES } from "../../config/constants";

import HoursColumn from "./components/HoursColumn";
import HeaderCell from "./components/HeaderCell";

interface WeekCalendarProps {
  weekStartDate: Date;
  currentDate: string;
  onCellClick: (cellIndex: number) => void;
  events: CalendarEvent[] | null;
}

function Weekcalendar({
  weekStartDate,
  currentDate,
  onCellClick,
  events,
}: WeekCalendarProps) {
  const columnIndexes = [...Array(8).keys()];
  const cellIndexes = [...Array(25).keys()];

  return (
    <div className={Styles.calendar}>
      {columnIndexes.map((columnIndex) => {
        if (columnIndex === 0) {
          return <HoursColumn cellIndexes={cellIndexes} key={uuidv4()} />;
        }

        return (
          <div className={Styles.dayColumn} key={uuidv4()}>
            {cellIndexes.map((cellIndex) => {
              if (cellIndex === 0) {
                const columnDate = getWeekColumnDayByIndex(
                  weekStartDate,
                  columnIndex
                );
                return (
                  <HeaderCell
                    columnIndex={columnIndex}
                    dayOfMonth={columnDate.dayOfMonth}
                    isCurrentDay={columnDate.formattedDate === currentDate}
                    key={DAY_NAMES[columnIndex]}
                  />
                );
              }

              return (
                <div
                  onClick={() => onCellClick(cellIndex)}
                  className={Styles.cell}
                  key={uuidv4()}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Weekcalendar;
