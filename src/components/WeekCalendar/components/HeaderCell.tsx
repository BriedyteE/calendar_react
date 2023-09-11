import { DAY_NAMES } from "../../../config/constants";

import Styles from "../weekCalendar.module.css";

interface HeaderCellProps {
  dayNameKey: number;
  dayOfMonth: number;
  isCurrentDay: boolean;
}

function HeaderCell({ dayNameKey, dayOfMonth, isCurrentDay }: HeaderCellProps) {
  return (
    <time className={`${Styles.cell} ${Styles.headerCell}`}>
      {DAY_NAMES[dayNameKey].substring(0, 3).toUpperCase()}
      <span
        className={`${Styles.date} ${isCurrentDay ? Styles.currentDay : ""}`}
      >
        {dayOfMonth}
      </span>
    </time>
  );
}

export default HeaderCell;
