import Styles from "./input.module.css";

interface InputProps {
  type: "date" | "time" | "text" | "textarea";
  value: string;
}

function Input({ type, value }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      className={Styles.input}
      onChange={() => alert("Not yet implemented")}
    />
  );
}

export default Input;
