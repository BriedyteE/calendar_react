import Styles from "./eventModal.module.css";

import DeleteIcon from "../../assets/delete-btn.svg";
import Close from "../../assets/close-btn.svg";

import IconButton from "../IconButton";
import Button from "../Button";
import Input from "../Input";
import { SelectedEvent } from "../../types/events";

interface EventModalProps {
  modalEvent: SelectedEvent | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  setSelectedEvent: (event: SelectedEvent) => void;
}

function EventModal({
  modalEvent,
  onClose,
  onSubmit,
  setSelectedEvent,
}: EventModalProps) {
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
          {modalEvent.id && (
            <IconButton
              imageSrc={DeleteIcon}
              altText="Delete"
              onClick={onClose}
            />
          )}
          <IconButton imageSrc={Close} altText="Close" onClick={onClose} />
        </div>

        <form className={Styles.form} onSubmit={(e) => onSubmit(e)}>
          <Input
            type="text"
            value={modalEvent.title}
            placeholder="Add title"
            onChange={(title) => setSelectedEvent({ ...modalEvent, title })}
          />
          <div className={Styles.date}>
            <Input
              type="date"
              value={modalEvent.startDate}
              onChange={(startDate) =>
                setSelectedEvent({ ...modalEvent, startDate })
              }
            />
            <Input
              type="time"
              value={modalEvent.startTime}
              onChange={(startTime) =>
                setSelectedEvent({ ...modalEvent, startTime })
              }
            />
            <Input
              type="time"
              value={modalEvent.endTime}
              onChange={(endTime) =>
                setSelectedEvent({ ...modalEvent, endTime })
              }
            />
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
