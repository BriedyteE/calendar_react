import Button from "../Button";
import Styles from "./header.module.css";

interface HeaderProps {
  onTodayBtnClick: () => void;
}

function Header({ onTodayBtnClick }: HeaderProps) {
  return (
    <header className={Styles.header}>
      <Button onClick={onTodayBtnClick} text="Today" />
    </header>
  );
}

export default Header;
