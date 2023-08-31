import Style from "./iconButotton.module.css";

interface IconButtonProps {
  imageSrc: string;
  altText: string;
  onClick: () => void;
}

function IconButton({ imageSrc, altText, onClick }: IconButtonProps) {
  return (
    <button className={Style.button} onClick={onClick}>
      <img src={imageSrc} alt={altText} />
    </button>
  );
}

export default IconButton;
