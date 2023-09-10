import Styles from "./button.module.css";

export enum ButtonVariant {
  Primary = "primary",
  Plain = "plain",
}

interface ButtonProps {
  onClick?: () => void;
  text: string;
  variant?: ButtonVariant;
  isDisabled?: boolean;
}

function Button({
  onClick = () => {},
  text,
  variant = ButtonVariant.Primary,
  isDisabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${Styles.button} ${Styles[variant]}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default Button;
