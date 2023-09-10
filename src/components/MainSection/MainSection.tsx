import React, { useEffect, useState } from "react";

import Weekcalendar from "../WeekCalendar";
import EventModal from "../EventModal";

import Styles from "./mainSection.module.css";
import {
  useDeleteEventMutate,
  useFetchEvents,
  useSaveEventMutate,
  useUpdateEventMutate,
} from "../../services/events";
import { CalendarEvent, SelectedEvent } from "../../types/events";
import { converIndexToHour } from "../../utils/converters";
import { DateAction } from "../../types/datesReducer";
import Modal from "../Modal/Modal";

interface MainSectionProps {
  firstDateOfWeek: Date;
  dispatch: React.Dispatch<DateAction>;
}

function MainSection({ firstDateOfWeek, dispatch }: MainSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: events, error: fetchEventsError } = useFetchEvents();
  const updateEventMutate = useUpdateEventMutate();
  const saveEventMutate = useSaveEventMutate();
  const deleteEventMutate = useDeleteEventMutate();

  useEffect(() => {
    if (fetchEventsError) {
      setIsModalOpen(true);
    }
  }, [fetchEventsError]);

  const createNewEvent = (cellIndex: number, date: string) => {
    const startHour = converIndexToHour(cellIndex);
    return {
      title: "",
      startDate: date,
      startTime: `${startHour}:00`,
      endTime: `${startHour}:30`,
    };
  };

  const submitEvent = async (selectedEvent: SelectedEvent) => {
    try {
      if (selectedEvent?.id) {
        await updateEventMutate.mutateAsync(selectedEvent as CalendarEvent);
      } else {
        await saveEventMutate.mutateAsync(selectedEvent);
      }

      setSelectedEvent(null);
    } catch {
      alert("Oops!");
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await deleteEventMutate.mutateAsync(id);
      setSelectedEvent(null);
    } catch {
      alert("Oops!");
    }
  };

  return (
    <main className={Styles.main}>
      <Weekcalendar
        weekStartDate={firstDateOfWeek}
        onCellClick={(e, cellIndex, date) => {
          if (e.target === e.currentTarget) {
            const newEvent = createNewEvent(cellIndex, date);
            setSelectedEvent(newEvent);
          }
        }}
        events={events}
        selectedEvent={selectedEvent}
        onEventSlotClick={(event) => setSelectedEvent(event)}
      />
      <EventModal
        modalEvent={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        submitForm={submitEvent}
        onDelete={deleteEvent}
        setSelectedEvent={(event) => setSelectedEvent(event)}
        dispatch={dispatch}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className={Styles.error}>Oops! Failed to fetch events!</p>
          <p className={Styles.error}>
            Please, make sure that the{" "}
            <span>json-server --watch db/db.json</span> command was run:)
          </p>
        </Modal>
      )}
    </main>
  );
}

export default MainSection;
