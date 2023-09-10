import { MONTHS } from "../../config/constants";
import { getAdjecentMonth, getFirstDateOfMonth } from "../../utils/date";
import { DateAction, DateActionType } from "../../types/datesReducer";

import Styles from "./sidebar.module.css";

import MonthCalendar from "../MonthCalendar";
import NavigationButtons from "../NavigationButtons";

interface SidebarProps {
  miniCalMonthStart: Date;
  dispatch: React.Dispatch<DateAction>;
  selectedDate: string;
}

function Sidebar({ miniCalMonthStart, dispatch, selectedDate }: SidebarProps) {
  const navigateToSelectedDate = (date: Date) => {
    dispatch({
      type: DateActionType.SetDates,
      payload: {
        dates: {
          selectedDate: date,
          miniCalMonthStart: getFirstDateOfMonth(date),
        },
      },
    });
  };

  const navigateCalenarByMonth = ({ isPrevious }: { isPrevious: boolean }) => {
    const adjecentMonth = getAdjecentMonth({
      date: miniCalMonthStart,
      isPrevious,
    });
    dispatch({
      type: DateActionType.SetMiniCalMonthStart,
      payload: {
        date: adjecentMonth,
      },
    });
  };

  return (
    <aside className={Styles.sidebar}>
      <div className={Styles.navigationItems}>
        <p>{`${
          MONTHS[miniCalMonthStart.getMonth()]
        } ${miniCalMonthStart.getFullYear()}`}</p>

        <NavigationButtons
          onNavigationClick={({ isLeft }) =>
            navigateCalenarByMonth({ isPrevious: isLeft })
          }
        />
      </div>

      <MonthCalendar
        monthStartDate={miniCalMonthStart}
        selectedDate={selectedDate}
        onCellClick={navigateToSelectedDate}
      />
    </aside>
  );
}

export default Sidebar;
