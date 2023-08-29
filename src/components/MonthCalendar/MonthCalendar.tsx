import Styles from "./monthCalendar.module.css";
import { getDateData } from "../../utils/date.ts";
import { DAY_NAMES } from "../../config/constants.ts";

interface MonthCalendarProps {
  monthStartDate: Date;
  selectedDate: string;
  currentDate: string;
  onCellClick: () => void;
}

function MonthCalendar({
  monthStartDate,
  selectedDate,
  currentDate,
  onCellClick,
}: MonthCalendarProps) {
  const monthStart = getDateData(monthStartDate);
  const rowIndexes = [...Array(6).keys()];
  const daysIndexes = [...Array(7).keys()];

  const getCellClass = (cellDate: string, cellMonth: number) => {
    const selected = cellDate === selectedDate ? Styles.selected : "";
    const currentDay = cellDate === currentDate ? Styles.currentDay : "";
    const currentMonth =
      cellMonth === monthStart.month ? Styles.currentMonth : "";

    return `${Styles.cell} ${selected} ${currentDay} ${currentMonth}`;
  };

  return (
    <>
      <div className={Styles.row}>
        {daysIndexes.map((index) => (
          <div
            className={`${Styles.cell} ${Styles.headerCell}`}
            key={DAY_NAMES[index + 1]}
          >
            {DAY_NAMES[index + 1][0]}
          </div>
        ))}
      </div>
      {rowIndexes.map((rowIndex) => (
        <div className={Styles.row} key={rowIndex}>
          {daysIndexes.map((cellIndex) => {
            const cellDate = new Date(
              monthStart.year,
              monthStart.month,
              monthStart.dayOfMonth -
                monthStart.dayOfWeek +
                cellIndex +
                7 * rowIndex
            );

            const { formattedDate, dayOfMonth, month } = getDateData(cellDate);
            return (
              <time
                className={getCellClass(formattedDate, month)}
                key={formattedDate}
                dateTime={formattedDate}
                onClick={onCellClick}
              >
                {dayOfMonth}
              </time>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default MonthCalendar;
