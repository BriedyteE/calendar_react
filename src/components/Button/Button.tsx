import Styles from "./button.module.css";

export enum ButtonVariant {
  Primary = "primary",
  Plain = "plain",
}

interface ButtonProps {
  onClick: () => void;
  text: string;
  variant?: ButtonVariant;
}

function Button({
  onClick,
  text,
  variant = ButtonVariant.Primary,
}: ButtonProps) {
  return (
    <button onClick={onClick} className={`${Styles.button} ${Styles[variant]}`}>
      {text}
    </button>
  );
}

export default Button;
