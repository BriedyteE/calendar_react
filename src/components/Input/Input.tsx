import Styles from "./input.module.css";

interface InputProps {
  type: "date" | "time" | "text" | "textarea";
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

function Input({ type, value, placeholder, onChange }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      className={Styles.input}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      placeholder={placeholder}
    />
  );
}

export default Input;
