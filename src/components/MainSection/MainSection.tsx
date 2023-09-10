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
import { DateAction } from "../../types/datesReducer";

interface MainSectionProps {
  firstDateOfWeek: Date;
  dispatch: React.Dispatch<DateAction>;
}

function MainSection({ firstDateOfWeek, dispatch }: MainSectionProps) {
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

  const submitEvent = async (selectedEvent: SelectedEvent) => {
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
    </main>
  );
}

export default MainSection;
