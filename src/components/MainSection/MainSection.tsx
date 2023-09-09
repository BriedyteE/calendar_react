import React, { useState } from "react";

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

interface MainSectionProps {
  firstDateOfWeek: Date;
}

function MainSection({ firstDateOfWeek }: MainSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(
    null
  );

  const { data: events } = useFetchEvents();
  const updateEventMutate = useUpdateEventMutate();
  const saveEventMutate = useSaveEventMutate();
  const deleteEventMutate = useDeleteEventMutate();

  const createNewEvent = (cellIndex: number, date: string) => {
    const startHour = converIndexToHour(cellIndex);
    return {
      title: "",
      startDate: date,
      startTime: `${startHour}:00`,
      endTime: `${startHour}:30`,
    };
  };

  const submitEvent = async (
    e: React.FormEvent,
    selectedEvent: SelectedEvent
  ) => {
    e.preventDefault();

    try {
      if (selectedEvent?.id) {
        await updateEventMutate.mutateAsync(selectedEvent as CalendarEvent);
      } else {
        await saveEventMutate.mutateAsync(selectedEvent);
      }

      setSelectedEvent(null);
    } catch {
      console.log("oh no");
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await deleteEventMutate.mutateAsync(id);
      setSelectedEvent(null);
    } catch {
      console.log("oh no");
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
        onEventSlotClick={(event) => setSelectedEvent(event)}
      />
      <EventModal
        modalEvent={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSubmit={submitEvent}
        onDelete={deleteEvent}
        setSelectedEvent={(event) => setSelectedEvent(event)}
      />
    </main>
  );
}

export default MainSection;
