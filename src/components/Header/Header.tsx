import { defaultDates } from "../../config/constants";
import { DateActionType, DateAction } from "../../types/datesReducer";
import { getAdjecentWeek, getFirstDateOfMonth } from "../../utils/date";

import Button, { ButtonVariant } from "../Button";
import NavigationButtons, { NavigationBtnVariant } from "../NavigationButtons";

import Styles from "./header.module.css";

interface HeaderProps {
  selectedDate: Date;
  dispatch: React.Dispatch<DateAction>;
}

function Header({ selectedDate, dispatch }: HeaderProps) {
  const navigateCalendarsByWeek = ({ isLeft }: { isLeft: boolean }) => {
    const newSelectedDate = getAdjecentWeek({
      date: selectedDate,
      isPrevious: isLeft,
    });

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
      <NavigationButtons
        variant={NavigationBtnVariant.Medium}
        onNavigationClick={navigateCalendarsByWeek}
      />
      <Button
        onClick={navigateToDefaultDate}
        text="Today"
        variant={ButtonVariant.Plain}
      />
    </header>
  );
}

export default Header;
