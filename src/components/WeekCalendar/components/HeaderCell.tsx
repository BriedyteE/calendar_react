import { DAY_NAMES } from "../../../config/constants";

import Styles from "../weekCalendar.module.css";

interface HeaderCellProps {
  columnIndex: number;
  dayOfMonth: number;
  isCurrentDay: boolean;
}

function HeaderCell({
  columnIndex,
  dayOfMonth,
  isCurrentDay,
}: HeaderCellProps) {
  return (
    <time className={`${Styles.cell} ${Styles.headerCell}`}>
      {DAY_NAMES[columnIndex].substring(0, 3).toUpperCase()}
      <span
        className={`${Styles.date} ${isCurrentDay ? Styles.currentDay : ""}`}
      >
        {dayOfMonth}
      </span>
    </time>
  );
}

export default HeaderCell;
