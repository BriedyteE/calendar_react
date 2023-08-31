import Styles from "./input.module.css";

interface InputProps {
  type: "date" | "time" | "text" | "textarea";
}

function Input({ type }: InputProps) {
  return <input type={type} className={Styles.input} />;
}

export default Input;
