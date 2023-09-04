import Styles from "./eventModal.module.css";

import DeleteIcon from "../../assets/delete-btn.svg";
import Close from "../../assets/close-btn.svg";

import IconButton from "../IconButton";
import Button from "../Button";
import Input from "../Input";
import { CalendarEvent } from "../../services/events";

interface EventModalProps {
  modalEvent: CalendarEvent | null;
  onClose: () => void;
}

function EventModal({ modalEvent, onClose }: EventModalProps) {
  if (!modalEvent) {
    return null;
  }

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
          <IconButton
            imageSrc={DeleteIcon}
            altText="Delete"
            onClick={onClose}
          />
          <IconButton imageSrc={Close} altText="Close" onClick={onClose} />
        </div>

        <form className={Styles.form}>
          <Input type="text" value={modalEvent.title} />
          <div className={Styles.date}>
            <Input type="date" value={modalEvent.startDate} />
            <Input type="time" value={modalEvent.startTime} />
            <Input type="time" value={modalEvent.endTime} />
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
