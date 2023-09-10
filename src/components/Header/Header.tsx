import { defaultDates } from "../../config/constants";
import { DateActionType, DateAction } from "../../types/datesReducer";
import { getDayCountingFromDate, getFirstDateOfMonth } from "../../utils/date";

import Button, { ButtonVariant } from "../Button";
import NavigationButtons, { NavigationBtnVariant } from "../NavigationButtons";

import Styles from "./header.module.css";

interface HeaderProps {
  selectedDate: Date;
  dispatch: React.Dispatch<DateAction>;
  dateRange: string;
}

function Header({ selectedDate, dispatch, dateRange }: HeaderProps) {
  const navigateCalendarsByWeek = ({ isLeft }: { isLeft: boolean }) => {
    const newSelectedDate = getDayCountingFromDate(
      selectedDate,
      isLeft ? -7 : 7
    );

    dispatch({
      type: DateActionType.SetDates,
      payload: {
        dates: {
          selectedDate: newSelectedDate,
          miniCalMonthStart: getFirstDateOfMonth(newSelectedDate),
        },
      },
    });
  };

  const navigateToDefaultDate = () => {
    dispatch({
      type: DateActionType.SetDates,
      payload: {
        dates: defaultDates,
      },
    });
  };

  return (
    <header className={Styles.header}>
      <Button
        onClick={navigateToDefaultDate}
        text="Today"
        variant={ButtonVariant.Plain}
      />
      <NavigationButtons
        variant={NavigationBtnVariant.Medium}
        onNavigationClick={navigateCalendarsByWeek}
      />
      <p>{dateRange}</p>
    </header>
  );
}

export default Header;
