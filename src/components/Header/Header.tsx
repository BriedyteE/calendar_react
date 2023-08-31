import { getAdjecentWeek } from "../../utils/date";

import Button, { ButtonVariant } from "../Button";
import NavigationButtons, { NavigationBtnVariant } from "../NavigationButtons";

import Styles from "./header.module.css";

interface HeaderProps {
  selectedDate: Date;
  onTodayBtnClick: () => void;
  onNavigationClick: (date: Date) => void;
}

function Header({
  selectedDate,
  onTodayBtnClick,
  onNavigationClick,
}: HeaderProps) {
  return (
    <header className={Styles.header}>
      <NavigationButtons
        variant={NavigationBtnVariant.Medium}
        onNavigationClick={({ isLeft }) =>
          onNavigationClick(
            getAdjecentWeek({ date: selectedDate, isPrevious: isLeft })
          )
        }
      />
      <Button
        onClick={onTodayBtnClick}
        text="Today"
        variant={ButtonVariant.Plain}
      />
    </header>
  );
}

export default Header;
