import Styles from "./input.module.css";

interface InputProps {
  type: "date" | "time" | "text" | "textarea";
  name: string;
  value: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  errorText?: string;
}

function Input({
  type,
  name,
  value,
  placeholder,
  onChange,
  errorText,
}: InputProps) {
  return (
    <div className={Styles.wrapper}>
      {type === "textarea" ? (
        <textarea
          rows={6}
          name={name}
          className={`${Styles.input} ${errorText ? Styles.errored : ""}`}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
          placeholder={placeholder}
        >
          {value}
        </textarea>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          className={`${Styles.input} ${errorText ? Styles.errored : ""}`}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
          placeholder={placeholder}
        />
      )}

      {errorText && <p className={Styles.error}>{errorText}</p>}
    </div>
  );
}

export default Input;
