import Styles from "./modal.module.css";

import Close from "../../assets/close-btn.svg";

import IconButton from "../IconButton";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  secondaryIconDetails?: {
    imageSrc: string;
    altText: string;
    onClick: () => void;
  };
}

function Modal({ onClose, children, secondaryIconDetails }: ModalProps) {
  return (
    <div
      className={Styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={Styles.modal}>
        <div className={Styles.header}>
          {secondaryIconDetails && (
            <IconButton
              imageSrc={secondaryIconDetails.imageSrc}
              altText={secondaryIconDetails.altText}
              onClick={secondaryIconDetails.onClick}
            />
          )}
          <IconButton imageSrc={Close} altText="Close" onClick={onClose} />
        </div>
        <div className={Styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
