import Styles from "./button.module.css";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

function Button({ onClick, text }: ButtonProps) {
  return (
    <button onClick={onClick} className={Styles.plainBtn}>
      {text}
    </button>
  );
}

export default Button;
