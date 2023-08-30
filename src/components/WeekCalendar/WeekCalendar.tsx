import { DAY_NAMES } from "../../config/constants";
import { convertTo12HourTime } from "../../utils/converters";
import { getDateData } from "../../utils/date";
import Styles from "./weekCalendar.module.css";
import { v4 as uuidv4 } from "uuid";

interface WeekCalendarProps {
  weekStartDate: Date;
  currentDate: string;
}

function Weekcalendar({ weekStartDate, currentDate }: WeekCalendarProps) {
  const columnIndexes = [...Array(8).keys()];
  const cellIndexes = [...Array(25).keys()];

  return (
    <div className={Styles.calendar}>
      {columnIndexes.map((columnIndex) => {
        if (columnIndex === 0) {
          return (
            <div className={Styles.hourColumn} key={uuidv4()}>
              {cellIndexes.map((index) => (
                <div
                  className={`${Styles.cell} ${Styles.hourCell}`}
                  key={uuidv4()}
                >
                  {index === 0 || index === 24
                    ? ""
                    : convertTo12HourTime(index)}
                </div>
              ))}
            </div>
          );
        }

        return (
          <div className={Styles.dayColumn} key={uuidv4()}>
            {cellIndexes.map((cellIndex) => {
              if (cellIndex === 0) {
                const columnDate = getDateData(
                  new Date(
                    weekStartDate.getFullYear(),
                    weekStartDate.getMonth(),
                    weekStartDate.getDate() + columnIndex
                  )
                );
                return (
                  <time className={Styles.cell} key={DAY_NAMES[columnIndex]}>
                    {DAY_NAMES[columnIndex].substring(0, 3).toUpperCase()}
                    <span
                      className={`${Styles.date} ${
                        columnDate.formattedDate === currentDate
                          ? Styles.currentDay
                          : ""
                      }`}
                    >
                      {columnDate.dayOfMonth}
                    </span>
                  </time>
                );
              }

              return <div className={Styles.cell} key={uuidv4()}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Weekcalendar;
