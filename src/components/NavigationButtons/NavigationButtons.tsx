import Styles from "./navigationButtons.module.css";
import navigationArrow from "../../assets/navigationArrow.svg";

export enum NavigationBtnVariant {
  Small = "small",
  Medium = "medium",
}

interface NavigationButtonProps {
  variant?: NavigationBtnVariant;
  onLeftClick: () => void;
  onRightClick: () => void;
}

function NavigationButtons({
  variant = NavigationBtnVariant.Small,
  onLeftClick,
  onRightClick,
}: NavigationButtonProps) {
  return (
    <>
      <button className={Styles.button} onClick={onLeftClick}>
        <img
          src={navigationArrow}
          alt="Navigate back"
          className={`${Styles[variant]} ${Styles.left}`}
        />
      </button>
      <button className={Styles.button} onClick={onRightClick}>
        <img
          src={navigationArrow}
          alt="Navigate back"
          className={Styles[variant]}
        />
      </button>
    </>
  );
}

export default NavigationButtons;
