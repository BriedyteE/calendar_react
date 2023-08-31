import Styles from "./eventModal.module.css";

import DeleteIcon from "../../assets/delete-btn.svg";
import Close from "../../assets/close-btn.svg";

import IconButton from "../IconButton";
import Button from "../Button";
import Input from "../Input";

interface EventModalProps {
  isModalVisible: boolean;
  onClose: () => void;
}

function EventModal({ isModalVisible, onClose }: EventModalProps) {
  if (!isModalVisible) {
    return null;
  }

  return (
    <div className={Styles.backdrop}>
      <div className={Styles.modal}>
        <div className={Styles.header}>
          <IconButton
            imageSrc={DeleteIcon}
            altText="Delete"
            onClick={onClose}
          />
          <IconButton imageSrc={Close} altText="Close" onClick={onClose} />
        </div>

        <form className={Styles.form}>
          <Input type="text" />
          <div className={Styles.date}>
            <Input type="date" />
            <Input type="time" />
            <Input type="time" />
          </div>
          <textarea rows={6}></textarea>
          <div>
            <Button onClick={() => {}} text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
