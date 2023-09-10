import Styles from "./eventModal.module.css";

import { useState } from "react";

import DeleteIcon from "../../assets/delete-btn.svg";

import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal/Modal";

import { SelectedEvent } from "../../types/events";
import { DateAction, DateActionType } from "../../types/datesReducer";

import { isEventTimeValid } from "../../utils/validations";
import { getFirstDateOfMonth } from "../../utils/date";

interface EventModalProps {
  modalEvent: SelectedEvent | null;
  onClose: () => void;
  submitForm: (event: SelectedEvent) => void;
  onDelete: (id: number) => void;
  setSelectedEvent: (event: SelectedEvent) => void;
  dispatch: React.Dispatch<DateAction>;
}

enum FormFields {
  Title = "title",
  StartDate = "startDate",
  StartTime = "startTime",
  EndTime = "endTime",
  Description = "decription",
}

const defaultErrorValues = {
  [FormFields.Title]: "",
  [FormFields.EndTime]: "",
};

function EventModal({
  modalEvent,
  onClose,
  submitForm,
  onDelete,
  setSelectedEvent,
  dispatch,
}: EventModalProps) {
  const [formErrors, setFormErrors] = useState(defaultErrorValues);
  if (!modalEvent) {
    return null;
  }

  const changeDate = (date: string) => {
    setSelectedEvent({ ...modalEvent, startDate: date });
    const monthStart = getFirstDateOfMonth(new Date(date));
    dispatch({
      type: DateActionType.SetDates,
      payload: {
        dates: {
          selectedDate: new Date(date),
          miniCalMonthStart: monthStart,
        },
      },
    });
  };

  const validateAndChangeTime = (time: string, inputName: string) => {
    setFormErrors({ ...formErrors, [FormFields.EndTime]: "" });

    const startTime =
      inputName === FormFields.StartTime ? time : modalEvent.startTime;
    const endTime =
      inputName === FormFields.EndTime ? time : modalEvent.endTime;

    if (!isEventTimeValid(startTime, endTime)) {
      setFormErrors({
        ...formErrors,
        endTime: "End time of the event can not be earlier than start time.",
      });
    }
    setSelectedEvent({ ...modalEvent, [inputName]: time });
  };

  const secondaryIconDetails = modalEvent.id
    ? {
        imageSrc: DeleteIcon,
        altText: "Delete",
        onClick: () => {
          setFormErrors(defaultErrorValues);
          onDelete(modalEvent.id as number);
        },
      }
    : undefined;

  return (
    <Modal
      onClose={() => {
        setFormErrors(defaultErrorValues);
        onClose();
      }}
      secondaryIconDetails={secondaryIconDetails}
    >
      <form
        className={Styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          setFormErrors(defaultErrorValues);
          submitForm(modalEvent);
        }}
      >
        <Input
          type="text"
          name={FormFields.Title}
          value={modalEvent.title}
          placeholder="Add title"
          onChange={(title) => setSelectedEvent({ ...modalEvent, title })}
          errorText={formErrors.title}
        />
        <div className={Styles.date}>
          <Input
            type="date"
            name={FormFields.StartDate}
            value={modalEvent.startDate}
            onChange={changeDate}
          />
          <Input
            type="time"
            name={FormFields.StartTime}
            value={modalEvent.startTime}
            onChange={validateAndChangeTime}
          />
          <Input
            type="time"
            name={FormFields.EndTime}
            value={modalEvent.endTime}
            onChange={validateAndChangeTime}
            errorText={formErrors.endTime}
          />
        </div>
        <textarea rows={6}></textarea>
        <div>
          <Button isDisabled={!!formErrors.endTime} text="Save" />
        </div>
      </form>
    </Modal>
  );
}

export default EventModal;
