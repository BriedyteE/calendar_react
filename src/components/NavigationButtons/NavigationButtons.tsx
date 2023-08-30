import Styles from "./navigationButtons.module.css";
import navigationArrow from "../../assets/navigationArrow.svg";

export enum NavigationBtnVariant {
  Small = "small",
  Medium = "medium",
}

interface NavigationButtonProps {
  variant?: NavigationBtnVariant;
  onNavigationClick: ({ isLeft }: { isLeft: boolean }) => void;
}

function NavigationButtons({
  variant = NavigationBtnVariant.Small,
  onNavigationClick,
}: NavigationButtonProps) {
  return (
    <div>
      <button
        className={Styles.button}
        onClick={() => onNavigationClick({ isLeft: true })}
      >
        <img
          src={navigationArrow}
          alt="Navigate back"
          className={`${Styles[variant]} ${Styles.left}`}
        />
      </button>
      <button
        className={Styles.button}
        onClick={() => onNavigationClick({ isLeft: false })}
      >
        <img
          src={navigationArrow}
          alt="Navigate forward"
          className={Styles[variant]}
        />
      </button>
    </div>
  );
}

export default NavigationButtons;
