import { MONTHS } from "../../config/constants";
import { getAdjecentMonth, getFirstDateOfMonth } from "../../utils/date";

import Styles from "./sidebar.module.css";

import MonthCalendar from "../MonthCalendar";
import NavigationButtons from "../NavigationButtons";

interface SidebarProps {
  miniCalMonthStart: Date;
  currentDate: string;
  setMiniCalMonthStart: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
}

function Sidebar({
  miniCalMonthStart,
  setMiniCalMonthStart,
  setSelectedDate,
  currentDate,
}: SidebarProps) {
  return (
    <aside className={Styles.sidebar}>
      <div className={Styles.navigationItems}>
        <p>{`${
          MONTHS[miniCalMonthStart.getMonth()]
        } ${miniCalMonthStart.getFullYear()}`}</p>

        <NavigationButtons
          onNavigationClick={({ isLeft }) =>
            setMiniCalMonthStart(
              getAdjecentMonth({
                date: miniCalMonthStart,
                isPrevious: isLeft,
              })
            )
          }
        />
      </div>

      <MonthCalendar
        monthStartDate={miniCalMonthStart}
        selectedDate={"2023-08-30"}
        currentDate={currentDate}
        onCellClick={(cellDate) => {
          setMiniCalMonthStart(getFirstDateOfMonth(cellDate));
          setSelectedDate(cellDate);
        }}
      />
    </aside>
  );
}

export default Sidebar;